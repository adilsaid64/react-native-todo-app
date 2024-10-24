const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

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
    console.log(`Server running on port ${port}`);
});

const User = require("./models/user")
const Todo = require("./models/todo")
const jwt = require('jsonwebtoken');

app.get('/status', (req, res) => {
    res.status(200).json({
      status: "OK",
      message: "Server is running and healthy",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        console.log("Register endpoint has been hit!")
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
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

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required!" });
        }

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

        res.status(200).json({
            message: "Login successful!",
            token: token,
        });

    } catch (error) {
        console.error("Login Failed!", error);
        res.status(500).json({ message: "Login Failed!" });
    }
});

app.post("/todos/:userId", async(req, res)=>{
    try{
        // const userId = req.params.userId;
        const {title, category, dueDate, status, createdAt, userId} = req.body;

        const newTodo = new Todo({
            title: title,
            category: category,
            dueDate: dueDate,
            status: status,
            createdAt: createdAt,
          });

          newTodo.save();

          console.log(newTodo, userId)

          const user = await User.findById(userId)
          if (!user){
            res.status(404).json({error:`User ${userId} not found!`})
          }
          user?.todos.push(newTodo._id);
          await user.save()
    } catch (error){
        res.status(200).json({message:"todo not added!"})
    }
})