import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
/**
 * Generate a json web token for a user
 * @param id The id of the user
 */
const generateToken = (id) => {
    if (process.env.JWT_SECRET !== undefined) {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
    }
};

export default generateToken;