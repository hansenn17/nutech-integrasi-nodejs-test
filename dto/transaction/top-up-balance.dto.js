const yup = require("yup");

const CustomMessageBuilder = require("../../common/util/custom-message-builder.util");

const topUpBalanceDto = yup.object({
  amount: yup
    .number()
    .min(
      0,
      CustomMessageBuilder.createInvalidNumberValidationMessage("amount", 0)
    )
    .required(
      CustomMessageBuilder.createInvalidNumberValidationMessage("amount", 0)
    ),
});

module.exports = topUpBalanceDto;
