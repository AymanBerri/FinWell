import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IncomeDialog from './IncomeDialog';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import LineChart from '../../components/LineChart/LineChart';
import PieChart from '../../components/PieChart/PieChart';
import IncomeTable from '../../components/Table/Table';

const IncomeComponent = () => {
  // State variables
  const [incomeDialogOpen, setIncomeDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState(''); // State variable for managing dialog mode (e.g., 'add' or 'edit')
  const [incomeDetails, setIncomeDetails] = useState(null); // State variable for managing income details for editing

  const [loading, setLoading] = useState(true); // Loading state
  const [categories, setCategories] = useState([]); // Stores income categories
  const [userData, setUserData] = useState(null); // Stores user data
  const [incomeData, setIncomeData] = useState([]); // Stores income data

  const [uniqueYears, setUniqueYears] = useState([]);
  const [filteredYear, setFilteredYear] = useState(new Date().getFullYear()); // Stores currently filtered year

  const [lineChartData, setLineChartData] = useState({})
  const [pieChartData, setPieChartData] = useState({}); // Stores data for pie chart
  const [filteredIncomeTableData, setFilteredIncomeTableData] = useState([]); // Stores data for filtered income table

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Mobile Responsive
  const [isMobile, setIsMobile] = useState(false);



  const token = localStorage.getItem('authToken');


  // Fetch data from backend API
  useEffect(() => {
    fetchData();
  }, []);

  // Process pie and line chart data when incomeData or filteredYear changes
  useEffect(() => {
    processPieChartData();
    processLineChartData();
  }, [incomeData, filteredYear]);

  // Process filtered income table data when incomeData or filteredYear changes
  useEffect(() => {
    processIncomeTableData();
  }, [incomeData, filteredYear]);

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
      const categoriesResponse = await axios.get('http://localhost:8000/api/categories/income/', {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
      // Fetch user info
      const userInfoResponse = await axios.get('http://localhost:8000/user-info/', {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
      // Fetch income data
      const incomeResponse = await axios.get('http://localhost:8000/api/income/', {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Update state with fetched data
      setCategories(categoriesResponse.data);
      setUserData(userInfoResponse.data);
      setIncomeData(incomeResponse.data);

      // Calculate unique income years
      const incomeYears = Array.from(new Set(incomeResponse.data.map(record => new Date(record.date).getFullYear())));
      setUniqueYears(incomeYears);

      // Set the filtered income year to the default
      setFilteredYear(incomeYears[0]);

    } catch (error) {
      console.error('Error during fetch:', error);
    } finally{
      setLoading(false); // Set loading state to false after data fetching is complete
    }
  };
 
  // Process line chart data
  const processLineChartData = () => {
    const aggregatedDataLineChart = Array(12).fill(0); // Initialize an array with zeros for each month
  
    // Filter incomeData for the filteredYear
    const filteredIncomes = incomeData.filter(record => {
      const year = new Date(record.date).getFullYear();
      return year === filteredYear;
    });
  
    // Iterate over filteredIncomes and aggregate data by month
    filteredIncomes.forEach(record => {
      const date = new Date(record.date);
      const month = date.getMonth(); // Get month index starting from 0
  
      // Add the income amount to the month's total
      aggregatedDataLineChart[month] += parseFloat(record.amount);
    });
    setLineChartData(aggregatedDataLineChart);
  };

  // Process pie chart data
  const processPieChartData = () => {
    const aggregatedDataPieChart = {};
    incomeData.forEach((record) => {
      const date = new Date(record.date);
      const year = date.getFullYear();
      if (year === filteredYear) {
        const categoryName = record.category.name;
        if (!aggregatedDataPieChart[categoryName]) {
          aggregatedDataPieChart[categoryName] = 0;
        }
        aggregatedDataPieChart[categoryName] += parseFloat(record.amount);
      }
    });
    setPieChartData(aggregatedDataPieChart);
  };

  // Process filtered income table data
  const processIncomeTableData = () => {
    const filteredData = incomeData.filter((record) => new Date(record.date).getFullYear() === filteredYear);
    setFilteredIncomeTableData(filteredData);
  };

  // Handle year filter change
  const handleYearFilter = (year) => {
    setFilteredYear(year);
  };

  
  const handleEditIncome = (incomeId) => {
    // Find the income in incomeData array based on incomeId
    const incomeToEdit = incomeData.find(income => income.id === incomeId);
  
    // Open the IncomeDialog component for editing the income
    setIncomeDialogOpen(true); // assuming you have a state to manage the dialog open/close
    setDialogMode('edit');
    setIncomeDetails(incomeToEdit); // assuming you have a state to manage the income details for editing
  };


  const handleDeleteIncome = async (incomeId) => {
    try {
      const incomeDeletionResponse = await axios.delete(`http://localhost:8000/api/income/${incomeId}/`, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      // Check if deletion was successful (status code 204 No Content)
      if (incomeDeletionResponse.status === 204) {
        handleSnackbarOpen('Income deleted successfully', 'success');
        fetchData()
      } else {
        handleSnackbarOpen(`Unexpected response: ${incomeDeletionResponse}`, 'error');
      }
    } catch (error) {
      console.error('Income Deletion Error:', error); 
      handleSnackbarOpen(`Income Deletion Error: ${error}`, 'error'); // Logging the error
    }
  };

  // Conditional rendering based on loading state
  if (loading) {
    return <div>Loading...</div>; // Render loading indicator while fetching data
  }
  // Render income component
  return (
    <div>
    <h2>Income Report</h2>

    {incomeData.length === 0? (
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
          <div style={{ width: isMobile ? '100%' : '60%', height: '400px', marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '5px' }}>Monthly Income</h4>
            <LineChart data={lineChartData} label={"Total Income"} />
          </div>
          <div style={{ width: isMobile ? '100%' : '50%', height: '400px', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: isMobile ? '80%' : '100%', maxWidth: '400px' }}>
              <h4 style={{ marginBottom: '5px' }}>Income by Category</h4>
              <PieChart data={pieChartData} chartId="incomeChart"/>
            </div>
          </div>
        </div>



        <div style={{ margin: '90px 0px' }}>
            <h3 style={{ marginBottom: '5px' }}>Income Table</h3>
            <IncomeTable data={filteredIncomeTableData} onEdit={handleEditIncome} onDelete={handleDeleteIncome} />
        </div>

        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <MuiAlert elevation={6} variant='standard' onClose={handleSnackbarClose} severity={snackbarSeverity}>
                {snackbarMessage}
            </MuiAlert>
        </Snackbar>

        {/* Dialog */}
        <Dialog open={incomeDialogOpen} onClose={() => setIncomeDialogOpen(false)}>
            <DialogTitle>Add Income</DialogTitle>
            <IncomeDialog onClose={() => setIncomeDialogOpen(false)} mode={dialogMode} onEdit={ handleEditIncome } incomeDetails={incomeDetails} fetchData={fetchData} />
        </Dialog>

      </div>
    )}

</div>
  );
};

export default IncomeComponent;
