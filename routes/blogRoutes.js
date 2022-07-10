const express = require('express');
const app = express();
const router = express.Router();
const upload = require('../multermiddleware/multer');
const verifyToken = require('./verifyToken')
const blogSchema = require('../model/blogSchema');

// app.use(verifyToken)
// CREAT A BLOG IN OUR DATABASE
router.post('/', upload, async (req, res) => {
   const blogs = new blogSchema({
      Title: req.body.Title,
      Description: req.body.Description,
      img: {
         data: req.file.path,
         contentType: 'image/png'
      }
   })
   try {
      const savedblog = await blogs.save()
      res.json(savedblog);
   } catch (err) {
      res.json({ message: err })
   }
})

// READ BACK ALL THE BLOGS
router.get('/',verifyToken, async (req, res) => {
   try {
      const blogs = await blogSchema.find();
      res.json(blogs);
   } catch (err) {
      res.json({ message: err })
   }
})

// UPDATING A SPECIFIC TOUR
router.patch('/:blogId', async (req, res) => {
   
   try {
      const updateOne = await blogSchema.findByIdAndUpdate(req.params.blogId, req.body, {
         new: true,
         runValidators: true
      })
      res.json(updateOne)
   } catch (err) {
      res.json({ message: err })
   }
})

// DELETING A SPECIFIC TOUR
router.delete('/:blogId', async (req, res) => {
   try {
      const deleteOne = await blogSchema.remove({ _id: req.params.blogId })
      res.json(deleteOne)
   } catch (err) {
      res.json({ message: err })
   }
})

// FIND SPECIFIC BLOG
router.get('/:blogId', async (req, res) => {
   try {
      const blog = await blogSchema.findById(req.params.blogId)
      res.json(blog)
   } catch (err) {
      res.json({ message: err })
   }
})

module.exports = router
