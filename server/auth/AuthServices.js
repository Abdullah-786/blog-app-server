import {User} from "../models/UserModel.js";


export  async function saveUser({name, email, password, gender}){
    try{
        const user = new User({
            name,
            email,
            password,
            gender,
        });

        const unused = await user.save();
        return true;

    }
    catch(error){
        console.log(`failed to create user with email: ${email} `, error.message);
        return false;

    }

}