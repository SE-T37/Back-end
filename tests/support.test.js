const request= require("supertest");
const jwt = require ("jsonwebtoken");
const app = require("../app/app");
const mongoose = require("mongoose");
mongoose.set('strictQuery',false);
const url= "http://localhost:8080" || process.env.HEROKU;

beforeAll(async () => {
    jest.setTimeout(8000);
    app.locals.db = await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(() => {
    mongoose.connection.close(true);
});    

var token= jwt.sign({username: "testUser1", id: "63a9efde2ad60959c9f04bc4"}, 
process.env.SUPER_SECRET, {expiresIn: 86400});

const body1={
    token:token
}


test('getUsers Test',()=>{
    return request(app).get('/getUsers')
    .set('Accept', 'application/json')
    .query({
        token:token,
    })
    .expect(200);
});

test('getViaggi Test',()=>{
    return request(app).get('/getViaggi')
    .set('Accept', 'application/json')
    .query({
        token:token,
    })
    .expect(200);
});

test('getViaggiAmici Test',()=>{
    return request(app).get('/getViaggiAmici')
    .set('Accept', 'application/json')
    .query({
        token:token,
    })
    .expect(200);
});