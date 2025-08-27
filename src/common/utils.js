const logTransaction = (type, amount, from, to = null) => {
  return {
    type,
    amount,
    from,
    to,
    date: new Date().toISOString(),
  };
};

module.exports = { logTransaction };
