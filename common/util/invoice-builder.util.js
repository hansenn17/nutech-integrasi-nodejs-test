const { format } = require("date-fns");

const TransactionRepository = require("../../repository/transaction.repository");

const transactionRepository = new TransactionRepository();

async function invoiceBuilder() {
  const currentDateString = format(new Date(), "yyyy-MM-dd");
  const invoiceNumberCount = parseInt(
    await transactionRepository.getInvoiceCount(currentDateString)
  );

  return `INV${currentDateString.split("-").join("")}-${
    invoiceNumberCount + 1
  }`;
}

module.exports = invoiceBuilder;
