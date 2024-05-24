import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js'
import {notFound,errorHandler}from './middleware/errorMiddleware.js';
import cors from "cors";

const port=3000;
const app=express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(express.urlencoded({ extended: false }));

app.use(cors({    credentials: true,
exposedHeaders: ["set-cookie"],}));
app.use(cookieParser());
//body parser middleware

//cookie parser middleware

app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload',uploadRoutes);

app.get('/api/config/paypal',(req,res)=> res.send({clientId:process.env.PAYPAL_CLIENT_ID}))

app.get('/log-cookies', (req, res) => {
    console.log('Cookies:', req.cookies); // Log cookies
    res.send('Cookies logged successfully');
  });

const __dirname = path.resolve();

app.use('/uploads', express.static(path.join(`${__dirname}/frontend/public`, 'uploads')));

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>{console.log(`server running on port ${port}`)})