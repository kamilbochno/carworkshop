require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require("./Models/userModel");
const { response } = require('express');
const client = new MongoClient(process.env.URL);
const Users = client.db('WorkShopDB').collection('Users');
const Cars = client.db('WorkShopDB').collection('Cars');
const SelectCars = client.db('WorkShopDB').collection('SelectCars')
app.use(bodyParser.json());

app.post("/addUser", async (req, res) => {
    const { email, first_name, last_name, password } = req.body;
    console.log( password )
    let encryptedPassword = null;
    encryptedPassword = await bcrypt.hash(password, 10);
    Users.findOne({ Email: email }, (err, user) => {
        console.log(encryptedPassword)
        console.log(user)
        if (err) return res.status(500).send(res);

        if (user) {
            return res.status(400).send("Email already exists");
        }
        if (!user) {
            Users.insertOne(
                {
                    Email: email,
                    FirstName: first_name,
                    LastName: last_name,
                    Password: encryptedPassword,
                }
            )
            return res.status(201).send("User created successfully");
        }
    })
});

app.post("/loginUser", async (request, response) => {
    // check if email exists
        const { email, password } = request.body;
    console.log(request.body)
    try {
        const user = await Users.findOne({ Email: email })
        const passwordCheck = await bcrypt.compare(password, user.Password)

        if(!passwordCheck) {
            return response.status(400).send({
            message: "Passwords does not match",
            });
        }
            const token = jwt.sign(
                {
                userId: user._id,
                userEmail: user.email,
                },
                "RANDOM-TOKEN",
                { expiresIn: "10s" }
            );
                response.status(200).send({
                message: "Login Successful",
                email: user.email,
                token,
                userId: user._id
            });
        }
        catch(err) {
            console.log(err)
            response.status(500).send({
                message: "Internal server error",
                
            });
        }}
    )
app.post("/dashboard/cars", async (req, res) => {
    const { token }  = req.body;
    if (token != null) {
        const decoded = jwt.decode(token);
        let userId = decoded.userId

        Cars.find({UserId: userId}).toArray(function (err, car) {
            console.log(decoded.userId)
            if (err) return res.status(500).send("d");
    
            if (car) {
                return res.status(200).send(car);
            }
        })
    }
})

app.get("/dashboard/cars/addcar/getCars", async (req, res) => {

        SelectCars.find().toArray(function (err, car) {
            if (err) return res.status(500).send("d");
    
            if (car) {
                return res.status(200).send(car);
            }
        })
    }
)
const PORT = process.env.API_PORT;

app.listen(PORT, console.log(`Server started on port ${PORT}`));