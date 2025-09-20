// routes/payment.js
import express from "express";
import Razorpay from "razorpay";

const router = express.Router();

// ✅ Initialize Razorpay instance (keys are now guaranteed to be available)
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @route   POST /api/payment/create-order
// @desc    Create Razorpay order
router.post("/create-order", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "❌ Amount is required" });
    }

    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`,
    };

    console.log("📦 Creating Razorpay order:", options);

    const order = await razorpay.orders.create(options);

    console.log("✅ Order created:", order.id);

    res.status(200).json(order);
  } catch (err) {
    console.error("❌ Error creating Razorpay order:", err.message);
    res.status(500).json({ error: "Failed to create order" });
  }
});

export default router;