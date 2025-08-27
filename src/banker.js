class Banker {
  constructor(bank) {
    this.bank = bank;
  }

  viewTotalBalance() {
    const total = this.bank.getTotalBalance();
    return total;
  }

  viewAllTransactions() {
    const transactions = this.bank.transactions;
    return transactions;
  }
}

module.exports = { Banker };
