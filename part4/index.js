const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

const blogSchema = {
    author: String,
    title: String,
    likes: Number,
    url: String
}

const Blog = new mongoose.model('Blog', blogSchema)

const url = "mongodb+srv://sarang:hitman252000@cluster0.ccmbeig.mongodb.net/?retryWrites=true&w=majority"

app.use(cors())
app.use(express.json())

mongoose.connect(url)
    .then(() => {
        console.log("connected to database")
    })
    .catch(error => console.log(error))

// const blog = {
//     author: "sarang",
//     title: "first blog",
//     upvotes: 13
// }

app.get('/api/blogs', (req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs)
        })
})

app.post('/api/blogs', (req, res) => {
    const body = req.body
    console.log(req.body)
    const blog = new Blog({
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes
    })

    blog.save()
        .then(savedBlog => {
            res.status(201).json(savedBlog)
        })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})