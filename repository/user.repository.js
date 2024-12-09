const client = require("../config/database.config");
const WalletService = require("../service/wallet.service");

class UserRepository {
  walletService;
  constructor() {
    this.walletService = new WalletService();
  }

  async create(id, email, first_name, last_name, password) {
    try {
      await client.query("BEGIN");
      const insertUserQuery = {
        name: "insert-user",
        text: "INSERT INTO users(id, email, first_name, last_name, password) VALUES($1, $2, $3, $4, $5)",
        values: [id, email, first_name, last_name, password],
      };
      await client.query(insertUserQuery);

      const result = await this.walletService.createWallet(id);
      await client.query("COMMIT");
      return result;
    } catch (error) {
      await client.query("ROLLBACK");
      throw new Error(error.message);
    }
  }

  async findByEmail(email) {
    const query = {
      name: "find-user-by-email",
      text: "SELECT email, password FROM users WHERE email = $1",
      values: [email],
    };
    const result = await client.query(query);

    return result.rows[0];
  }
}

module.exports = UserRepository;
