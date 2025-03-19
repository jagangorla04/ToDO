import React, { Component } from "react";
import { loadStripe, Stripe, PaymentRequest } from "@stripe/stripe-js";
import { Elements, PaymentRequestButtonElement } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51R3zD02UZOZ2e3ejRFuNgmZFKdDWvm538qVtACwZIrzV8uBIhLWE4s0b7Sr4uRIMZWFQVw2Pz6dnnzOiAW50IdmY00LYJDo2rm");

interface State {
  stripe: Stripe | null;
  paymentRequest: PaymentRequest | null;
}

class GooglePayCheckout extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      stripe: null,
      paymentRequest: null,
    };
  }

  async componentDidMount() {
    const stripe = await stripePromise;
    if (!stripe) return;

    const paymentRequest = stripe.paymentRequest({
      country: "US",
      currency: "usd",
      total: {
        label: "Total Amount",
        amount: 1000, 
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });


    const result = await paymentRequest.canMakePayment();
    if (result) {
      this.setState({ stripe, paymentRequest });
    }
  }

  render() {
    const { stripe, paymentRequest } = this.state;

    return (
      <Elements stripe={stripe}>
        <div>
          {paymentRequest ? (
            <PaymentRequestButtonElement options={{ paymentRequest }} />
          ) : (
            <p>Google Pay is not available.</p>
          )}
        </div>
      </Elements>
    );
  }
}

export default GooglePayCheckout;
