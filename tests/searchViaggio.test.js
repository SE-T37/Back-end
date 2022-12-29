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


test('Search viaggio, viaggio not present (No titolo match)',()=>{
    return request(app).get('/searchViaggio')
    .set('Accept', 'application/json')
    .query({
        titolo: "TitoloViaggioNonPresente",
        lunghezzaMin: 0,
        lunghezzaMax: 10000,
    })
    .expect(404);
})

test('Search viaggio, viaggio not present (No lunghezza match)',()=>{
    return request(app).get('/searchViaggio')
    .set('Accept', 'application/json')
    .query({
        titolo: "Veneto",
        lunghezzaMin: 50000,
        lunghezzaMax: 99999,
    })
    .expect(404);
})

test('Search viaggio, viaggio  present',()=>{
    return request(app).get('/searchViaggio')
    .set('Accept', 'application/json')
    .query({
        titolo: "Veneto",
        lunghezzaMin: 0,
        lunghezzaMax: 5000,
    })
    .expect(200);
})