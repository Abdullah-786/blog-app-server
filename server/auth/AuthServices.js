import {User} from "../models/UserModel.js";
import bcrypt from "bcrypt";
// import { generateToken } from './path/to/generateToken.js';
import { generateToken } from './generateToken.js';


export async function saveUser({ name, email, password, gender }) {
    // Convert the SALT environment variable to a number
    const saltRounds = parseInt(process.env.SALT, 10);
    if (isNaN(saltRounds)) {
        throw new Error('Invalid salt rounds');
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
        const user = new User({
            name,
            email,
            password: hashedPassword,
            gender,
        });

        await user.save();
        return true;
    } catch (error) {
        console.log(`Failed to create user with email: ${email}`, error.message);
        return false;
    }
}


export async function authenticateUser({email, password}) {
    const user = await User.findOne({email});
    if(!user){
        return {message: "Invalid user credentials", status : 400};
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if(!isPasswordMatched ){
        return {message: "Invalid password! please  try again", status: 400};
    }
    const token = generateToken(user);
    return {message: "Signin Success", token, status: 200};
}