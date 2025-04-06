import mongoose from "mongoose"
const uri = process.env.PROD_DATABASE_URI;
export const connectToMongoDB = async () =>{
    try {
        await mongoose.connection.on("connected",()=>{
            console.log("MongoDb Connecteds Successfully!")
        })
        console.log(uri)

        await mongoose.connect(`${uri}/blogs`);
    } catch (error) {
        console.log(error)
    }
}