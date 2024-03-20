const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
const api = (db) => {
  // GET list of all products
  /**
   * @api {get} /products Get list of all products
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

  // GET details of a specific product by ID
  /**
   * @api {get} /products/:id Get details of a specific product by ID
   * @apiName GetProductById
   * @apiGroup Products
   *
   * @apiParam {Number} id Product ID
   *
   * @apiSuccess {Object} product Details of the specified product.
   */
  app.get("/products/:id", async (req, res) => {
    const productId = req.params.id;
    try {
      const product = await db.getProductById(productId);
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  });

  // POST add a new product
  /**
   * @api {post} /products Add a new product
   * @apiName AddProduct
   * @apiGroup Products
   *
   * @apiParam {String} name Product name
   * @apiParam {String} description Product description
   * @apiParam {String} category Product category
   * @apiParam {Number} price Product price
   *
   * @apiSuccess {Number} id ID of the added product.
   */
  app.post("/products", async (req, res) => {
    const { name, description, category, price } = req.body;
    console.log(req.body)
    try {
      const newProductId = await db.addProduct(
        name,
        description,
        price,
        category,
      );
      res.json({ id: newProductId });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  });

  // PUT update details of a product
  /**
   * @api {put} /products/:id Update details of a product
   * @apiName UpdateProduct
   * @apiGroup Products
   *
   * @apiParam {Number} id Product ID
   * @apiParam {String} name Product name
   * @apiParam {String} description Product description
   * @apiParam {String} category Product category
   * @apiParam {Number} price Product price
   *
   * @apiSuccess {String} message Success message.
   */
  app.put("/products/:id", async (req, res) => {
    const productId = req.params.id;
    const { name, description, category, price } = req.body;
    try {
      const message = await db.updateProduct(
        productId,
        name,
        description,
        price,
        category,
      );
      res.json({ message });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  });

  // DELETE remove a product
  /**
   * @api {delete} /products/:id Remove a product
   * @apiName RemoveProduct
   * @apiGroup Products
   *
   * @apiParam {Number} id Product ID
   *
   * @apiSuccess {String} message Success message.
   */
  app.delete("/products/:id", async (req, res) => {
    const productId = req.params.id;
    try {
      const message = await db.deleteProductById(productId);
      res.json({ message });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  });

  // GET list of all inventory items
  /**
   * @api {get} /inventory Get list of all inventory items
   * @apiName GetInventory
   * @apiGroup Inventory
   *
   * @apiSuccess {Object[]} inventory List of inventory items.
   */
  app.get("/inventory", async (req, res) => {
    try {
      const inventory = await db.getAllInventory();
      res.json(inventory);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  });

  // GET inventory status for a specific product by ID
  /**
   * @api {get} /inventory/:id Get inventory status for a specific product by ID
   * @apiName GetInventoryStatusById
   * @apiGroup Inventory
   *
   * @apiParam {Number} id Product ID
   *
   * @apiSuccess {Object} inventory Inventory status for the specified product.
   */
  app.get("/inventory/:id", async (req, res) => {
    const productId = req.params.id;
    try {
      const inventoryStatus = await db.getInventoryStatusById(productId);
      res.json(inventoryStatus);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  });

  // POST add inventory for a specific product
  /**
   * @api {post} /inventory Add inventory for a specific product
   * @apiName AddInventory
   * @apiGroup Inventory
   *
   * @apiParam {Number} productId Product ID
   * @apiParam {Number} locationId Location ID
   * @apiParam {Number} quantity Quantity to add
   *
   * @apiSuccess {Number} id ID of the added inventory item.
   */
  app.post("/inventory", async (req, res) => {
    const { productId, locationId, quantity } = req.body;
    try {
      const newInventoryId = await db.addInventory(
        productId,
        locationId,
        quantity
      );
      res.json({ id: newInventoryId });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  });

  // PUT update inventory for a specific product
  /**
   * @api {put} /inventory/:id Update inventory for a specific product
   * @apiName UpdateInventory
   * @apiGroup Inventory
   *
   * @apiParam {Number} id Product ID
   * @apiParam {Number} quantity New quantity
   *
   * @apiSuccess {String} message Success message.
   */
  app.put("/inventory/:id", async (req, res) => {
    const inventoryId = req.params.id;
    const newQuantity = req.body.quantity;
    try {
      const message = await db.updateInventory(inventoryId, newQuantity);
      res.json({ message });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  });

  // DELETE remove inventory for a specific product
  /**
   * @api {delete} /inventory/:id Remove inventory for a specific product
   * @apiName RemoveInventory
   * @apiGroup Inventory
   *
   * @apiParam {Number} id Product ID
   *
   * @apiSuccess {String} message Success message.
   */
  app.delete("/inventory/:id", async (req, res) => {
    const productId = req.params.id;
    try {
      const message = await db.removeInventory(productId);
      res.json({ message });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  });
  // GET list of all locations
  /**
   * @api {get} /locations Get list of all locations
   * @apiName GetLocations
   * @apiGroup Locations
   *
   * @apiSuccess {Object[]} locations List of locations.
   */
  app.get("/locations", async (req, res) => {
    try {
      const locations = await db.getAllLocations();
      res.json(locations);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  });

  // GET details of a specific location by ID
  /**
   * @api {get} /locations/:id Get details of a specific location by ID
   * @apiName GetLocationById
   * @apiGroup Locations
   *
   * @apiParam {Number} id Location ID
   *
   * @apiSuccess {Object} location Details of the specified location.
   */
  app.get("/locations/:id", async (req, res) => {
    const locationId = req.params.id;
    try {
      const location = await db.getLocationById(locationId);
      res.json(location);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  });

  // POST add a new location
  /**
   * @api {post} /locations Add a new location
   * @apiName AddLocation
   * @apiGroup Locations
   *
   * @apiParam {String} name Location name
   * @apiParam {String} description Location description
   *
   * @apiSuccess {Number} id ID of the added location.
   */
  app.post("/locations", async (req, res) => {
    const { name, description } = req.body;
    try {
      const newLocationId = await db.addLocation(name, description);
      res.json({ id: newLocationId });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  });

  // PUT update details of a location
  /**
   * @api {put} /locations/:id Update details of a location
   * @apiName UpdateLocation
   * @apiGroup Locations
   *
   * @apiParam {Number} id Location ID
   * @apiParam {String} name New location name
   * @apiParam {String} description New location description
   *
   * @apiSuccess {String} message Success message.
   */
  app.put("/locations/:id", async (req, res) => {
    const locationId = req.params.id;
    const { name, description } = req.body;
    try {
      const message = await db.updateLocation(locationId, name, description);
      res.json({ message });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  });

  // DELETE remove a location
  /**
   * @api {delete} /locations/:id Remove a location
   * @apiName RemoveLocation
   * @apiGroup Locations
   *
   * @apiParam {Number} id Location ID
   *
   * @apiSuccess {String} message Success message.
   */
  app.delete("/locations/:id", async (req, res) => {
    const locationId = req.params.id;
    try {
      const message = await db.removeLocation(locationId);
      res.json({ message });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  });
  return app;
};

module.exports = api;
