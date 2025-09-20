// test.js
import dotenv from "dotenv";
dotenv.config();

console.log("🔑 Test Key:", process.env.RAZORPAY_KEY_ID);
console.log("🔑 Secret Key:", process.env.RAZORPAY_KEY_SECRET ? "Loaded ✅" : "Missing ❌");
