const express = require("express");
const router = express.Router();
const {
  getVendors,
  updateVendor,
  deleteVendor,
} = require("../controllers/vendorController");

router.get("/", getVendors);
router.put("/:id", updateVendor);
router.delete("/:id", deleteVendor);

module.exports = router;
