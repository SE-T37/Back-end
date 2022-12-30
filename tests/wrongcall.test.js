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

const body={
    name: "test"
}

test('Bad request ', ()=>{
    return request(app).post('/notexistingEndpoint')
    .set('Accept', 'application/json')
    .send(body)
    .expect(404);
});