const express=require("express");
const app=express();
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override")


const port=8000;
app.set("view engine","ejs");
app.use(methodOverride("_method"))
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}))
let posts=[
    {
        username:"Shruti",
        content:"I love codding",
        id:uuidv4()

    },
    {
        username:"Sneha",
        content:"I love finance operation",
        id:uuidv4()
    },
    {
        username:"Sidhant",
        content:"I love trading",
        id:uuidv4()
    },
    {
        username:"Alok",
        content:"I love study",
        id:uuidv4()
    },
]
app.get('/',(req,res)=>{
    res.render("index.ejs",{posts})
})
app.get("/post/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/post",(req,res)=>{
   let {username,content}=req.body;
   let id=uuidv4();
   posts.push({ id,username, content});
   res.redirect("/");
   
})
app.get("/post/:id",(req,res)=>{
   let {id}=req.params;
  let post=posts.find((p)=>id===p.id);
   res.render("show.ejs",{post});
   
})
app.patch("/post/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    res.redirect("/post")
})
app.get("/post/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})
app.delete("/post/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => p.id !== id);  // ✅ Remove the post by filtering
    res.redirect("/");
});
app.listen(port,()=>{
    console.log("Server running");
})