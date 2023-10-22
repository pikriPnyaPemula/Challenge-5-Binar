const app = require('../../app');
const request = require('supertest');

let account = {};

describe('test POST /api/v1/accounts endpoint', ()=> {
    test('test account belum terdaftar -> sukses', async ()=>{
        try{
            let bank_name =  'BTN';
            let bank_account_number = 111005;
            let balance = 1000000;
            let user_id = 1;

            let {statusCode, body} = await request(app).post('/api/v1/accounts').send({bank_name, bank_account_number, balance, user_id});
            account = body.data;

            expect(statusCode).toBe(201);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('bank_name');
            expect(body.data).toHaveProperty('bank_account_number');
            expect(body.data).toHaveProperty('balance');
            expect(body.data).toHaveProperty('user_id');
            expect(body.data.bank_name).toBe(bank_name);
            expect(body.data.bank_account_number).toBe(bank_account_number);
            expect(body.data.balance).toBe(balance);
            expect(body.data.user_id).toBe(user.id);

        }catch(err){
            expect(err).toBe(err);
        }

    });
});

describe('test GET /api/v1/accounts/:id endpoint', ()=> {
    test('test cari account dari id yang sudah terdaftar -> sukses', async ()=>{
        try{
            let {statusCode, body} = await request(app).get(`/api/v1/accounts/${account.id}`);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('bank_name');
            expect(body.data).toHaveProperty('bank_account_number');
            expect(body.data).toHaveProperty('balance');
            expect(body.data).toHaveProperty('user_id');
            expect(body.data.id).toBe(account.id);
            expect(body.data.bank_name).toBe(account.bank_name);
            expect(body.data.bank_account_number).toBe(account.bank_account_number);
            expect(body.data.balance).toBe(account.balance);
            expect(body.data.user_id).toBe(user.id.user_id);
        } catch(err){
            expect(err).toBe(err);
        }
    });

    test('test cari id yang tidak terdaftar -> error', async ()=>{
        try{
            try{
                let {statusCode, body} = await request(app).get(`/api/v1/users/${account.id + 1000}`);

            expect(statusCode).toBe(400);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
        } catch(err){
            expect(err).toBe(err);
        }
            } catch(err){
                expect(err).toBe('Account tidak ditemukan')
            }
    });
});

describe('test GET /api/v1/accounts endpoint', ()=> {
    test('test cari semua account yang sudah terdaftar -> sukses', async ()=>{
        try{
            let {statusCode, body} = await request(app).get(`/api/v1/accounts`);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('bank_name');
            expect(body.data).toHaveProperty('bank_account_number');
            expect(body.data).toHaveProperty('balance');
            expect(body.data).toHaveProperty('user_id');
            expect(body.data.id).toBe(account.id);
            expect(body.data.bank_name).toBe(account.bank_name);
            expect(body.data.bank_account_number).toBe(account.bank_account_number);
            expect(body.data.balance).toBe(account.balance);
            expect(body.data.user_id).toBe(user.id.user_id);
        } catch (err){
            expect(err).toBe(err);
        }
    });
});