const topUpBalanceDto = require("../dto/transaction/top-up-balance.dto");
const WalletRepository = require("../repository/wallet.repository");

class WalletService {
  walletRepository;

  constructor() {
    this.walletRepository = new WalletRepository();
  }

  async createWallet(userId) {
    const result = await this.walletRepository.create(userId);
    return result;
  }

  async getWallet(email) {
    const wallet = await this.walletRepository.findByEmail(email);
    return wallet;
  }

  async topUpBalance(email, amount) {
    try {
      await topUpBalanceDto.validate({ amount });
      const result = await this.walletRepository.updateBalance(amount, email);
      return result.balance;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = WalletService;
