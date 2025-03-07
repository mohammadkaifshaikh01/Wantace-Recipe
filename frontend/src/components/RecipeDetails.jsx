import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import "./RecipeDetails.css";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/all/${id}`)
      .then(response => {
        if (response.data.food) {
          setRecipe(response.data.food);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      })
      .catch(error => console.error("Error fetching recipe:", error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div className="recipe-details">
      <h2>{recipe.name}</h2>
      <img src={recipe.image || "fallback-image.jpg"} alt={recipe.name} />
      <p><strong>Category:</strong> {recipe.category || "Unknown"}</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients?.join(", ") || "Not available"}</p>
      <p><strong>Description:</strong> {recipe.description || "No description provided."}</p>
    </div>
  );
};

export default RecipeDetails;
