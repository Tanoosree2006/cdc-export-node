const express = require("express");
const router = express.Router();
const exportService = require("../services/exportService");

router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString()
  });
});

// FULL
router.post("/exports/full", async (req, res) => {
  const consumer = req.header("X-Consumer-ID");

  setImmediate(async () => {
    try {
      await exportService.fullExport(consumer);
    } catch (err) {
      console.error(err);
    }
  });

  res.status(202).json({
    jobId: "async",
    status: "started",
    exportType: "full"
  });
});

// INCREMENTAL
router.post("/exports/incremental", async (req, res) => {
  const consumer = req.header("X-Consumer-ID");

  setImmediate(() => exportService.exportIncremental(consumer));

  res.status(202).json({
    jobId: "async",
    status: "started",
    exportType: "incremental"
  });
});

// DELTA
router.post("/exports/delta", async (req, res) => {
  const consumer = req.header("X-Consumer-ID");

  setImmediate(async () => {
  try {
    await exportService.exportIncremental(consumer);
  } catch (e) {}
});

  res.status(202).json({
    jobId: "async",
    status: "started",
    exportType: "delta"
  });
});

// WATERMARK
router.get("/exports/watermark", async (req, res) => {
  const consumer = req.header("X-Consumer-ID");

  const wm = await exportService.getWatermark(consumer);

  if (!wm) return res.status(404).json({ error: "Not found" });

  res.json({
    consumerId: consumer,
    lastExportedAt: wm.last_exported_at
  });
});

module.exports = router;