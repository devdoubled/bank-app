# 🏦 Bank – Coding Challenge

## 🎯 Objective

- This project implements a simple banking system in JavaScript (Node.js) to showcase coding and design skills.
- All requirements are validated through automated tests.

## ✨ Features

### 👤 Customer

- Join the bank
- Deposit money
- Withdraw money (no overdrafts allowed)
- Check balance
- View personal transactions
- Transfer money to another customer (if sufficient funds)

### 👨‍💼 Bank Manager

- View total balance across all customers
- View all transactions

## 📂 Project Structure

```
bank-challenge/
│── src/
│   ├── common/                 # Shared helpers
│   │   ├── logger.js           # Centralized logger
│   │   ├── types.js            # Enum-like action types
│   │   └── utils.js            # Generic utilities
│   ├── bank.js                 # Bank entity, manages customers and global transactions
│   ├── banker.js               # Banker entity, view total balance & all transactions
│   ├── customer.js             # Customer entity, deposit/withdraw/transfer
│── tests/
│   └── bank.test.js            # Unit tests
│── demo.js                     # Example usage
│── package.json
│── package-lock.json
│── Dockerfile                  # Docker configuration for running app and tests
│── README.md                   # Project documentation

```

### 🧩 Design Choices

**Domain Layer**

- bank.js: Represents the Bank, manages customers and transactions.
- banker.js: Represents Bank employees handling operations.
- customer.js: Represents individual customers with balance and transaction history.

**Common Layer**

- logger.js: Centralized logging utility for consistent log outputs.
- types.js: Enum-like constants for transaction types (DEPOSIT, WITHDRAW, TRANSFER).
- utils.js: Shared helper functions for validations and formatting.

**Tests**

- Located in /tests for clean separation from source code.
- Covers deposit, withdraw, transfer, and validation rules.

**Dockerized**

- Multi-stage Dockerfile for separate test and run builds.
- Ensures consistent environment for development and CI/CD.

## 🚀 Getting Started

### ⚙️ Installation (Local)

`npm install`

**▶️ Run the App**

`node demo.js`

**🧪 Run Tests**

`npm test`

### 🐳 Run with Docker

**Build & Run Tests**

```
docker build -t bank-app-test --target test .
docker run --rm bank-app-test
```

**Build & Run App**

```
docker build -t bank-app-run --target run .
docker run --rm bank-app-run
```
