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


test('Edit user, not authorized',()=>{
    return request(app).put('/editUser')
    .set('Accept', 'application/json')
    .expect(401);
})


var token= jwt.sign({username: "alfredo2", password: "qwert12323h"}, 
process.env.SUPER_SECRET, {expiresIn: 86400});

const body1={
    token: token,
    mail:"newmail@gmail.com",
    password:"Maradona"
}
test('Edit user, OK',()=>{
    return request(app).put('/editUser')
    .set('Accept', 'application/json')
    .send(body1)
    .expect(200);
})

test('Edit user, server down or others',()=>{
    mongoose.connection.close(true);
    return request(app).put('/editUser')
    .set('Accept', 'application/json')
    .send(body1)
    .expect(400);
})

