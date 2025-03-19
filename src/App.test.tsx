import { render, screen } from "@testing-library/react";
import App from "./App"; 

test("renders the Login component by default", () => {
  render(<App />); 

  expect(screen.getByText(/Welcome to/i)).toBeInTheDocument();
});
