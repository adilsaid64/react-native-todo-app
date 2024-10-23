import express, { Express } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoDBUrl = "mongodb+srv://adilsaid64:NObjoUxbAIFs5BaP@cluster0.cjfnu.mongodb.net/"

mongoose.connect(mongoDBUrl)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB", error.message);
    });

app.listen(port, () => {
    console.log(`Server running on port 3000`);
});

const User = require("./models/user")
const Todo = require("./models/todo")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists!" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create new user with hashed password
        const newUser = new User({
            name,
            email,
            password: hashedPassword, // Store hashed password
        });

        await newUser.save();

        res.status(201).json({ message: `User registered successfully!`, email });
    } catch (error) {
        console.error("Registration Failed!", error);
        res.status(500).json({ message: "Registration Failed!" });
    }
});


app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if both email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required!" });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password!" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password!" });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email }, 
            'verysecretkeythatshouldbeanenvvariableandcryptographic',
            { expiresIn: "1h" }
        );

        console.log("Generated Token: ", token)

        // Respond with success message and the token
        res.status(200).json({
            message: "Login successful!",
            token: token, // Send the JWT token to the client
        });

    } catch (error) {
        console.error("Login Failed!", error);
        res.status(500).json({ message: "Login Failed!" });
    }
});