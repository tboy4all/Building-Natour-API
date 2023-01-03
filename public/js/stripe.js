/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const Stripe = require('stripe');
// import { loadStripe } from '@stripe/stripe-js';
// const stripe = Stripe(
//   'pk_test_51MK2c1KaCu9yH5TV2sS5fXxFJUZA8uULB5VN6CFWhxZs50xxvOAmw3sy6wpP8N9ZXyz0UCUFKff0SoPEZ6oMkcgc0024lvA8dD'
// );
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const sessionResponse = await axios.get(
      // `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
      `/api/v1/bookings/checkout-session/${tourId}` // for production
    );
    const session = sessionResponse.data.session;
    console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      // sessionId: session.data.session.id,
      sessionId: session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
