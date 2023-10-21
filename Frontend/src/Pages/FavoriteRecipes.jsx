import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash } from "react-icons/fa";
import Loader from "../assets/loader.gif";
import { Link } from "react-router-dom";

const FavoriteRecipes = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getData = () => {
    setLoading(true);
    axios
      .get(`https://impossible-skirt-cod.cyclic.app/recipe/`, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("recipeToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setFavorites(res.data);
        localStorage.setItem("favoriteData", JSON.stringify(res.data));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://impossible-skirt-cod.cyclic.app/recipe/delete/${id}`, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("recipeToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        getData();
        toast.success("Recipe Deleted Sucessfully", {
          position: "bottom-center",
          theme: "colored",
          autoClose: 2000,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(`Something Went Wrong`, {
          position: "bottom-center",
          theme: "colored",
          autoClose: 3000,
        });
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-white pt-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center">
              <img src={Loader} alt="Loading..." />
            </div>
          ) : favorites.length == 0 ? (
            <>
              {" "}
              <h1 className="font-bold text-center mt-4 text-4xl">
                Please Add your favorite recipes...
              </h1>{" "}
              <div className="mt-4 flex justify-center">
                <Link to="/">
                  <button
                    type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Go Back
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {favorites &&
                favorites?.map((recipe) => (
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform scale-100 hover:scale-105">
                    <div className="relative">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-64 object-cover transition-transform transform scale-100"
                      />
                      <div className="absolute top-5 left-2">
                        {recipe.diets && recipe.diets.length > 0 && (
                          <div className="flex flex-wrap">
                            {recipe.diets.map((diet, index) => (
                              <span
                                key={index}
                                className="mr-1 bg-blue-800 text-white px-2 py-2 rounded-lg text-xs"
                              >
                                {diet}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <h2 className="sm:text-3xl md:text-2xl lg:text-xl line-clamp-2 text-2xl font-semibold mb-2 h-16 text-red-700">
                          {recipe.title}
                        </h2>
                        <button
                          onClick={() => handleDelete(recipe._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
                        >
                          <FaTrash />
                        </button>
                      </div>

                      <p className="text-gray-600 mb-4">
                        <span className="text-gray-900 mb-2 font-semibold">
                          Ingredients:{" "}
                        </span>
                        {recipe.extendedIngredients &&
                          recipe.extendedIngredients.map(
                            (ingredient, index) => (
                              <span key={ingredient.id}>
                                {ingredient.name}
                                {index !==
                                  recipe.extendedIngredients.length - 1 && ", "}
                              </span>
                            )
                          )}
                      </p>
                      <p className="text-gray-600 mb-2">
                        <span className="text-gray-900 mb-2 font-semibold">
                          Dish Type:{" "}
                        </span>
                        {recipe.dishTypes &&
                          recipe.dishTypes.map((dishType, index) => (
                            <span key={index}>
                              {dishType}
                              {index !== recipe.dishTypes.length - 1 && ", "}
                            </span>
                          ))}
                      </p>
                      <p className="text-gray-600 mb-2">
                        <span className="text-gray-900 mb-2 font-semibold">
                          Instructions:{" "}
                        </span>
                        <div
                          className="text-gray-700 leading-7 mb-4 line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: recipe.instructions,
                          }}
                        />
                      </p>
                      <p className="text-gray-600 mb-2">
                        <span className="text-gray-900 mb-2 font-semibold">
                          Summary:{" "}
                        </span>
                        <div
                          className="text-gray-700 leading-7 line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: recipe.summary,
                          }}
                        />
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
          {error && (
            <div className="text-red-500 text-center mt-4">
              An error occurred. Please try again later.
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default FavoriteRecipes;
