const { render } = require("ejs");
const express=require("express");
const mongoose=require("mongoose");
require("dotenv").config();
// creating an instance of an express function.
// express app
const app=express(); 
const blogRoutes = require("./routes/blogRoutes") 



// connect to MONGODB
// This is the connection string that we are gonna be using to connect to our database.
// Just replace the username with your current username and the password with the current password. Also change the database name "test" to the database name . Here its the MyDatabaseCluster
// const dbURI="mongodb+srv://<username>:<password>@mydatabasecluster.ftg2hjf.mongodb.net/?retryWrites=true&w=majority";
const dbURI=process.env.DB_URI;


// Using mongoose to connect to the database
// before connecting make sure that the test word is replaced by the name of the original database we created. Here it is the node-tuts.
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
// {useNewUrlParser:true,useUnifiedTopology:true} this will just get rid of the deprecation warnings 
// As we want to listen for requests only when the connection to the database has been set. So in the promise if we get a resolve object then we can listen to the server.
.then((result)=>
{
  console.log("connected to DB");
  app.listen(3000);
})
.catch((err)=>console.log(err))

// register view engine
app.set("view engine","ejs");
// The default behavior of EJS is that it looks into the ‘views’ folder for the templates to render.
  


// If we want to render a different folder for EJS to look then we have to add the command along with:
// app.set("views",<folderName>);



// middleware and static files. all the files can be accessed through the browser with the help of this.
app.use(express.static("public"));

// A bit of middleware for accessing the body of the req object.
app.use(express.urlencoded({extended:true}));


// mongoose and mongoDB sandbox routes
// app.get("/add-blog",(req,res)=>
// {
  // using the model to create an instance of the blog document.
//   const blog=new Blog({
//     title:"New Blog 2",
//     snippet:"about my new Blog",
//     body:"More about my new Blog"
//   })

  // Adding a method to save the model we created to the database.This is an asynchronous method and returns a promise.
   
//   blog.save()
//   .then((result)=>
//   {
//     res.send(result);
//     })
//     .catch((err)=>
//     {
//       console.log(err);
//     })
// })

// adding another handler for getting all the blogs
// app.get("/all-blogs",(req,res)=>
// {
//   Blog.find()
//   .then((result)=>
//   {
//     res.send(result);
//   })
//   .catch((err)=>
//   {
//     console.log(err);
//   })
// })


// Adding an another handler for getting the blogs by their ids
// app.get("/single-blog",(req,res)=>
// {
//   Blog.findById("63298b6a85519426f8ebd5a7")
//   .then((result)=>
//   {
//     res.send(result);
//   })
//   .catch((err)=>
//   {
//     console.log(err); 
//   })
// })



// Outputting documents in views





app.get("/",(req,res)=>
{
    
  // const blogs=[
  //   {title:" Yoshi finds eggs",snippet: "Lorem ipsum sit amet consectetur"},
  //   {title:" Yoshi finds Snippets",snippet: "Lorem ipsum sit amet consectetur"},
  //   {title:" Yoshi finds Browser",snippet: "Lorem ipsum sit amet consectetur"}
  // ]

    // res.render("index.html",{title : "Home", blogs}); // view filename - the extension
     

    res.render("/blogs");
});



// so adding more routes
// adding more route handler setUp



app.get("/about",(req,res)=>
{
    // res.send("<p> About Page</p>"); 
    res.render("about",{title : "About"});
})


  // Blog routes
  app.use(blogRoutes)
  // app.use("/blogs",blogRoutes) it will only listen to "/blog" routes


  // 404 page
  app.use((req,res)=>
  {
    res.status(404).render("404",{title : "Error 404"});

  })
 

  // Listen for requests
// automatically creates localhost
// app.listen(3000,()=>
// {
//   console.log("Server is running on port 3000");
// });



