const client = require("../config/database.config");

class UserRepository {
  async create(id, email, first_name, last_name, password) {
    const query = {
      name: "insert-user",
      text: "INSERT INTO users(id, email, first_name, last_name, password) VALUES($1, $2, $3, $4, $5)",
      values: [id, email, first_name, last_name, password],
    };
    const result = await client.query(query);

    return result;
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
