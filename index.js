const express = require("express");
const app = express();
const  { v4: uuidv4 } = require("uuid");
uuidv4();

//methodOverride so that we can use Http Verb that are not provided by client
const methodOverride = require("method-override");
let port = 8080;
const path = require("path");

//***************using librarires***************************/
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

//****************Random Post Data****************/
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


//*****************Landing Page**********************/
app.get("/posts",(req,res)=>{
    res.render("index.ejs", {posts})
})


//*********************CREATING*******************/
//Create Operation via POST request!
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})


//******************READING***********************//
//Posting the content taken through req.body
app.post("/posts",(req,res)=>{
    let id = uuidv4();
    let {username,content}=req.body
    posts.push({id,username,content});
    res.redirect("/posts")
})

//Read Operation via Get Request
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post = posts.find((p)=> id=== p.id);
//Reading that particular element from Array - (post from posts) that has id = query id
//This part of Matching is important while Reading, Updating, Deleting
//Basically - To select that particular post we are matching id from req.params to post.id
    res.render("show.ejs",{post})
    console.log(post);
})

//***********************UPDATE*********************/
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


//**********************DELETE*******************//
// Delete Request!
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts = posts.filter((p)=>id!==p.id);
    res.redirect("/posts")
})
