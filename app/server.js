const app = require('./app.js');
const mongoose = require('mongoose');
require('dotenv').config(); 

const port = process.env.PORT || 8080;

app.locals.db = mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then ( () => {
    
    console.log("Connected to Database");
    
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
    
});