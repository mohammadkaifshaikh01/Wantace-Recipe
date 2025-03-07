import React, { useState } from "react";
import axios from "axios";
import "./RecipeForm.css";

const RecipeForm = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [category, setCategory] = useState("Vegetarian");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
console.log("1")
    if (!name || !image || !ingredients || !description) {
      setError("All fields are required.");
      return;
    }
    console.log("1")
    const newRecipe = {
      name,
      image,
      ingredients, 
      category,
      description,
    };
    console.log(newRecipe)
    axios.post("http://localhost:5000/add", newRecipe)
      .then(() => {
        alert("Recipe added successfully!");
        setName("");
        setImage("");
        setIngredients("");
        
        setCategory("Vegetarian");
        setDescription("");
        setError("");
      })
      .catch(() => setError("Failed to create recipe."));
  };

  return (
    <div className="recipe-form">
      <h2>Add a New Recipe</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Recipe Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
        <input type="text" placeholder="Ingredients (comma-separated)" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
          <option value="Dessert">Dessert</option>
        </select>
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;
