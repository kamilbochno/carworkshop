import { render, screen } from "@testing-library/react";
import Footer from "./Footer.tsx";

test("renders links", () => {
  render(<Footer />);
  expect(screen.getByText("About")).toBeInTheDocument();
  expect(screen.getByText("Our Services")).toBeInTheDocument();
  expect(screen.getByText("Stats")).toBeInTheDocument();
  expect(screen.getByText("Team")).toBeInTheDocument();
  expect(screen.getByText("Reviews")).toBeInTheDocument();
  expect(screen.getByText("Contact")).toBeInTheDocument();
  expect(screen.getByText("Github")).toBeInTheDocument();
  expect(screen.getByText("Facebook")).toBeInTheDocument();
  expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
  expect(screen.getByText("Terms & Conditions")).toBeInTheDocument();
});
