const { v4 } = require("uuid");

const client = require("../config/database.config");
const invoiceBuilder = require("../common/util/invoice-builder.util");

class WalletRepository {
  async create(user_id) {
    const id = v4();
    const query = {
      name: "insert-wallet",
      text: "INSERT INTO wallets(id, user_id) VALUES($1, $2)",
      values: [id, user_id],
    };
    const result = await client.query(query);

    return result;
  }

  async findByEmail(email) {
    const query = {
      name: "find-wallet-by-user-email",
      text: "SELECT w.balance, w.id FROM wallets w INNER JOIN users u ON w.user_id = u.id WHERE u.email = $1",
      values: [email],
    };
    const result = await client.query(query);

    return result.rows[0];
  }

  createTopUpTransaction = async (
    walletId,
    serviceCode,
    transactionType,
    totalAmount
  ) => {
    const invoiceNumber = await invoiceBuilder();
    const query = {
      name: "insert-transaction",
      text: "INSERT INTO transactions VALUES($1, $2, $3, $4, $5)",
      values: [
        invoiceNumber,
        walletId,
        serviceCode,
        transactionType,
        totalAmount,
      ],
    };
    const result = await client.query(query);
    return result;
  };

  async updateBalance(amount, email) {
    try {
      await client.query("BEGIN");
      const query = {
        name: "top-up-balance",
        text: "UPDATE wallets w SET balance = balance + $1 FROM users u WHERE w.user_id = u.id AND u.email = $2 RETURNING balance, w.id as wallet_id",
        values: [amount, email],
      };
      const result = await client.query(query);
      const walletId = result.rows[0].wallet_id;

      await this.createTopUpTransaction(walletId, "TOPUP", "TOPUP", amount);

      await client.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw new Error(error.message);
    }
  }
}

module.exports = WalletRepository;
