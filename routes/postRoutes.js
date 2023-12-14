const express = require("express")
const isLoggedIn = require("../middleware/isLoggedIn")
const { createPost, updatePost, deleltePost, getAllPosts } = require("../controllers/postControllers")

const router = express.Router()

router.post("/post/create", isLoggedIn, createPost)
router.post("/post/update/:id", isLoggedIn, updatePost)
router.post("/post/delete/:id", isLoggedIn, deleltePost)
router.post("/post/all", getAllPosts)
module.exports = router