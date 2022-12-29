const request= require("supertest");
const app = require("../app/app");
const mongoose = require("mongoose");
mongoose.set('strictQuery',false);
const url= "http://localhost:8080" || process.env.HEROKU;

// it's required to import those modules because otherwise i can test
// the connection fail only before the execution of all the API
// in this way i can use mocking to test the connection fail during the
// execution of the API (otherwise i would not test the error inside the save function)

const User = require("../app/models/user");
const newUser = require("../app/controllers/user");


beforeAll(async () => {
    jest.setTimeout(8000);
    app.locals.db = await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(() => {
    mongoose.connection.close(true);
});    

let number=Math.floor(Math.random()*1000000); // to assure that is not already present;
// a mock it's better than this approach (that is 
// actually incorrect because in this way the test could
// not cover some cases even if the API workd)
// in all the other test suites and for the last test of this one
// is used moking
const body1={
    username: 'User'+ number,
    password: "password123",
    mail: 'user.'+number+"@gmail.com",
    foto: "null",
}

test('Signup, correct', ()=>{
    return request(app).post('/newUser')
    .set('Accept', 'application/json')
    .send(body1)
    .expect(201);
    
})
const body2={
    username: "alfredo2",
    password: "password123",
    mail: "email@gmail.com",
}

test('Signup, username already present', ()=>{
    return request(app).post('/newUser')
    .set('Accept', 'application/json')
    .send(body2)
    .expect(400);
    
})

const body3={
    username: "RandomUsername",
    password: "password123"
}

test('Signup, missing credentials', ()=>{
    return request(app).post('/newUser')
    .set('Accept', 'application/json')
    .send(body3)
    .expect(400);
    
})


let number2=Math.floor(Math.random()*1000000);
const body4={
    username: "User"+ number,
    password: "password123",
    mail: "user."+number+"@gmail.com",
    foto: "null",
}
test('Signup, correct credentials, server fail', ()=>{
    mongoose.connection.close(true);
    return request(app).post('/newUser')
    .set('Accept', 'application/json')
    .send(body4)
    .expect(500);
    
})

test('Signup, correct credentials, save in database fails' , ()=>{
    User.findOne = jest.fn((query, cb) => cb(null,null));
    const mockSave = jest.fn((cb) => cb({message:'Error saving user'}, null));
    User.prototype.save = mockSave;

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    };
    return request(app).post('/newUser')
    .set('Accept', 'application/json')
    .send(body4)
    .expect({message: ('Error saving user')});
    
})