import express from 'express';
import session from 'express-session';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';

import cookieParser from 'cookie-parser';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(()=> {
    console.log('MongoDB is connected');
   })
   .catch(err =>{
    console.log(err);
   });

   const __dirname = path.resolve();
const app=express();

app.use(session({
  secret: 'jijijijiji',  // Use a secret key to sign the session ID
  resave: false,  // Don't resave the session if nothing has changed
  saveUninitialized: false,  // Don't create a session until something is stored
  cookie: { secure: false },  // Set to true in production with HTTPS
}));

app.use(express.json());
app.use(cookieParser());


app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join( __dirname, '/client/dist')));
app.get('*',(req,res) =>{
  res.sendFile(path.join (__dirname, 'client', 'dist', 'index.html'));
});


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});



app.listen(3000,() =>{
  console.log('Server is running on port 3000');
});




