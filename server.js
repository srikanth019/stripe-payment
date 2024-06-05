require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createPaymentIntent } = require("./controllers/payment");
const { handleWebHook } = require("./controllers/webhook");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
// Middleware for parsing JSON bodies for non-webhook routes
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.post("/create-payment-intent", createPaymentIntent);

app.use(
  "/stripe-webhook",
  bodyParser.raw({ type: "application/json" }),
  handleWebHook
);

app.listen(PORT, () => {
  console.log(`HTTPS Server is running on port http://localhost:${PORT}`);
});
