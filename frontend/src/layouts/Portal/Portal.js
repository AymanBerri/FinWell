// Portal.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/SidebarNav/SidebarNav';
import Dashboard from '../Dashboard/Dashboard';
import Profile from '../Profile/Profile';

import OtherPage from '../OtherPage/OtherPage';
import { styled } from '@mui/system';

import IncomePage from '../Income/IncomePage';
import ExpensePage from '../Expense/ExpensePage';

const PortalContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
});

const ContentContainer = styled('div')({
  display: 'flex',
  flex: 1,
  overflow: 'hidden',
});

const MainContent = styled('div')({
  flex: 1,
  overflowY: 'auto',
  padding: '20px',
  boxSizing: 'border-box',
});

const Portal = () => {
  return (
    <PortalContainer>
      <Header />
      <ContentContainer>
        <Sidebar />

        <MainContent>
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="income" element={<IncomePage />} />
            <Route path="expense" element={<ExpensePage />} />

            <Route path="settings/profile" element={<Profile />} /> 

            <Route path="otherPage" element={<OtherPage />} />
          </Routes>
        </MainContent>

      </ContentContainer>
    </PortalContainer>
  );
};

export default Portal;
