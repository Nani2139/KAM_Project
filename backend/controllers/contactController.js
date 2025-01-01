const Contact=require('../models/contactModel');

// Get all contacts (with optional filtering by restaurantId)
const getContacts=async(req,res)=>{
    try{
        const {restaurantId}=req.query;
        const filter=restaurantId?{restaurantId}:{}; // Filter by restaurantId if provided
        const contacts=await Contact.find(filter).populate('restaurantId','name');
        res.status(200).json(contacts);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

// Add a new contact
const addContact=async(req,res)=>{
    try{
        const newContact=new Contact(req.body);
        const savedContact=await newContact.save();
        res.status(201).json(savedContact);
    }catch(error){
        res.status(400).json({message:error.message});
    }
};

// Update a contact
const updateContact=async(req,res)=>{
    try{
        const updatedContact=await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json(updatedContact);
    }catch(error){
        res.status(400).json({message:error.message});
    }
};

// Delete a contact
const deleteContact=async(req,res)=>{
    try{
        await Contact.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'Contact deleted'});
    }catch(error){
        res.status(400).json({message:error.message});
    }
};

module.exports={getContacts,addContact,updateContact,deleteContact};
