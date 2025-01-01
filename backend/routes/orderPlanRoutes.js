const express=require('express');
const {getOrders,addOrder,deleteOrder}=require('../controllers/orderPlanController');
const router=express.Router();

router.route('/')
    .get(getOrders)
    .post(addOrder);

router.route('/:id')
    .delete(deleteOrder);

module.exports=router;
