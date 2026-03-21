import express from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.Controller.js";

import verifyAccessToken from "../middleware/verifyAccessToken.js";

const router = express.Router();

router.post("/", verifyAccessToken, createTodo);
router.get("/", verifyAccessToken, getTodos);
router.put("/:id", verifyAccessToken, updateTodo);
router.delete("/:id", verifyAccessToken, deleteTodo);

export default router;