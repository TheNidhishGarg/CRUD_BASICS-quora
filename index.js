const express = require("express");
const app = express();
const  { v4: uuidv4 } = require("uuid");
uuidv4();
const methodOverride = require("method-override");
let port = 8080;
const path = require("path");

app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


app.listen(port,()=>{
    console.log(`Server started-\nOn ${port} :`)
})

app.get("/",(req,res)=>{
    res.render("home.ejs")
})

let posts = [
    {
        id:uuidv4(),
        username:"nidhishgrg",
        content:"i'll wait even when the stars forget to shine"
    },
    {
        id:uuidv4(),
        username:"w",
        content:"this time too it was me"
    },
    {
        id:uuidv4(),
        username:"electronegative226",
        content:"without you, its impossible"
    }
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs", {posts})
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})

app.post("/posts",(req,res)=>{
    let id = uuidv4();
    let {username,content}=req.body
    posts.push({id,username,content});
    res.redirect("/posts")
})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post = posts.find((p)=> id=== p.id);
    res.render("show.ejs",{post})
    console.log(post);
})


//Form To EDIT that Content
app.get("/posts/:id/edit",(req,res)=>{
    let {id}= req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post})
})

// that will patch the content
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post = posts.find((p)=>id===p.id);
    let newContent = req.body.content
    post.content = newContent;
    console.log(post);
    res.redirect("/posts")
})

// Delete Request!
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts = posts.filter((p)=>id!==p.id);
    res.redirect("/posts")
})
