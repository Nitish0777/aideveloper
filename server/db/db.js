import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI;
const connect = () =>{
    console.log("Connecting to database", mongoURI);
    mongoose.connect(mongoURI).then(() => {
        console.log("Connected to database");
    }).catch((err) => {
        console.log("Error connecting to database", err);
    })
}

export default connect;