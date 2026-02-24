import { NextFunction, Request, Response } from "express";
import { env } from "../../config/env.ts";

export const apiMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const key = req.headers["x-api-key"]
    if (!key || key !== env["API_KEY"]) {
        throw res.status(401).json({ message: "Unauthorized" })
    }
    next()
}