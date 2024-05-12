import mongoose from "mongoose";

export const dbConnection = async () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "JOBZEE_MERN_STACK",
    }).then(() => {
        console.log("MongoDB Connected");
    }).catch((err) => {
        console.log(`Error: ${err.message}`);
    })
    
}