import mongoose from "mongoose";

const transactionsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    amount: { type: String, required: true },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true
    },
    category: { type: String, required: true },
    dueDate: Date,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionsSchema);
