import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import ExpenseDialog from './ExpenseDialog';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import LineChart from '../../components/LineChart/LineChart';
import PieChart from '../../components/PieChart/PieChart';
import ExpenseTable from '../../components/Table/Table';

const ExpenseComponent = () => {
  // State variables
  const [expenseDialogOpen, setExpenseDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState(''); // State variable for managing dialog mode (e.g., 'add' or 'edit')
  const [expenseDetails, setExpenseDetails] = useState(null); // State variable for managing expense details for editing
  

  const [loading, setLoading] = useState(true); // Loading state
  const [categories, setCategories] = useState([]);
  const [userData, setUserData] = useState(null);
  const [expenseData, setExpenseData] = useState([]);


  const [uniqueYears, setUniqueYears] = useState([]);
  const [filteredYear, setFilteredYear] = useState(new Date().getFullYear());


  const [lineChartData, setLineChartData] = useState({});
  const [pieChartData, setPieChartData] = useState({});
  const [filteredExpenseTableData, setFilteredExpenseTableData] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Mobile Responsive
  const [isMobile, setIsMobile] = useState(false);

  // Get the token
  const token = localStorage.getItem('authToken');

  // Fetch data from backend API
  useEffect(() => {
    fetchData();
  }, []);

  // Process pie chart and line chart data when expenseData or filteredYear changes
  useEffect(() => {
    processPieChartData();
    processLineChartData();
  }, [expenseData, filteredYear]);

  // Process filtered expense table data when expenseData or filteredYear changes
  useEffect(() => {
    processExpenseTableData();
  }, [expenseData, filteredYear]);


  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity)
    setSnackbarOpen(true);
  };


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600); // Adjust the breakpoint as needed
    };
  
    handleResize(); // Call on initial render
    window.addEventListener('resize', handleResize); // Add event listener for resize
  
    return () => {
      window.removeEventListener('resize', handleResize); // Remove event listener on component unmount
    };
  }, []);


  // Fetch data from backend API
  const fetchData = async () => {
    try {
      setLoading(true); // Set loading state to true
      
      // Fetch categories
      const categoriesResponse = await axios.get('http://localhost:8000/api/categories/expense/', {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
      // Fetch user info with authentication token included in the headers
      const userInfoResponse = await axios.get('http://localhost:8000/user-info/', {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
      // Fetch expense data with authentication token included in the headers
      const expenseResponse = await axios.get('http://localhost:8000/api/expense/', {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
    
      // Update state with fetched data
      setCategories(categoriesResponse.data);
      setUserData(userInfoResponse.data);
      setExpenseData(expenseResponse.data);
  
      // Calculate unique years
      const expenseYears = Array.from(new Set(expenseResponse.data.map(record => new Date(record.date).getFullYear())));
      setUniqueYears(expenseYears);
  
      // Set the filtered year to the default
      setFilteredYear(expenseYears[0]);
  
    } catch (error) {
      console.error('Error during fetch:', error);
    } finally {
      setLoading(false); // Set loading state to false after data fetching is complete
    }
  };


  
  // Process line chart data
  const processLineChartData = () => {
    const aggregatedDataLineChart = Array(12).fill(0); // Initialize an array with zeros for each month
  
    // Filter expenseData for the filteredYear
    const filteredExpenses = expenseData.filter(record => {
      const year = new Date(record.date).getFullYear();
      return year === filteredYear;
    });
  
    // Iterate over filteredExpenses and aggregate data by month
    filteredExpenses.forEach(record => {
      const date = new Date(record.date);
      const month = date.getMonth(); // Get month index starting from 0
  
      // Add the expense amount to the month's total
      aggregatedDataLineChart[month] += parseFloat(record.amount);
    });
    setLineChartData(aggregatedDataLineChart);
  };

  // Process pie chart data
  const processPieChartData = () => {
    const aggregatedDataPieChart = {};

    expenseData.forEach((record) => {
      const date = new Date(record.date);
      const year = date.getFullYear();

    //   Filter by year
      if (year === filteredYear) {
        const categoryName = record.category.name;
        if (!aggregatedDataPieChart[categoryName]) {
          aggregatedDataPieChart[categoryName] = 0; // if doesnt exist, initialize with 0
        }
        aggregatedDataPieChart[categoryName] += parseFloat(record.amount); // else add
      }
    });
    setPieChartData(aggregatedDataPieChart);
  };
  
  // Process filtered expense table data
  const processExpenseTableData = () => {
    const filteredData = expenseData.filter((record) => new Date(record.date).getFullYear() === filteredYear);
    setFilteredExpenseTableData(filteredData);
  };

  // Handle year filter change
  const handleYearFilter = (year) => {
    setFilteredYear(year);
  };


  const handleEditExpense = (expenseId) => {
    // Find the expense in expenseData array based on expenseId
    const expenseToEdit = expenseData.find(expense => expense.id === expenseId);
  
    // Open the ExpenseDialog component for editing the expense
    setExpenseDialogOpen(true); // assuming you have a state to manage the dialog open/close
    setDialogMode('edit');
    setExpenseDetails(expenseToEdit); // assuming you have a state to manage the expense details for editing
  };
    
  const handleDeleteExpense = async (expenseId) => {
    try {
      const expenseDeletionResponse = await axios.delete(`http://localhost:8000/api/expense/${expenseId}/`, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      // Check if deletion was successful (status code 204 No Content)
      if (expenseDeletionResponse.status === 204) {
        handleSnackbarOpen('Expense deleted successfully', 'success');
        fetchData()
      } else {
        handleSnackbarOpen(`Unexpected response: ${expenseDeletionResponse}`, 'error');
      }
    } catch (error) {
      console.error('Expense Deletion Error:', error); 
      handleSnackbarOpen(`Expense Deletion Error: ${error}`, 'error'); // Logging the error
    }
  };

  // Conditional rendering based on loading state
  if (loading) {
    return <div>Loading...</div>; // Render loading indicator while fetching data
  }

  // Render expense component
  return (
    <div>
      <h2>Expense Report</h2>


      {expenseData.length === 0? (
        <div>There are no transactions recorded yet.</div>
      ) : (
        <div>
          {/* Dropdown menu to select the year */}
          <div style={{ marginBottom: '20px' }}>
              <label htmlFor="yearDropdown" style={{ marginRight: '10px', fontSize: '16px' }}>Select Year:</label>
              <select id="yearDropdown" value={filteredYear} onChange={(e) => handleYearFilter(parseInt(e.target.value))} style={{ padding: '8px', fontSize: '17px', border: 'none' }}>
                  {uniqueYears.map(year => (
                      <option key={year} value={year}>{year}</option>
                  ))}
              </select>
          </div>
                
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', margin: '50px 0px' }}>
            <div style={{ width: isMobile ? '100%' : '65%', height: '400px', marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '5px' }}>Monthly Expense</h4>
              <LineChart data={lineChartData} label={"Total Expense"} />
            </div>
            <div style={{ width: isMobile ? '100%' : '30%', height: '400px', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: isMobile ? '80%' : '100%', maxWidth: '400px' }}>
                <h4 style={{ marginBottom: '5px' }}>Expense by Category</h4>
                <PieChart data={pieChartData} chartId="expenseChart"/>
              </div>
            </div>
          </div>

          <div style={{ margin: '90px 0px' }}>
              <h4 style={{ marginBottom: '5px' }}>Expense Table</h4>
              <ExpenseTable data={filteredExpenseTableData} onEdit={handleEditExpense} onDelete={handleDeleteExpense}/>
          </div>

          <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <MuiAlert elevation={6} variant='standard' onClose={handleSnackbarClose} severity={snackbarSeverity}>
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>

          {/* Dialog */}
          <Dialog open={expenseDialogOpen} onClose={() => setExpenseDialogOpen(false)}>
            <DialogTitle>Add Expense</DialogTitle>
            <ExpenseDialog onClose={() => setExpenseDialogOpen(false)}  mode={dialogMode} onEdit={ handleEditExpense } expenseDetails={expenseDetails} fetchData={fetchData} />
          </Dialog>

          </div>
      )}
    </div>      
  );
};

export default ExpenseComponent;
