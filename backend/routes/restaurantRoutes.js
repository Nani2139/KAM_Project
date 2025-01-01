const express=require('express');
const {getRestaurants,addRestaurant,updateRestaurant,deleteRestaurant}=require('../controllers/restaurantController');
const router=express.Router();

router.route('/')
    .get(getRestaurants)
    .post(addRestaurant);

router.route('/:id')
    .patch(updateRestaurant)
    .delete(deleteRestaurant);

module.exports=router;
