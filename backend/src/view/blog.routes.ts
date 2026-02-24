import { Router } from "express";
import { BlogController } from "../controller/blog.ts";
import { apiMiddleware } from "../infrastructure/middleware/key.ts";

const blogRouter = Router()
blogRouter.get("/", BlogController.getAll)
blogRouter.get("/:id", BlogController.getOne)
blogRouter.post("/", apiMiddleware, BlogController.create)
blogRouter.put("/:id", apiMiddleware, BlogController.update)
blogRouter.delete("/:id", apiMiddleware, BlogController.delete)

export default blogRouter 