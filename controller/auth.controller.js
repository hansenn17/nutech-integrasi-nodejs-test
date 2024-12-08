const InternalStatusCodeConstant = require("../common/constant/internal-status-code.constant");
const MessageConstant = require("../common/constant/message.constant");
const ApiResponse = require("../model/api-response.model");
const AuthService = require("../service/auth.service");

class AuthController {
  authService;

  constructor() {
    this.authService = new AuthService();
  }

  login = async (req, res) => {
    try {
      const token = await this.authService.login(req.body);
      return res.json(
        ApiResponse.create(
          InternalStatusCodeConstant.SUCCESS_CODE,
          MessageConstant.LOGIN_SUCCESS_MESSAGE,
          { token }
        )
      );
    } catch (error) {
      return res
        .status(400)
        .json(
          ApiResponse.create(
            InternalStatusCodeConstant.AUTHENTICATION_FAILED_CODE,
            error.message
          )
        );
    }
  };
}

module.exports = AuthController;
