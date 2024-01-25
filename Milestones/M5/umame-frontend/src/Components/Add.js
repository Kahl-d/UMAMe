import React, { useState } from 'react';
import { CloudUpload, PhotoCamera } from '@mui/icons-material';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
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
  Grid,
} from '@mui/material';
import { AddCircleOutline, Delete } from '@mui/icons-material';
import './CSS/add.css';

const Add = (props) => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [recipeData, setRecipeData] = useState({
    name: '',
    ingredients: [],
    instructions: [],
    additionalComment: '',
    difficulty: '',
    tags: '',
    image: null,
  });

  const [ingredientData, setIngredientData] = useState({
    name: '',
    amount: '',
    unit: '',
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

  const handleIngredientChange = (field) => (event) => {
    setIngredientData((prevData) => ({
      ...prevData,
      [field]: event.target.value,
    }));
  };

  const handleListChange = (field, index, subField, value) => {
    const updatedList = [...recipeData[field]];
    updatedList[index] = { ...updatedList[index], [subField]: value };

    setRecipeData((prevData) => ({
      ...prevData,
      [field]: updatedList,
    }));
  };

  const handleAddItem = (field) => {
    setRecipeData((prevData) => ({
      ...prevData,
      [field]: [...prevData[field], { name: '', amount: '', unit: '' }],
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

  const handleAddIngredient = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: [
        ...prevData.ingredients,
        {
          name: ingredientData.name,
          amount: ingredientData.amount,
          unit: ingredientData.unit,
        },
      ],
    }));

    setIngredientData({
      name: '',
      amount: '',
      unit: '',
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setRecipeData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };



  const renderIngredients = () => {
    return recipeData.ingredients.map((ingredient, index) => (
      <Grid container spacing={2} key={index} className="ingredientRow">
        <Grid item xs={6}>
          <TextField
            label={`Ingredient #${index + 1}`}
            variant="outlined"
            fullWidth
            value={ingredient.name}
            onChange={(e) => handleListChange('ingredients', index, 'name', e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Amount"
            variant="outlined"
            fullWidth
            value={ingredient.amount}
            onChange={(e) => handleListChange('ingredients', index, 'amount', e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Unit"
            variant="outlined"
            fullWidth
            value={ingredient.unit}
            onChange={(e) => handleListChange('ingredients', index, 'unit', e.target.value)}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={() => handleDeleteItem('ingredients', index)}>
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
    ));
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
             
            </div>
          </>
        );
      case 1:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Ingredients
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Ingredient Name"
                  variant="outlined"
                  fullWidth
                  value={ingredientData.name}
                  onChange={handleIngredientChange('name')}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Amount"
                  variant="outlined"
                  fullWidth
                  value={ingredientData.amount}
                  onChange={handleIngredientChange('amount')}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Unit"
                  variant="outlined"
                  fullWidth
                  value={ingredientData.unit}
                  onChange={handleIngredientChange('unit')}
                />
              </Grid>
              <Grid item xs={12}>
                <IconButton onClick={handleAddIngredient}>
                  <AddCircleOutline />
                </IconButton>
              </Grid>
            </Grid>
            {renderIngredients()}
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
                      onChange={(e) => handleListChange('instructions', index, '', e.target.value)}
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
            <div>Difficulty</div>
            <TextField
            label="Difficulty"
            variant="outlined"
            fullWidth
            value={recipeData.difficulty}
            onChange={handleChange('difficulty')}
            />
            
            <TextField
              label="Additional Comment"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={recipeData.additionalComment}
              onChange={handleChange('additionalComment')}
            />
          </>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    console.log('Submitting recipe:', recipeData);

    const response = await axios
      .post('http://3.14.254.41:5000/post', {
        name: recipeData.name,
        ingredients: recipeData.ingredients,
        instructions: recipeData.instructions,
        additionalComment: recipeData.additionalComment,
        recipeOwner : props.user._id,
        image : recipeData.image,
        difficulty : recipeData.difficulty


      })
      .then((response) => {
        console.log('Success:', response);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

      navigate('/home');
  };

  return (
    <div id="addContainer">
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
        <div className="stepContent">{renderStepContent(activeStep)}</div>
        <div className="buttonContainer">
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

export default Add;
