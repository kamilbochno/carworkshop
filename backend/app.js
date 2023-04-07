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
const cookieparser = require("cookie-parser");
const https = require("https");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const { response } = require("express"),
  client = new MongoClient(process.env.MONGODB_URI),
  Users = client.db("WorkShopDB").collection("Users"),
  Cars = client.db("WorkShopDB").collection("Cars"),
  SelectCars = client.db("WorkShopDB").collection("SelectCars"),
  NewOffers = client.db("WorkShopDB").collection("NewOffers"),
  CarRepairShopItems = client.db("WorkShopDB").collection("CarRepairShopItems"),
  CarShopItems = client.db("WorkShopDB").collection("CarShopItems"),
  Appointments = client.db("WorkShopDB").collection("Appointments"),
  Employees = client.db("WorkShopDB").collection("Employees"),
  Services = client.db("WorkShopDB").collection("Services"),
  OrderHistory = client.db("WorkShopDB").collection("OrderHistory");

app.use(cors());
app.use(
  bodyParser.json({
    verify: function (req, res, buf) {
      var url = req.originalUrl;
      if (url.startsWith("/api/webhook")) {
        req.rawBody = buf.toString();
      }
    },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieparser());

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

const s3 = new S3Client({
  region: process.env.S3_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_BUCKET_REGION,
  },
  sslEnabled: false,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});
const DASHBOARD = "/dashboard/shop";

app.post("/dashboard/shop/savecart", async (request, response) => {
  try {
    response.cookie("cart", request.body, {
      httpOnly: false,
      sameSite: "None",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    response.status(200).send({
      cart: request.body,
    });
  } catch (err) {
    console.log(err);
    response.status(500).send({
      message: "Internal server error",
    });
  }
});

app.post("/dashboard/shop/getcart", (req, res) => {
  const cart = req.cookies.cart;
  res.status(200).send(cart);
});

app.post("/dashboard/shop/create-checkout-session", async (req, res) => {
  const { items } = req.body;
  const orderId = req.body.orderId;
  console.log(items, orderId);
  const session = await stripe.checkout.sessions.create({
    line_items: items.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: [item.src],
          },
          unit_amount: (Number(item.price) * 100).toFixed(0),
        },
        quantity: item.quantity,
      };
    }),
    mode: "payment",
    payment_intent_data: {
      metadata: {
        orderId,
      },
    },
    success_url: `${DASHBOARD}?success=true`,
    cancel_url: `${DASHBOARD}?canceled=true`,
  });
  res.status(200).send(session.url);
});

app.post("/api/webhook/", (request, response) => {
  const sig = request.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      request.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      const successfullOrderId = paymentIntentSucceeded.metadata.orderId;

      OrderHistory.updateOne(
        { _id: new ObjectId(successfullOrderId) },
        {
          $set: {
            status: "Received payment",
          },
        }
      );

      break;
    case "payment_intent.payment_failed":
      const paymentIntentFailed = event.data.object;
      const failedOrderId = paymentIntentFailed.metadata.orderId;
      OrderHistory.updateOne(
        { _id: new ObjectId(failedOrderId) },
        {
          $set: {
            status: "Payment failed",
          },
        }
      );
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.status(200).send("");
});

app.post("/addUser", async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
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
        FirstName: firstName,
        LastName: lastName,
        Password: encryptedPassword,
        Admin: false,
      });
      return res.status(201).send("User created successfully");
    }
  });
});

app.post("/loginUser", async (request, response) => {
  const { email, password } = request.body;
  console.log(request.body);
  try {
    const user = await Users.findOne({ Email: email });
    if (user) {
      const passwordCheck = await bcrypt.compare(password, user.Password);
      if (!passwordCheck) {
        return response.status(400).send("Wrong email of password! Try again");
      }
      const token = jwt.sign(
        {
          userId: user._id,
          userEmail: user.Email,
          admin: user.Admin,
        },
        "accessToken",
        { expiresIn: "10m" }
      );

      const refreshToken = jwt.sign(
        {
          userId: user._id,
          userEmail: user.Email,
          admin: user.Admin,
        },
        "refreshToken",
        { expiresIn: "1d" }
      );

      response.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 1000 * 60 * 60,
      });
      response.status(200).send({
        message: "Login Successful",
        email: user.Email,
        admin: user.Admin,
        token,
        userId: user._id,
      });
    } else {
      return response.status(400).send("Wrong email of password! Try again");
    }
  } catch (err) {
    console.log(err);
    response.status(500).send({
      message: "Internal server error",
    });
  }
});

