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

  static createInvalidNumberValidationMessage(field, minNumber) {
    return `Parameter ${field} hanya boleh angka dan tidak boleh lebih kecil dari ${minNumber}`;
  }
}

module.exports = CustomMessageBuilder;
