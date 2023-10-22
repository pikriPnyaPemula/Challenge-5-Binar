const app = require('../../app');
const request = require('supertest');

let transaction = {};

describe('test POST /api/v1/transactions endpoint', ()=> {
    test('test transaction belum ada -> sukses', async ()=>{
        try{
            let source_account_id = 1;
            let destination_account_id = 3;
            let amount =  1000000;

            let {statusCode, body} = await request(app).post('api/v1/transactions').send({source_account_id, destination_account_id, amount});
            transaction = body.data;

            expect(statusCode).toBe(201);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('source_account_id');
            expect(body.data).toHaveProperty('destination_account_id');
            expect(body.data).toHaveProperty('amount');
            expect(body.data.source_account_id).toBe(source_account_id);
            expect(body.data.destination_account_id).toBe(destination_account_id);
            expect(body.data.amount).toBe(amount);
        } catch(err){
            expect(err).toBe(err);
        }
    });
});

describe('test GET /api/v1/transactions/:id endpoint', ()=> {
    test('test cari transaction dari id yang sudah terdaftar -> sukses', async ()=>{
        try{
            let {statusCode, body} = await request(app).get(`/api/v1/transactions/${transaction.id}`);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('source_account_id');
            expect(body.data).toHaveProperty('destination_account_id');
            expect(body.data).toHaveProperty('amount');
            expect(body.data.source_account_id).toBe(source_account_id);
            expect(body.data.destination_account_id).toBe(destination_account_id);
            expect(body.data.amount).toBe(amount);

        } catch(err){
            expect(err).toBe(err);
        }
    });

    test('test cari transaction dari id yang tidak terdaftar -> error', async ()=>{
        try{
            let {statusCode, body} = await request(app).get(`/api/v1/transactions/${transaction.id}`);

            expect(statusCode).toBe(400);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');

        } catch(err){
            expect(err).toBe(err);
        }
    });
});

describe('test GET /api/v1/transactions/ endpoint', ()=> {
    test('test cari semua transaction yang sudah ada -> sukses', async ()=>{
        try{
            let {statusCode, body} = await request(app).get(`/api/v1/transactions`);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('source_account_id');
            expect(body.data).toHaveProperty('destination_account_id');
            expect(body.data).toHaveProperty('amount');
            expect(body.data.source_account_id).toBe(source_account_id);
            expect(body.data.destination_account_id).toBe(destination_account_id);
            expect(body.data.amount).toBe(amount);
        } catch(err){
            expect(err).toBe(err);
        }
    });
});