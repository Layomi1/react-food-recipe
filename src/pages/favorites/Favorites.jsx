import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item/RecipeItem";

const Favorites = () => {
  const { favoriteList} = useContext(GlobalContext);


  return (
    <div className="py-8 container mx-auto flex flex-wrap justfy-center">
      {favoriteList && favoriteList.length > 0 ? (
        favoriteList.map((item) => <RecipeItem item={item} />)
      ) : (
        <div>
          <p className="text-4xl text-xl text-center text-black font-extrabold">
            Nothing is added to Favorites.
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
