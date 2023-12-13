const prisma = require("../prisma/index")

const jwt = require('jsonwebtoken')

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookie.token

        if (!token) {
            res.send("please Login")
            throw new Error("you are not loggedIn")
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await prisma.user.findFirst({
            where: {
                id: decoded.userId
            }
        })
        next()
    } catch (error) {

    }
}