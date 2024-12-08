const jwt = require("jsonwebtoken");
const MessageConstant = require("../common/constant/message.constant");
const ApiResponse = require("../model/api-response.model");
const InternalStatusCodeConstant = require("../common/constant/internal-status-code.constant");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Author")?.replace("Bearer ", "");

    if (!token) {
      res
        .status(401)
        .json(
          ApiResponse.create(
            InternalStatusCodeConstant.UNAUTHORIZED_CODE,
            MessageConstant.UNAUTHORIZED_MESSAGE
          )
        );
    }

    jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
    next();
  } catch (error) {
    res
      .status(401)
      .json(
        ApiResponse.create(
          InternalStatusCodeConstant.UNAUTHORIZED_CODE,
          MessageConstant.UNAUTHORIZED_MESSAGE
        )
      );
  }
};

module.exports = auth;
