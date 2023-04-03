import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import ProfileSettings from "./ProfileSettings.tsx";

describe("<ProfileSettings />", () => {
  const profileForm = (
    <BrowserRouter>
      <ProfileSettings />
    </BrowserRouter>
  );
  test("render firstname input", async () => {
    render(profileForm);
    const inputEl = screen.getByTestId("firstname-input");
    expect(inputEl).toBeInTheDocument();
  });

  test("render lastname input", async () => {
    render(profileForm);
    const inputEl = screen.getByTestId("lastname-input");
    expect(inputEl).toBeInTheDocument();
  });

  test("render email input", async () => {
    render(profileForm);
    const inputEl = screen.getByTestId("email-input");
    expect(inputEl).toBeInTheDocument();
  });

  test("render phone number input", async () => {
    render(profileForm);
    const inputEl = screen.getByTestId("phoneNumber-input");
    expect(inputEl).toBeInTheDocument();
  });

  test("render country input", async () => {
    render(profileForm);
    const inputEl = screen.getByTestId("country-input");
    expect(inputEl).toBeInTheDocument();
  });

  test("render street input", async () => {
    render(profileForm);
    const inputEl = screen.getByTestId("street-input");
    expect(inputEl).toBeInTheDocument();
  });

  test("render city input", async () => {
    render(profileForm);
    const inputEl = screen.getByTestId("city-input");
    expect(inputEl).toBeInTheDocument();
  });

  test("render state/province input", async () => {
    render(profileForm);
    const inputEl = screen.getByTestId("stateProvince-input");
    expect(inputEl).toBeInTheDocument();
  });

  test("render zip/postal input", async () => {
    render(profileForm);
    const inputEl = screen.getByTestId("zipPostal-input");
    expect(inputEl).toBeInTheDocument();
  });

  test("pass valid firstname to test firstname input field", async () => {
    const user = userEvent.setup();
    render(profileForm);
    const inputEl = screen.getByTestId("firstname-input");
    await user.type(inputEl, "Testing");

    expect(screen.getByTestId("firstname-input")).toHaveValue("Testing");
  });
});
