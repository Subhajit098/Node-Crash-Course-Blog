const mongoose=require("mongoose");
const Schema=mongoose.Schema;

// Remember that mongoose.Schema is a constructor function that will create the schema
// Creating a new instance of the Schema object
const blogSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    snippet:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
    // Passing an optional property
    // It will auto update and auto assign the timestamps in the document as we update it.
},{timestamps:true});

// Defining models
// The first argument is the name of the model 
// It should have the same name of singular of the collection name. So it will pluralize the name and look for the collection inside the database
// Model's name always start from capital letters.
// The second type of argument is the type of schema we want to base this model on,meaning what type of object are we gonna store inside this collection
const Blog=mongoose.model("Blog",blogSchema);
// here it will look for the blogs collection after pluralizing
// Now we have to export this model so that we can use this anywhere on the project.
module.exports=Blog ;
