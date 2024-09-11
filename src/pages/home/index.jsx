import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item/RecipeItem";
 
const Home = () => {
  const { recipeList, loading } = useContext(GlobalContext);
 
  if(loading) return <div>Loading ...Please wait</div>
  
  return (
    <div className="py-8 container mx-auto flex flex-wrap justfy-center">
      {recipeList && recipeList.length > 0
        ? recipeList.map(item => <RecipeItem item={item} />)
        : <div>
          <p className="text-4xl text-xl text-center text-black font-extrabold">Nothing to show. Please enter Search</p>
        </div>
          }
    </div>
  );
};

export default Home;
