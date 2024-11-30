const Pizza = require("../models/pizzaModel");

module.exports = {
  getPizzas: async (req, res) => {
    try {
      const { price = [0, 1000], search = "" } = req.body;

      // Log the received parameters
      console.log("Received parameters:", { price, search });

      // Build query object
      let query = {};

      // Add price filter if price array is provided
      if (Array.isArray(price) && price.length === 2) {
        query.price = { 
          $gte: Number(price[0]), 
          $lte: Number(price[1]) 
        };
      }

      // Add search filter if search string is provided
      if (search) {
        query.name = { $regex: search, $options: "i" };
      }

      // Log the final query
      console.log("Query:", query);

      // Execute query
      const pizzas = await Pizza.find(query);

      // Log the results
      console.log("Found pizzas:", pizzas.length);

      return res.json(pizzas);
    } catch (err) {
      console.log("Error:", err.message);
      return res.status(500).json({ 
        success: false, 
        msg: err.message 
      });
    }
  },
};