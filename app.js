import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import userRoute from './routes/user.js';
import authRoute from './routes/auth.js';
import parcelRoute from './routes/parcel.js';
import cartRoute from './routes/cart.js';
import orderRoute from './routes/order.js';
import dotenv from 'dotenv';

// import { v4 as uuidv4 } from 'uuid';
// const pass_word = uuidv4();
const app = express();
const PORT = 3000;
dotenv.config();


mongoose.connect(process.env.dbURI, {useNewUrlParser: true, useUnifiedTopology: true })
   .then((result) => app.listen(process.env.PORT || 3000, () => console.log(`Running`)))
  .catch((err) => console.log(err));

  app.use(express.static('public'));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));
  app.use(express.json());

   app.use('/user', userRoute);
   app.use('/auth', authRoute);
   app.use('/parcel', parcelRoute);
   app.use('/cart', cartRoute);
   app.use('/order', orderRoute);
  
  app.get('/', (req, res) => res.send('You be mumu, from Homepage.'));