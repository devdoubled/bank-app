const { v4: uuidv4 } = require("uuid");
const { TRANSACTION_TYPES } = require("./common/types.js");
const { logTransaction } = require("./common/utils.js");
class Customer {
  constructor(name, bank) {
    this.id = uuidv4();
    this.name = name.trim();
    this.balance = 0;
    this.transactions = [];
    this.bank = bank;
  }

  deposit(amount) {
    if (typeof amount !== "number" || isNaN(amount)) {
      throw new Error("Deposit amount must be a number");
    }
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive");
    }
    this.balance += amount;

    const txn = logTransaction(TRANSACTION_TYPES.DEPOSIT, amount, this.name);
    this.transactions.push(txn);
    this.bank.transactions.push(txn);
    return this.balance;
  }

  withdraw(amount) {
    if (typeof amount !== "number" || isNaN(amount)) {
      throw new Error("Withdraw amount must be a number");
    }
    if (amount <= 0) {
      throw new Error("Withdraw amount must be positive");
    }
    if (amount > this.balance) {
      throw new Error("Not enough funds");
    }

    this.balance -= amount;

    const txn = logTransaction(TRANSACTION_TYPES.WITHDRAW, amount, this.name);
    this.transactions.push(txn);
    this.bank.transactions.push(txn);
    return this.balance;
  }

  transfer(toCustomer, amount) {
    if (toCustomer.id === this.id) {
      throw new Error("Cannot transfer to yourself");
    }
    if (typeof amount !== "number" || isNaN(amount)) {
      throw new Error("Transfer amount must be a number");
    }
    if (amount <= 0) {
      throw new Error("Transfer amount must be positive");
    }
    if (amount > this.balance) {
      throw new Error("Not enough funds");
    }

    this.balance -= amount;
    toCustomer.balance += amount;

    const txn = logTransaction(
      TRANSACTION_TYPES.TRANSFER,
      amount,
      this.name,
      toCustomer.name
    );
    this.transactions.push(txn);
    toCustomer.transactions.push(txn);
    this.bank.transactions.push(txn);
    return this.balance;
  }

  checkBalance() {
    return this.balance;
  }

  viewTransactions() {
    return this.transactions;
  }
}

module.exports = { Customer };
