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

export const getMovies = async(req , res , next)=>{
  try {
    const movies = await Movie.aggregate([{$sample:{size:1}}]);
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
}

export const getMovie = async(req , res , next)=>{
  try {
    const movie = await Movie.find({_id:req.params.id});
    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
}

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
  // console.log(req.params.id);
  // console.log(req.body);
    try {
      const movie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $push: { likes: req.body.userId } , 
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
          $push: { dislikes: req.body.userId } , 
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
    const query = req.query.q;
    try {
      const movie = await Movie.find({name: {$regex:query , $options:"i"}});
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
        const movie = await Movie.find({genre:req.params.genre});
        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
};
export const getByCategory = async(req , res , next)=>{
  try {
      const movie = await Movie.find({category:req.params.category});
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
        const movie = await Movie.find({likes:req.params.userId});
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

export const getByCreation = async(req , res , next)=>{
  try {
      const movies = await Movie.find().sort({"updatedAt": -1});
      res.status(200).json(movies);
  } catch (error) {
      next(error);
  }
};

export const getByWishlist = async(req , res , next)=>{
  console.log(req.params.userId);
  try {
      const movies = await Movie.find({wishlist: req.params.userId});
      res.status(200).json(movies);
  } catch (error) {
      next(error);
  }
};



