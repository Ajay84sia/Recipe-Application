import React from "react";
import { FaHandPointRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const RecipePage = () => {
  const Recipe = JSON.parse(localStorage.getItem("recipe"));
  return (
    <>
      <div className="bg-gray-100 min-h-screen p-8 pt-20 md:p-32 font-serif">
        <div className="mb-4">
          <Link to="/">
            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Go Back
            </button>
          </Link>
        </div>
        <div className="container mx-auto">
          {Recipe ? (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                {/* Recipe Image */}
                <div className="w-full h-64 md:h-80 object-cover object-center overflow-hidden transition-transform transform ">
                  <img
                    src={Recipe.image}
                    alt={Recipe.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                {/* Dietary Labels */}
                <div className="absolute top-4 right-4 space-y-2">
                  {Recipe.vegetarian && (
                    <div className="flex items-center text-green-500">
                      Vegetarian
                    </div>
                  )}
                  {Recipe.vegan && (
                    <div className="flex items-center text-blue-500">Vegan</div>
                  )}
                  {Recipe.glutenFree && (
                    <div className="flex items-center text-yellow-500">
                      Gluten-Free
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 md:p-8">
                {/* Recipe Title */}
                <h1 className="text-4xl font-bold mb-4 text-purple-700">
                  {Recipe.title}
                </h1>

                {/* Summary */}
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                    Summary
                  </h2>
                  <p
                    className="text-gray-700 text-lg leading-7 text-justify"
                    dangerouslySetInnerHTML={{
                      __html: Recipe.summary,
                    }}
                  />
                </div>

                {/* Recipe Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                      Details
                    </h2>
                    <ul className="list-disc  text-lg leading-7">
                      <li className="flex items-center">
                        <FaHandPointRight className="inline-block mr-2 text-gray-600" />
                        Preparation Time: {Recipe.preparationMinutes} minutes
                      </li>
                      <li className="flex items-center">
                        <FaHandPointRight className="inline-block mr-2 text-gray-600" />
                        Cooking Time: {Recipe.cookingMinutes} minutes
                      </li>
                      <li className="flex items-center">
                        <FaHandPointRight className="inline-block mr-2 text-gray-600" />
                        Servings: {Recipe.servings}
                      </li>
                      <li className="flex items-center">
                        <FaHandPointRight className="inline-block mr-2 text-gray-600" />
                        Price Per Serving: ${Recipe.pricePerServing.toFixed(2)}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                      Nutritional Information
                    </h2>
                    <ul className="list-disc pl-4 text-lg leading-7">
                      <li>Calories: {Recipe.calories}</li>
                      <li>Protein: {Recipe.protein}g</li>
                      <li>Fat: {Recipe.fat}g</li>
                    </ul>
                  </div>
                </div>

                {/* Recipe Ingredients */}
                <div className="mt-6">
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                    Ingredients
                  </h2>
                  <ul className="list-disc pl-4 text-lg leading-7">
                    {Recipe.extendedIngredients.map((ingredient, index) => (
                      <li key={index}>{ingredient.name}</li>
                    ))}
                  </ul>
                </div>

                {/* Recipe Instructions */}
                <div className="mt-6">
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                    Instructions
                  </h2>
                  <div
                    className="text-lg leading-7 text-justify"
                    dangerouslySetInnerHTML={{
                      __html: Recipe.instructions,
                    }}
                  />
                </div>

                {/* Source and Credits */}
                <div className="mt-6">
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                    Source and Credits
                  </h2>
                  <p className="text-lg leading-7">{Recipe.creditsText}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-2xl font-semibold text-gray-900">
              No recipe selected
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default RecipePage;
