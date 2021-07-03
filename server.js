require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index')
const fileUpload = require('express-fileupload');
const errorMiddlewere = require('./middlewares/errorMiddlewere')

const PORT = process.env.PORT || 3010;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);
app.use(errorMiddlewere);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`)
        })

    } catch (e) {
        console.log(e);
    }
}

start();
