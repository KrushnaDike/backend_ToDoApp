import mongoose from "mongoose";

export const connectDB = ()=> {
    mongoose.connect(process.env.MONGO_URI, {dbName: "backendapi"}).then((c)=> {
        console.log(`Connected To MongoDB Successfully with ${c.connection.host}!`);
    }).catch((err)=> {
        console.log(err);
    });
};