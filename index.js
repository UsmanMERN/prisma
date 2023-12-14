const cookieParser = require("cookie-parser")
const express = require("express")
const { config } = require("dotenv")
const userRouter = require("./routes/userRoutes")
const postRouter = require("./routes/postRoutes")

const app = express()
// dotenv
config()

// regular middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// cookie middleware
app.use(cookieParser())
app.use("/api", userRouter)
app.use("/api", postRouter)

app.get("/", (req, res) => {
    res.send("Hi! i am learning prisma")
})

app.listen(process.env.PORT, () => {
    console.log("server is running on PORT " + process.env.PORT);
})