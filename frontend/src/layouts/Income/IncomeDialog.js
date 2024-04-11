import React, { useState, useEffect } from 'react';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

const IncomeDialog = ({ onClose, showSnackbar, mode, incomeDetails, fetchData }) => {
  // Your state for form fields and validation
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [date, setDate] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state


  // Validation states
  const [amountError, setAmountError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  // Token
  const token = localStorage.getItem('authToken');


  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)

        const response = await axios.get('http://localhost:8000/api/categories/income/', {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false)
      }
    };

    fetchCategories();
  }, []);


    // Set initial form values if in edit mode
    useEffect(() => {
      if (mode === 'edit' && incomeDetails) {
        setAmount(incomeDetails.amount);
        setDescription(incomeDetails.description);
        setCategoryName(incomeDetails.category.name);
        setDate(incomeDetails.date);
      }
    }, [mode, incomeDetails]);

  // Validation logic
  const validateForm = () => {
    let isValid = true;

    if (!amount) {
      setAmountError(true);
      isValid = false;
    } else {
      setAmountError(false);
    }

    if (!date) {
      setDateError(true);
      isValid = false;
    } else {
      setDateError(false);
    }

    if (!categoryName) {
      setCategoryError(true);
      isValid = false;
    } else {
      setCategoryError(false);
    }

    return isValid;
  };

  const handleSubmit = async () => {
    // Validation logic
    if (!validateForm()) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      if (mode === 'add') {
        console.log('RUNNING ADD Income')
        // Add new income record
        await axios.post(
          'http://localhost:8000/api/income/',
          {
            amount,
            description,
            category: { name: categoryName },
            date,
          },
          {
            headers: {
              'Authorization': `Token ${token}`,
            },
          }
        );
        // Reload the page without changing the scroll position or location
        window.location.reload(false);
        
      } else if (mode === 'edit' && incomeDetails) {
        console.log(incomeDetails.id)
        // Edit existing income record
        await axios.put(
          `http://localhost:8000/api/income/${incomeDetails.id}/`,
          {
            amount,
            description,
            category: { name: categoryName },
            date,
          },
          {
            headers: {
              'Authorization': `Token ${token}`,
            },
          }
        );
      }

      // Show success Snackbar
      if(showSnackbar) showSnackbar('success', 'Income updated successfully');

    } catch (error) {
      console.error('Error updating income:', error);
      // Show error Snackbar
      if(showSnackbar) showSnackbar('error', 'Error updating income');
    }

    if (mode === 'edit'){
      // Here we re-fetch data since the user updated/added a record.
      fetchData();
      alert("Successfully updated.")
    }

    // Reset the form fields
    setAmount('');
    setDescription('');
    setCategoryName('');
    setDate('');

    // Close the dialog
    onClose();
    
  };



  

  return (
    <DialogContent>
      {/* Your form content */}
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <div>
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            margin="normal"
            error={amountError}
            helperText={amountError ? 'Amount is required' : ''}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            error={dateError}
            helperText={dateError ? 'Date is required' : ''}
          />
          <TextField
            select
            label="Category"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            fullWidth
            margin="normal"
            error={categoryError}
            helperText={categoryError ? 'Category is required' : ''}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>

          {/* Submit button */}
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {mode === 'add' ? 'Add Income' : 'Update Income'}
          </Button>
        </div>
      )}
      
    </DialogContent>
  );
};

export default IncomeDialog;
