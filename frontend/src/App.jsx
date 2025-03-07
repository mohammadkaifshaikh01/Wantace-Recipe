
import {Router ,Route ,Routes} from "react-router-dom"
import RecipeList from './components/RecipeList'
import RecipeDetails from './components/RecipeDetails'
import RecipeForm from './components/RecipeForm'
import Navbar from "./components/Navbar"

function App() {
  

  return (
    <>
 <Navbar />
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/add-recipe" element={<RecipeForm />} />
      </Routes>
   

    </>
  )
}

export default App
