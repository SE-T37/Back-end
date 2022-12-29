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


var token= jwt.sign({username: "testUser1", password: "password"}, 
process.env.SUPER_SECRET, {expiresIn: 86400});

const body1={
    token: token,
}
test('Search user, no username specified',()=>{
    return request(app).post('/searchUser')
    .set('Accept', 'application/json')
    .send(body1)
    .expect(400);
})