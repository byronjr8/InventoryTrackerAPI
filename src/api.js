const express = require('express');
const app= express();
// const db = require('./db');

// GET list of orders
/**
 * @api {get} /api/orders Get list of orders
 * @apiName GetOrders
 * @apiGroup Orders
 *
 * @apiSuccess {Object[]} orders List of orders.
 */
// app.get('/orders', (req, res) => {
//     db.all("SELECT * FROM 'order'", (err, orders) => {
//         if (err) {
//             console.error(err.message);
//             res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             res.json(orders);
//         }
//     });
// });
const api=(db)=>{

    app.get('/orders', async (req, res) => {
    
        try{
           const orders =await db.getOrders()
            res.status(200).json(orders);
        }catch(err){
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }  
    });
    

    return app
}


// Create order
/**
 * @api {post} /api/orders Create order
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
app.post('/orders', (req, res) => {
    const { productId, quantity, status } = req.body;
    db.run(`INSERT INTO "order" (productId, quantity, status) VALUES (?, ?, ?)`, [productId, quantity, status], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ message: 'Order created successfully', orderId: this.lastID });
        }
    });
});

// Remove an order

/**
 * @api {delete} /api/orders/:orderId Remove an order
 * @apiName RemoveOrder
 * @apiGroup Orders
 *
 * @apiParam {Number} orderId Order ID.
 *
 * @apiSuccess {String} message Success message.
 */
app.delete('/orders/:orderId', (req, res) => {
    const { orderId } = req.params;
    db.run(`DELETE FROM "order" WHERE id = ?`, [orderId], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ message: `Order with ID ${orderId} deleted successfully` });
        }
    });
});

// GET list of products
/**
 * @api {get} /api/products Get list of products
 * @apiName GetProducts
 * @apiGroup Products
 *
 * @apiSuccess {Object[]} products List of products.
 */
app.get('/products', (req, res) => {
    db.all("SELECT * FROM product", (err, products) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(products);
        }
    });
});

// Add product
/**
 * @api {post} /api/products Add product
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
app.post('/products', (req, res) => {
    const { name, description, price, manufacturerId } = req.body;
    db.run(`INSERT INTO product (name, description, price, manufacturerId) VALUES (?, ?, ?, ?)`, [name, description, price, manufacturerId], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ message: 'Product added successfully', productId: this.lastID });
        }
    });
});
// get single product

/**
 * @api {get} /api/products/:productId Get single product
 * @apiName GetSingleProduct
 * @apiGroup Products
 *
 * @apiParam {Number} productId Product ID.
 *
 * @apiSuccess {Object} product Single product object.
 */
app.get('/products/:productId', (req, res) => {
    const { productId } = req.params;
    db.get("SELECT * FROM product WHERE id = ?", [productId], (err, product) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (!product) {
            res.status(404).json({ error: `Product with ID ${productId} not found` });
        } else {
            res.json(product);
        }
    });
});
// Edit product
/**
 * @api {put} /api/products/:productId Edit product
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
app.put('/products/:productId', (req, res) => {
    const { productId } = req.params;
    const { name, description, price, manufacturerId } = req.body;
    db.run(`UPDATE product SET name = ?, description = ?, price = ?, manufacturerId = ? WHERE id = ?`, [name, description, price, manufacturerId, productId], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ message: `Product with ID ${productId} updated successfully` });
        }
    });
});

// GET list of manufacturers
/**
 * @api {get} /api/manufacturers Get list of manufacturers
 * @apiName GetManufacturers
 * @apiGroup Manufacturers
 *
 * @apiSuccess {Object[]} Manufacturers List of Manufacturers.
 */
app.get('/manufacturers', (req, res) => {
    db.all("SELECT * FROM manufacturer", (err, manufacturers) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(manufacturers);
        }
    });
});

module.exports = api;
