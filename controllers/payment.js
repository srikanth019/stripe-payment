const stripe = require("stripe")(process.env.SECRET_KEY);
exports.createPaymentIntent = async (req, res) => {
  console.log(/b/,req.body);
  const {amount, currency} = req.body

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      description: 'Software development services',
      shipping: {
        name: 'Jenny Rosen',
        address: {
          line1: '510 Townsend St',
          postal_code: '98140',
          city: 'San Francisco',
          state: 'CA',
          country: 'US',
        },
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });
    console.log(/p/, paymentIntent);

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
