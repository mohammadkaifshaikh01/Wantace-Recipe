import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./src/config/mongoDB.js"
import foodRouter from "./src/routes/food.routes.js"
import logger from "./src/middleware/logger.js"

const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())
app.use(logger)
connectDB()
const PORT = process.env.PORT || 5000

app.get("/" , (req,res)=>{
   res.send("Api Working")
})

app.use(foodRouter)

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`)
   })