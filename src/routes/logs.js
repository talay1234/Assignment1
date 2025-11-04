const express = require("express");
const router = express.Router();
const { listLogs, createLog } = require("../services/droneLogService");

const mapLogFields = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }
  return items.map(item => ({
    drone_id: item.drone_id,
    drone_name: item.drone_name,
    created: item.created,
    country: item.country,
    celsius: item.celsius,
  }));
};

// GET /logs/:droneId
router.get("/:droneId", async (req, res) => {
  try {
    const { droneId } = req.params;
    let { page, perPage } = req.query;

    // ถ้าไม่ได้ใส่ page/perPage มา ใช้ค่ามาตรฐานตามโจทย์
    const isPagination = page || perPage;
    page = Math.max(1, parseInt(page, 10) || 1);
    perPage = Math.min(50, Math.max(1, parseInt(perPage, 10) || 12));

    // ดึงข้อมูลจาก Drone Log Server (เรียง created ใหม่สุดก่อน)
    const data = await listLogs({
      filter: `drone_id = ${droneId}`,
      sort: "-created",
      page,
      perPage,
    });

    const filteredItems = mapLogFields(data.items);

    // ถ้าไม่ขอ pagination → ตอบเฉพาะ array 12 รายการ
    if (!isPagination) {
      return res.json(filteredItems.slice(0, 12));
    }

    // ถ้าขอ pagination
    res.json({
      page: data.page,
      perPage: data.perPage,
      totalItems: data.totalItems,
      totalPages: data.totalPages,
      items: filteredItems,
    });
  } catch (err) {
    console.error("Error fetching logs:", err.message);
    res.status(500).json({ error: "Cannot fetch logs", detail: err.message });
  }
});

// POST /logs
router.post("/", async (req, res) => {
  try {
    const log = req.body;

    if (!log.drone_id || !log.drone_name || !log.country || typeof log.celsius === 'undefined') {
      return res.status(400).json({ 
        error: "Missing required log fields",
        required: ["drone_id", "drone_name", "country", "celsius"]
      });
    }

    // สร้าง payload ใหม่ที่มีเฉพาะฟิลด์ที่กำหนด 
    const payload = {
      drone_id: log.drone_id,
      drone_name: log.drone_name,
      country: log.country,
      celsius: log.celsius
    };

    const result = await createLog(payload);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error creating log:", err.message);
    res.status(500).json({ error: "Cannot create log", detail: err.message });
  }
});

module.exports = router;