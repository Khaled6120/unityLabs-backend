import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToDatabase = async () => {
    let MONGODB_URI = process.env.MONGODB_URI;
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(
            'Connected to Distribution API Database - Initial Connection',
            MONGODB_URI
        );
    } catch (err) {
        console.log(
            'Initial Distribution API Database connection error occured -',
            err
        );

    }
};

export default connectToDatabase;