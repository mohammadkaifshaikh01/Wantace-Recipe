import express from "express"
import recipeController from "../controllers/recipe.controller.js"


const foodRouter = express.Router()

foodRouter.post("/add", recipeController.createdFood)
foodRouter.get("/all", recipeController.getFood)
foodRouter.patch("/update/:id", recipeController.updateFood)


export default foodRouter