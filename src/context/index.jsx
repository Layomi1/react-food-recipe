import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoriteList, setFavoriteList] = useState([]);
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );

      const data = await res.json();
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setSearchParam("");
    }
  }

  // add fax
  function handleAddFavorite(getCuurrentItem) {
    console.log(getCuurrentItem);
    let copyFavoriteList = [...favoriteList];
    const index = copyFavoriteList.findIndex(
      (item) => item.id === getCuurrentItem.id
    );
    if (index === -1) {
      copyFavoriteList.push(getCuurrentItem);
    } else {
      copyFavoriteList.splice(index);
    }
    setFavoriteList(copyFavoriteList);
  }
console.log(favoriteList, 'favoriteList');


  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        handleSubmit,
        loading,
        recipeList,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddFavorite,
        favoriteList
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
