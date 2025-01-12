const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');
const accountRoutes = require('./routes/accountRoutes');
const authRoutes = require('./routes/authRouter');
const cors = require('cors');


require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use('/products',productRoutes);
app.use('/account',accountRoutes);
app.use('/auth',authRoutes);


PORT=process.env.APP_PORT;
app.listen(PORT, ()=>{
    console.log(`serwer dziala na porcie: ${PORT}`);
});