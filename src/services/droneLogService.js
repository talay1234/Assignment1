const axios = require("axios");

const LOG_URL = process.env.LOG_URL;
const TOKEN = process.env.LOG_API_TOKEN;

async function listLogs(params = {}) {
  const res = await axios.get(LOG_URL, {
    params,
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return res.data;
}

async function createLog(payload) {
  const res = await axios.post(LOG_URL, payload, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
}

module.exports = { listLogs, createLog };
