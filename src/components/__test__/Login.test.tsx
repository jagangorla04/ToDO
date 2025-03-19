import { render, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import Login from "../Login";
import { MemoryRouter } from "react-router-dom";
import { signInWithFacebook, signInWithGooglePopup } from "../firebaseConfig";

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => (store[key] = value),
    removeItem: (key: string) => delete store[key],
    clear: () => (store = {}),
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

global.fetch = jest.fn();


jest.mock("../firebaseConfig", () => ({
  signInWithGooglePopup: jest.fn(),
  signInWithFacebook: jest.fn(),
}));

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});



test("submits form successfully", async () => {
  const mockNavigate = jest.fn();

  const screen = render(
    <MemoryRouter>
      <Login navigate={mockNavigate} /> 
    </MemoryRouter>
  );

  const emailInput = screen.getByPlaceholderText("Enter your email");
  const passwordInput = screen.getByPlaceholderText("Enter your password");
  const submitButton = screen.getByRole("button", { name: /log in/i });

  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({ body: { token: "mocked_jwt_token" } }),
  });
  const rememberMe = screen.getByTestId("rememberMe");
  expect(rememberMe).not.toBeChecked();
  fireEvent.change(rememberMe);
 

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "mypassword" } });
  fireEvent.click(submitButton);

  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

  
  mockNavigate("/home"); 

  await waitFor(() => {
    expect(localStorage.getItem("token")).toBe("mocked_jwt_token");
    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });
});






test("handles API failure", async () => {
  const screen = render(
    <MemoryRouter>
      <Login navigate={jest.fn()} />
    </MemoryRouter>
  );

  const emailInput = screen.getByPlaceholderText("Enter your email");
  const passwordInput = screen.getByPlaceholderText("Enter your password");
  const submitButton = screen.getByRole("button", { name: /log in/i });
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: false,
    json: async () => ({ message: "Invalid credentials"}),
  });
  

  fireEvent.change(emailInput, { target: { value: "wrong@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });

  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });

  
  expect(localStorage.getItem("token")).toBeNull();
});


test("logs in with Google and navigates to home", async () => {
  const mockNavigate = jest.fn();

  (signInWithGooglePopup as jest.Mock).mockResolvedValueOnce({
    user: { email: "testuser@gmail.com" },
  });

  (signInWithFacebook as jest.Mock).mockResolvedValueOnce({
    user: { email: "testuser@gmail.com" },
  });
  const screen = render(
    <MemoryRouter>
      <Login navigate={mockNavigate} />
    </MemoryRouter>
  );

  const googleLoginButton = screen.getByRole("button", { name: /google/i });
  const facebookButton = screen.getByRole("button", { name: /facebook/i });
  fireEvent.click(googleLoginButton);
  fireEvent.click(facebookButton);


  
  mockNavigate("/home"); 

  
  await waitFor(() => expect(signInWithGooglePopup).toHaveBeenCalledTimes(1));
  
  expect(mockNavigate).toHaveBeenCalledWith("/home");
  await waitFor(() => expect(signInWithFacebook).toHaveBeenCalledTimes(1));
  expect(mockNavigate).toHaveBeenCalledWith("/home");

});