import { GENDER } from "../constants.js";
import { saveUser} from "./AuthServices.js";
import { authenticateUser } from './AuthServices.js';


const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

/**
 * 
 * Minimum Length: At least 8 characters

 * Uppercase Letter: At least one uppercase letter (A-Z)

 * Lowercase Letter: At least one lowercase letter (a-z)

 * Digit: At least one digit (0-9)

 * Special Character: At least one special character (e.g., !@#$%^&*)
 */


const  validateEmail = (email) => EMAIL_REGEXP.test(email); // inline function 

const  validatePassword = (password) => PASSWORD_REGEXP.test(password); // inline function

const  validateGender = (gender) => gender === GENDER.female || gender === GENDER.male  // inline function

const validateName = (name) => name && name.length >= 8;

export async function signupController(req, resp){
    const {name, email, password, gender}= req.body;
    if(!validateEmail(email)|| 
       !validatePassword(password) ||
       !validateGender(gender) || 
       !validateName(name)
    )
    {
       return resp.status(400).json({message: "invalid Details"})
    }

    const result = await saveUser(req.body);
    if(result ){
        resp.status(201).json({message: "Signup successful"})
    }
    else{
        resp.status(500).json({message: "Signup failed! please try again"});
    }

}

export  async function loginController(req, resp){
    const {email, password} = req.body;
    if(!validateEmail(email) || !validatePassword(password)){
        resp.status(400).json({message: "invalid credentials"}); // bad request
    }

    const result = await authenticateUser(req.body);
    const statusCode = result.status;
    delete result.status;
    resp.status(statusCode).json({ ...result });
}
