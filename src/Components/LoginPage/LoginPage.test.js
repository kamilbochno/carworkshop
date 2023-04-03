import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./LoginPage.tsx";

describe("<LoginPage />", () => {
  test("Should render login form elements", async () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    expect(screen.getByRole("img", { name: "car" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Sign in to your account" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Forgot password?" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
  });

  test("render email input", async () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    const inputEl = screen.getByTestId("email-input");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "text");
  });

  test("pass valid email to test email input field", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    const inputEl = screen.getByTestId("email-input");
    await user.type(inputEl, "test@test.com");

    expect(screen.getByTestId("email-input")).toHaveValue("test@test.com");
    expect(screen.queryByTestId("email-error-msg")).not.toBeInTheDocument();
  });

  test("render password input", async () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    const inputEl = screen.getByTestId("password-input");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "password");
  });

  test("pass valid password to test password input field", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    const inputEl = screen.getByTestId("password-input");
    await user.type(inputEl, "test");

    expect(screen.getByTestId("password-input")).toHaveValue("test");
    expect(screen.queryByTestId("password-err-msg")).not.toBeInTheDocument();
  });
});
/*it("should validate form fields", async () => {
  const mockSave = jest.fn();
  const { user } = setup(
    <BrowserRouter>
      <LoginPage saveData={mockSave} />
    </BrowserRouter>
  );
  await user.type(screen.getByLabelText("Your email", { name: "email" }), "test@test.com");
  await user.type(screen.getByRole("textbox", { name: "password" }), "test");
  await user.click(screen.getByRole("button", { name: "Sign in" }));

  expect(mockSave).not.toBeCalled();
});*/
