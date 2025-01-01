import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid, Card, CardContent, CardActions, Modal, Box, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from '../utils/api';

const Interactions=()=>{
    const [interactions,setInteractions]=useState([]);
    const [restaurants,setRestaurants]=useState([]);
    const [open,setOpen]=useState(false);
    const [formData,setFormData]=useState({
        restaurantId:'',
        type:'',
        details:'',
    });
    const [editing,setEditing]=useState(null);

    useEffect(()=>{
        fetchInteractions();
        fetchRestaurants();
    },[]);

    const fetchInteractions=async()=>{
        try{
            const response=await axios.get('/api/interactions');
            setInteractions(response.data);
        }catch(error){
            console.error('Error fetching interactions:',error);
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

    const handleSubmit=async()=>{
        try{
            if(editing){
                await axios.patch(`/api/interactions/${editing}`,formData);
            }else{
                await axios.post('/api/interactions',formData);
            }
            fetchInteractions();
            handleClose();
        }catch(error){
            console.error('Error submitting interaction:',error);
        }
    };

    const handleDelete=async(id)=>{
        try{
            await axios.delete(`/api/interactions/${id}`);
            fetchInteractions();
        }catch(error){
            console.error('Error deleting interaction:',error);
        }
    };

    const handleOpen=(interaction=null)=>{
        setEditing(interaction?._id||null);
        setFormData(interaction||{
            restaurantId:'',
            type:'',
            details:'',
        });
        setOpen(true);
    };

    const handleClose=()=>{
        setOpen(false);
        setEditing(null);
    };

    return(
        <div>
            <Typography variant="h4" gutterBottom>Interaction Tracking</Typography>
            <Button variant="contained" color="primary" onClick={()=>handleOpen()}>
                Add Interaction
            </Button>
            <Grid container spacing={3} sx={{marginTop:2}}>
                {interactions.map((interaction)=>(
                    <Grid item xs={12} sm={6} md={4} key={interaction._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{interaction.type}</Typography>
                                <Typography>{interaction.details}</Typography>
                                <Typography>
                                    Restaurant: {interaction.restaurantId?.name||'Unknown'}
                                </Typography>
                                <Typography>Date: {new Date(interaction.date).toLocaleDateString()}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={()=>handleOpen(interaction)}>
                                    Edit
                                </Button>
                                <Button size="small" color="secondary" onClick={()=>handleDelete(interaction._id)}>
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
                        {editing?'Edit Interaction':'Add Interaction'}
                    </Typography>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Restaurant</InputLabel>
                        <Select
                            value={formData.restaurantId}
                            onChange={(e)=>setFormData({...formData,restaurantId:e.target.value})}
                        >
                            {restaurants.map(restaurant=>(
                                <MenuItem key={restaurant._id} value={restaurant._id}>
                                    {restaurant.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={formData.type}
                            onChange={(e)=>setFormData({...formData,type:e.target.value})}
                        >
                            <MenuItem value="Call">Call</MenuItem>
                            <MenuItem value="Order">Order</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Details"
                        fullWidth
                        margin="normal"
                        value={formData.details}
                        onChange={(e)=>setFormData({...formData,details:e.target.value})}
                    />
                    <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                        {editing?'Update':'Add'}
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default Interactions;
