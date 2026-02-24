import express from "express"
import cors from "cors";
import blogRoutes from "./view/blog.routes.ts"
import { env } from "./config/env.ts"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/blogs", blogRoutes)
const PORT = env["PORT"]
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
})