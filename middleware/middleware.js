const employeemodel = require("../model/modelschema")
const multer = require("multer")


//---------------------------------------------------------------------------multer------------------------------------------------------------

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./upload")
    },filename:function(req,file,cb){
        cb(null,Date.now() + "-" +file.originalname)
    }
    
})
const upload = multer({
    storage:storage
}).array("file", 10)


//---------------------------------------------------------age filter middleware-------------------------------------------------------


const filterAge = (req, res, next) => {
    try {
      const { age } = req.body;
  
      if (!age) {
        console.log("Please enter your age.");
        return res.status(400).json({ error: "Please enter your age." });
      }
  
       else if (age < 18) {
        console.log("Access denied.");
        return res.status(401).json({ error: "You are not eligible." });
      }else{
        next();
      }
  
      
    } catch (error) {
      console.log("Error in filterAge middleware:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };


 

  module.exports = {
     filterAge,upload
     };
  