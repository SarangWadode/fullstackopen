const logger = require('./logger')

const dummy = (blogs) => {
  logger.info(blogs)
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return likes
}

const favouriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const mx = Math.max(...likes)
  logger.info(mx)
  const favBlog = blogs.filter(blog => blog.likes === mx)
  logger.info(favBlog[0].title)
  return {
    title: favBlog[0].title,
    author: favBlog[0].author,
    likes: favBlog[0].likes
  }
}


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}
