const client = require("../config/database.config");

class ServiceRepository {
  async createService(code, name, description) {
    const query = {
      name: "insert-service",
      text: "INSERT INTO services VALUES($1, $2, $3)",
      values: [code, name, description],
    };
    const result = await client.query(query);

    return result;
  }

  async getAllServices() {
    const query = {
      name: "get-all-services",
      text: "SELECT * FROM services",
    };
    const result = await client.query(query);

    return result;
  }

  async getServiceByCode(code) {
    const query = {
      name: "get-service-by-code",
      text: "SELECT * FROM services WHERE service_code = $1",
      values: [code],
    };
    const result = await client.query(query);

    return result.rows[0];
  }
}

module.exports = ServiceRepository;
