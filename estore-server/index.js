import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import productRouter from './routes/products.route.js'
import cors from 'cors';
import authRouter from './routes/auth.route.js'
import orderRouter from './routes/orders.route.js'

dotenv.config()
const app = express();
const PORT = 5001;
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!!')
  })
  .catch((err) => {
    console.log('Error', err)
  })
app.use(cors());
app.get('/', (req, res) => {
  let prodData = {
    pName: 'Jackets',
    price: 45,
    img: 'shop-1.jpg',
  };
  res.status(200).send(prodData);
});

app.listen(PORT, () => {
  console.log('App is running on the port - 5001');
});

app.use(bodyParser.json());
app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)
app.use('/api/orders',orderRouter)



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})