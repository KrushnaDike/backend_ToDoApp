import mongoose from "mongoose";

export const connectDB = ()=> {
    mongoose.connect(process.env.MONGO_URI, {dbName: "backendapi"}).then(()=> {
        console.log("Connected To MongoDB Successfully!");
    }).catch((err)=> {
        console.log(err);
    });
};