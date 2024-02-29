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
        db.all("SELECT * FROM 'order'", (err, orders) => {
            if (err) {
                reject(err);
            } else {
                resolve(orders);
            }
        });
    });
};



module.exports = {getOrders};
