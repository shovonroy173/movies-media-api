import { Schema, model } from "mongoose";
import validator from "validator";

const authSchema = Schema({
    name: {
        type: String,
        // required:[true, 'Name is required!!'] , 
        trim:true , 
      },
      email:{
        type:String , 
        required:[true , "Email is required!!"] , 
        validate: [
            {
              validator(value) {
                return validator.isEmail(value);
              },
              message: 'Please enter a valid email address',
            },
          ],
      } , 
      password:{
        type:String , 
        required:[true , "password is required!!"] , 
      } , 
      img:{
        type:String
      }

});

export default model("User" , authSchema);