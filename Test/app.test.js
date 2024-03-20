const request = require("supertest");
const api = require("../src/api");

app = api({
    getAllProducts: jest.fn((x) => x), 
    addProduct: jest.fn((x) => x),
    deleteProductById: jest.fn((x) => x), 
    updateProduct: jest.fn((x) => x),
    getProductById: jest.fn((x) => x), 
    getAllInventory: jest.fn((x) => x),
    getInventoryStatusById: jest.fn((x) => x),
    addInventory: jest.fn((x) => x),
    updateInventory: jest.fn((x) => x),
    removeInventory: jest.fn((x) => x),
    getAllLocations: jest.fn((x) => x),
    getLocationById: jest.fn((x) => x),
    addLocation: jest.fn((x) => x),
    updateLocation: jest.fn((x) => x),
    removeLocation  :jest.fn((x) => x)
});

describe("Product Endpoints", () => {
    // GET /products
    describe("GET /products", () => {
      test("It should respond with status code 200", async () => {
        const response = await request(app).get("/products");
        expect(response.status).toBe(200);
      });
    });
  
    // GET /products/:id
    describe("GET /products/:id", () => {
      test("It should respond with status code 200", async () => {
        const response = await request(app).get("/products/1");
        expect(response.status).toBe(200);
      });
    });
  
    // POST /products
    describe("POST /products", () => {
      test("It should respond with status code 200", async () => {
        const response = await request(app)
          .post("/products")
          .send({ name: "Test Product", description: "Test Description", price: 10.99, category: "Test Category" });
        expect(response.status).toBe(200);
      });
    });
  
    // PUT /products/:id
    describe("PUT /products/:id", () => {
      test("It should respond with status code 200", async () => {
        const response = await request(app)
          .put("/products/1")
          .send({ name: "Updated Test Product", description: "Updated Test Description", price: 15.99, category: "Updated Test Category" });
        expect(response.status).toBe(200);
      });
    });
  
    // DELETE /products/:id
    describe("DELETE /products/:id", () => {
      test("It should respond with status code 200", async () => {
        const response = await request(app).delete("/products/1");
        expect(response.status).toBe(200);
      });
    });
  });
  
  describe("Inventory Endpoints", () => {
    // GET /inventory
    describe("GET /inventory", () => {
      test("It should respond with status code 200", async () => {
        const response = await request(app).get("/inventory");
        expect(response.status).toBe(200);
      });
    });
  
    // GET /inventory/:id
    describe("GET /inventory/:id", () => {
      test("It should respond with status code 200", async () => {
        const response = await request(app).get("/inventory/1");
        expect(response.status).toBe(200);
      });
    });
  
    // POST /inventory
    describe("POST /inventory", () => {
      test("It should respond with status code 200", async () => {
        const response = await request(app)
          .post("/inventory")
          .send({ productId: 1, locationId: 1, quantity: 10 });
        expect(response.status).toBe(200);
      });
    });
  
    // PUT /inventory/:id
    describe("PUT /inventory/:id", () => {
      test("It should respond with status code 200", async () => {
        const response = await request(app)
          .put("/inventory/1")
          .send({ quantity: 20 });
        expect(response.status).toBe(200);
      });
    });
  
    // DELETE /inventory/:id
    describe("DELETE /inventory/:id", () => {
      test("It should respond with status code 200", async () => {
        const response = await request(app).delete("/inventory/1");
        expect(response.status).toBe(200);
      });
    });
  });
  
  describe("Location Endpoints", () => {
    // GET /locations
    describe("GET /locations", () => {
      test("It should respond with status code 200", async () => {
        const response = await request(app).get("/locations");
        expect(response.status).toBe(200);
      });
    });
  
    // GET /locations/:id
    describe("GET /locations/:id", () => {
      test("It should respond with status code 200", async () => {
        const response = await request(app).get("/locations/1");
        expect(response.status).toBe(200);
      });
    });
  
    // POST /locations
    describe("POST /locations", () => {
      test("It should respond with status code 200", async () => {
        const response = await request(app)
          .post("/locations")
          .send({ name: "Test Location", description: "Test Description" });
        expect(response.status).toBe(200);
      });
    });
  
    // PUT /locations/:id
    describe("PUT /locations/:id", () => {
      test("It should respond with status code 200", async () => {
        const response = await request(app)
          .put("/locations/1")
          .send({ name: "Updated Test Location", description: "Updated Test Description" });
        expect(response.status).toBe(200);
      });
    });
  
    // DELETE /locations/:id
    describe("DELETE /locations/:id", () => {
      test("It should respond with status code 200", async () => {
        const response = await request(app).delete("/locations/1");
        expect(response.status).toBe(200);
      });
    });
  });
