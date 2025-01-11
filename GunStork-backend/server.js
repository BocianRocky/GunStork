const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');
const accountRoutes = require('./routes/accountRoutes');
const cors = require('cors');


require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use('/products',productRoutes);
app.use('/auth',accountRoutes);


PORT=process.env.APP_PORT;
app.listen(PORT, ()=>{
    console.log(`serwer dziala na porcie: ${PORT}`);
});