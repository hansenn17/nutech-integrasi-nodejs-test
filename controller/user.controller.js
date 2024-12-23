const MessageConstant = require("../common/constant/message.constant");
const InternalStatusCodeConstant = require("../common/constant/internal-status-code.constant");
const ApiResponse = require("../model/api-response.model");
const UserService = require("../service/user.service");

class UserController {
  userService;

  constructor() {
    this.userService = new UserService();
  }

  registerUser = async (req, res) => {
    try {
      await this.userService.createUser(req.body);
      return res.json(
        ApiResponse.create(
          InternalStatusCodeConstant.SUCCESS_CODE,
          MessageConstant.REGISTRATION_SUCCESS_MESSAGE
        )
      );
    } catch (error) {
      return res
        .status(400)
        .json(
          ApiResponse.create(
            InternalStatusCodeConstant.INVALID_PARAMETER_CODE,
            error.message
          )
        );
    }
  };
}

module.exports = UserController;
