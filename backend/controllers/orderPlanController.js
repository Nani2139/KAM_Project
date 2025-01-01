const OrderPlan=require('../models/orderPlanModel');

// Get all orders (optionally filter by restaurantId)
const getOrders=async(req,res)=>{
    try{
        const {restaurantId}=req.query;
        const filter={};
        if(restaurantId)filter.restaurantId=restaurantId;
        const orders=await OrderPlan.find(filter).populate('restaurantId','name');
        res.status(200).json(orders);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

// Add a new order
const addOrder=async(req,res)=>{
    try{
        const newOrder=new OrderPlan(req.body);
        const savedOrder=await newOrder.save();
        res.status(201).json(savedOrder);
    }catch(error){
        res.status(400).json({message:error.message});
    }
};

// Delete an order
const deleteOrder=async(req,res)=>{
    try{
        await OrderPlan.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'Order deleted'});
    }catch(error){
        res.status(400).json({message:error.message});
    }
};

module.exports={getOrders,addOrder,deleteOrder};
