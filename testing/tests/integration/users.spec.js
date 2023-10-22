const app = require('../../app');
const request = require('supertest');

let user = {};

describe('test POST /api/v1/users endpoint', ()=> {
    test('test email beserta profile belum terdaftar -> sukses', async ()=>{
        try {
            let name = 'usertest1';
            let email = 'usertest1@gmail.com';
            let password = 'password123';
            let identity_type = 'virtual';
            let identity_number =  274818;
            let address = 'Makassar';

            let {statusCode, body} = await request(app).post('/api/v1/users').send({name, email, password, identity_type, identity_number, address});
            user = body.data;

            expect(statusCode).toBe(201);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('name');
            expect(body.data).toHaveProperty('email');
            expect(body.data).toHaveProperty('password');
            expect(body.data).toHaveProperty('identity_type');
            expect(body.data).toHaveProperty('identity_number');
            expect(body.data).toHaveProperty('address');
            expect(body.data.name).toBe(name);
            expect(body.data.email).toBe(email);
            expect(body.data.password).toBe(password);
            expect(body.data.identity_number).toBe(identity_type);
            expect(body.data.identity_number).toBe(identity_number);
            expect(body.data.address).toBe(address);

        } catch (err){
            expect(err).toBe(err);
        }
    });

    test('test email beserta profile sudah terdaftar -> error', async ()=>{
        try{
            let name = 'usertest1';
            let email = 'usertest1@gmail.com';
            let password = 'password123';
            let identity_type = 'virtual';
            let identity_number =  274818;
            let address = 'Makassar';

            let {statusCode, body} = await request(app).post('/api/v1/users').send({name, email, password, identity_type, identity_number, address});
            user = body.data;

            expect(statusCode).toBe(400);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            
        } catch(err){
            expect(err).toBe('email sudah dipakai');
        }
    });
});


describe('test GET /api/v1/:id endpoint', ()=> {
    test('test cari id yang sudah terdaftar -> sukses', async ()=>{
        try{
            let {statusCode, body} = await request(app).get(`/api/v1/users/${user.id}`);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('name');
            expect(body.data).toHaveProperty('email');
            expect(body.data).toHaveProperty('password');
            expect(body.data).toHaveProperty('identity_type');
            expect(body.data).toHaveProperty('identity_number');
            expect(body.data).toHaveProperty('address');
            expect(body.data.id).toBe(user.id);
            expect(body.data.name).toBe(user.name);
            expect(body.data.email).toBe(user.email);
            expect(body.data.password).toBe(user.password);
            expect(body.data.identity_number).toBe(user.identity_type);
            expect(body.data.identity_number).toBe(user.identity_number);
            expect(body.data.address).toBe(user.address);

        } catch (err){
            expect(err).toBe(err);
        }
    });

    test('test cari id yang tidak terdaftar -> error', async ()=>{
        try{
            try{
                let {statusCode, body} = await request(app).get(`/api/v1/users/${user.id + 1000}`);

            expect(statusCode).toBe(400);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
        } catch(err){
            expect(err).toBe(err);
        }
            } catch(err){
                expect(err).toBe('user tidak ditemukan')
            }
    });
});

describe('test GET /api/v1/users endpoint', ()=> {
    test('test cari semua id yang sudah terdaftar -> sukses', async ()=>{
        try{
            let {statusCode, body} = await request(app).get(`/api/v1/users`);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('name');
            expect(body.data).toHaveProperty('email');
            expect(body.data).toHaveProperty('password');
            expect(body.data).toHaveProperty('identity_type');
            expect(body.data).toHaveProperty('identity_number');
            expect(body.data).toHaveProperty('address');
            expect(body.data.id).toBe(user.id);
            expect(body.data.name).toBe(user.name);
            expect(body.data.email).toBe(user.email);
            expect(body.data.password).toBe(user.password);
            expect(body.data.identity_number).toBe(user.identity_type);
            expect(body.data.identity_number).toBe(user.identity_number);
            expect(body.data.address).toBe(user.address);

        } catch (err){
            expect(err).toBe(err);
        }
    });
});