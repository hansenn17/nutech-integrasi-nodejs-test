const client = require("../config/database.config");

class TransactionRepository {
  async createTransaction(
    invoiceNumber,
    walletId,
    serviceCode,
    transactionType,
    totalAmount
  ) {
    try {
      await client.query("BEGIN");

      await this.findAndLockById(walletId);
      await this.deductBalance(walletId, totalAmount);
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
      await client.query(query);

      const transaction = this.getTransactionByInvoice(invoiceNumber);

      await client.query("COMMIT");
      return transaction;
    } catch (error) {
      await client.query("ROLLBACK");
      throw new Error(error.message);
    }
  }

  async getTransactionByInvoice(invoiceNumber) {
    const query = {
      name: "get-transaction-by-invoice",
      text: "SELECT * FROM transactions t INNER JOIN services s ON t.service_code = s.service_code WHERE t.invoice_number = $1",
      values: [invoiceNumber],
    };
    const result = await client.query(query);

    return result.rows[0];
  }

  async findAndLockById(id) {
    const query = {
      name: "find-and-lock-wallet-by-id",
      text: "SELECT balance FROM wallets WHERE id = $1 FOR UPDATE",
      values: [id],
    };
    const result = await client.query(query);

    return result.rows[0];
  }

  async deductBalance(id, amount) {
    const query = {
      name: "deduct-balance",
      text: "UPDATE wallets SET balance = balance - $2 WHERE id = $1",
      values: [id, amount],
    };
    const result = await client.query(query);
    return result;
  }

  async getInvoiceCount(currentDate) {
    const query = {
      name: "get-max-invoice-number",
      text: "SELECT COUNT(invoice_number) as invoice_number_count FROM transactions WHERE DATE(created_on) = $1",
      values: [currentDate],
    };
    const result = await client.query(query);

    return result.rows[0].invoice_number_count;
  }

  async getTransactions(walletId, offset, limit) {
    const query = {
      name: "get-transactions",
      text: "SELECT t.invoice_number, t.transaction_type, s.description, t.total_amount, t.created_on FROM transactions t INNER JOIN services s ON t.service_code = s.service_code INNER JOIN wallets w ON t.wallet_id = w.id WHERE w.id = $1 ORDER BY t.created_on DESC OFFSET $2 LIMIT $3",
      values: [walletId, offset, limit],
    };
    const result = await client.query(query);

    return result;
  }
}

module.exports = TransactionRepository;
