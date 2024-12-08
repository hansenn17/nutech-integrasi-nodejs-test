const MessageConstant = require("../common/constant/message.constant");
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
        ApiResponse.create(0, MessageConstant.REGISTRATION_SUCCESS_MESSAGE)
      );
    } catch (error) {
      return res.status(400).json(ApiResponse.create(102, error.message));
    }
  };
}

module.exports = UserController;
