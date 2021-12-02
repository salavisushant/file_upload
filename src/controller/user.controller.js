const express = require('express');

const fs = require('fs')
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)

const router = express.Router();

const upload = require("../middleware/upload")

const User = require('../models/user.model')

router.post('/',upload.single("profile_pic"), async (req, res) => {
    try {
        const user = await User.create({
            first_name : req.body.first_name,
            last_name :  req.body.last_name,
            profile_pic: req.file.path,
        });     
        return res.status(201).json({user})
    } catch (e) {
        return res.status(500).json({status:Failed,message:e.message});
    }
    
})

router.get('/',async (req, res) => {
    try {
        const page = +req.query.page;
        const size = +req.query.size;

        const skip = (page-1) * size;
        const user = await User.find().skip(skip).limit(size).lean().exec();
        const totalPages = Math.ceil((await User.find().countDocuments())/size)
        return res.json({user});

    } catch (e) {
        return res.status(500).json({status:Failed,message:e.message});
    }
    
})


router.patch("/:id",upload.single("profile_pic"), async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      await fs.unlink(`${user.profile_pic}` ,(err)=>{
            if (err){
            console.log("deleted");
            }
      });
      const users = await User.findByIdAndUpdate(req.params.id,{
        profile_pic:req.file.path
      })
      return res.status(201).send(users);
      
    } catch (e) {
      return res.status(500).send({ message: e.message, status: "Failed" });
    }
  });


router.delete("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      await fs.unlink(`${user.profile_pic}` ,(err)=>{
            if (err){
            console.log("deleted");
            }
      })
      const users = await User.findByIdAndDelete(req.params.id).lean().exec()
      return res.status(201).send(users);
      
    } catch (e) {
      return res.status(500).send({ message: e.message, status: "Failed" });
    }
  });

module.exports = router;