const prisma = require("../prisma/index")
const jwt = require("jsonwebtoken")

// create a new post 

exports.createPost = async (req, res, next) => {
    const { title, body, userId } = req.body
    // validation
    if (!title || !body || !userId) {
        return console.log('please provide all fields')
    }
    try {
        console.log("yawo");
        const results = await prisma.post.create({
            data: {
                title,
                body,
                author: { connect: { id: userId } }
            }
        });
        return res.json(results)
    } catch (error) {
        throw new Error(error)
    }
}

// update posts
exports.updatePost = async (req, res, next) => {
    const { id } = req.params
    const { title, body } = req.body
    try {
        const result = await prisma.post.update({
            where: { id: id },
            data: {
                title,
                body
            }
        })
        res.json(result)
    } catch (error) {
        throw new Error(error)
    }
}

exports.deleltePost = async (req, res, next) => {
    const { id } = req.params
    try {
        const result = await prisma.post.delete({
            where: {
                id: id
            }
        })
        res.json(result)
    } catch (error) {
        throw new Error(error)
    }
}

exports.getAllPosts = async (req, res, next) => {
    try {
        const results = await prisma.post.findMany()

        res.json(results)
    } catch (error) {
        throw new Error(error)
    }
}