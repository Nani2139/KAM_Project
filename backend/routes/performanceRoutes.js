const express=require('express');
const {getPerformance}=require('../controllers/performanceController');
const router=express.Router();

router.route('/:restaurantId').get(getPerformance);

module.exports=router;
