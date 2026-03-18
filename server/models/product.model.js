import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    images: [String],
    description: {
      type: String,
      index: true,
    },
    attributes: {
      size: [
        {
          name: { type: String, required: true },
        },
      ],
      color: [String],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    ratings: {
      average: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true },
);

const ProductModel = mongoose.model("products", productSchema);
export default ProductModel;