app.post("/refresh", (req, res) => {
  if (req.cookies?.jwt) {
    const refreshToken = req.cookies.jwt;

    jwt.verify(refreshToken, "refreshToken", (err) => {
      const decoded = jwt.decode(refreshToken);
      const userId = decoded?.userId;
      const userEmail = decoded?.userEmail;
      const admin = decoded?.admin;
      if (err) {
        return res.status(401).send("Unauthorized");
      } else {
        const accessToken = jwt.sign(
          {
            userId: userId,
            userEmail: userEmail,
            admin: admin,
          },
          "accessToken",
          {
            expiresIn: "10m",
          }
        );
        const userData = {
          accessToken: accessToken,
          admin: admin,
        };
        return res.status(200).send(userData);
      }
    });
  } else {
    return res.status(401).send("Unauthorized");
  }
});

app.get("/logout", async (req, res) => {
  res.clearCookie("jwt");
  return res.status(200).send("Successfully logged out");
});

app.get("/dashboard/cars", async (req, res) => {
  const token = req.cookies.jwt;
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
  const { carBrand, carModel, engine, hp, mileage, vin, year } = req.body;
  const token = req.cookies.jwt;
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
        Year: year,
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
            Year: year,
          });
          return res.status(201).send("Car added successfully!");
        }
      }
    );
  }
});
app.post("/dashboard/cars/edit", async (req, res) => {
  const { carBrand, carModel, engine, hp, mileage, vin, year, carId } =
    req.body;
  const token = req.cookies.jwt;
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
          Year: year,
        },
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

app.get("/dashboard/profile", async (req, res) => {
  const token = req.cookies.jwt;
  console.log(token);
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
  } = req.body;
  const token = req.cookies.jwt;
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
          Street: street,
        },
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
  const token = req.cookies.jwt;
  if (token != null) {
    const decoded = jwt.decode(token);
    const userId = decoded.userId;
    Appointments.find({ userId: userId }).toArray((err, appointment) => {
      if (err) {
        return res.status(500).send("Error");
      }

      if (appointment) {
        return res.status(201).send(appointment);
      }
    });
  }
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
  const {
    carId,
    date,
    hours,
    phone,
    car,
    repairCategory,
    description,
    status,
    client,
  } = req.body;
  const token = req.cookies.jwt;
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
        client,
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
  const {
    name,
    surname,
    phone,
    role,
    salary,
    city,
    email,
    stateProvince,
    street,
    zipPostal,
  } = req.body;

  Employees.insertOne(
    {
      Name: name,
      Surname: surname,
      Phone: phone,
      Role: role,
      Salary: salary,
      City: city,
      Email: email,
      StateProvince: stateProvince,
      Street: street,
      ZipPostal: zipPostal,
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

  Employees.deleteOne(
    { _id: new ObjectId(employeeId) },
    function (err, employee) {
      if (err) {
        return res.status(500).send("Error");
      }

      if (employee) {
        return res.status(200).send("Employee deleted successfully");
      }
    }
  );
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
    employeeId,
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
        ZipPostal: zipPostal,
      },
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
        status: status,
      },
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

  Appointments.deleteOne(
    { _id: new ObjectId(appointmentId) },
    function (err, appointment) {
      if (err) {
        return res.status(500).send("Error");
      }

      if (appointment) {
        return res.status(201).send("Appointment deleted successfully");
      }
    }
  );
});

app.get("/dashboard/services", async (req, res) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (token != null) {
    const decoded = jwt.decode(token);
    const clientId = decoded.userId;
    console.log(clientId);
    Services.find({ clientId: clientId }).toArray((err, service) => {
      if (err) {
        return res.status(500).send("Error");
      }

      if (service) {
        return res.status(200).send(service);
      }
    });
  }
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
  const {
    partsPrice,
    repairPrice,
    date,
    clientId,
    firstName,
    lastName,
    car,
    vin,
    parts,
  } = req.body;

  Services.insertOne(
    {
      partsPrice: partsPrice,
      repairPrice: repairPrice,
      date: date,
      clientId: clientId,
      firstName: firstName,
      lastName: lastName,
      car: car,
      vin: vin,
      parts: parts,
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
  const { date, client, car, repairPrice, partsPrice, vin, serviceId } =
    req.body;
  Services.updateOne(
    { _id: new ObjectId(serviceId) },
    {
      $set: {
        date: date,
        client: client,
        car: car,
        repairPrice: repairPrice,
        partsPrice: partsPrice,
        vin: vin,
      },
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
      },
    }),
  });

app.post(
  "/dashboard/admin/warehouse/carrepairshopitems/add",
  async (req, res) => {
    const { formData } = req.body;

    console.log(req.body);
    const uploadSingle = upload("carworkshop-product-image-upload").single(
      "image"
    );

    uploadSingle(req, res, (err) => {
      if (err)
        return res.status(400).json({ success: false, message: err.message });

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
            key: req.file.key,
          },
          (err, product) => {
            if (err) {
              return res.status(500).send("Error");
            }

            if (product) {
              return res
                .status(201)
                .send("Car repair shop item added successfully!");
            }
          }
        );
      }
    });
  }
);

