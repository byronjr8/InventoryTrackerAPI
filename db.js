const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./Database/InvoTrack", (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Connected to database");
  }
});
db.serialize(() => {
db.run(`CREATE TABLE IF NOT EXISTS location (
	"id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"name"	TEXT,
	"description"	TEXT
);`);

//Create product table
db.run(`CREATE TABLE IF NOT EXISTS product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    price REAL NOT NULL
)`);


// // Create order table
db.run(`CREATE TABLE IF NOT EXISTS "inventory" (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productId INTEGER,
    locationId INTEGER,
    quantity INTEGER NOT NULL,
    lastUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (productId) REFERENCES product(id),
    FOREIGN KEY (locationId) REFERENCES location(id)
)`);


// db.run(`INSERT INTO location (name, description) VALUES
//     ('Warehouse A', 'Main warehouse located in downtown'),
//     ('Warehouse B', 'Secondary warehouse located in suburbs'),
//     ('Storefront 1', 'Primary storefront in city center'),
//     ('Storefront 2', 'Secondary storefront in residential area')
// `);

// db.run(`INSERT INTO product (name, description, category, price) VALUES
// ('Laptop', 'High-performance laptop for professionals', 'Electronics', 999.99),
// ('Smartphone', 'Latest smartphone with advanced features', 'Electronics', 699.99),
// ('Chair', 'Ergonomic office chair for long hours of work', 'Furniture', 149.99),
// ('Coffee Table', 'Modern coffee table for living room', 'Furniture', 249.99),
// ('TV', 'Ultra HD TV for home entertainment', 'Electronics', 1299.99),
// ('Sofa', 'Comfortable sofa for your living room', 'Furniture', 799.99),
// ('Refrigerator', 'Large capacity refrigerator for storing food', 'Appliances', 999.99),
// ('Microwave Oven', 'Convenient microwave oven for quick cooking', 'Appliances', 149.99),
// ('Vacuum Cleaner', 'Powerful vacuum cleaner for cleaning floors', 'Appliances', 199.99),
// ('Bed', 'Cozy bed for a good nights sleep', 'Furniture', 499.99),
// ('Toaster', 'Stylish toaster for making breakfast', 'Appliances', 39.99),
// ('Blender', 'Versatile blender for preparing smoothies and soups', 'Appliances', 69.99),
// ('Dining Table', 'Elegant dining table for family gatherings', 'Furniture', 349.99),
// ('Washing Machine', 'Efficient washing machine for laundry', 'Appliances', 799.99)

// `);
// db.run(`INSERT INTO inventory (productId, locationId, quantity) VALUES
// (1, 1, 50),
// (2, 1, 3),
// (3, 2, 20),
// (4, 2, 15),
// (5, 1, 10),
// (6, 1, 5),
// (7, 2, 25),
// (8, 2, 15),
// (9, 1, 20),
// (10, 2, 10),
// (11, 1, 15),
// (12, 2, 8),
// (13, 1, 12),
// (14, 1, 5),
// (15, 2, 18),
// (16, 2, 10),
// (17, 1, 25),
// (18, 1, 15),
// (19, 2, 20),
// (20, 2, 10)
// `);
});
const addProduct = (name, description, price, category) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO product (name, description, price, category) VALUES (?, ?, ?, ?)`,
      [name, description, price, category],
      function (err) {
        if (err) {
          reject(new Error("Internal Server Error"));
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
};

// Retrieve a list of all products
const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM product`, (err, rows) => {
      if (err) {
        reject(new Error("Internal Server Error"));
      } else {
        resolve(rows);
      }
    });
  });
};

// Retrieve details of a specific product by ID
const getProductById = (productId) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM product WHERE id = ?`, [productId], (err, row) => {
      if (err) {
        reject(new Error("Internal Server Error"));
      } else {
        if (row) {
          resolve(row);
        } else {
          reject(new Error("Product not found"));
        }
      }
    });
  });
};

// Update details of a product
const updateProduct = (productId, name, description, price, category) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE product SET name = ?, description = ?, price = ?, category = ? WHERE id = ?`,
      [name, description, price, category, productId],
      function (err) {
        if (err) {
          reject(new Error("Internal Server Error"));
        } else {
          if (this.changes > 0) {
            resolve(`Product with ID ${productId} updated successfully`);
          } else {
            reject(new Error("Product not found"));
          }
        }
      }
    );
  });
};
// Remove a product from inventory

