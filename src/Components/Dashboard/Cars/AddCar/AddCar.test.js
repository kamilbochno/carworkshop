import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import AddCar from "./AddCar.tsx";

describe("<ProfileSettings />", () => {
  const addCar = (
    <BrowserRouter>
      <AddCar />
    </BrowserRouter>
  );
  test("render carBrand input", async () => {
    render(addCar);
    const inputEl = screen.getByTestId("carBrand-input");
    expect(inputEl).toBeInTheDocument();
  });

  test("render carModel input", async () => {
    render(addCar);
    const inputEl = screen.getByTestId("carModel-input");
    expect(inputEl).toBeInTheDocument();
  });

  test("render engine input", async () => {
    render(addCar);
    const inputEl = screen.getByTestId("engine-input");
    expect(inputEl).toBeInTheDocument();
  });

  test("render hp input", async () => {
    render(addCar);
    const inputEl = screen.getByTestId("hp-input");
    expect(inputEl).toBeInTheDocument();
  });

  test("render year input", async () => {
    render(addCar);
    const inputEl = screen.getByTestId("year-input");
    expect(inputEl).toBeInTheDocument();
  });

  test("render mileage input", async () => {
    render(addCar);
    const inputEl = screen.getByTestId("street-input");
    expect(inputEl).toBeInTheDocument();
  });

  test("render vin input", async () => {
    render(addCar);
    const inputEl = screen.getByTestId("vin-input");
    expect(inputEl).toBeInTheDocument();
  });
});
