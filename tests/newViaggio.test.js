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


test('New viaggio, not authorized',()=>{
    return request(app).post('/newViaggio')
    .set('Accept', 'application/json')
    .expect(401);
})


var token= jwt.sign({username: "testUser1", password: "password"}, 
process.env.SUPER_SECRET, {expiresIn: 86400});


const body1={
    token: token,
    titolo: "Test viaggio",
    descrizione: "Descrizione test",
    foto: "http://fotoviaggio.com",
    lunghezza: 200,
    foto1: "http://fotoviaggio1.com",
    descrizione1: "Descrizione tappa1",
    latitudine1: "-10.265",
    longitudine1: "50.151",
    foto2: "http://fotoviaggio2.com",
    descrizione2: "Descrizione tappa2",
    latitudine2: "-11.265",
    longitudine2: "51.151",
}


test('New viaggio, correct', ()=>{
    return request(app).post('/newViaggio')
    .set('Accept', 'application/json')
    .send(body1)
    .expect(201);
    
})

test('New viaggio, server down or others',()=>{
    mongoose.connection.close(true);
    return request(app).put('/newViaggio')
    .set('Accept', 'application/json')
    .send(body1)
    .expect(404);
})