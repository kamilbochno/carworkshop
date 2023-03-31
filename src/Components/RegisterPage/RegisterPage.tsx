import React, { useState } from "react";
import Navbar from "../Navbar/Navbar.tsx";
import "./Styles.scss";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Email from "@mui/icons-material/Email";
import Box from "@mui/material/Box";
import Password from "@mui/icons-material/Password";
import CardMedia from "@mui/material/CardMedia";
import image from "../../Images/background5.jpg";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const RegisterPage = () => {
  const navigate = useNavigate();
  interface IFormInput {
    firstName: String;
    lastName: String;
    email: String;
    password: String;
    confirmPassword: String;
  }

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit
  } = useForm<IFormInput>({ criteriaMode: "all" });

  const handleSubmitUser: SubmitHandler<IFormInput> = async (data) => {
    try {
      await axios.post("/addUser", data).then((res) => {
        if (res.status === 201) {
          navigate("/login");
        }
      });
    } catch (err) {
      if (err.response.status === 400) {
        console.log(err.response.data);
      }
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="Main">
        <Container>
          <div className="card-container">
            <div className="card-container__image">
              <CardMedia sx={{ height: "100%" }} component="img" alt="car" src={image} />
            </div>
            <div className="card-container__form">
              <CardContent>
                <Box display="flex" alignItems="center" flexDirection="column">
                  <Typography sx={{ fontSize: 21 }} color="text.secondary" gutterBottom>
                    Welcome to AutoFixSolutions
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" flexDirection="column">
                  <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                        Create an account
                      </h1>
                      <form
                        className="space-y-4 md:space-y-6"
                        onSubmit={handleSubmit(handleSubmitUser)}>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            First name
                          </label>
                          <input
                            type="text"
                            {...register("firstName", {
                              required: "First name is required",
                              pattern: {
                                value: /^[a-z ,.'-]+$/i,
                                message: "Wrong first name format"
                              }
                            })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          />
                          <ErrorMessage
                            errors={errors}
                            name="firstName"
                            render={({ messages }) =>
                              messages &&
                              Object.entries(messages).map(([type, message]) => (
                                <p className="text-sm text-red-500 mb-2" key={type}>
                                  {message}
                                </p>
                              ))
                            }
                          />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            Lastname
                          </label>
                          <input
                            type="text"
                            {...register("lastName", {
                              required: "Last name is required",
                              pattern: {
                                value: /^[a-z ,.'-]+$/i,
                                message: "Wrong last name format"
                              }
                            })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          />
                          <ErrorMessage
                            errors={errors}
                            name="lastName"
                            render={({ messages }) =>
                              messages &&
                              Object.entries(messages).map(([type, message]) => (
                                <p className="text-sm text-red-500 mb-2" key={type}>
                                  {message}
                                </p>
                              ))
                            }
                          />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            Your email
                          </label>
                          <input
                            type="text"
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                message: "Wrong email format"
                              }
                            })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="example@example.com"
                          />
                          <ErrorMessage
                            errors={errors}
                            name="email"
                            render={({ messages }) =>
                              messages &&
                              Object.entries(messages).map(([type, message]) => (
                                <p className="text-sm text-red-500 mb-2" key={type}>
                                  {message}
                                </p>
                              ))
                            }
                          />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            Password
                          </label>
                          <input
                            type="password"
                            {...register("password", {
                              required: "Password is required"
                            })}
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          />
                          <ErrorMessage
                            errors={errors}
                            name="password"
                            render={({ messages }) =>
                              messages &&
                              Object.entries(messages).map(([type, message]) => (
                                <p className="text-sm text-red-500 mb-2" key={type}>
                                  {message}
                                </p>
                              ))
                            }
                          />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            Confirm password
                          </label>
                          <input
                            type="password"
                            {...register("confirmPassword", {
                              required: "Confirm password is required",
                              validate: (value: String) => {
                                if (watch("password") !== value) {
                                  return "Your passwords do no match";
                                }
                              }
                            })}
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          />
                          <ErrorMessage
                            errors={errors}
                            name="confirmPassword"
                            render={({ messages }) =>
                              messages &&
                              Object.entries(messages).map(([type, message]) => (
                                <p className="text-sm text-red-500 mb-2" key={type}>
                                  {message}
                                </p>
                              ))
                            }
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                          Sign up
                        </button>
                        <p className="text-sm font-light text-gray-500">
                          Already registered?{" "}
                          <button
                            onClick={() => navigate("/login")}
                            className="font-medium text-blue-500 hover:underline">
                            Sign in
                          </button>
                        </p>
                      </form>
                    </div>
                  </div>
                </Box>
              </CardContent>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default RegisterPage;
