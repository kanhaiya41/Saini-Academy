import mongoose from "mongoose";

const dbConnect = () => {
    try {
        mongoose.connect(process.env.MONGO_URL).then(() => {
            console.log('connected to db');
        });
    } catch (error) {
        console.log("while connect to db", error);
    }
}

export default dbConnect;