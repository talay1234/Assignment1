const express = require("express");
const router = express.Router();
const { getAllConfigs } = require("../services/droneConfigService");

router.get("/:droneId", async (req, res) => {
  try {
    const { droneId } = req.params;
    const all = await getAllConfigs();
    const data = all.data;
    const cfg = data.find((c) => c.drone_id == droneId);

    if (!cfg) return res.status(404).json({ error: "Drone not found" });

    res.json({
      drone_id: cfg.drone_id,
      drone_name: cfg.drone_name,
      light: cfg.light,
      country: cfg.country,
      weight: cfg.weight,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

module.exports = router;