app.post(
  "/dashboard/admin/warehouse/carrepairshopitems/edit",
  async (req, res) => {
    const { formData } = req.body;

    const uploadSingle = upload("carworkshop-product-image-upload").single(
      "image"
    );

    uploadSingle(req, res, (err) => {
      if (err)
        return res.status(400).json({ success: false, message: err.message });
      console.log(req.file);
      const params = {
        Bucket: "carworkshop-product-image-upload",
        Key: req.body.key,
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
            key: req.file.key,
          },
        },
        function (err, result) {
          if (err) throw err;
          if (result) {
            return res
              .status(201)
              .send("Car repair shop item edited successfully!");
          }
        }
      );
    });
  }
);

app.post("/dashboard/admin/warehouse/carshopitems/add", async (req, res) => {
  const { formData } = req.body;

  console.log(req.body);
  const uploadSingle = upload("carworkshop-product-image-upload").single(
    "image"
  );

  uploadSingle(req, res, (err) => {
    if (err)
      return res.status(400).json({ success: false, message: err.message });

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
          key: req.file.key,
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

  const uploadSingle = upload("carworkshop-product-image-upload").single(
    "image"
  );

  uploadSingle(req, res, (err) => {
    if (err)
      return res.status(400).json({ success: false, message: err.message });
    console.log(req.file);
    const params = {
      Bucket: "carworkshop-product-image-upload",
      Key: req.body.key,
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
          key: req.file.key,
        },
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

app.post(
  "/dashboard/admin/warehouse/carrepairshopitems/delete",
  async (req, res) => {
    const { itemId, key } = req.body;

    if (key) {
      const params = {
        Bucket: "carworkshop-product-image-upload",
        Key: key,
      };
      const command = new DeleteObjectCommand(params);
      await s3.send(command);

      CarRepairShopItems.deleteOne(
        { _id: new ObjectId(itemId) },
        function (err, item) {
          if (err) {
            return res.status(500).send("Error");
          }

          if (item) {
            return res
              .status(201)
              .send("Car repair shop item deleted successfully");
          }
        }
      );
    } else {
      CarRepairShopItems.deleteOne(
        { _id: new ObjectId(itemId) },
        function (err, item) {
          if (err) {
            return res.status(500).send("Error");
          }

          if (item) {
            return res
              .status(201)
              .send("Car repair shop item deleted successfully");
          }
        }
      );
    }
  }
);

app.post("/dashboard/admin/warehouse/carshopitems/delete", async (req, res) => {
  const { itemId, key } = req.body;
  if (key) {
    const params = {
      Bucket: "carworkshop-product-image-upload",
      Key: key,
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
const date = new Date();
const day = date.getDay();
const month = date.getMonth() + 1;
const year = date.getFullYear();
app.post("/dashboard/shop/createorder", async (req, res) => {
  const { items } = req.body;

  const token = req.cookies.jwt;
  const totalPrice = req.body.totalPrice;
  if (token != null) {
    const decoded = jwt.decode(token);
    const userId = decoded.userId;
    OrderHistory.insertOne(
      {
        userId: userId,
        status: "Pending",
        created: day + "." + month + "." + year,
        totalPrice: totalPrice,
        items: { items },
      },
      (err, order) => {
        if (err) {
          return res.status(500).send("Error");
        }

        if (order) {
          return res.status(201).send(order.insertedId);
        }
      }
    );
  }
});

app.get("/dashboard/orderhistory", async (req, res) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (token != null) {
    const decoded = jwt.decode(token);
    const userId = decoded.userId;

    OrderHistory.find({ userId: userId }).toArray((err, item) => {
      if (err) {
        return res.status(500).send("Error");
      }

      if (item) {
        return res.status(200).send(item);
      }
    });
  }
});

app.get("/dashboard/admin/recentpurchases", async (req, res) => {
  OrderHistory.find().toArray((err, item) => {
    if (err) {
      return res.status(500).send("Error");
    }

    if (item) {
      return res.status(200).send(item);
    }
  });
});

app.get("/dashboard/admin/users", async (req, res) => {
  Users.find({ Admin: false }).toArray((err, user) => {
    if (err) {
      return res.status(500).send("Error");
    }

    if (user) {
      return res.status(200).send(user);
    }
  });
});

app.post("/dashboard/admin/recentpurchases/edit", async (req, res) => {
  const { orderId, status } = req.body;
  console.log(orderId);
  OrderHistory.updateOne(
    { _id: new ObjectId(orderId) },
    {
      $set: {
        status: status,
      },
    },
    function (err, result) {
      if (err) throw err;
      if (result) {
        return res.status(200).send("Order edited successfully!");
      }
    }
  );
});

const PORT = process.env.API_PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
