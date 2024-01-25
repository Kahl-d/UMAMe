import React, { useState } from 'react';
import { CloudUpload, PhotoCamera } from '@mui/icons-material';
import './add.css';


import {
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import { AddCircleOutline, Delete } from '@mui/icons-material';

const AddRecipe = () => {
  const [activeStep, setActiveStep] = useState(0);

  // State for storing recipe data
  const [recipeData, setRecipeData] = useState({
    name: '',
    ingredients: [],
    instructions: [],
    additionalComment: '',
    difficulty: '',
    tags: '',
    image: null,
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleChange = (field) => (event) => {
    setRecipeData((prevData) => ({
      ...prevData,
      [field]: event.target.value,
    }));
  };

  const handleListChange = (field, index) => (event) => {
    const updatedList = [...recipeData[field]];
    updatedList[index] = event.target.value;

    setRecipeData((prevData) => ({
      ...prevData,
      [field]: updatedList,
    }));
  };

  const handleAddItem = (field) => {
    setRecipeData((prevData) => ({
      ...prevData,
      [field]: [...prevData[field], ''],
    }));
  };

  const handleDeleteItem = (field, index) => {
    const updatedList = [...recipeData[field]];
    updatedList.splice(index, 1);

    setRecipeData((prevData) => ({
      ...prevData,
      [field]: updatedList,
    }));
  };
  // Image Upload
  // Image Upload

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setRecipeData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  // Camera Open Camera Open
  // Camera Open Camera Open

  const handleCameraCapture = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      const track = videoStream.getVideoTracks()[0];
      
      // Capture image using ImageCapture API
      const imageCapture = new ImageCapture(track);
      const photoBlob = await imageCapture.takePhoto();
  
      // Convert the captured photo to a data URL (base64)
      const imageUrl = URL.createObjectURL(photoBlob);
  
      // Stop the camera stream
      track.stop();
  
      // Save the captured image
      setRecipeData((prevData) => ({
        ...prevData,
        image: imageUrl,
      }));
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };
  
  


  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              label="Recipe Name"
              variant="outlined"
              fullWidth
              value={recipeData.name}
              onChange={handleChange('name')}
            />
            <div id="photoContainer">
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="image-upload"
              type="file"
              onChange={handleImageUpload}
            />
            <label htmlFor="image-upload">
              <IconButton color="primary" component="span">
                <CloudUpload fontSize="large" />
              </IconButton>
            </label>
            <label>
              <IconButton color="primary" component="span" onClick={handleCameraCapture}>
                <PhotoCamera fontSize="large" />
              </IconButton>
            </label>
              
            </div>
            
          </>
        );
      case 1:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Ingredients
            </Typography>
            <List>
              {recipeData.ingredients.map((ingredient, index) => (
                <ListItem key={index}>
                  <ListItemText>
                    <TextField
                      label={`Ingredient #${index + 1}`}
                      variant="outlined"
                      fullWidth
                      value={ingredient}
                      onChange={handleListChange('ingredients', index)}
                    />
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => handleDeleteItem('ingredients', index)}>
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <IconButton onClick={() => handleAddItem('ingredients')}>
              <AddCircleOutline />
            </IconButton>
          </>
        );
      case 2:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Instructions
            </Typography>
            <List>
              {recipeData.instructions.map((instruction, index) => (
                <ListItem key={index}>
                  <ListItemText>
                    <TextField
                      label={`Step #${index + 1}`}
                      variant="outlined"
                      fullWidth
                      value={instruction}
                      onChange={handleListChange('instructions', index)}
                    />
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => handleDeleteItem('instructions', index)}>
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <IconButton onClick={() => handleAddItem('instructions')}>
              <AddCircleOutline />
            </IconButton>
          </>
        );
      case 3:
        return (
          <>
            <TextField
              label="Additional Comment"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={recipeData.additionalComment}
              onChange={handleChange('additionalComment')}
            />
            {/* Add more fields for the fourth step */}
          </>
        );
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    // Implement the logic to submit the recipe data to your backend
    console.log('Submitting recipe:', recipeData);
  };

  return (
    <div id='addContainer'>
      <Paper elevation={3} id="addPaper">
        <Typography variant="h4" align="center" gutterBottom>
          Add Recipe
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step key="Name">
            <StepLabel>Name</StepLabel>
          </Step>
          <Step key="Ingredients">
            <StepLabel>Ingredients</StepLabel>
          </Step>
          <Step key="Instructions">
            <StepLabel>Instructions</StepLabel>
          </Step>
          <Step key="Details">
            <StepLabel>Details</StepLabel>
          </Step>
        </Stepper>
        {renderStepContent(activeStep)}
        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between' }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          {activeStep < 3 ? (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default AddRecipe;
