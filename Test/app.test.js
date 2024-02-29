const request = require('supertest');
const  api = require('../src/api');


app= api({
    getOrders: jest.fn(x=>x)
})

describe('GET /api/orders', () => {
    test('It should respond with status code 200', async () => {
        const response = await request(app).get('/orders');
        console.log(response);
        expect(response.status).toBe(200);
    });
});

// describe('POST /api/orders', () => {
//     test('It should respond with status code 200', async () => {
//         const response = await request(app)
//             .post('/orders')
//             .send({ productId: 1, quantity: 5, status: 'Pending' });
//         expect(response.status).toBe(200);
//     });
// });

// describe('DELETE /api/orders/:orderId', () => {
//     test('It should respond with status code 200', async () => {
//         const orderId = 1; // Specify an existing order ID
//         const response = await request(app).delete(`/orders/${orderId}`);
//         expect(response.status).toBe(200);
//     });
// });

// describe('GET /api/products', () => {
//     test('It should respond with status code 200', async () => {
//         const response = await request(app).get('/products');
//         expect(response.status).toBe(200);
//     });
// });

// describe('POST /api/products', () => {
//     test('It should respond with status code 200', async () => {
//         const response = await request(app)
//             .post('/products')
//             .send({ name: 'Product', description: 'Description', price: 10, manufacturerId: 1 });
//         expect(response.status).toBe(200);
//     });
// });

// describe('GET /api/products/:productId', () => {
//     test('It should respond with status code 200', async () => {
//         const productId = 1; // Specify an existing product ID
//         const response = await request(app).get(`/products/${productId}`);
//         expect(response.status).toBe(200);
//     });
// });

// describe('PUT /api/products/:productId', () => {
//     test('It should respond with status code 200', async () => {
//         const productId = 1; // Specify an existing product ID
//         const response = await request(app)
//             .put(`/products/${productId}`)
//             .send({ name: 'Updated Product', description: 'Updated Description', price: 20, manufacturerId: 2 });
//         expect(response.status).toBe(200);
//     });
// });

// describe('GET /api/manufacturers', () => {
//     test('It should respond with status code 200', async () => {
//         const response = await request(app).get('/manufacturers');
//         expect(response.status).toBe(200);
//     });
// });