const deleteProductById = (productId) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM product WHERE id = ?`, [productId], function (err) {
      if (err) {
        reject(new Error("Internal Server Error"));
      } else {
        resolve(`Product with ID ${productId} deleted successfully`);
      }
    });
  });
};

// Retrieve inventory status for all products
const getAllInventory = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT i.id, i.quantity, i.productId, i.locationId, i.lastUpdated, p.name AS productName, p.description AS productDescription, p.price AS unitPrice, (p.price * i.quantity) As totalPrice, l.name AS locationName FROM inventory i JOIN product p ON i.productId=p.id JOIN location l ON i.locationId=l.id`,
      (err, rows) => {
        if (err) {
          reject(new Error("Internal Server Error"));
        } else {
          resolve(rows);
        }
      }
    );
  });
};

// Retrieve inventory status for a specific product by ID
const getInventoryStatusById = (productId) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT i.id, i.quantity, i.productId, i.locationId, i.lastUpdated, p.name AS productName, p.description AS productDescription, p.price AS unitPrice, (p.price * i.quantity) As totalPrice, l.name AS locationName FROM inventory i JOIN product p ON i.productId=p.id JOIN location l ON i.locationId=l.id WHERE i.id = ?`,
      [productId],
      (err, row) => {
        if (err) {
          reject(new Error("Internal Server Error"));
        } else {
          if (row) {
            resolve(row);
          } else {
            reject(new Error("Inventory for the product not found"));
          }
        }
      }
    );
  });
};

// Add inventory for a specific product
const addInventory = (productId, locationId, quantity) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO inventory (productId, locationId, quantity) VALUES (?, ?, ?)`,
      [productId, locationId, quantity],
      function (err) {
        if (err) {
          reject(new Error("Internal Server Error"));
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
};

// Update inventory for a specific product
const updateInventory = (productId, newQuantity) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE inventory SET quantity = ? WHERE id = ?`,
      [newQuantity, productId],
      function (err) {
        if (err) {
          reject(new Error("Internal Server Error"));
        } else {
          if (this.changes > 0) {
            resolve(
              `Inventory for product with ID ${productId} updated successfully`
            );
          } else {
            reject(new Error("Inventory for the product not found"));
          }
        }
      }
    );
  });
};

// Remove inventory for a specific product
const removeInventory = (productId) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM inventory WHERE id = ?`, [productId], function (err) {
      if (err) {
        reject(new Error("Internal Server Error"));
      } else {
        if (this.changes > 0) {
          resolve(
            `Inventory for product with ID ${productId} deleted successfully`
          );
        } else {
          reject(new Error("Inventory for the product not found"));
        }
      }
    });
  });
};

// Retrieve a list of all locations
const getAllLocations = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM location`, (err, rows) => {
      if (err) {
        reject(new Error("Internal Server Error"));
      } else {
        resolve(rows);
      }
    });
  });
};

// Retrieve details of a specific location by ID
const getLocationById = (locationId) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM location WHERE id = ?`, [locationId], (err, row) => {
      if (err) {
        reject(new Error("Internal Server Error"));
      } else {
        if (row) {
          resolve(row);
        } else {
          reject(new Error("Location not found"));
        }
      }
    });
  });
};

// Add a new location
const addLocation = (name, description) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO location (name, description) VALUES (?, ?)`,
      [name, description],
      function (err) {
        if (err) {
          reject(new Error("Internal Server Error"));
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
};

// Update details of a location
const updateLocation = (locationId, name, description) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE location SET name = ?, description = ? WHERE id = ?`,
      [name, description, locationId],
      function (err) {
        if (err) {
          reject(new Error("Internal Server Error"));
        } else {
          if (this.changes > 0) {
            resolve(`Location with ID ${locationId} updated successfully`);
          } else {
            reject(new Error("Location not found"));
          }
        }
      }
    );
  });
};

// Remove a location
const removeLocation = (locationId) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM location WHERE id = ?`, [locationId], function (err) {
      if (err) {
        reject(new Error("Internal Server Error"));
      } else {
        if (this.changes > 0) {
          resolve(`Location with ID ${locationId} deleted successfully`);
        } else {
          reject(new Error("Location not found"));
        }
      }
    });
  });
};

module.exports = {
  getAllProducts,
  addProduct,
  deleteProductById,
  updateProduct,
  getProductById,
  getAllInventory,
  getInventoryStatusById,
  addInventory,
  updateInventory,
  removeInventory,
  getAllLocations,
  getLocationById,
  addLocation,
  updateLocation,
  removeLocation,
};
