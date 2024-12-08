class ApiResponse {
  static create(status, message, data = null) {
    return { status, message, data };
  }
}

module.exports = ApiResponse;
