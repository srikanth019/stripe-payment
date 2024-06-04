const stripe = require("stripe")(process.env.SECRET_KEY);

exports.handleWebHook = async (req, res) => {
  const signature = req.headers["stripe-signature"];
  const endPointSecret = process.env.WEBHOOK_END_POINT_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, endPointSecret);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log("PaymentIntent was successful!", paymentIntent);
      break;
    case "payment_intent.payment_failed":
      const paymentFailed = event.data.object;
      console.log("PaymentIntent failed.", paymentFailed);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};
