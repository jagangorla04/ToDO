export {};

declare global {
  interface Window {
    Razorpay: jest.Mock;
    
  }

  var Razorpay: jest.Mock;
}

