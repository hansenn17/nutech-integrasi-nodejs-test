const InternalStatusCodeConstant = require("../common/constant/internal-status-code.constant");
const MessageConstant = require("../common/constant/message.constant");
const ApiResponse = require("../model/api-response.model");
const WalletService = require("../service/wallet.service");
const TransactionService = require("../service/transaction.service");

class TransactionController {
  walletService;
  transactionService;

  constructor() {
    this.transactionService = new TransactionService();
    this.walletService = new WalletService();
  }

  getWallet = async (req, res) => {
    const email = req.email;
    const wallet = await this.walletService.getWallet(email);
    const balance = wallet.balance;
    return res.json(
      ApiResponse.create(
        InternalStatusCodeConstant.SUCCESS_CODE,
        MessageConstant.GET_BALANCE_SUCCESS_MESSAGE,
        { balance: parseInt(balance) }
      )
    );
  };

  topUpBalance = async (req, res) => {
    try {
      const email = req.email;
      const topUpAmount = req.body.top_up_amount;
      const balance = await this.walletService.topUpBalance(email, topUpAmount);
      return res.json(
        ApiResponse.create(
          InternalStatusCodeConstant.SUCCESS_CODE,
          MessageConstant.TOP_UP_BALANCE_SUCCESS_MESSAGE,
          { balance: parseInt(balance) }
        )
      );
    } catch (error) {
      return res
        .status(400)
        .json(
          ApiResponse.create(
            InternalStatusCodeConstant.INVALID_PARAMETER_CODE,
            error.message
          )
        );
    }
  };

  transaction = async (req, res) => {
    try {
      const email = req.email;
      const transaction = await this.transactionService.createTransaction(
        email,
        req.body,
        "PAYMENT"
      );

      const {
        invoice_number,
        service_code,
        service_name,
        transaction_type,
        total_amount,
        created_on,
      } = transaction;

      return res.json(
        ApiResponse.create(
          InternalStatusCodeConstant.SUCCESS_CODE,
          MessageConstant.TRANSACTION_SUCCESS_MESSAGE,
          {
            invoice_number,
            service_code,
            service_name,
            transaction_type,
            total_amount: parseInt(total_amount),
            created_on,
          }
        )
      );
    } catch (error) {
      return res
        .status(400)
        .json(
          ApiResponse.create(
            InternalStatusCodeConstant.INVALID_PARAMETER_CODE,
            error.message
          )
        );
    }
  };

  getTransactionHistory = async (req, res) => {
    const email = req.email;
    const { offset, limit } = req.query;

    const transactions = await this.transactionService.getTransactions(
      email,
      offset,
      limit
    );

    return res.json(
      ApiResponse.create(
        InternalStatusCodeConstant.SUCCESS_CODE,
        MessageConstant.GET_HISTORY_SUCCESS,
        {
          offset: offset ?? 0,
          limit: limit ?? 0,
          records: [...transactions.rows],
        }
      )
    );
  };
}

module.exports = TransactionController;
