import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from 'path';
import { fileURLToPath } from 'url';

// routes
import AuthRoute from './routes/AuthRoute.js'
import UserRoute from './routes/UserRoute.js'
import PostRoute from './routes/PostRoute.js'
import UploadRoute from './routes/UploadRoute.js'
import ChatRoute from './routes/ChatRoute.js'
import MessageRoute from './routes/MessageRoute.js'

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//build用
app.use(express.static(path.join(__dirname, '../client/build')));

// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// to serve images inside public folder
//app.use(express.static(__dirname +'/public'));
//app.use('/images', express.static('/images'));
app.use('/images', express.static(__dirname + '/public/images'));



dotenv.config();
const PORT = process.env.PORT || 3001;
const CONNECTION =process.env.MONGODB_CONNECTION;

mongoose
  .connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`server/index.js Listening at Port ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));


app.use('/auth', AuthRoute);
app.use('/user', UserRoute)
app.use('/posts', PostRoute)
app.use('/upload', UploadRoute)
app.use('/chat', ChatRoute)
app.use('/message', MessageRoute)

//build用
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'../client/build/index.html'));
});