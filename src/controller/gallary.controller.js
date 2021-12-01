const express = require('express');

const router = express.Router();


const Gallary = require('../models/gallary.model')

router.post('/',async (req, res) => {
    try {
        const gallary = await Gallary.create(req.body);     
        return res.status(201).json({gallary})
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