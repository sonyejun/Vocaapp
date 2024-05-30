import express from 'express';

import { AppDataSource } from './data-source';

import routes from './routes/index.routes'; 
import passport from 'passport';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

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