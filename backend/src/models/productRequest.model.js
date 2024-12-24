import mongoose from "mongoose";

const ProductRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productName: { type: String, required: true },
    message: { type: String, required: true },
    description: { type: String, default: "" },
    status: { type: String, enum: ["open", "fulfilled"], default: "open" },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

export default mongoose.model("ProductRequest", ProductRequestSchema);
