// we will use the naming conventions as mdn docs
// blog_index,blog_details,blog_create_get,blog_create_post,blog_delete
const Blog = require("../models/blog.js")


const blog_index = (req, res) => {
  // Blog.find().sort({createdAt:-1})
  Blog.find()
    .then((result) => {
      // Passing the blogs result to the res.render
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    })
}

const blog_details = (req, res) => {
  const id = req.params.id;
  // for extracting the id 
  console.log(id);
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Detail" });
    })
    .catch((err) => {
      res.status(404).render("404", { title: "Blog Not Found" });
      console.log(err);
    })
}

const blog_create_get = (req, res) => {
  res.render("create", { title: "Create a new Blog" });
}

const blog_create_post = (req, res) => {
  console.log(req.body);
  const blog = new Blog(req.body);
  blog.save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    })
}

const blog_delete = (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) return false;
  // for deleting the blog document
  Blog.findByIdAndDelete(id)
    .then((result) => {
      // so after deleting , we cannot use redirect the response in node . So we have to pass a JSON or a text data back to the browser as a response. So we will send a data having a redirect property.
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    })
}

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete
}