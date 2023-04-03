import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import RegisterPage from "./RegisterPage.tsx";

describe("<RegisterPage />", () => {
  const register = (
    <BrowserRouter>
      <RegisterPage />
    </BrowserRouter>
  );
  test("render firstname input", async () => {
    render(register);
    const inputEl = screen.getByTestId("firstname-input");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "text");
  });

  test("render lastname input", async () => {
    render(register);
    const inputEl = screen.getByTestId("lastname-input");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "text");
  });

  test("render email input", async () => {
    render(register);
    const inputEl = screen.getByTestId("email-input");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "text");
  });

  test("render password input", async () => {
    render(register);
    const inputEl = screen.getByTestId("password-input");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "password");
  });

  test("render confirm password input", async () => {
    render(register);
    const inputEl = screen.getByTestId("confirmpassword-input");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "password");
  });

  test("pass valid firstname to test firstname input field", async () => {
    const user = userEvent.setup();
    render(register);
    const inputEl = screen.getByTestId("firstname-input");
    await user.type(inputEl, "Testing");

    expect(screen.getByTestId("firstname-input")).toHaveValue("Testing");
    expect(screen.queryByTestId("firstname-err-msg")).not.toBeInTheDocument();
  });

  test("pass valid lastname to test lastname input field", async () => {
    const user = userEvent.setup();
    render(register);
    const inputEl = screen.getByTestId("lastname-input");
    await user.type(inputEl, "Testing");

    expect(screen.getByTestId("lastname-input")).toHaveValue("Testing");
    expect(screen.queryByTestId("lastname-err-msg")).not.toBeInTheDocument();
  });

  test("pass valid email to test email input field", async () => {
    const user = userEvent.setup();
    render(register);
    const inputEl = screen.getByTestId("email-input");
    await user.type(inputEl, "test@test.com");

    expect(screen.getByTestId("email-input")).toHaveValue("test@test.com");
    expect(screen.queryByTestId("email-err-msg")).not.toBeInTheDocument();
  });

  test("pass valid password to test password input field", async () => {
    const user = userEvent.setup();
    render(register);
    const inputEl = screen.getByTestId("password-input");
    await user.type(inputEl, "test");

    expect(screen.getByTestId("password-input")).toHaveValue("test");
    expect(screen.queryByTestId("password-err-msg")).not.toBeInTheDocument();
  });

  test("pass valid confirm password to test confirm password input field", async () => {
    const user = userEvent.setup();
    render(register);
    const inputEl = screen.getByTestId("confirmpassword-input");
    await user.type(inputEl, "test");

    expect(screen.getByTestId("confirmpassword-input")).toHaveValue("test");
    expect(screen.queryByTestId("confirmpassword-err-msg")).not.toBeInTheDocument();
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
