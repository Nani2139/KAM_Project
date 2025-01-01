const Interaction=require('../models/interactionModel');

// Get all interactions (with optional filtering by restaurantId or type)
const getInteractions=async(req,res)=>{
    try{
        const {restaurantId,type}=req.query;
        const filter={};
        if(restaurantId)filter.restaurantId=restaurantId;
        if(type)filter.type=type;
        const interactions=await Interaction.find(filter).populate('restaurantId','name');
        res.status(200).json(interactions);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

// Add a new interaction
const addInteraction=async(req,res)=>{
    try{
        const newInteraction=new Interaction(req.body);
        const savedInteraction=await newInteraction.save();
        res.status(201).json(savedInteraction);
    }catch(error){
        res.status(400).json({message:error.message});
    }
};

// Delete an interaction
const deleteInteraction=async(req,res)=>{
    try{
        await Interaction.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'Interaction deleted'});
    }catch(error){
        res.status(400).json({message:error.message});
    }
};

module.exports={getInteractions,addInteraction,deleteInteraction};
