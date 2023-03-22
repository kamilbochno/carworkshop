require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express"),
  app = express();
const { MongoClient, ObjectId } = require("mongodb");
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./Models/userModel");
const { response } = require("express"),
  client = new MongoClient(process.env.URL),
  Users = client.db("WorkShopDB").collection("Users"),
  Cars = client.db("WorkShopDB").collection("Cars"),
  SelectCars = client.db("WorkShopDB").collection("SelectCars"),
  NewOffers = client.db("WorkShopDB").collection("NewOffers"),
  CarRepairShopItems = client.db("WorkShopDB").collection("CarRepairShopItems"),
  CarShopItems = client.db("WorkShopDB").collection("CarShopItems"),
  Appointments = client.db("WorkShopDB").collection("Appointments"),
  Employees = client.db("WorkShopDB").collection("Employees"),
  Services = client.db("WorkShopDB").collection("Services");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const s3 = new S3Client({
  region: process.env.S3_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_BUCKET_REGION
  },
  sslEnabled: false,
  s3ForcePathStyle: true,
  signatureVersion: "v4"
});

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

app.get("/dashboard/appointments", async (req, res) => {
  Appointments.find().toArray((err, appointment) => {
    if (err) {
      return res.status(500).send("Error");
    }

    if (appointment) {
      return res.status(201).send(appointment);
    }
  });
});

app.get("/dashboard/shop/carshopitems", async (req, res) => {
  CarShopItems.find().toArray((err, item) => {
    if (err) {
      return res.status(500).send("Error");
    }

    if (item) {
      return res.status(201).send(item);
    }
  });
});

app.post("/dashboard/appointment/add", async (req, res) => {
  const { token, carId, date, hours, phone, car, repairCategory, description, status, client } =
    req.body;
  if (token != null) {
    const decoded = jwt.decode(token);
    const userId = decoded.userId;
    Appointments.insertOne(
      {
        userId: userId,
        carId: carId,
        date: date,
        hours: hours,
        phone: phone,
        car: car,
        repairCategory: repairCategory,
        description: description,
        status: status,
        client
      },
      (err, appointment) => {
        if (err) {
          return res.status(500).send("Error");
        }

        if (appointment) {
          return res.status(201).send("Appointment created successfully!");
        }
      }
    );
  }
});

app.get("/dashboard/admin/employees", async (req, res) => {
  Employees.find().toArray((err, employee) => {
    if (err) {
      return res.status(500).send("Error");
    }

    if (employee) {
      return res.status(201).send(employee);
    }
  });
});

app.post("/dashboard/admin/employees/add", async (req, res) => {
  const { name, surName, phone, role, salary, city, email, stateProvince, street, zipPostal } =
    req.body;

  Employees.insertOne(
    {
      Name: name,
      Surname: surName,
      Phone: phone,
      Role: role,
      Salary: salary,
      City: city,
      Email: email,
      StateProvince: stateProvince,
      Street: street,
      ZipPostal: zipPostal
    },
    (err, appointment) => {
      if (err) {
        return res.status(500).send("Error");
      }

      if (appointment) {
        return res.status(201).send("Employee added successfully!");
      }
    }
  );
});

app.post("/dashboard/admin/employees/delete", async (req, res) => {
  const { employeeId } = req.body;

  Employees.deleteOne({ _id: new ObjectId(employeeId) }, function (err, employee) {
    if (err) {
      return res.status(500).send("Error");
    }

    if (employee) {
      return res.status(200).send("Employee deleted successfully");
    }
  });
});

app.post("/dashboard/admin/employees/edit", async (req, res) => {
  const {
    name,
    surName,
    phone,
    city,
    email,
    stateProvince,
    street,
    zipPostal,
    role,
    salary,
    employeeId
  } = req.body;
  Employees.updateOne(
    { _id: new ObjectId(employeeId) },
    {
      $set: {
        Name: name,
        Surname: surName,
        Phone: phone,
        Role: role,
        Salary: salary,
        City: city,
        Email: email,
        StateProvince: stateProvince,
        Street: street,
        ZipPostal: zipPostal
      }
    },
    function (err, result) {
      if (err) throw err;
      if (result) {
        return res.status(201).send("Employee edited successfully!");
      }
    }
  );
});

