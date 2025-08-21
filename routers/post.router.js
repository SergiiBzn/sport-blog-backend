import { Router } from "express";
import {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";

const postRouter = Router();

postRouter.get("/", getAllPosts);
postRouter.post("/", createPost);
postRouter.get("/:id", getPostById);
postRouter.put("/:id", updatePost);
postRouter.delete("/:id", deletePost);

export default postRouter;
