import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import PieChart from '../../components/PieChart/PieChart.js';
import { Typography } from '@mui/material';
import { MonetizationOnOutlined, MoneyOffOutlined, TrendingUp, TrendingDown } from '@mui/icons-material';


const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [selectedYear, setSelectedYear] = useState('');

  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const [amountByCategory, setAmountByCategory] = useState({})

  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userResponse = await axios.get('http://localhost:8000/user-info/', {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (userResponse.status === 200) {
          setUserData(userResponse.data);
        } else {
          console.error('Failed to fetch user profile:', userResponse.statusText);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const dashboardResponse = await axios.get(`http://localhost:8000/dashboard/?year=${selectedYear || -1}`, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
      // console.log(dashboardResponse.data)
      if (dashboardResponse.status === 200) {
        const { amount_by_category, incomes, expenses, total_income, total_expense } = dashboardResponse.data;
        setAmountByCategory(amount_by_category || {})
        setIncomes(incomes || []);
        setExpenses(expenses || []);
        setTotalIncome(total_income || 0);
        setTotalExpenses(total_expense || 0);
        setDataLoaded(true);
      } else {
        console.error('Failed to fetch dashboard data:', dashboardResponse.statusText);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', border: '1px solid #c4c4c4', borderRadius: '6px', overflow: 'hidden' }}>
    <Tooltip title="Leave empty to fetch all data" placement="bottom">
      <input
        type="text"
        placeholder="Enter Year (e.g., 2024)"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        style={{ padding: '8px', fontSize: '16px', border: 'none', outline: 'none', width: '200px' }}
      />
    </Tooltip>
    <button onClick={fetchTransactions} style={{ padding: '8px 16px', fontSize: '16px', backgroundColor: '#0070c9', color: '#fff', border: 'none', cursor: 'pointer' }}>Load Data</button>
  </div>

  {loading ? (
    <p>Loading...</p>
  ) : (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {dataLoaded ? (
        <>
          {incomes.length > 0 || expenses.length > 0 ? (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', maxWidth: '1200px' }}>
                  <div className="income-expense-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', marginRight: '20px', width: '300px', marginBottom: '20px' }}>
                    <Typography variant="h6">Total Income <MonetizationOnOutlined /></Typography>
                    <Typography variant="h4">{totalIncome}</Typography>
                  </div>
                  <div className="income-expense-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', marginRight: '20px', width: '300px', marginBottom: '20px' }}>
                    <Typography variant="h6">Total Expenses <MoneyOffOutlined /></Typography>
                    <Typography variant="h4">{totalExpenses}</Typography>
                  </div>
                  <div className="income-expense-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '300px', marginBottom: '20px' }}>
                    <Typography variant="h6">Net</Typography>
                    <Typography variant="h4" style={{ color: totalIncome - totalExpenses >= 0 ? 'green' : 'red' }}>{totalIncome - totalExpenses} {totalIncome - totalExpenses >= 0 ? <TrendingUp /> : <TrendingDown />}</Typography>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '1200px' }}>
                  <div style={{ width: '300px', height: '300px', margin: '30px' }}>
                    {totalIncome > 0 ? (
                      <>
                        <h4 style={{ marginBottom: '5px' }}>Income by Category</h4>
                        <PieChart data={amountByCategory.income} chartId='incomeChart' />
                      </>) : ("No data available for Income by category Pie Chart")}
                  </div>
                  <div style={{ width: '300px', height: '300px', margin: '10px' }}>
                    {totalExpenses > 0 ? (
                      <>
                        <h4 style={{ marginBottom: '5px' }}>Expense by Category</h4>
                        <PieChart data={amountByCategory.expense} chartId='expenseChart' />
                      </>) : ("No data available for Expense by category Pie Chart")}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>There were no transactions recorded for this year.</p>
          )}
        </>
      ) : (
        <p>Type year or leave empty for all data, then click "Load Data" to load the Dashboard.</p>
      )}
    </div>
  )}
</div>

  );
};

export default Dashboard;
