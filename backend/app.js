require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express"),
  app = express();
const { MongoClient, ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./Models/userModel");
const { response } = require("express"),
  client = new MongoClient(process.env.URL),
  Users = client.db("WorkShopDB").collection("Users"),
  Cars = client.db("WorkShopDB").collection("Cars"),
  SelectCars = client.db("WorkShopDB").collection("SelectCars"),
  NewOffers = client.db("WorkShopDB").collection("NewOffers");
app.use(bodyParser.json());

app.post("/addUser", async (req, res) => {
  const { email, first_name, last_name, password } = req.body;
  console.log(password);
  let encryptedPassword = null;
  encryptedPassword = await bcrypt.hash(password, 10);
  Users.findOne({ Email: email }, (err, user) => {
    console.log(encryptedPassword);
    console.log(user);
    if (err) {
      return res.status(500).send(res);
    }

    if (user) {
      return res.status(400).send("Email already exists");
    }
    if (!user) {
      Users.insertOne({
        Email: email,
        FirstName: first_name,
        LastName: last_name,
        Password: encryptedPassword
      });
      return res.status(201).send("User created successfully");
    }
  });
});

app.post("/loginUser", async (request, response) => {
  // Check if email exists
  const { email, password } = request.body;
  console.log(request.body);
  try {
    const user = await Users.findOne({ Email: email });
    const passwordCheck = await bcrypt.compare(password, user.Password);

    if (!passwordCheck) {
      return response.status(400).send({
        message: "Passwords does not match"
      });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        userEmail: user.email
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
  } catch (err) {
    console.log(err);
    response.status(500).send({
      message: "Internal server error"
    });
  }
});
app.post("/dashboard/cars", async (req, res) => {
  const { token } = req.body;
  if (token != null) {
    const decoded = jwt.decode(token);
    const userId = decoded.userId;

    Cars.find({ UserId: userId }).toArray((err, car) => {
      console.log(decoded.userId);
      if (err) {
        return res.status(500).send("d");
      }

      if (car) {
        return res.status(200).send(car);
      }
    });
  }
});

app.get("/dashboard/cars/addcar/getCars", async (req, res) => {
  SelectCars.find().toArray((err, car) => {
    if (err) {
      return res.status(500).send("d");
    }

    if (car) {
      return res.status(200).send(car);
    }
  });
});
app.get("/dashboard/newOffers", async (req, res) => {
  NewOffers.find().toArray((err, newOffers) => {
    if (err) {
      return res.status(500).send("No data");
    }

    if (newOffers) {
      return res.status(200).send(newOffers);
    }
  });
});

app.post("/dashboard/cars/addcar", async (req, res) => {
  const { carBrand, carModel, engine, hp, mileage, vin, year, token } = req.body;
  if (token != null) {
    const decoded = jwt.decode(token);
    const userId = decoded.userId;
    Cars.findOne(
      {
        UserId: userId,
        CarBrand: carBrand,
        CarModel: carModel,
        Engine: engine,
        Hp: hp,
        Mileage: mileage,
        VinNumber: vin,
        Year: year
      },
      (err, car) => {
        console.log(carBrand);
        if (err) {
          return res.status(500).send("Error");
        }

        if (car) {
          return res.status(400).send("Car already exists");
        }
        if (!car) {
          Cars.insertOne({
            UserId: userId,
            CarBrand: carBrand,
            CarModel: carModel,
            Engine: engine,
            Hp: hp,
            Mileage: mileage,
            VinNumber: vin,
            Year: year
          });
          return res.status(201).send("Car added successfully!");
        }
      }
    );
  }
});
app.post("/dashboard/cars/edit", async (req, res) => {
  const { carBrand, carModel, engine, hp, mileage, vin, year, token, carId } = req.body;
  if (token != null) {
    Cars.updateOne(
      { _id: new ObjectId(carId) },
      {
        $set: {
          CarBrand: carBrand,
          CarModel: carModel,
          Engine: engine,
          Hp: hp,
          Mileage: mileage,
          VinNumber: vin,
          Year: year
        }
      },
      function (err, result) {
        if (err) throw err;
        if (result) {
          return res.status(201).send("Car edited successfully!");
        }
      }
    );
  }
});

app.post("/dashboard/cars/delete", async (req, res) => {
  const { carId } = req.body;

  Cars.deleteOne({ _id: new ObjectId(carId) }, function (err, car) {
    console.log(carId);
    if (err) {
      return res.status(500).send("d");
    }

    if (car) {
      return res.status(200).send("Car deleted successfully");
    }
  });
});

app.post("/dashboard/profile", async (req, res) => {
  const { token } = req.body;
  if (token != null) {
    const decoded = jwt.decode(token);
    const userId = decoded.userId;

    Users.find({ _id: new ObjectId(userId) }).toArray((err, userInfo) => {
      console.log(decoded.userId);
      if (err) {
        return res.status(500).send("d");
      }

      if (userInfo) {
        return res.status(200).send(userInfo);
      }
    });
  }
});

app.post("/dashboard/profile/edit", async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    city,
    country,
    phoneNumber,
    stateProvince,
    zipPostal,
    street,
    token
  } = req.body;
  if (token != null) {
    const decoded = jwt.decode(token);
    const userId = decoded.userId;
    Users.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          Email: email,
          FirstName: firstName,
          LastName: lastName,
          City: city,
          Country: country,
          PhoneNumber: phoneNumber,
          StateProvince: stateProvince,
          ZipPostal: zipPostal,
          Street: street
        }
      },
      function (err, result) {
        if (err) throw err;
        if (result) {
          return res.status(201).send("Profile edited successfully!");
        }
      }
    );
  }
});

const PORT = process.env.API_PORT;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
