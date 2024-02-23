import { Schema, model } from "mongoose";
 
const movieSchema = Schema({
   name:{
    type:String , required:[true , "Name is required!!"]
   }  , 
   genre:{
      type:String , required:[true , "genre is required!!"]
     }  ,
   category:{
      type:String , required:[true , "genre is required!!"]
     }  ,  
   desc:{
    type:String , required:[true , "Description is required!!"]
   } , 
   rating:{
    type:Number , required:[true , "Rating is required!!"]
   } , 
   imgUrl:{
    type:String , required:[true , "Thumbnail is required!!"]
   } ,
   videoUrl:{
    type:String , required:[true , "Movie is required!!"]
   } ,
   views:{
      type:Number , 
      default:0
   } , 
   likes:{
    type:[String] , default:[]
   } , 
   dislikes:{
    type:[String] , default:[]
   } ,
   wishlist:{
      type:[String] , default:[]
     } , 

} , {timestamps:true});

export default model("Movie" , movieSchema);