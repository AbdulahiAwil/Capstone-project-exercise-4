import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import helmet from 'helmet';
dotenv.config();


import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose';
import { notFound } from './middlewares/notFound.js';
import { errorHandle } from './middlewares/errorHandle.js';
import authRoutes from './routes/auth.js'
import transactionRoutes from './routes/transaction.js'
import categoriesRoutes from './routes/categories.js'
import uploadProfileRoutes from './routes/profilePicuter.js'
import adminRoutes from './routes/admin.js'
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utility/swagger.js';




const app = express();
const PORT = process.env.PORT

const users = [
  {name: "ali", age:27},
  {name: "ayaan", age:25}
]

app.use(helmet());
app.use(express.json())
app.use(cors(
  {
    origin:["http://localhost:5173", "http://dugsiiye.com"]
  }
))


if(process.env.NODE_ENV == "development"){
    app.use(morgan('dev'))
}

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/api/health', (req, res) =>{
    res.json("server is working.....")
})




app.use('/api/auth', authRoutes)
app.use('/api/transaction', transactionRoutes)
app.use('/api/categories', categoriesRoutes)
app.use('/api/profile-picture', uploadProfileRoutes)
app.use('/api/admin', adminRoutes)

// Server frontend in production

if(process.env.NODE_ENV === "production") {

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  // The Server frontend app

  app.get(/.*/, (req, res)=>{
    res.send(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
  })
}


app.use(notFound);

app.use(errorHandle);

mongoose.connect(process.env.NODE_ENV == "development" ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PRO)
  .then(() => console.log( '✅ MongoDB connected locally' ))
  .catch((err) => console.log('❌ Connection error:', err))


app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
})
