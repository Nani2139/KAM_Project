const mongoose=require('mongoose');

const callPlanSchema=new mongoose.Schema({
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant',
        required:true,
    },
    contactId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Contact',
        required:true,
    },
    frequency:{
        type:Number,
        required:true,
    },
    lastCallDate:{
        type:Date,
    },
    nextCallDate:{
        type:Date,
        required:true,
    },
},{
    timestamps:true,
});

const CallPlan=mongoose.model('CallPlan',callPlanSchema);

module.exports=CallPlan;
