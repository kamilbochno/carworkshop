import React, { useState } from "react";
import Navbar from "../Navbar/Navbar.tsx";
import axios from "axios";
import { useNavigate } from "react-router";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider.tsx";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CardMedia } from "@mui/material";
import { Button } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import image from "../../Images/background5.jpg";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const { setAuth, isAuthenticated } = useContext<any>(AuthContext);
  const navigate = useNavigate();

  interface IFormInput {
    email: String;
    password: String;
  }

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<IFormInput>({ criteriaMode: "all" });

  const handleSubmitUser: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    try {
      await axios.post("/loginUser", data).then((res) => {
        if (res.status === 200) {
          isAuthenticated();
          navigate("/");
        }
      });
    } catch (err) {
      if (err.response.status === 400) {
        toast.error(err.response.data);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000
        }}
      />
      <div className="Main">
        <Container>
          <div className="card-container max-w-4xl mx-auto">
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
                        Sign in to your account
                      </h1>
                      <form
                        className="space-y-4 md:space-y-6"
                        onSubmit={handleSubmit(handleSubmitUser)}>
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
                        <div className="mx-auto text-right">
                          <a
                            href=""
                            className="text-sm font-medium text-primary-600 hover:underline text-blue-500">
                            Forgot password?
                          </a>
                        </div>
                        <button
                          type="submit"
                          className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                          Sign in
                        </button>
                        <p className="text-sm font-light text-gray-500">
                          Don’t have an account yet?{" "}
                          <button
                            onClick={() => navigate("/register")}
                            className="font-medium text-blue-500 hover:underline">
                            Sign up
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

export default LoginPage;
