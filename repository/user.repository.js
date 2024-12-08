const client = require("../config/database.config");

class UserRepository {
  async create(id, email, first_name, last_name, password) {
    const query =
      "INSERT INTO users(id, email, first_name, last_name, password) VALUES($1, $2, $3, $4, $5)";
    const values = [id, email, first_name, last_name, password];
    const result = await client.query(query, values);

    return result;
  }
}

module.exports = UserRepository;
