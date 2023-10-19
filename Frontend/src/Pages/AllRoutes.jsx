import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import RecipePage from "./RecipePage";
import Recipes from "./Recipes";
import NotFound from "./NotFound";
import FavoriteRecipes from "./FavoriteRecipes";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/recipes" element={<Recipes />}></Route>
      <Route path="/recipe/:id" element={<RecipePage />}></Route>
      <Route path="/favorites" element={<FavoriteRecipes />}></Route>
      <Route path="/*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default AllRoutes;
