import express from "express";
import { addToWishlist, addView, createMovie, dislike, getByCategory, getByCreation, getByGenre, getByRating, getByViews, getByWishlist, getBylikes, getMovie, getMovies, like, search, updateMovie } from "../controllers/movieController.js";
const router = express.Router();

router.post("/post" , createMovie);
router.get("/getmovies" , getMovies);
router.get("/getmovies/search" , search);
router.get("/getmovies/getbyrating" , getByRating);
router.get("/getmovies/getbygenre/:genre" , getByGenre);
router.get("/getmovies/getbycategory/:category" , getByCategory);
router.get("/getmovies/getbylikes/:userId" , getBylikes);
router.get("/getmovies/getbyviews" , getByViews);
router.get("/getmovies/getbycreation" , getByCreation);
router.get("/getmovies/getbywishlist/:userId" , getByWishlist);
router.get("/getmovie/:id" , getMovie);
router.put("/updatemovie/:id" , updateMovie); 
router.put("/addwishlist/:id" , addToWishlist);
router.put("/like/:id" , like);
router.put("/dislike/:id" , dislike);
router.put("/view/:id" , addView);
 
export default router; 