import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid, Card, CardContent, CardActions, TextField, Modal, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from '../utils/api';

const Contacts=()=>{
    const [contacts,setContacts]=useState([]);
    const [restaurants,setRestaurants]=useState([]);
    const [search,setSearch]=useState('');
    const [open,setOpen]=useState(false);
    const [formData,setFormData]=useState({
        restaurantId:'',
        name:'',
        role:'',
        email:'',
        phone:'',
    });
    const [editing,setEditing]=useState(null);

    useEffect(()=>{
        fetchContacts();
        fetchRestaurants();
    },[]);

    const fetchContacts=async()=>{
        try{
            const response=await axios.get('/api/contacts');
            setContacts(response.data);
        }catch(error){
            console.error('Error fetching contacts:',error);
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
                await axios.patch(`/api/contacts/${editing}`,formData);
            }else{
                await axios.post('/api/contacts',formData);
            }
            fetchContacts();
            handleClose();
        }catch(error){
            console.error('Error submitting contact:',error);
        }
    };

    const handleDelete=async(id)=>{
        try{
            await axios.delete(`/api/contacts/${id}`);
            fetchContacts();
        }catch(error){
            console.error('Error deleting contact:',error);
        }
    };

    const handleOpen=(contact=null)=>{
        setEditing(contact?._id||null);
        setFormData(contact||{
            restaurantId:'',
            name:'',
            role:'',
            email:'',
            phone:'',
        });
        setOpen(true);
    };

    const handleClose=()=>{
        setOpen(false);
        setEditing(null);
    };

    const filteredContacts=contacts.filter(contact=>
        contact.name.toLowerCase().includes(search.toLowerCase())
    );

    return(
        <div>
            <Typography variant="h4" gutterBottom>Contact Management</Typography>
            <TextField
                label="Search Contacts"
                fullWidth
                margin="normal"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={()=>handleOpen()}>
                Add Contact
            </Button>
            <Grid container spacing={3} sx={{marginTop:2}}>
                {filteredContacts.map((contact)=>(
                    <Grid item xs={12} sm={6} md={4} key={contact._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{contact.name}</Typography>
                                <Typography>{contact.role}</Typography>
                                <Typography>{contact.email}</Typography>
                                <Typography>{contact.phone}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={()=>handleOpen(contact)}>
                                    Edit
                                </Button>
                                <Button size="small" color="secondary" onClick={()=>handleDelete(contact._id)}>
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
                        {editing?'Edit Contact':'Add Contact'}
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
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        value={formData.name}
                        onChange={(e)=>setFormData({...formData,name:e.target.value})}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={formData.role}
                            onChange={(e)=>setFormData({...formData,role:e.target.value})}
                        >
                            <MenuItem value="Manager">Manager</MenuItem>
                            <MenuItem value="Chef">Chef</MenuItem>
                            <MenuItem value="Accountant">Accountant</MenuItem>
                            <MenuItem value="Server">Server</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        value={formData.email}
                        onChange={(e)=>setFormData({...formData,email:e.target.value})}
                    />
                    <TextField
                        label="Phone"
                        fullWidth
                        margin="normal"
                        value={formData.phone}
                        onChange={(e)=>setFormData({...formData,phone:e.target.value})}
                    />
                    <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                        {editing?'Update':'Add'}
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default Contacts;
