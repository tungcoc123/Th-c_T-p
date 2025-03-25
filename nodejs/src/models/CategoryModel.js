import { string, types } from "joi";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategorySchema = new Schema(

  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Category = mongoose.model("Category", CategorySchema);
export default Category;
