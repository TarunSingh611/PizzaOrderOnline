// controllers/mongoController.js

const Pizza = require("../models/pizzaModel");

const pizzaData = [
  {
    name: "Margherita Classic",
    description: "Traditional Italian pizza with fresh tomatoes, mozzarella, basil, and extra virgin olive oil",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800",
  },
  {
    name: "Pepperoni Supreme",
    description: "Classic pepperoni pizza loaded with mozzarella cheese and signature tomato sauce",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800",
  },
  {
    name: "Vegetarian Delight",
    description: "Fresh bell peppers, mushrooms, onions, black olives, and tomatoes on a bed of cheese",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=800",
  },
  {
    name: "BBQ Chicken",
    description: "Grilled chicken, red onions, and cilantro with tangy BBQ sauce",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
  },
  {
    name: "Hawaiian Paradise",
    description: "Ham, pineapple, and extra mozzarella cheese with traditional tomato sauce",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
  },
  {
    name: "Meat Lovers",
    description: "Pepperoni, Italian sausage, bacon, ground beef, and ham with extra cheese",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=800",
  },
  {
    name: "Buffalo Chicken",
    description: "Spicy buffalo chicken, red onions, and ranch drizzle with mozzarella cheese",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1593246049226-ded77bf90326?w=800",
  },
  {
    name: "Mediterranean",
    description: "Feta cheese, black olives, sun-dried tomatoes, spinach, and Mediterranean herbs",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800",
  },
  {
    name: "Four Cheese",
    description: "Blend of mozzarella, cheddar, parmesan, and gorgonzola cheeses",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1548369937-47519962c11a?w=800",
  },
  {
    name: "Supreme",
    description: "Pepperoni, sausage, bell peppers, onions, mushrooms, and black olives",
    price: 17.99,
    image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=800",
  }
];

module.exports = {
  seedDatabase: async (req, res) => {
    try {
      // Clear existing pizzas
      await Pizza.deleteMany({});
      console.log("Cleared existing pizzas");

      // Insert new pizzas
      const seededPizzas = await Pizza.insertMany(pizzaData);
      console.log(`Seeded ${seededPizzas.length} pizzas`);

      return res.status(200).json({
        success: true,
        message: "Database seeded successfully",
        count: seededPizzas.length,
        data: seededPizzas
      });
    } catch (error) {
      console.error("Seeding error:", error);
      return res.status(500).json({
        success: false,
        message: "Error seeding database",
        error: error.message
      });
    }
  }
};