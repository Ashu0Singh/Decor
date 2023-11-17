import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
	mongoose.set("strictQuery", true);
    if (!process.env.MONGO_URI) return console.log("Mongo_URI not defined");
    if (isConnected) return console.log(" 😏 Using existing database connection");
    try {
        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log(" 😒 Database Connected");
    } catch (error) {
        console.log(error);
    }

};
