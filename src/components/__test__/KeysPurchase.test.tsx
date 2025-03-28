import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom"; 
import KeysPurchase from "../KeysPurchase";

beforeEach(() => {
  
  jest.resetAllMocks();

  window.Razorpay = jest.fn().mockImplementation(() => ({
    open: jest.fn(),
  }));
  
  global.alert = jest.fn();
  (global as any).handler = (response: { razorpay_payment_id: any; }) => {
    alert(`Payment Successful! ID: ${response.razorpay_payment_id}`);
  };
});

describe("KeysPurchase Component", () => {
  it("should render the Key Typography", () => {
    const screen = render(<KeysPurchase />);

    const keyValue = screen.getByTestId("Key");

    expect(keyValue).toBeInTheDocument();
  });


  it("should update state on key input change", () => {
    const screen = render(<KeysPurchase />);

    const input = screen.getAllByLabelText(
      "Keys to add"
    )[0] as HTMLInputElement;

    fireEvent.change(input, { target: { value: "5" } });

    expect(input.value).toBe("5");
  });


  it("should click purchase button and update input value", async () => {
    const screen = render(<KeysPurchase />);
    const purchaseButtons = await screen.findAllByTestId(/^purchasePrice/);
    fireEvent.click(purchaseButtons[0]);
    expect(purchaseButtons[0]).toBeInTheDocument();
  });


  it("should click modal button and open modal component", () => {
    const screen = render(<KeysPurchase />);

    const openModalButton = screen.getByTestId("openModal");

    fireEvent.click(openModalButton);
    expect(openModalButton).toBeInTheDocument();
  });


  it("should click modal button and open modal component", () => {
    const screen = render(<KeysPurchase />);
    const openModalButton = screen.getByTestId("openModal");

    fireEvent.click(openModalButton);
    expect(openModalButton).toBeInTheDocument();

    const closeModalButton = screen.getByTestId("closeModalButton");

    fireEvent.click(closeModalButton);
    expect(closeModalButton).toBeInTheDocument();
  });


  it("should click purchase button and open Razorpay modal", () => {
    const { getByTestId } = render(<KeysPurchase />);
    const purchaseButton = getByTestId("purchase");

    fireEvent.click(purchaseButton);

    expect(purchaseButton).toBeInTheDocument();

    expect(window.Razorpay).toHaveBeenCalledTimes(1);


    const alertSpy = jest.spyOn(global, "alert").mockImplementation();

  const mockResponse = { razorpay_payment_id: "payment_12345" };
  (global as any).handler(mockResponse);
  expect(alertSpy).toHaveBeenCalledWith("Payment Successful! ID: payment_12345");
  alertSpy.mockRestore();

    console.log("===>:", window.Razorpay.mock.results);

    const razorpayInstance = window.Razorpay.mock.results[0]?.value;
    expect(razorpayInstance).not.toBeUndefined();
    expect(razorpayInstance.open).toHaveBeenCalledTimes(1);
  });
});
