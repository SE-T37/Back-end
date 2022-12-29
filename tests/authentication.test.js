const request= require("supertest");
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

const body1={
    username: 'NotExistingUsername',
    password: 'NotExistingPassword',
}
test('Authentication, wrong username ', ()=>{
    return request(app).post('/authenticate')
    .set('Accept', 'application/json')
    .send(body1)
    .expect(404);
    
})
const body2={
    username: 'alfredo2',
    password: 'wrongpassword',
}
test('Authentication, wrong password ', ()=>{
    return request(app).post('/authenticate')
    .set('Accept', 'application/json')
    .send(body2)
    .expect(400);
    
})
const body3={
    username: 'alfredo2',
    password: 'qwert12323h',
}
test('Authentication, correct ', ()=>{
    return request(app).post('/authenticate')
    .set('Accept', 'application/json')
    .send(body3)
    .expect(200);
    
})
