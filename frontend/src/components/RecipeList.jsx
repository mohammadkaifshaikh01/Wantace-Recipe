import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "axios";
import "../components/RecipeList.css";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [randomRecipe, setRandomRecipe] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [updateRecipe, setUpdateRecipe] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/all")
      .then((response) => setRecipes(response.data.getFoods))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  useEffect(() => {
    // Apply dark mode to body element
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const handleSurpriseMe = () => {
    if (recipes.length > 0) {
      const random = recipes[Math.floor(Math.random() * recipes.length)];
      setRandomRecipe(random);
    }
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setUpdateRecipe(null);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
    setUpdateRecipe(null);
  };

  const handleEditClick = () => {
    setUpdateRecipe(selectedRecipe);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateRecipe((prev) => ({ ...prev, [name]: value }));
  };

  // Update Recipe Functionality
  const handleUpdateSubmit = () => {
    axios
      .patch(`http://localhost:5000/update/${updateRecipe._id}`, updateRecipe)
      .then(() => {
        setRecipes((prev) =>
          prev.map((r) => (r._id === updateRecipe._id ? updateRecipe : r))
        );
        closeModal();
      })
      .catch((error) => console.error("Error updating recipe:", error));
  };

  // Handle Drag End
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newRecipes = Array.from(recipes);
    const [movedItem] = newRecipes.splice(result.source.index, 1);
    newRecipes.splice(result.destination.index, 0, movedItem);

    setRecipes(newRecipes);
  };

  return (
    <div className={`recipe-list ${isDarkMode ? 'dark' : ''}`}>
     <button className="toggle-theme" onClick={toggleDarkMode}>
        {isDarkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
      </button>
      <h2>Recipe List</h2>
     
      <button className="surprise-button" onClick={handleSurpriseMe}>
        Surprise Me
      </button>
      

      {randomRecipe && (
        <>
          <div className="random-recipe-title">Today's Special Pick</div>
          <div className="random-recipe">
            <li
              key={randomRecipe?._id || Math.random()}
              onClick={() => handleRecipeClick(randomRecipe)}
              className={isDarkMode ? 'dark-item' : ''}
            >
              <img
                src={randomRecipe?.image || "fallback-image.jpg"}
                alt={randomRecipe?.name || "Unknown"}
              />
              <h3>{randomRecipe?.name || "No Name Available"}</h3>
              <h3>{randomRecipe?.category || "No category Available"}</h3>
            </li>
          </div>
        </>
      )}

      {/* Drag and Drop List */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="recipes">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {recipes.length > 0 ? (
                recipes.map((recipe, index) => (
                  <Draggable key={recipe._id} draggableId={recipe._id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => handleRecipeClick(recipe)}
                        className={isDarkMode ? 'dark-item' : ''}
                      >
                        <img
                          src={recipe?.image || "fallback-image.jpg"}
                          alt={recipe?.name || "Unknown"}
                        />
                        <h3>{recipe?.name || "No Name Available"}</h3>
                        <h3 style={{
                          fontSize:"12px",
                          marginTop:"-6px"

                        }}>{recipe?.category || "No category Available"}</h3>
                      </li>
                    )}
                  </Draggable>
                ))
              ) : (
                <p>No recipes found.</p>
              )}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      {/* Modal for viewing/editing recipe */}
      {selectedRecipe && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className={`modal-content ${isDarkMode ? 'dark-modal' : ''}`} onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>

            {!updateRecipe ? (
              <>
                <h2>{selectedRecipe.name}</h2>
                <img
                  src={selectedRecipe.image || "fallback-image.jpg"}
                  alt={selectedRecipe.name}
                />
                <p>
                  <strong style={{
                    color:"black"
                  }} className={isDarkMode ? 'dark-text' : ''}>Category:</strong>{" "}
                  {selectedRecipe.category || "Unknown"}
                </p>
                <p>
                  <strong style={{
                    color:"black"
                  }} className={isDarkMode ? 'dark-text' : ''}>Ingredients:</strong>{" "}
                  {selectedRecipe.ingredients || "Not available"}
                </p>
                <p>
                  <strong style={{
                    color:"black"
                  }} className={isDarkMode ? 'dark-text' : ''}>Description:</strong>{" "}
                  {selectedRecipe.description || "No description provided."}
                </p>
                <button onClick={handleEditClick}>Edit Recipe</button>
              </>
            ) : (
              <>
                <div className="edit-recipe-container">
                  <h2 className="edit-recipe-title">Edit Recipe</h2>

                  <label className="edit-recipe-label">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={updateRecipe.name}
                    onChange={handleUpdateChange}
                    className={`edit-recipe-input ${isDarkMode ? 'dark-input' : ''}`}
                  />

                  <label className="edit-recipe-label">Image URL:</label>
                  <input
                    type="text"
                    name="image"
                    value={updateRecipe.image}
                    onChange={handleUpdateChange}
                    className={`edit-recipe-input ${isDarkMode ? 'dark-input' : ''}`}
                  />

                  <label className="edit-recipe-label">Category:</label>
                  <input
                    type="text"
                    name="category"
                    value={updateRecipe.category}
                    onChange={handleUpdateChange}
                    className={`edit-recipe-input ${isDarkMode ? 'dark-input' : ''}`}
                  />

                  <label className="edit-recipe-label">Ingredients:</label>
                  <input
                    type="text"
                    name="ingredients"
                    value={updateRecipe.ingredients}
                    onChange={handleUpdateChange}
                    className={`edit-recipe-input ${isDarkMode ? 'dark-input' : ''}`}
                  />

                  <label className="edit-recipe-label">Description:</label>
                  <textarea
                    name="description"
                    value={updateRecipe.description}
                    onChange={handleUpdateChange}
                    className={`edit-recipe-textarea ${isDarkMode ? 'dark-input' : ''}`}
                  ></textarea>

                  <button
                    onClick={handleUpdateSubmit}
                    className="edit-recipe-button"
                  >
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeList;