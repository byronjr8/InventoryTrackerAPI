const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('../Database/InvoTrack');


db.run(`CREATE TABLE IF NOT EXISTS manufacturer (
	"id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"name"	TEXT,
	"city"	TEXT,
	"address"	TEXT,
	"contactName"	TEXT,
	"email"	TEXT,
	"phoneNumber"	TEXT
);`)

//Create product table
db.run(`CREATE TABLE IF NOT EXISTS product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    manufacturerId INTEGER,
    FOREIGN KEY (manufacturerId) REFERENCES manufacturer(id)
)`);

// // Create order table
db.run(`CREATE TABLE IF NOT EXISTS "order" (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productId INTEGER,
    quantity INTEGER NOT NULL,
    status TEXT,
    orderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (productId) REFERENCES product(id)
)`);

//Insert sample records into the manufacturer table
// for (let i = 1; i <= 10; i++) {
//     db.run(`INSERT INTO manufacturer (name, city, address, contactName, email, phoneNumber) 
//             VALUES ('Manufacturer ${i}', 'City ${i}', 'Address ${i}', 'Contact Name ${i}', 'email${i}@example.com', '123456789${i}')`);
// }

// // Insert sample records into the product table
// for (let i = 1; i <= 10; i++) {
//     db.run(`INSERT INTO product (name, description, price, manufacturerId) 
//             VALUES ('Product ${i}', 'Description for Product ${i}', ${10.99 * i}, ${i})`);
// }

// // Insert sample records into the order table
// for (let i = 1; i <= 10; i++) {
//     db.run(`INSERT INTO "order" (productId, quantity, status) 
//             VALUES (${i}, ${i * 2}, 'Pending')`);
// }

const getOrders = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT o.id, o.quantity, o.status, o.orderDate, p.name As productName, p.description, (p.price * o.quantity) As totalPrice, m.name As manufacturerName FROM 'order' o Join product p ON o.productId=p.id Join manufacturer m ON p.manufacturerId = m.id", (err, orders) => {
            if (err) {
                reject(err);
            } else {
                resolve(orders);
            }
        });
    });
};
const createOrder = ({ productId, quantity, status }) => {
    console.log({ productId, quantity, status })
    return new Promise(async (resolve, reject) => {
        const product= await getProductById(productId)
        if(quantity > product.quantity){
            reject(new Error('Quantity not available'));
        }
        else{
            db.run(`UPDATE product SET quantity= ?`, [product.quantity-quantity])

            db.run(`INSERT INTO "order" (productId, quantity, status) VALUES (?, ?, ?)`, [productId, quantity, status], function (err) {
                if (err) {
                    reject(new Error('Internal Server Error'));
                } else {
                    resolve({ message: `Order created successfully` });
                }
            });
        }
    });
};


const deleteOrder = (orderId) => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM "order" WHERE id = ?`, [orderId], function (err) {
            if (err) {
                reject(new Error('Internal Server Error'));
            } else {
                resolve({ message: `Order with ID ${orderId} deleted successfully` });
            }
        });
    });
};

const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT p.id, p.name, p.description, p.price, p.manufacturerId, m.name AS manufacturerName FROM product p JOIN manufacturer m ON p.manufacturerId=m.id", (err, products) => {
            if (err) {
                reject(new Error('Internal Server Error'));
            } else {
                resolve(products);
            }
        });
    });
};

const addProduct = (name, description, price, manufacturerId) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO product (name, description, price, manufacturerId) VALUES (?, ?, ?, ?)`, [name, description, price, manufacturerId], function (err) {
            if (err) {
                reject(new Error('Internal Server Error'));
            } else {
                resolve(this.lastID);
            }
        });
    });
};

const updateProduct = (productId, name, description, price, manufacturerId) => {
    return new Promise((resolve, reject) => {
        db.run(`UPDATE product SET name = ?, description = ?, price = ?, manufacturerId = ? WHERE id = ?`, [name, description, price, manufacturerId, productId], function (err) {
            if (err) {
                reject(new Error('Internal Server Error'));
            } else {
                resolve(true);
            }
        });
    });
};

const getProductById = (productId) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM product WHERE id = ?", [productId], (err, product) => {
            if (err) {
                reject(new Error('Internal Server Error'));
            } else if (!product) {
                reject(new Error(`Product with ID ${productId} not found`));
            } else {
                resolve(product);
            }
        });
    });
};

const getAllManufacturers = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT m.id, m.name, m.city, m.address, m.contactName, m.email, m.phoneNumber,  COUNT(p.name) AS noOfProduct  FROM manufacturer m JOIN product p ON m.id = p.manufacturerId GROUP BY m.id, m.name, m.city, m.address, m.contactName, m.email, m.phoneNumber", (err, manufacturers) => {
            if (err) {
                reject(new Error('Internal Server Error'));
            } else {
                resolve(manufacturers);
            }
        });
    });
};



module.exports = {getOrders, createOrder, deleteOrder,getAllProducts, addProduct, updateProduct,getProductById, getAllManufacturers};
