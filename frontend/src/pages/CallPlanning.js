import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid, Card, CardContent, CardActions, Modal, Box, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from '../utils/api';

const CallPlanning=()=>{
    const [callPlans,setCallPlans]=useState([]);
    const [restaurants,setRestaurants]=useState([]);
    const [contacts,setContacts]=useState([]);
    const [open,setOpen]=useState(false);
    const [formData,setFormData]=useState({
        restaurantId:'',
        contactId:'',
        frequency:'',
        nextCallDate:'',
    });
    const [editing,setEditing]=useState(null);

    useEffect(()=>{
        fetchCallPlans();
        fetchRestaurants();
    },[]);

    const fetchCallPlans=async()=>{
        try{
            const response=await axios.get('/api/call_plans');
            setCallPlans(response.data);
        }catch(error){
            console.error('Error fetching call plans:',error);
        }
    };

    const fetchRestaurants=async()=>{
        try{
            const response=await axios.get('/api/restaurants');
            setRestaurants(response.data);
        }catch(error){
            console.error('Error fetching restaurants:',error);
        }
    };

    const fetchContacts=async(restaurantId)=>{
        try{
            const response=await axios.get('/api/contacts',{params:{restaurantId}});
            setContacts(response.data);
        }catch(error){
            console.error('Error fetching contacts:',error);
        }
    };

    const handleSubmit=async()=>{
        try{
            if(editing){
                await axios.patch(`/api/call_plans/${editing}`,formData);
            }else{
                await axios.post('/api/call_plans',formData);
            }
            fetchCallPlans();
            handleClose();
        }catch(error){
            console.error('Error submitting call plan:',error);
        }
    };

    const handleDelete=async(id)=>{
        try{
            await axios.delete(`/api/call_plans/${id}`);
            fetchCallPlans();
        }catch(error){
            console.error('Error deleting call plan:',error);
        }
    };

    const handleOpen=(callPlan=null)=>{
        setEditing(callPlan?._id||null);
        setFormData(callPlan||{
            restaurantId:'',
            contactId:'',
            frequency:'',
            nextCallDate:'',
        });
        if(callPlan?.restaurantId){
            fetchContacts(callPlan.restaurantId);
        }
        setOpen(true);
    };

    const handleClose=()=>{
        setOpen(false);
        setEditing(null);
        setContacts([]);
    };

    const handleRestaurantChange=(restaurantId)=>{
        setFormData({...formData,restaurantId,contactId:''});
        fetchContacts(restaurantId);
    };

    return(
        <div>
            <Typography variant="h4" gutterBottom>Call Planning</Typography>
            <Button variant="contained" color="primary" onClick={()=>handleOpen()}>
                Add Call Plan
            </Button>
            <Grid container spacing={3} sx={{marginTop:2}}>
                {callPlans.map((plan)=>(
                    <Grid item xs={12} sm={6} md={4} key={plan._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Next Call: {new Date(plan.nextCallDate).toLocaleDateString()}</Typography>
                                <Typography>Restaurant: {plan.restaurantId?.name||'Unknown'}</Typography>
                                <Typography>Contact: {plan.contactId?.name||'Unknown'}</Typography>
                                <Typography>Frequency: {plan.frequency} days</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={()=>handleOpen(plan)}>
                                    Edit
                                </Button>
                                <Button size="small" color="secondary" onClick={()=>handleDelete(plan._id)}>
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position:'absolute',
                        top:'50%',
                        left:'50%',
                        transform:'translate(-50%, -50%)',
                        width:400,
                        bgcolor:'background.paper',
                        p:4,
                        borderRadius:2,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        {editing?'Edit Call Plan':'Add Call Plan'}
                    </Typography>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Restaurant</InputLabel>
                        <Select
                            value={formData.restaurantId}
                            onChange={(e)=>handleRestaurantChange(e.target.value)}
                        >
                            {restaurants.map(restaurant=>(
                                <MenuItem key={restaurant._id} value={restaurant._id}>
                                    {restaurant.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Contact</InputLabel>
                        <Select
                            value={formData.contactId}
                            onChange={(e)=>setFormData({...formData,contactId:e.target.value})}
                            disabled={!contacts.length}
                        >
                            {contacts.map(contact=>(
                                <MenuItem key={contact._id} value={contact._id}>
                                    {contact.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Frequency (in days)"
                        fullWidth
                        margin="normal"
                        type="number"
                        value={formData.frequency}
                        onChange={(e)=>setFormData({...formData,frequency:e.target.value})}
                    />
                    <TextField
                        label="Next Call Date"
                        fullWidth
                        margin="normal"
                        type="date"
                        value={formData.nextCallDate}
                        onChange={(e)=>setFormData({...formData,nextCallDate:e.target.value})}
                        InputLabelProps={{shrink:true}}
                    />
                    <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                        {editing?'Update':'Add'}
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default CallPlanning;
