const express = require("express")
const mongoose = require("mongoose")
const userRouter = require("./route/router")
// const { filterAge } = require("./middleware/middleware")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("upload"))
//  app.use(filterAge)

app.use(userRouter)

mongoose.connect("mongodb://0.0.0.0:27017/hello", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("database connect");
}).catch((err) => { console.log("error occured in connection", err); })

app.listen(9000, () => {
    console.log("server is running on port no. 9000");
})