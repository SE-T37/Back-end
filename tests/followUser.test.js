const request= require("supertest");
const jwt = require ("jsonwebtoken");
const app = require("../app/app");
const mongoose = require("mongoose");
mongoose.set('strictQuery',false);
const url= "http://localhost:8080" || process.env.HEROKU;
const seguiUser= require("../app/controllers/segui");
const User= require("../app/models/user");
// NB: This API is tokenchecked


beforeAll(async () => {
    jest.setTimeout(8000);
    app.locals.db = await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(() => {
    mongoose.connection.close(true);
});    
var token= jwt.sign({username: "testUser1",
 id: "63a9efde2ad60959c9f04bc4"}, 
process.env.SUPER_SECRET, {expiresIn: 86400});


test('Follow user, not authorized',()=>{
    console.log("User is not authorized");
    return request(app).put('/followUser')
    .set('Accept', 'application/json')
    .expect(401);
})


var token= jwt.sign({username: "testUser1",
 id: "63a9efde2ad60959c9f04bc4"}, 
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

const body2={
    token: token,
    username: "john"
}


test('Follow user, but already following' , ()=>{    
    return request(app).put('/followUser')
    .set('Accept', 'application/json')
    .send(body2)
    .expect({message: ('Already following')});
    
})


//If i test directly User x follow User y
//then if i run the test again i will lose a test case.
//The solution is mocking


const body3={
    token: token,
    username: "exp"
}

test('Follow user, not following' , ()=>{    
    //fake saving of the new user
    const mockSave = jest.fn();
    User.prototype.save = mockSave;

    return request(app)
    .put('/followUser')
    .set('Accept', 'application/json')
    .send(body3)
    .expect(200); 

})

test('Follow user, not following but connection fail' , ()=>{    
    const mockSave = jest.fn(()=>{throw new Error('Internal server error')});
    User.prototype.save = mockSave;
    return request(app).put('/followUser')
    .set('Accept', 'application/json')
    .send(body3)
    .expect(500); 
    
})


