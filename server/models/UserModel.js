import mongoose from "mongoose";
import { GENDER } from "../constants.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
            type: String,
            required: true
    },
    signedupAt:{
        type: Date,
        default: Date.now, 
    },   
    gender: {
        type: String,
        enum: [GENDER.male, GENDER.female],
        required: true,
    },
});
export const User = mongoose.model("user", userSchema);
