import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid, Card, CardContent, CardActions, TextField, Modal, Box } from '@mui/material';
import axios from '../utils/api';

const Dashboard=()=>{
    const [restaurants,setRestaurants]=useState([]);
    const [open,setOpen]=useState(false);
    const [formData,setFormData]=useState({
        name:'',
        address:'',
        city:'',
        state:'',
        country:'',
        zipCode:'',
    });
    const [editing,setEditing]=useState(null);

    useEffect(()=>{
        fetchRestaurants();
    },[]);

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
                await axios.patch(`/api/restaurants/${editing}`,formData);
            }else{
                await axios.post('/api/restaurants',formData);
            }
            fetchRestaurants();
            handleClose();
        }catch(error){
            console.error('Error submitting restaurant:',error);
        }
    };

    const handleDelete=async(id)=>{
        try{
            await axios.delete(`/api/restaurants/${id}`);
            fetchRestaurants();
        }catch(error){
            console.error('Error deleting restaurant:',error);
        }
    };

    const handleOpen=(restaurant=null)=>{
        setEditing(restaurant?._id||null);
        setFormData(restaurant||{
            name:'',
            address:'',
            city:'',
            state:'',
            country:'',
            zipCode:'',
        });
        setOpen(true);
    };

    const handleClose=()=>{
        setOpen(false);
        setEditing(null);
    };

    return(
        <div>
            <Typography variant="h4" gutterBottom>Restaurant Management</Typography>
            <Button variant="contained" color="primary" onClick={()=>handleOpen()}>
                Add Restaurant
            </Button>
            <Grid container spacing={3} sx={{marginTop:2}}>
                {restaurants.map((restaurant)=>(
                    <Grid item xs={12} sm={6} md={4} key={restaurant._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{restaurant.name}</Typography>
                                <Typography>{restaurant.address}, {restaurant.city}, {restaurant.state}</Typography>
                                <Typography>{restaurant.country} - {restaurant.zipCode}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={()=>handleOpen(restaurant)}>
                                    Edit
                                </Button>
                                <Button size="small" color="secondary" onClick={()=>handleDelete(restaurant._id)}>
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
                        {editing?'Edit Restaurant':'Add Restaurant'}
                    </Typography>
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        value={formData.name}
                        onChange={(e)=>setFormData({...formData,name:e.target.value})}
                    />
                    <TextField
                        label="Address"
                        fullWidth
                        margin="normal"
                        value={formData.address}
                        onChange={(e)=>setFormData({...formData,address:e.target.value})}
                    />
                    <TextField
                        label="City"
                        fullWidth
                        margin="normal"
                        value={formData.city}
                        onChange={(e)=>setFormData({...formData,city:e.target.value})}
                    />
                    <TextField
                        label="State"
                        fullWidth
                        margin="normal"
                        value={formData.state}
                        onChange={(e)=>setFormData({...formData,state:e.target.value})}
                    />
                    <TextField
                        label="Country"
                        fullWidth
                        margin="normal"
                        value={formData.country}
                        onChange={(e)=>setFormData({...formData,country:e.target.value})}
                    />
                    <TextField
                        label="Zip Code"
                        fullWidth
                        margin="normal"
                        value={formData.zipCode}
                        onChange={(e)=>setFormData({...formData,zipCode:e.target.value})}
                    />
                    <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                        {editing?'Update':'Add'}
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default Dashboard;
