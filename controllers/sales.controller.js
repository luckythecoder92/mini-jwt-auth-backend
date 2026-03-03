const Sales = require("../models/sales.model");
const insertDummySales = async (req, res) => {
  try {
    await Sales.insertMany([
      { category: "Electronics", amount: 1000, status: "shipped" },
      { category: "Electronics", amount: 500, status: "shipped" },
      { category: "Clothing", amount: 700, status: "shipped" },
      { category: "Clothing", amount: 300, status: "pending" },
      { category: "Books", amount: 400, status: "shipped" },
    ]);

    res.json({ message: "Dummy sales data inserted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTotalSalesByCategory = async (req, res) => {
  try {
    const result = await Sales.aggregate([
      {
        $match: { status: "shipped" }
      },
      {
        $group: {
          _id: "$category",
          totalSales: { $sum: "$amount" }
        }
      },
      {
        $sort: { totalSales: -1 }
      }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {insertDummySales, getTotalSalesByCategory};