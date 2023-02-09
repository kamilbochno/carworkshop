"use strict";

require('dotenv').config();

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var express = require("express");

var app = express();

var _require = require("mongodb"),
    MongoClient = _require.MongoClient;

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var User = require("./Models/userModel");

var _require2 = require('express'),
    response = _require2.response;

var client = new MongoClient(process.env.URL);
var database = client.db('WorkShopDB').collection('Users');
app.use(bodyParser.json());
app.post("/addUser", function (req, res) {
  var _req$body = req.body,
      email = _req$body.email,
      first_name = _req$body.first_name,
      last_name = _req$body.last_name,
      password = _req$body.password;
  database.findOne({
    Email: email
  }, function _callee(err, user) {
    var encryptedPassword;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            encryptedPassword = null;
            _context.next = 3;
            return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

          case 3:
            encryptedPassword = _context.sent;
            console.log(encryptedPassword);

            if (!err) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(500).send("Error"));

          case 7:
            if (!user) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(400).send("Email already exists"));

          case 9:
            if (user) {
              _context.next = 12;
              break;
            }

            database.insertOne({
              Email: email,
              FirstName: first_name,
              LastName: last_name,
              Password: encryptedPassword
            });
            return _context.abrupt("return", res.status(201).send("User created successfully"));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    });
  });
});
app.post("/loginUser", function _callee2(request, response) {
  var _request$body, email, password, user, passwordCheck, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // check if email exists
          _request$body = request.body, email = _request$body.email, password = _request$body.password;
          console.log(request.body);
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(database.findOne({
            Email: email
          }));

        case 5:
          user = _context2.sent;
          passwordCheck = bcrypt.compare(password, user.Password);

          if (passwordCheck) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", response.status(400).send({
            message: "Passwords does not match"
          }));

        case 9:
          token = jwt.sign({
            userId: user._id,
            userEmail: user.email
          }, "RANDOM-TOKEN", {
            expiresIn: "24h"
          });
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token: token
          });
          _context2.next = 16;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](2);
          response.status(500).send({
            message: "Internal server error",
            err: _context2.t0
          });

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 13]]);
});
var PORT = process.env.API_PORT;
app.listen(PORT, console.log("Server started on port ".concat(PORT)));