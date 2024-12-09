const express = require("express");

const TransactionController = require("../controller/transaction.controller");
const auth = require("../middleware/auth.middleware");

const router = express.Router();
const transcationController = new TransactionController();

router.get("/balance", auth, transcationController.getWallet);
router.post("/topup", auth, transcationController.topUpBalance);
router.post("/transaction", auth, transcationController.transaction);
router.get(
  "/transaction/history",
  auth,
  transcationController.getTransactionHistory
);

module.exports = router;
