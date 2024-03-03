const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors())
const api = (db) => {
  // GET list of orders
  /**
   * @api {get} /orders Get list of orders
   * @apiName GetOrders
   * @apiGroup Orders
   *
   * @apiSuccess {Object[]} orders List of orders.
   */
  app.get("/orders", async (req, res) => {
    try {
      const orders = await db.getOrders();
      res.status(200).json(orders);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Create order
  /**
   * @api {post} /orders Create order
   * @apiName CreateOrder
   * @apiGroup Orders
   *
   * @apiParam {Number} productId Product ID.
   * @apiParam {Number} quantity Quantity of the product.
   * @apiParam {String} status Order status.
   *
   * @apiSuccess {String} message Success message.
   * @apiSuccess {Number} orderId ID of the created order.
   */
  app.post("/orders", async (req, res) => {
    const { productId, quantity, status } = req.body;
    console.log(req.body);
    try {
      const response = await db.createOrder({ productId, quantity, status });
      res.json(response);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  // Remove an order

  /**
   * @api {delete} /orders/:orderId Remove an order
   * @apiName RemoveOrder
   * @apiGroup Orders
   *
   * @apiParam {Number} orderId Order ID.
   *
   * @apiSuccess {String} message Success message.
   */
  app.delete("/orders/:orderId", async (req, res) => {
    try {
      const { orderId } = req.params;
      const response=  await db.deleteOrder(orderId);
      res.json(response);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  });
  // GET list of products
  /**
   * @api {get} /products Get list of products
   * @apiName GetProducts
   * @apiGroup Products
   *
   * @apiSuccess {Object[]} products List of products.
   */
  app.get("/products", async (req, res) => {
    try {
      const products = await db.getAllProducts();
      res.json(products);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  });

  // Add product
  /**
   * @api {post} /products Add product
   * @apiName AddProduct
   * @apiGroup Products
   *
   * @apiParam {String} name Product name.
   * @apiParam {String} description Product description.
   * @apiParam {Number} price Product price.
   * @apiParam {Number} manufacturerId ID of the manufacturer.
   *
   * @apiSuccess {String} message Success message.
   * @apiSuccess {Number} productId ID of the added product.
   */
  app.post("/products", async (req, res) => {
    const { name, description, price, manufacturerId } = req.body;
    try {
      const productId = await db.addProduct(
        name,
        description,
        price,
        manufacturerId
      );
      console.log({ message: "Product added successfully", productId })
      res.json({ message: "Product added successfully", productId });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  });
  // Edit product
  /**
   * @api {put} /products/:productId Edit product
   * @apiName EditProduct
   * @apiGroup Products
   *
   * @apiParam {Number} productId Product ID.
   * @apiParam {String} name Product name.
   * @apiParam {String} description Product description.
   * @apiParam {Number} price Product price.
   * @apiParam {Number} manufacturerId ID of the manufacturer.
   *
   * @apiSuccess {String} message Success message.
   */
  app.put("/products/:productId", async (req, res) => {
    const { productId } = req.params;
    const { name, description, price, manufacturerId } = req.body;
    try {
      const response=await db.updateProduct(
        productId,
        name,
        description,
        price,
        manufacturerId
      );
      if(response){

        res.json({
          message: `Product with ID ${productId} updated successfully`,
        });
      }else{
        res.status(400).json({message:`Error Updating`})
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  });
  // get single product

  /**
   * @api {get} /products/:productId Get single product
   * @apiName GetSingleProduct
   * @apiGroup Products
   *
   * @apiParam {Number} productId Product ID.
   *
   * @apiSuccess {Object} product Single product object.
   */
  app.get("/products/:productId", async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await db.getProductById(productId);
      if (!product) {
        res
          .status(404)
          .json({ error: `Product with ID ${productId} not found` });
      } else {
        res.json(product);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  });

  // GET list of manufacturers
  /**
   * @api {get} /manufacturers Get list of manufacturers
   * @apiName GetManufacturers
   * @apiGroup Manufacturers
   *
   * @apiSuccess {Object[]} Manufacturers List of Manufacturers.
   */
  app.get("/manufacturers", async (req, res) => {
    try {
      const manufacturers = await db.getAllManufacturers();
      res.json(manufacturers);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  });
  return app;
};

module.exports = api;
