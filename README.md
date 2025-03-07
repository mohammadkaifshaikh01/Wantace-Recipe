# Wantace Recipe

## Project Overview
Wantace Recipe is a web application where users can explore various recipes, view details, and manage them efficiently.

## Live Demo
🔗 [Wantace Recipe - Deployed Version](https://wantace-recipe.vercel.app/)

## Repository
🔗 [GitHub Repository](https://github.com/mohammadkaifshaikh01/Wantace-Recipe)

## Features
- View a list of recipes
- Surprise Me (random recipe selection)
- View detailed recipe information
- Add new recipes
- Edit and update recipes
- Drag and drop functionality for sorting recipes
- Dark mode toggle without using Context API

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mohammadkaifshaikh01/Wantace-Recipe.git
   cd Wantace-Recipe
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Frontend Functionality
The frontend is built using **React (Vite)**. It fetches data from the backend API and displays recipes dynamically. The main components are:

### 1. **RecipeList Component**
- Fetches recipes from the backend.
- Displays recipes in a list with images.
- Includes a "Surprise Me" feature for random selection.
- Implements drag-and-drop sorting using `@hello-pangea/dnd`.

### 2. **RecipeDetails Component**
- Displays detailed information about a selected recipe.
- Shows ingredients, category, and description.
- Allows editing and updating recipes.

### 3. **RecipeForm Component**
- Enables users to add new recipes.
- Sends data to the backend API for storage.

### 4. **Dark Mode Feature**
- Saves theme preference using **localStorage**.
- Applies CSS classes dynamically to switch between light and dark modes.

## Backend Functionality
The backend is built using **Node.js (Express) and MongoDB**. It provides API endpoints to manage recipes.

### API Endpoints
- **GET** `/all` - Fetch all recipes from MongoDB.
- **POST** `/add` - Add a new recipe.
- **PATCH** `/update/:id` - Update a recipe.

### Tech Stack
- **Express.js** - Handles API requests.
- **MongoDB (Mongoose)** - Stores recipe data.

## Implementing Dark Mode
Dark mode is implemented using local storage and CSS classes.
```js
const [darkMode, setDarkMode] = useState(
  localStorage.getItem("theme") === "dark"
);

useEffect(() => {
  document.body.classList.toggle("dark-theme", darkMode);
  localStorage.setItem("theme", darkMode ? "dark" : "light");
}, [darkMode]);

const toggleTheme = () => setDarkMode(!darkMode);
```

## Drag and Drop Functionality
Drag-and-drop is implemented using `@hello-pangea/dnd`.

```js
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const onDragEnd = (result) => {
  if (!result.destination) return;
  const items = Array.from(recipes);
  const [reorderedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderedItem);
  setRecipes(items);
};

<DragDropContext onDragEnd={onDragEnd}>
  <Droppable droppableId="recipes">
    {(provided) => (
      <ul ref={provided.innerRef} {...provided.droppableProps}>
        {recipes.map((recipe, index) => (
          <Draggable key={recipe._id} draggableId={recipe._id} index={index}>
            {(provided) => (
              <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                {recipe.name}
              </li>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </ul>
    )}
  </Droppable>
</DragDropContext>
```

## Contributing
Feel free to fork the repository and submit pull requests!

## License
This project is licensed under the MIT License.