app.get("/dashboard/admin/appointments", async (req, res) => {
  Appointments.find().toArray((err, appointment) => {
    if (err) {
      return res.status(500).send("Error");
    }

    if (appointment) {
      return res.status(201).send(appointment);
    }
  });
});

app.post("/dashboard/admin/appointments/edit", async (req, res) => {
  const { description, status, appointmentId } = req.body;
  Appointments.updateOne(
    { _id: new ObjectId(appointmentId) },
    {
      $set: {
        description: description,
        status: status
      }
    },
    function (err, result) {
      if (err) throw err;
      if (result) {
        return res.status(201).send("Appointment edited successfully!");
      }
    }
  );
});

app.post("/dashboard/admin/appointments/delete", async (req, res) => {
  const { appointmentId } = req.body;

  Appointments.deleteOne({ _id: new ObjectId(appointmentId) }, function (err, appointment) {
    if (err) {
      return res.status(500).send("Error");
    }

    if (appointment) {
      return res.status(201).send("Appointment deleted successfully");
    }
  });
});

app.get("/dashboard/admin/services", async (req, res) => {
  Services.find().toArray((err, service) => {
    if (err) {
      return res.status(500).send("Error");
    }

    if (service) {
      return res.status(201).send(service);
    }
  });
});

app.post("/dashboard/admin/services/add", async (req, res) => {
  const { date, client, car, repairPrice, partsPrice, vin } = req.body;

  Services.insertOne(
    {
      date: date,
      client: client,
      car: car,
      repairPrice: repairPrice,
      partsPrice: partsPrice,
      vin: vin
    },
    (err, service) => {
      if (err) {
        return res.status(500).send("Error");
      }

      if (service) {
        return res.status(201).send("Service added successfully!");
      }
    }
  );
});

app.post("/dashboard/admin/services/edit", async (req, res) => {
  const { date, client, car, repairPrice, partsPrice, vin, serviceId } = req.body;
  Services.updateOne(
    { _id: new ObjectId(serviceId) },
    {
      $set: {
        date: date,
        client: client,
        car: car,
        repairPrice: repairPrice,
        partsPrice: partsPrice,
        vin: vin
      }
    },
    function (err, result) {
      if (err) throw err;
      if (result) {
        return res.status(200).send("Service edited successfully!");
      }
    }
  );
});

app.post("/dashboard/admin/services/delete", async (req, res) => {
  const { serviceId } = req.body;

  Services.deleteOne({ _id: new ObjectId(serviceId) }, function (err, service) {
    if (err) {
      return res.status(500).send("Error");
    }

    if (service) {
      return res.status(200).send("Service deleted successfully");
    }
  });
});

app.get("/dashboard/admin/warehouse/carshopitems", async (req, res) => {
  CarShopItems.find().toArray((err, item) => {
    if (err) {
      return res.status(500).send("Error");
    }

    if (item) {
      return res.status(201).send(item);
    }
  });
});

app.get("/dashboard/admin/warehouse/carrepairshopitems", async (req, res) => {
  CarRepairShopItems.find().toArray((err, item) => {
    if (err) {
      return res.status(500).send("Error");
    }

    if (item) {
      return res.status(201).send(item);
    }
  });
});

const upload = (bucketName) =>
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: function (req, image, cb) {
        cb(null, { fieldName: image.fieldname });
      },
      key: function (req, image, cb) {
        cb(null, `${Date.now()}-${image.originalname}`);
      }
    })
  });

app.post("/dashboard/admin/warehouse/carrepairshopitems/add", async (req, res) => {
  const { formData } = req.body;

  console.log(req.body);
  const uploadSingle = upload("carworkshop-product-image-upload").single("image");

  uploadSingle(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });

    console.log(req.file.key);
    if (res) {
      CarRepairShopItems.insertOne(
        {
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          quantity: req.body.quantity,
          src: req.file.location,
          category: req.body.category,
          key: req.file.key
        },
        (err, product) => {
          if (err) {
            return res.status(500).send("Error");
          }

          if (product) {
            return res.status(201).send("Car repair shop item added successfully!");
          }
        }
      );
    }
  });
});

