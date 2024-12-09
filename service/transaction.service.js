const invoiceBuilder = require("../common/util/invoice-builder.util");
const transactionDto = require("../dto/transaction/transaction.dto");
const MessageConstant = require("../common/constant/message.constant");
const TransactionRepository = require("../repository/transaction.repository");
const ServicesService = require("./services.service");
const WalletService = require("./wallet.service");

class TransactionService {
  transactionRepository;
  servicesService;
  walletService;

  constructor() {
    this.transactionRepository = new TransactionRepository();
    this.servicesService = new ServicesService();
    this.walletService = new WalletService();
  }

  async createTransaction(email, payload, transactionType) {
    try {
      await transactionDto.validate(payload);

      const { service_code } = payload;
      const service = await this.servicesService.getServiceByCode(service_code);
      const wallet = await this.walletService.getWallet(email);
      const { id, balance } = wallet;

      if (parseInt(balance) < parseInt(service.amount)) {
        throw new Error(MessageConstant.INSUFFICIENT_BALANCE);
      }

      const invoiceNumber = await invoiceBuilder();
      const result = await this.transactionRepository.createTransaction(
        invoiceNumber,
        id,
        service_code,
        transactionType,
        service.amount
      );
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getTransactions(email, offset, limit) {
    const wallet = await this.walletService.getWallet(email);
    const transactions = await this.transactionRepository.getTransactions(
      wallet.id,
      offset,
      limit
    );
    return transactions;
  }
}

module.exports = TransactionService;
