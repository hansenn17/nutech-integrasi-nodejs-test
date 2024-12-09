const yup = require("yup");

const MessageConstant = require("../../common/constant/message.constant");
const CustomMessageBuilder = require("../../common/util/custom-message-builder.util");
const ServicesService = require("../../service/services.service");

const servicesService = new ServicesService();

yup.addMethod(yup.string, "eligibleServiceType", function (errorMessage) {
  return this.test("test-service-type", errorMessage, async function (value) {
    const { path, createError } = this;

    const services = await servicesService.getAllServices();
    return (
      services.rows.find((service) => service.service_code === value) ||
      createError({ path, message: errorMessage })
    );
  });
});

const transactionDto = yup.object({
  service_code: yup
    .string()
    .eligibleServiceType(MessageConstant.SERVICE_NOT_FOUND)
    .required(
      CustomMessageBuilder.createRequiredValidationMessage("service_code")
    ),
});

module.exports = transactionDto;
