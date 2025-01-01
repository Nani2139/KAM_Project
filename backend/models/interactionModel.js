const mongoose=require('mongoose');

const interactionSchema=new mongoose.Schema({
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant',
        required:true,
    },
    type:{
        type:String,
        enum:['Call','Order'],
        required:true,
    },
    details:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
},{
    timestamps:true,
});

const Interaction=mongoose.model('Interaction',interactionSchema);

module.exports=Interaction;
