import React, { useState } from 'react';
import { styled } from '@mui/system'; // Import styled for custom styling
import { Link, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Box from '@mui/material/Box'; // Import Box


import IncomeDialog from '../../layouts/Income/IncomeDialog';
import ExpenseDialog from '../../layouts/Expense/ExpenseDialog';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SavingsIcon from '@mui/icons-material/Savings';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AddIcon from '@mui/icons-material/Add';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Custom styled floating button
const FloatingButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

const Sidebar = () => {
  

  const navigate = useNavigate();

  // State variables for Dialogs
  const [incomeDialogOpen, setIncomeDialogOpen] = useState(false);
  const [expenseDialogOpen, setExpenseDialogOpen] = useState(false);

  const [dialogMode, setDialogMode] = useState('add'); // State variable for managing dialog mode (e.g., 'add' or 'edit')

  // State for Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);

  // State variables for Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const pages = [
    { path: 'dashboard', name: 'Dashboard', icon: <DashboardIcon /> },
    { path: 'income', name: 'Income', icon: <AttachMoneyIcon /> },
    { path: 'expense', name: 'Expense', icon: <ReceiptLongIcon /> },
    // { path: 'savings', name: 'Savings', icon: <SavingsIcon /> },
  ];

  const handleAddClick = (path) => {
    switch (path) {
      case 'income':
        setIncomeDialogOpen(true);
        break;

      case 'expense':
        setExpenseDialogOpen(true);
        break;
      // Add cases for other pages as needed

      default:
        break;
    }
  };

  // Function to show Snackbar
  const showSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  // Function to hide Snackbar
  const hideSnackbar = () => {
    setSnackbarOpen(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleItemClick = () => {
    setDrawerOpen(false); // Close the drawer when any item is clicked
  };

  // Responsive drawer content
const drawerContent = (
  <div style={{ width: 200, display: 'flex', flexDirection: 'column', height: '100%' }}>
    <div style={{ flex: 1 }} />
    {/* Existing list items */}
    <List>
      {pages.map((page, index) => (
        <React.Fragment key={page.path}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ListItem button component={Link} to={`/portal/${page.path}`} onClick={handleItemClick}>
              {page.icon}
              <ListItemText primary={page.name} />
            </ListItem>
            {page.path !== 'dashboard' && (
              <ListItem button onClick={() => handleAddClick(page.path)} style={{ width: '60px', marginLeft: '10px' }}>
                <AddIcon />
              </ListItem>
            )}
          </div>
          {index < pages.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
    {/* Additional items at the bottom */}
    <div>
      {/* Add your additional items here */}
    </div>
  </div>
);


  return (
    <>
      {/* Floating menu button */}
      <FloatingButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        sx={{
          display: { xs: 'block', sm: 'none' } // Show on extra small screens, hide on small screens and up
        }}
      >
        <MenuIcon />
      </FloatingButton>

      <Drawer
        anchor="right"
        open={drawerOpen}
        backgroundColor= "green"
        onClose={toggleDrawer(false)}
      >
        {drawerContent}
      </Drawer>

      <Box
        sx={{
          display: { xs: 'none', sm: 'block' }, // Only display on small screens and up
          height: '100%',
          width: '250px',
          backgroundColor: 'white',
          padding: '20px',
          borderRight: '1px solid #ccc',
        }}
      >
        <List>
          {pages.map((page, index) => (
            <React.Fragment key={page.path}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <ListItem button component={Link} to={`/portal/${page.path}`}>
                  {page.icon}
                  <ListItemText primary={page.name} />
                </ListItem>
                {/* Conditionally render the add button */}
                {page.path !== 'dashboard' && (
                  <ListItem button onClick={() => handleAddClick(page.path)} style={{ width: '60px', marginLeft: '10px' }}>
                    <AddIcon />
                  </ListItem>
                )}
              </div>
              {index < pages.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>


      {/* Dialogs */}
      <Dialog open={incomeDialogOpen} onClose={() => setIncomeDialogOpen(false)}>
        <DialogTitle>Add Income</DialogTitle>
        <IncomeDialog onClose={() => setIncomeDialogOpen(false)} showSnackbar={showSnackbar}  mode={dialogMode}/>
      </Dialog>

      <Dialog open={expenseDialogOpen} onClose={() => setExpenseDialogOpen(false)}>
        <DialogTitle>Add Expense</DialogTitle>
        <ExpenseDialog onClose={() => setExpenseDialogOpen(false)} showSnackbar={showSnackbar} mode={dialogMode} />
      </Dialog>

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert variant='standard' onClose={hideSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Sidebar;
