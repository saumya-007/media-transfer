const { workerData, parentPort } = require('worker_threads');
const { wait, splitArray } = require('../utils/helperFunctions');

(async () => {
  try {
    const {  } = workerData;
    // Sending data to parent thread
    parentPort.postMessage({  });
  } catch (error) {
    // Send an error message to the parent thread
    console.error(error);
    parentPort.postMessage({ error: error.message ? error.message : 'conversion process error' });
  }
})()