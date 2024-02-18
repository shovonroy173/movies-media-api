import Movie from "../models/Movie.js";

export const createMovie = async (req, res, next) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.status(200).json(savedMovie);
  } catch (error) {
    next(error);
  }
};

export const updateMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
};

export const addToWishlist = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { wishlist: req.body.userId } , 
      },
      { new: true }
    );
    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
};

export const like = async (req, res, next) => {
    try {
      const movie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $addToSet: { likes: req.body.userId } , 
          $pull :{dislikes:req.body.userId}
        },
        { new: true }
      );
      res.status(200).json(movie);
    } catch (error) {
      next(error);
    }
  };


export const dislike = async (req, res, next) => {
    try {
      const movie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $addToSet: { dislikes: req.body.userId } , 
          $pull :{likes:req.body.userId}
        },
        { new: true }
      );
      res.status(200).json(movie);
    } catch (error) {
      next(error);
    }
};

export const search = async (req, res, next) => {
    const query = req.query.text
    try {
      const movie = await Movie.find({name: {$regex:query , options:"i"}});
      res.status(200).json(movie);
      res.status(200).json(movie);
    } catch (error) {
      next(error);
    }
};

export const addView = async(req , res , next)=>{
  try {
      const movie = await Movie.findByIdAndUpdate(req.params.id , {$inc:{views:1}});
      res.status(200).json(movie.views);
  } catch (error) {
      next(error);
  }
};

export const getByGenre = async(req , res , next)=>{
    try {
        const movie = await Movie.find({type:req.params.type});
        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
};

export const getByRating = async(req , res , next)=>{
    try {
        const movie = await Movie.find().sort({rating: -1});
        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
};

export const getBylikes = async(req , res , next)=>{
    try {
        const movie = await Movie.find({likes:req.body.userId});
        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
};

export const getByViews = async(req , res , next)=>{
  try {
      const movie = await Movie.find().sort({views: -1});
      res.status(200).json(movie);
  } catch (error) {
      next(error);
  }
};



