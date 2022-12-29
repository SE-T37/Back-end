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


test('Follow user, not authorized',()=>{
    return request(app).put('/followUser')
    .set('Accept', 'application/json')
    .expect(401);
})


var token= jwt.sign({username: "alfredo2", password: "qwert12323h"}, 
process.env.SUPER_SECRET, {expiresIn: 86400});

const body1={
    token: token,
}
test('Follow user, no user passed or not found',()=>{
    return request(app).put('/followUser')
    .set('Accept', 'application/json')
    .send(body1)
    .expect(404);
})

/*
 If i test directly User x follow User y
 then if i run the test again i will lose a test case.
The solution is moking

*/

test('Follow user' , ()=>{
    User.findOne = jest.fn((query, cb) => cb(null, null));
    newUser.save = jest.fn((cb) => cb(new Error('Error saving user'), null));
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    };
    return request(app).post('/newUser')
    .set('Accept', 'application/json')
    .send(body4)
    .expect(500)
    .expect({message: ('Error saving user')});
    
})
