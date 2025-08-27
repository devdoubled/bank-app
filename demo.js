const { Bank } = require("./src/bank.js");
const { Banker } = require("./src/banker.js");
const { logInfo, logError } = require("./src/common/logger.js");

const main = () => {
  try {
    logInfo("🏦 Starting STARACK Banking System...");

    // Create bank
    const bank = new Bank("STARACK BANK");
    logInfo(`Created bank: ${bank.name}`);

    // Add customers
    const customer1 = bank.addCustomer("Customer 1");
    const customer2 = bank.addCustomer("Customer 2");
    logInfo("Added customers: Customer 1 and Customer 2");

    // Create banker
    const banker = new Banker(bank);

    // Perform transactions
    customer1.deposit(500);
    customer2.deposit(300);
    logInfo("Deposited initial balances.");

    customer1.withdraw(100);
    logInfo("Customer 1 withdrew $100");

    customer1.transfer(customer2, 200);
    logInfo("Customer 1 transferred $200 to Customer 2");

    // Check balances
    logInfo(`Customer 1 balance: $${customer1.checkBalance()}`);
    logInfo(`Customer 2 balance: $${customer2.checkBalance()}`);

    // Banker reports
    logInfo(`Total Bank Balance: $${banker.viewTotalBalance()}`);
    logInfo("All Transactions:");
    console.log(banker.viewAllTransactions());
  } catch (err) {
    logError(`Error in demo: ${err.message}`);
  }
};

main();
