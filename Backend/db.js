import mongoose from "mongoose";
const mongooseURI = 'mongodb://localhost:27017/inotebookDB';

function connectMongo() {
    mongoose.connect(mongooseURI, () => {
        console.log("Connected to MongoDB Successfully!");
    });
}

export default connectMongo;