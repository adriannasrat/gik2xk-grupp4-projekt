const sequelize = require("./config/database");
const { User, Product, Cart, CartRow, Rating } = require("./models");

(async () => {
  try {
    console.log("Migrating database...");

    await Rating.drop();
    await CartRow.drop();
    await Cart.drop();
    await Product.drop();
    await User.drop();

    // Sync tables in the correct order (drop & recreate them)
    await User.sync({ force: true });
    await Product.sync({ force: true });
    await Cart.sync({ force: true });
    await CartRow.sync({ force: true });
    await Rating.sync({ force: true });

    // Insert initial products
    await Product.bulkCreate([
      {
        title: "Rose",
        description: "A classic red rose, symbol of love.",
        price: 40,
        imageUrl: "http://localhost:3001/images/rose.jpg",
        stock_quantity: 5,
      },
      {
        title: "Tulip",
        description: "Colorful spring tulips in bloom.",
        price: 30,
        imageUrl: "http://localhost:3001/images/tulip.jpg",
        stock_quantity: 5,
      },
      {
        title: "Sunflower",
        description: "Bright and cheerful sunflowers.",
        price: 35,
        imageUrl: "http://localhost:3001/images/sunflower.jpg",
        stock_quantity: 5,
      },
    ]);

    console.log("Database migrated and products inserted!");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    console.error(error);
    process.exit(1);
  }
})();
