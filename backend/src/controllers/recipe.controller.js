
import recipeModel from "../model/recipe.model.js"



const createdFood = async (req, res) => {
   try {
      const { name, image, ingredients, category, description } = req.body;
      console.log(req.body);``
      // Validate Required Fields
      if (!name || !image || !ingredients || !category || !description) {
         return res.status(400).json({ message: "Please fill in all fields" });
      }

      // Validate Data Types
      if (typeof name !== "string" || typeof description !== "string" || typeof image !== "string") {
         return res.status(400).json({ message: "fields must be in string"});
      }
      
      

      

      // Create New Food
      const newFood = await recipeModel.create({ name, image, ingredients, category, description });

      return res.status(201).json({ message: "Food created successfully", newFood });

   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error creating food", error: error.message });
   }
};

//get food api

const getFood = async (req, res) => {
   try {
      const getFoods = await recipeModel.find().sort({category:1});
      return res.status(200).json({ message: "Foods retrieved successfully", getFoods })
   } catch (error) {
      return res.status(500).json({ message: "Error retrieving foods", error })
   }
}

const updateFood = async (req, res) => {
   try {
     const { id } = req.params; // Correctly extract id
     const { name, image, ingredients, category, description } = req.body;
 
     // Ensure that food exists before updating
     const updatedFood = await recipeModel.findByIdAndUpdate(
       id,
       { name, image, ingredients, category, description },
       { new: true } 
     );
 
     if (!updatedFood) {
       return res.status(404).json({ message: "Food not found" });
     }
 
     res.json({
       message: "Food updated successfully",
       updatedFood
     });
 
   } catch (error) {
     res.status(500).json({
       message: "Error updating food",
       error: error.message
     });
   }
 };
 
export default { createdFood, getFood , updateFood}