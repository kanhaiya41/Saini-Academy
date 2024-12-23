import nodemailer from 'nodemailer';
import { Admissions } from '../models/admissions.js';

export const contactUs = async (req, res) => {
    try {
        const { name, email, clas, msj } = req.body;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAILID,
                pass: process.env.MAILPASS
            }
        });
        const mailBody = {
            from: process.env.MAILID,
            to: 'mevadigamers@gmail.com',
            subject: 'new contact was made from coaching classes website',
            html: `
            Name : ${name} <br>
            Email: ${email} <br>
            Class: ${clas} <br>
            Message: ${msj} 
            `
        }
        const info = await transporter.sendMail(mailBody);
        if (info) {
            res.status(200).json({
                success: true,
                message: 'Thank you For Contact🤗'
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: 'something is wrong \n Try again later'
            });
        }
    } catch (error) {
        console.log('while contacting us', error);
        res.status(500).error(error);
    }
}

export const adminssionForm = async (req, res) => {
    const { name, email, number1, number2, clas, address, gred } = req.body;
    try {
        if (!req.file) {
            return res.status(400).json('pic not found');
        }
        if (!name || !email || !number1 || !number2 || !clas || !gred) {
            return res.status(400).json('something is missing! Please cheack');
        }
        const imgUrl = `https://saini-academy.onrender.com/file/${req.file.originalname}`;
        const data = await Admissions({ name, email, number1, number2, clas, gred, pic: imgUrl });
        const ad = await data.save();
        if (ad) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MAILID,
                    pass: process.env.MAILPASS
                }
            });
            const mailBody = {
                from: process.env.MAILID,
                to: 'mevadigamers@gmail.com',
                subject: 'New Admission form submission from coaching classes website',
                html: `
                new form filled for ${gred} from ${name}
                `
            }
            const info = await transporter.sendMail(mailBody);
            return res.status(200).json({
                success: true,
                message: 'Form Submited successfully'
            })
        }
    } catch (error) {
        console.log("while submiting admission form", error);
    }
}