import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const stripHTML = (htmlString) => {
  let doc = new DOMParser().parseFromString(htmlString, "text/html");
  return doc.body.textContent || "";
};

const Home = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();
  const [favoriteData, setFavoriteData] = useState(
    JSON.parse(localStorage.getItem("favoriteData")) || []
  );
  const [recipeData, setRecipeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getData = () => {
    setLoading(true);
    axios
      .get(
        `https://api.spoonacular.com/recipes/random?number=16&apiKey=${apiKey}`
      )
      .then((res) => {
        setRecipeData(res.data.recipes);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleViewRecipe = (recipe) => {
    console.log("recipe", recipe);
    localStorage.setItem("recipe", JSON.stringify(recipe));
    navigate(`/recipe/${recipe.id}`);
  };

  const handlePostRecipe = (recipe) => {
    const postRecipeData = {
      title: recipe.title,
      image: recipe.image,
      ingredients: recipe.extendedIngredients,
      dishTypes: recipe.dishTypes,
      instructions: recipe.instructions,
      summary: recipe.summary,
    };

    axios
      .post(
        `https://impossible-skirt-cod.cyclic.app/recipe/add`,
        postRecipeData,
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("recipeToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.msg);
        toast.success("Recipe Marked as Favorite", {
          position: "bottom-center",
          theme: "colored",
          autoClose: 2000,
        });
      })
      .catch((err) => {
        console.log(res.data.msg);
        toast.error(`Something Went Wrong`, {
          position: "bottom-center",
          theme: "colored",
          autoClose: 3000,
        });
      });
  };

  const toggleFavorite = (recipe) => {
    const index = favoriteData.findIndex((fav) => fav.title === recipe.title);
    if (index === -1) {
      setFavoriteData([...favoriteData, recipe]);
      handlePostRecipe(recipe);
    } else {
      const updatedFavorites = [...favoriteData];
      updatedFavorites.splice(index, 1);
      setFavoriteData(updatedFavorites);
    }
  };

  return (
    <>
      <div className="p-16 pt-32 min-h-screen">
        {loading ? (
          // <RecipeLoader />
          <h1>Loading...</h1>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {recipeData &&
              recipeData?.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover transition-transform transform scale-100"
                    />
                    <div className="absolute top-4 left-2 text-xs">
                      {item.vegetarian && (
                        <span className="mr-1 bg-blue-800 text-white px-2 py-2 rounded-lg text-xs">
                          <i className="fas fa-leaf"></i> Vegetarian
                        </span>
                      )}
                      {item.vegan && (
                        <span className="mr-1 bg-blue-800 text-white px-2 py-2 rounded-lg text-xs">
                          <i className="fas fa-seedling"></i> Vegan
                        </span>
                      )}
                      {item.glutenFree && (
                        <span className="mr-1 bg-blue-800 text-white px-2 py-2 rounded-lg text-xs">
                          <i className="fas fa-bread-slice"></i> Gluten-Free
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl sm:text-xl lg:text-xl line-clamp-2 font-semibold text-red-600 mb-2 h-14">
                      {item.title}
                    </h2>
                    <p className="text-gray-700 mb-4 line-clamp-3 text-md">
                      {stripHTML(item.summary)}
                    </p>
                    <div className=" flex justify-between text-right px-4">
                      <button
                        className="text-blue-700 hover:underline text-center sm:text-left hover:font-bold mb-2 sm:mb-0 text-sm"
                        onClick={() => handleViewRecipe(item)}
                      >
                        View Recipe
                      </button>
                      <button
                        className="text-blue-700 hover:underline text-center sm:text-left hover:font-bold mb-2 sm:mb-0 text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item);
                        }}
                      >
                        <FaHeart
                          size={26}
                          color={
                            favoriteData.some((fav) => fav.title === item.title)
                              ? "red"
                              : "grey"
                          }
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
