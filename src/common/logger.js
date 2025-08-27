const logInfo = (message, data = null) => {
  if (data !== null) {
    console.log(`[INFO]: ${message}`, data);
  } else {
    console.log(`[INFO]: ${message}`);
  }
};

const logError = (message, error = null) => {
  if (error) {
    console.error(`[ERROR]: ${message}`, error);
  } else {
    console.error(`[ERROR]: ${message}`);
  }
};

module.exports = { logInfo, logError };
