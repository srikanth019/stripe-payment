require("dotenv").config();
const express = require("express");
const path = require("path");
const { createPaymentIntent } = require("./controllers/payment");
const { handleWebHook } = require("./controllers/webhook");

const app = express();
const PORT = config.port;

// Middleware for parsing JSON bodies for non-webhook routes
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.post("/create-payment-intent", createPaymentIntent);

// Use the client routes
app.use("/webhook",handleWebHook );

app.listen(PORT, () => {
  console.log(`HTTPS Server is running on port ${PORT}`);
});
