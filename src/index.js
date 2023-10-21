
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));


const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => res.send('Hello World with Express'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

