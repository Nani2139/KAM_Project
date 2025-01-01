const express=require('express');
const {getInteractions,addInteraction,deleteInteraction}=require('../controllers/interactionController');
const router=express.Router();

router.route('/')
    .get(getInteractions)
    .post(addInteraction);

router.route('/:id')
    .delete(deleteInteraction);

module.exports=router;
