const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');


require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use('/products',productRoutes);

PORT=process.env.APP_PORT;
app.listen(PORT, ()=>{
    console.log(`serwer dziala na porcie: ${PORT}`);
});