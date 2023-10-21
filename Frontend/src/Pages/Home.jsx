import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../assets/loader.gif";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getData = (searchQuery = "", offset) => {
    setLoading(true);
    axios
      .get(
        `https://api.spoonacular.com/recipes/random?offset=${offset}&number=16&apiKey=${apiKey}&query=${searchQuery}&titleMatch=true`
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

  const handleSearch = () => {
    getData(searchQuery, offset);
  };

  const handlePageChange = (value) => {
    setCurrentPage((prev) => prev + value);
    setOffset((prev) => currentPage * 16);
    getData(searchQuery, offset);
  };

  return (
    <>
      <div className="p-16 pt-32 min-h-screen">
        <div className="mb-8 flex justify-center items-center">
          <input
            type="text"
            className="w-full sm:w-1/2 lg:w-1/4 px-4 py-2 border border-gray-300 rounded-l-md"
            placeholder="Search for recipes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div>
          {loading ? (
            <div className="flex justify-center">
              <img src={Loader} alt="Loading..." />
            </div>
          ) : error ? (
            <div className="flex justify-center">
              <img
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bc70c43b-aeca-448a-a158-0f8e7c281a0d/dceqwb1-a75b8ac9-8340-45bb-8049-4883b81baa3c.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2JjNzBjNDNiLWFlY2EtNDQ4YS1hMTU4LTBmOGU3YzI4MWEwZFwvZGNlcXdiMS1hNzViOGFjOS04MzQwLTQ1YmItODA0OS00ODgzYjgxYmFhM2MuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Xmt2peugw4IY64xOXTkc3Q1IFo5T861ncwbHc1E4rhM"
                alt="Error !! Something Went Wrong..."
              />
            </div>
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
                              favoriteData.some(
                                (fav) => fav.title === item.title
                              )
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
      </div>
      {!error && (
        <div className="my-8 flex justify-center">
          <button
            className={`mr-4 px-4 py-2 ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            } rounded`}
            onClick={() => handlePageChange(-1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <button
            className="px-4 py-2 font-bold bg-gray-300 text-gray-600 cursor-not-allowed rounded"
            disabled
          >
            {currentPage}
          </button>
          <button
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => handlePageChange(1)}
          >
            Next
          </button>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default Home;
