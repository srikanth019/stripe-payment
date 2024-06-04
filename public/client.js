document.addEventListener("DOMContentLoaded", async () => {
  const stripe = Stripe(
    "pk_test_51OkLWMSD6eh4BZ1jL6biMRvvGtjS4GnvgNCV5ztK6FXfaALIaxseHm5G1Y3MWz5uoTk0rYzthFMdfHOSt206lahU00bsfXVJ8r"
  );
  const elements = stripe.elements();
  const cardElement = elements.create("card");
  cardElement.mount("#card-element");

  const form = document.getElementById("payment-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const { clientSecret } = await fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 2000, currency: "inr" }),
    }).then((r) => r.json());

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    console.log(/PI/, paymentIntent);

    if (error) {
      document.getElementById("error-message").textContent = error.message;
    } else if (paymentIntent.status === "succeeded") {
      document.getElementById("error-message").textContent =
        "Payment succeeded!";
    }
  });
});
