const axios = require("axios");
const CONFIG_URL = process.env.DRONE_CONFIG_URL;

async function getAllConfigs() {
  const res = await axios.get(CONFIG_URL);
  return res.data;
}

module.exports = { getAllConfigs };