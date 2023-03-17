import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
      max: 400,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    comment: {
      type: Array,
      default: [],
    }
  },
  { timestamps: true }
);
export const PostModel = mongoose.model("Post", schema);
