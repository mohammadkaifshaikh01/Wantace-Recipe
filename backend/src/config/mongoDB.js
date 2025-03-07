import mongoose from "mongoose";
const connectDB = async()=>{
   try {
      await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
      console.log("MongoDB Connected");
   } catch (error) {
      console.log("Failed To Connect" , error);
      
   }
}
export default connectDB;