const express=require('express');
const {getCallPlans,addCallPlan,updateCallPlan,deleteCallPlan}=require('../controllers/callPlanController');
const router=express.Router();

router.route('/')
    .get(getCallPlans)
    .post(addCallPlan);

router.route('/:id')
    .patch(updateCallPlan)
    .delete(deleteCallPlan);

module.exports=router;
