const yup = require("yup");

const CustomMessageBuilder = require("../../common/util/custom-message-builder.util");

const registerUserDto = yup.object({
  email: yup
    .string()
    .email(CustomMessageBuilder.createInvalidFormatValidationMessage("email"))
    .required(CustomMessageBuilder.createRequiredValidationMessage("email")),
  first_name: yup
    .string()
    .required(
      CustomMessageBuilder.createRequiredValidationMessage("first_name")
    ),
  last_name: yup
    .string()
    .required(
      CustomMessageBuilder.createRequiredValidationMessage("last_name")
    ),
  password: yup
    .string()
    .min(
      8,
      CustomMessageBuilder.createInvalidLengthValidationMessage("password", 8)
    )
    .required(CustomMessageBuilder.createRequiredValidationMessage("password")),
});

module.exports = registerUserDto;
