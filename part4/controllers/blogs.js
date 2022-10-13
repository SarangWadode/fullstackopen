const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
})

blogsRouter.post('/', (req, res) => {
  const body = req.body
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

blogsRouter.delete('/:id', (req, res, next) => {
  Blog.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(202).end()
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id' , (req, res, next) => {
  const body = req.body
  const blog = {
    'author': body.author,
    'title': body.title,
    'url': body.url,
  }

  Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    .then(updatedBlog => {
      res.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter
