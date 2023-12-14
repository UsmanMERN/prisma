const prisma = require("../prisma/index");
const cookieToken = require("../utils/cookieToken");

exports.signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        //check
        if (!name || !email || !password) {
            throw new Error('please provide all fields')
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
            }
        })

        //send user a token
        cookieToken(user, res)

    } catch (error) {
        throw new Error(error)
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // take info from user 
        if (!email || !password) {
            return console.log('please provide all fields')
        }
        // find a user based on email
        const user = await prisma.user.findFirst({
            where: {
                email: email,
                password: password,
            },
        });


        if (!user) {
            return res.status(404).json({ error: 'User not found. Please sign up first.' });
        }
        if (user.password !== password) {
            throw new Error('please Enter correct password')
        }
        // user fond and validate
        cookieToken(user, res)
    } catch (error) {
        throw new Error(error)
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie('token')
        res.json({
            success: true
        }).status(200)
    } catch (error) {
        throw new Error(error)
    }
}