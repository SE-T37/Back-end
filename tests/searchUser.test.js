const request= require("supertest");
const jwt = require ("jsonwebtoken");
const app = require("../app/app");
const mongoose = require("mongoose");
mongoose.set('strictQuery',false);
const url= "http://localhost:8080" || process.env.HEROKU;


// NB: This API is tokenchecked



beforeAll(async () => {
    jest.setTimeout(8000);
    app.locals.db = await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(() => {
    mongoose.connection.close(true);
});    


test('Search user, not authorized',()=>{
    return request(app).post('/searchUser')
    .set('Accept', 'application/json')
    .expect(401);
})


var token= jwt.sign({username: "testUser1"}, 
process.env.SUPER_SECRET, {expiresIn: 86400});

test('Search user, invalid token',()=>{
    return request(app).get('/searchUser')
    .set('Accept', 'application/json')
    .query({
        token:"invalid token",
    })
    .expect(403);
})


test('Search user, no username specified',()=>{
    return request(app).get('/searchUser')
    .set('Accept', 'application/json')
    .query({
        token:token,
    })
    .expect(400);
})

test('Search user, user not present',()=>{
    return request(app).get('/searchUser')
    .set('Accept', 'application/json')
    .query({
        token:token,
        username: "UserNotPresent___!!"
    })
    .expect(404);
})

test('Search user, user  present',()=>{
    return request(app).get('/searchUser')
    .set('Accept', 'application/json')
    .query({
        token:token,
        username: "testUser1"
    })
    .expect(200);
})