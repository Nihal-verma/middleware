const mongoose = require("mongoose")
const employeeSchema = new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    confirmpassword:{type:String,require:true},
    age:{type:String,require:true}
})
const employeemodel= new mongoose.model("employee",employeeSchema)
module.exports= employeemodel
