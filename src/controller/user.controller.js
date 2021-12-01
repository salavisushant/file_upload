const express = require('express');

const router = express.Router();


const User = require('../models/user.model')

router.post('/',async (req, res) => {
    try {
        const user = await User.create(req.body);     
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

module.exports = router;