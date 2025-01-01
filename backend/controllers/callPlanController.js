const CallPlan=require('../models/callPlanModel');

// Get all call plans (optionally filter by restaurantId or nextCallDate)
const getCallPlans=async(req,res)=>{
    try{
        const {restaurantId,date}=req.query;
        const filter={};
        if(restaurantId)filter.restaurantId=restaurantId;
        if(date)filter.nextCallDate={$lte:new Date(date)};
        const callPlans=await CallPlan.find(filter)
            .populate('restaurantId','name')
            .populate('contactId','name');
        res.status(200).json(callPlans);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

// Add a new call plan
const addCallPlan=async(req,res)=>{
    try{
        const newCallPlan=new CallPlan(req.body);
        const savedCallPlan=await newCallPlan.save();
        res.status(201).json(savedCallPlan);
    }catch(error){
        res.status(400).json({message:error.message});
    }
};

// Update a call plan
const updateCallPlan=async(req,res)=>{
    try{
        const updatedCallPlan=await CallPlan.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json(updatedCallPlan);
    }catch(error){
        res.status(400).json({message:error.message});
    }
};

// Delete a call plan
const deleteCallPlan=async(req,res)=>{
    try{
        await CallPlan.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'Call plan deleted'});
    }catch(error){
        res.status(400).json({message:error.message});
    }
};

module.exports={getCallPlans,addCallPlan,updateCallPlan,deleteCallPlan};
