import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema({
    name: String,
    email: String,
    number1: String,
    number2: String,
    clas: String,
    address: String,
    gred: String,
    pic: String
});

export const Admissions = new mongoose.model('admission-Forms', admissionSchema);