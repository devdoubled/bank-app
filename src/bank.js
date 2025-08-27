const { Customer } = require("./customer.js");

class Bank {
  constructor(name) {
    this.name = name.trim();
    this.customers = [];
    this.transactions = [];
  }

  addCustomer(name) {
    if (!name || typeof name !== "string") {
      throw new Error("Customer name must be a non-empty string");
    }

    const customer = new Customer(name, this);
    this.customers.push(customer);
    return customer;
  }

  getTotalBalance() {
    return this.customers.reduce((sum, c) => sum + c.balance, 0);
  }
}

module.exports = { Bank };
