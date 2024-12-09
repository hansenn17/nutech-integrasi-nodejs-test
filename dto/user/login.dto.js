const yup = require("yup");

const CustomMessageBuilder = require("../../common/util/custom-message-builder.util");

const loginDto = yup.object({
  email: yup
    .string()
    .email(CustomMessageBuilder.createInvalidFormatValidationMessage("email"))
    .required(CustomMessageBuilder.createRequiredValidationMessage("email")),
  password: yup
    .string()
    .required(CustomMessageBuilder.createRequiredValidationMessage("password")),
});

module.exports = loginDto;
