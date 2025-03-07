import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
   name:{type:String,required:true},
   image:{type:String , required :true},
   ingredients:{type:String,required:true},
   category: {
      type: String,
      enum: ["Vegetarian", "Non-Vegetarian", "Vegan", "Dessert"],
      required: true,
    },
    description:{
      type:String,required:true
    }
},{timestamps:true})

const recipeModel = mongoose.model("recipe" , recipeSchema)
export default recipeModel