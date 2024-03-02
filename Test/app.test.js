const request = require("supertest");
const api = require("../src/api");

app = api({
  getOrders: jest.fn((x) => x),
  createOrder: jest.fn(({productId, quantity, status})=> {productId, quantity, status}),
  deleteOrder: jest.fn((x) => x),
  getAllProducts: jest.fn((x) => x),
  addProduct: jest.fn((x) => x),
  updateProduct: jest.fn((x) => x),
  getProductById: jest.fn((x) => x),
  getAllManufacturers: jest.fn((x) => x),
});

describe("GET /orders", () => {
  test("It should respond with status code 200", async () => {
    const response = await request(app).get("/orders");
    expect(response.status).toBe(200);
  });
});

describe("POST /orders", () => {
  test("It should respond with status code 200", async () => {
    const newOrder= { productId: 1, quantity: 5, status: "Pending" }
    const response = await request(app)
      .post("/orders")
      .send(newOrder);
    expect(response.status).toBe(200);
  });
});

describe('DELETE /api/orders/:orderId', () => {
    test('It should respond with status code 200', async () => {
        const orderId = 1; // Specify an existing order ID
        const response = await request(app).delete(`/orders/${orderId}`);
        expect(response.status).toBe(200);
    });
});

describe('GET /api/products', () => {
    test('It should respond with status code 200', async () => {
        const response = await request(app).get('/products');
        expect(response.status).toBe(200);
    });
});

describe('POST /api/products', () => {
    test('It should respond with status code 200', async () => {
        const response = await request(app)
            .post('/products')
            .send({ name: 'Product', description: 'Description', price: 10, manufacturerId: 1 });
        expect(response.status).toBe(200);
    });
});

describe('GET /api/products/:productId', () => {
    test('It should respond with status code 200', async () => {
        const productId = 1; // Specify an existing product ID
        const response = await request(app).get(`/products/${productId}`);
        expect(response.status).toBe(200);
    });
});

describe('PUT /api/products/:productId', () => {
    test('It should respond with status code 200', async () => {
        const productId = 1; // Specify an existing product ID
        const response = await request(app)
            .put(`/products/${productId}`)
            .send({ name: 'Updated Product', description: 'Updated Description', price: 20, manufacturerId: 2 });
        expect(response.status).toBe(200);
    });
});

describe('GET /api/manufacturers', () => {
    test('It should respond with status code 200', async () => {
        const response = await request(app).get('/manufacturers');
        expect(response.status).toBe(200);
    });
});
