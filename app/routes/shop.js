const express = require("express");
const router = express.Router();
const {
  createItem,
  deleteItem,
  getAllItems,
  getItemById,
  updateItem,
} = require("../controllers/shopitems");
const { isAdmin, isUserLoggedIn } = require("../middlewares");

router.post("/add-item", isUserLoggedIn, isAdmin, createItem);
router.get("/items", isUserLoggedIn, getAllItems);
router.get("/item/:id", isUserLoggedIn, getItemById);
router.patch("/item/:id", isUserLoggedIn, isAdmin, updateItem);
router.delete("/item/:id", isUserLoggedIn, isAdmin, deleteItem);

module.exports = router;
