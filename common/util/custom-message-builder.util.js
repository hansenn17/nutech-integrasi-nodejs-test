class CustomMessageBuilder {
  static createRequiredValidationMessage(field) {
    return `Parameter ${field} harus diisi`;
  }

  static createInvalidFormatValidationMessage(field) {
    return `Parameter ${field} tidak sesuai format`;
  }

  static createInvalidLengthValidationMessage(field, requiredLength) {
    return `${field} length minimal ${requiredLength} karakter`;
  }
}

module.exports = CustomMessageBuilder;
