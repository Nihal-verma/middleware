const employeemodel = require("../model/modelschema")
const bcrypt = require("bcrypt")
async function hash(password) {
    return await bcrypt.hash(password, 10)
}
async function passwordvarification(password, confirmpassword) {
    return await bcrypt.compare(password, confirmpassword)
}



const filesend = async(req,res)=>{
    try {
        const files = req.files
        console.log(files);
        for(let value of files){
            const collectdata = new employeemodel({
                file: value.filename
            })
            await collectdata.save()
        } res.json({
            message:"files uploaded",
            
        })
    } catch (error) {
        console.log("error",error);
    }
}
  


const register = async (req, res) => {
    try {
        const { name, email, password, confirmpassword } = req.body
        if (password !== confirmpassword) {
            console.log("password and confirm password doesnot matched");
            return res.json({
                message: "password and confirm password doesnot matched"
            })
        }
        const chckmail = await employeemodel.findOne({ email })

        if (chckmail) {
            console.log(`this mail ${chckmail.email} already exist `);
            return res.json({
                message: `this mail ${chckmail.email} already exist `
            })
        }
        const hashed = await hash(password, confirmpassword)
        const collectdata = new employeemodel({
            name: name,
            email: email,
            password: hashed,
            confirmpassword: hashed
        })
        await collectdata.save()
        console.log("your data is >> ", collectdata);
        return res.json({ message: "successful", collectdata: collectdata })

    } catch (error) {
        console.log("error occured  >>.>>>>", error);
    }
}
const getdata = async (req, res) => {
    try {
        const collectdata = await employeemodel.findOne({ _id: req.params.id })
        if (collectdata) {
            res.json({
                message: "data found",
                collectdata: collectdata
            })
        } else {
            res.json({
                message: "data not found"
            })
        }

    } catch (error) {
        console.log("error occured in getdata api>>", error);
    }
}
const deletedata = async (req, res) => {
    try {
        const collectdata = await employeemodel.findByIdAndDelete({ _id: req.params.id })
        if (collectdata) {
            res.json({
                message: "data found",
                collectdata: collectdata
            })
        } else {
            res.json({
                message: "data not found"
            })
        }

    } catch (error) {
        console.log("error occured in getdata api>>", error);
    }
}
const updatealldata = async (req, res) => {
    try {
        const update = await employeemodel.findOne({ _id: req.params.id })
        const oldpassword = req.body.oldpassword
        const newpassword = req.body.password
        const confirmpassword = req.body.confirmpassword
        const email = req.body.email
        const validate = await passwordvarification(oldpassword, update.password)
        if (!validate) {

            return res.json({ message: "password does not match fom the old data" })
        }
        if (newpassword != confirmpassword) {
            return res.json({
                message: "unmatch p and c"
            })
        }
        const checkmail = await employeemodel.findOne({email})
        if(checkmail){
            return res.json({
                message:"email exist"
            })
        }
       
        const hashed = await hash(newpassword, confirmpassword)
        const collectdata = await employeemodel.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                name: req.body.name, email: email, password: hashed, confirmpassword: hashed
            }
        })
        const newdata = await employeemodel.findById({ _id: req.params.id })
        if (!collectdata) {
            return res.json({ message: "data not changed" })
        } else {
            return res.status(202).json({
                message: "data has been changed",
                newdata: newdata
            })
        }
       
    } catch (error) {
        console.log("error occured in updatedata api>>", error);
    }
}
module.exports = {
    register,
    getdata,
    deletedata,
    updatealldata,
    filesend
};
