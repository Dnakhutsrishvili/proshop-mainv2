import mongoose from "mongoose"

const connectDB=async()=>{
    try{
const conn =await mongoose.connect('mongodb+srv://dtnakhutsrishvili:dtnakhutsrishvili@cluster0.a8iamt7.mongodb.net/proshop')
console.log(conn.connection.host)
    }catch(error){
console.log(error.message)
process.exit(1)
    }
}

export default connectDB