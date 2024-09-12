import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";

const Details = () => {
  const { id } = useParams();
  const { recipeDetailsData, setRecipeDetailsData , handleAddFavorite, favoriteList} = useContext(GlobalContext);

  useEffect(() => {
    async function getRecipeDetails() {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );

      const data = await response.json();

      if (data?.data) {
        setRecipeDetailsData(data?.data);
      }
    }
    getRecipeDetails();
  }, []);
  console.log(recipeDetailsData, "recipeDetailsData");

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={recipeDetailsData?.recipe?.image_url}
            className="w-full h-full object:cover block group-hover:scale-105 duration-300"
            alt="recipe-image"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm text-cyan-700 font-medium">
          {recipeDetailsData?.recipe?.publisher}
        </span>
        <h3 className="text-bold text-2xl truncate text-black">
          {recipeDetailsData?.recipe?.title}
        </h3>
        <div>
          <button onClick={()=>handleAddFavorite(recipeDetailsData?.recipe)} className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white">
            {
              favoriteList && favoriteList.length > 0 && favoriteList.findIndex(item=> item.id === recipeDetailsData?.recipe?.id)!== -1 ? 'Remove from Favourites': 'Add to Favourites'
            }
          </button>
        </div>
        <div>
          <span className="text-2xl font-semibold text-black">Ingredients</span>
          <ul className="flex flex-col gap-3">
           {
            recipeDetailsData?.recipe?.ingredients.map(ingredient=> <li>
              <span className="text-sm font-semibold text-black">{ingredient.quantity}</span>
              <span className="text-sm font-semibold text-black"> {ingredient.unit}</span>
            
              <span className="text-medium font-semibold text-black px-2">{ingredient.description}</span>
            </li>)
           }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Details;
