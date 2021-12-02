const express = require('express');
const { Mongoose } = require('mongoose');

const router = express.Router();

const upload = require("../middleware/upload");

const Gallary = require('../models/gallary.model')

router.post('/',upload.any("pictures"), async (req, res) => {
    const filePath = req.files.map(file => file.path)
    try {
        const user = await Gallary.create({
            pictures: filePath,
            user_id:req.body.user_id,
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
        const gallary = await Gallary.find().skip(skip).limit(size).lean().exec();
        const totalPages = Math.ceil((await Gallary.find().countDocuments())/size)
        return res.json({gallary});

    } catch (e) {
        return res.status(500).json({status:Failed,message:e.message});
    }
    
})

module.exports = router;