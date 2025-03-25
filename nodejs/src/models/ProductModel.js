import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: false,
    },
    rating1: {
      rate: { type: Number, required: false },
      count: { type: Number, required: false }
    },
    featured: { type: Boolean, default: false },
    format: {
      type: String,
      required: false,
    },
    discount: {
      type: Number,
      required: false,
    },

    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
