const jwt = require("jsonwebtoken");
const MessageConstant = require("../common/constant/message.constant");
const ApiResponse = require("../model/api-response.model");
const InternalStatusCodeConstant = require("../common/constant/internal-status-code.constant");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json(
          ApiResponse.create(
            InternalStatusCodeConstant.UNAUTHORIZED_CODE,
            MessageConstant.UNAUTHORIZED_MESSAGE
          )
        );
    }

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.email = payload.email;
    next();
  } catch (error) {
    return res
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
