const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controller/productController");
const router = express.Router();
router.route("/all").get(getAllProducts);
router.route("/new").post(createProduct);
router.route("/update/:id").put(updateProduct);
router.route("/delete/:id").delete(deleteProduct);
router.route("/getsingle/:id").get(getProductDetails);
module.exports = router;
