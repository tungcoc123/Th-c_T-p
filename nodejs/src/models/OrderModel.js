import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, // Bắt buộc phải có user đặt hàng
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    payment: {
      type: String,
      enum: ["COD", "BANK"],
      default: "COD",
      required: true,
    },
    status: {
      type: String,
      enum: ["processing", "completed", "canceled"],
      default: "processing",
    },
    tongPrice: {
      type: Number,
      required: true,
      default: 0, 
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true, // Mỗi đơn hàng phải có ít nhất 1 sản phẩm
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
