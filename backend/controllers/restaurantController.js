const Restaurant=require('../models/restaurantModel');

// Get all restaurants
const getRestaurants=async(req,res)=>{
    try{
        const restaurants=await Restaurant.find();
        res.status(200).json(restaurants);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

// Add a new restaurant
const addRestaurant=async(req,res)=>{
    try{
        const newRestaurant=new Restaurant(req.body);
        const savedRestaurant=await newRestaurant.save();
        res.status(201).json(savedRestaurant);
    }catch(error){
        res.status(400).json({message:error.message});
    }
};

// Update a restaurant
const updateRestaurant=async(req,res)=>{
    try{
        const updatedRestaurant=await Restaurant.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json(updatedRestaurant);
    }catch(error){
        res.status(400).json({message:error.message});
    }
};

// Delete a restaurant
const deleteRestaurant=async(req,res)=>{
    try{
        await Restaurant.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'Restaurant deleted'});
    }catch(error){
        res.status(400).json({message:error.message});
    }
};

module.exports={getRestaurants,addRestaurant,updateRestaurant,deleteRestaurant};
