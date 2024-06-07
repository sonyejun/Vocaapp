import express from 'express';

import { AppDataSource } from './data-source';

import routes from './routes/index.routes'; 
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', // 프론트엔드 URL
    credentials: true, // 쿠키를 포함한 요청 허용
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use(passport.initialize());
import './config/passport';

AppDataSource.initialize()
    .then(() => {
        console.log('Database connection successful');
    })
    .catch((error) => {
        console.error('Database connection failed', error);
    });

app.use('/', routes);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server starts on port ${PORT}`);
});