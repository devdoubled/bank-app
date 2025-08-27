const { Bank } = require("../src/bank.js");
const { Banker } = require("../src/banker.js");
const { logInfo } = require("../src/common/logger.js");

describe("STARACK Banking System", () => {
  let bank, customer1, customer2, banker;

  beforeEach(() => {
    bank = new Bank("STARACK BANK");
    customer1 = bank.addCustomer("Customer 1");
    customer2 = bank.addCustomer("Customer 2");
    banker = new Banker(bank);
  });

  // ----- Core features ------
  describe("Core features checks", () => {
    test("Customers join the bank", () => {
      logInfo("Customers join the bank", {
        customers: [customer1.name, customer2.name],
      });
      expect(bank.customers).toHaveLength(2);
      expect(customer1.balance).toBe(0);
      expect(customer2.balance).toBe(0);
    });

    test("Deposit money into customer account", () => {
      customer1.deposit(100);
      const balance = customer1.checkBalance();
      logInfo(
        `Deposit completed. Balance of ${customer1.name} after deposit: $${balance}`
      );
      expect(customer1.balance).toBe(100);
    });

    test("Withdraw money from customer", () => {
      customer1.deposit(200);
      customer1.withdraw(50);
      const balance = customer1.checkBalance();
      logInfo(
        `Withdraw completed. Balance of ${customer1.name} after withdraw: $${balance}`
      );
      expect(customer1.balance).toBe(150);
    });

    test("Transfer money between customers", () => {
      customer1.deposit(300);
      customer1.transfer(customer2, 100);
      logInfo(
        `Transfer completed. Balance of ${
          customer1.name
        } after transfer: $${customer1.checkBalance()}`
      );
      logInfo(
        `View transactions of ${customer1.name}`,
        customer1.viewTransactions()
      );
      logInfo(
        `Transfer completed. Balance of ${
          customer2.name
        } after transfer: $${customer2.checkBalance()}`
      );
      logInfo(
        `View transactions of ${customer2.name}`,
        customer2.viewTransactions()
      );
      expect(customer1.balance).toBe(200);
      expect(customer2.balance).toBe(100);
    });

    test("Check customer balance", () => {
      customer1.deposit(400);
      const balance = customer1.checkBalance();
      logInfo(`Check balance of ${customer1.name}: $${balance}`);
      expect(balance).toBe(400);
    });

    test("View customer transactions", () => {
      customer1.deposit(200);
      customer1.withdraw(50);
      const txns = customer1.viewTransactions();
      logInfo(`View transactions of ${customer1.name}`, txns);
      expect(txns).toHaveLength(2);
    });

    test("Banker views total balance", () => {
      customer1.deposit(200);
      customer2.deposit(300);
      const total = banker.viewTotalBalance();
      logInfo(`Bank Manager view total balance of ${bank.name}: $${total}`);
      expect(total).toBe(500);
    });

    test("Banker views all transactions", () => {
      customer1.deposit(200);
      customer2.deposit(100);
      const txns = banker.viewAllTransactions();
      logInfo("Bank Manager see all bank transactions:", txns);
      expect(txns).toHaveLength(2);
    });
  });

  // --- Validation checks ---

  describe("Validation checks", () => {
    //Deposit validation
    test("Deposit should fail with negative amount", () => {
      expect(() => {
        customer1.deposit(-100);
      }).toThrow("Deposit amount must be positive");
    });

    test("Deposit should fail with zero amount", () => {
      expect(() => {
        customer1.deposit(0);
      }).toThrow("Deposit amount must be positive");
    });

    //Withdraw validation
    test("Withdraw should fail with negative amount", () => {
      customer1.deposit(100);
      expect(() => {
        customer1.withdraw(-50);
      }).toThrow("Withdraw amount must be positive");
    });

    test("Withdraw should fail with zero amount", () => {
      customer1.deposit(50);
      expect(() => {
        customer1.withdraw(0);
      }).toThrow("Withdraw amount must be positive");
    });

    test("Withdraw should fail when exceeding balance", () => {
      customer1.deposit(50);
      expect(() => {
        customer1.withdraw(100);
      }).toThrow("Not enough funds");
    });

    //Transfer validation
    test("Transfer should fail to self", () => {
      customer1.deposit(100);
      expect(() => {
        customer1.transfer(customer1, 50);
      }).toThrow("Cannot transfer to yourself");
    });

    test("Transfer should fail with negative amount", () => {
      customer1.deposit(100);
      expect(() => {
        customer1.transfer(customer2, -20);
      }).toThrow("Transfer amount must be positive");
    });

    test("Transfer should fail with zero amount", () => {
      customer1.deposit(100);
      expect(() => {
        customer1.transfer(customer2, 0);
      }).toThrow("Transfer amount must be positive");
    });

    test("Transfer should fail when exceeding balance", () => {
      customer1.deposit(50);
      expect(() => {
        customer1.transfer(customer2, 100);
      }).toThrow("Not enough funds");
    });
  });
});