app.post("/dashboard/admin/warehouse/carrepairshopitems/edit", async (req, res) => {
  const { formData } = req.body;

  const uploadSingle = upload("carworkshop-product-image-upload").single("image");

  uploadSingle(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });
    console.log(req.file);
    const params = {
      Bucket: "carworkshop-product-image-upload",
      Key: req.body.key
    };
    const command = new DeleteObjectCommand(params);
    s3.send(command);

    CarRepairShopItems.updateOne(
      { _id: new ObjectId(req.body.itemId) },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          quantity: req.body.quantity,
          src: req.file.location,
          category: req.body.category,
          key: req.file.key
        }
      },
      function (err, result) {
        if (err) throw err;
        if (result) {
          return res.status(201).send("Car repair shop item edited successfully!");
        }
      }
    );
  });
});

app.post("/dashboard/admin/warehouse/carshopitems/add", async (req, res) => {
  const { formData } = req.body;

  console.log(req.body);
  const uploadSingle = upload("carworkshop-product-image-upload").single("image");

  uploadSingle(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });

    console.log(req.file.key);
    if (res) {
      CarShopItems.insertOne(
        {
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          quantity: req.body.quantity,
          src: req.file.location,
          category: req.body.category,
          key: req.file.key
        },
        (err, product) => {
          if (err) {
            return res.status(500).send("Error");
          }

          if (product) {
            return res.status(201).send("Car shop item added successfully!");
          }
        }
      );
    }
  });
});

app.post("/dashboard/admin/warehouse/carshopitems/edit", async (req, res) => {
  const { formData } = req.body;

  const uploadSingle = upload("carworkshop-product-image-upload").single("image");

  uploadSingle(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });
    console.log(req.file);
    const params = {
      Bucket: "carworkshop-product-image-upload",
      Key: req.body.key
    };
    const command = new DeleteObjectCommand(params);
    s3.send(command);

    CarShopItems.updateOne(
      { _id: new ObjectId(req.body.itemId) },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          quantity: req.body.quantity,
          src: req.file.location,
          category: req.body.category,
          key: req.file.key
        }
      },
      function (err, result) {
        if (err) throw err;
        if (result) {
          return res.status(201).send("Car shop item edited successfully!");
        }
      }
    );
  });
});

app.post("/dashboard/admin/warehouse/carrepairshopitems/delete", async (req, res) => {
  const { itemId, key } = req.body;

  if (key) {
    const params = {
      Bucket: "carworkshop-product-image-upload",
      Key: key
    };
    const command = new DeleteObjectCommand(params);
    await s3.send(command);

    CarRepairShopItems.deleteOne({ _id: new ObjectId(itemId) }, function (err, item) {
      if (err) {
        return res.status(500).send("Error");
      }

      if (item) {
        return res.status(201).send("Car repair shop item deleted successfully");
      }
    });
  } else {
    CarRepairShopItems.deleteOne({ _id: new ObjectId(itemId) }, function (err, item) {
      if (err) {
        return res.status(500).send("Error");
      }

      if (item) {
        return res.status(201).send("Car repair shop item deleted successfully");
      }
    });
  }
});

app.post("/dashboard/admin/warehouse/carshopitems/delete", async (req, res) => {
  const { itemId, key } = req.body;
  if (key) {
    const params = {
      Bucket: "carworkshop-product-image-upload",
      Key: key
    };
    const command = new DeleteObjectCommand(params);
    await s3.send(command);

    CarShopItems.deleteOne({ _id: new ObjectId(itemId) }, function (err, item) {
      if (err) {
        return res.status(500).send("Error");
      }

      if (item) {
        return res.status(201).send("Car shop item deleted successfully");
      }
    });
  } else {
    CarShopItems.deleteOne({ _id: new ObjectId(itemId) }, function (err, item) {
      if (err) {
        return res.status(500).send("Error");
      }

      if (item) {
        return res.status(201).send("Car shop item deleted successfully");
      }
    });
  }
});

const PORT = process.env.API_PORT;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
