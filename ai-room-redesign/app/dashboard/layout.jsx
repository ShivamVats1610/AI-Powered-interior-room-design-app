import React from 'react';
import Header from './_components/Header';
import UserDetailProvider from '../_context/UserDetailContext';

function DashboardLayout({ children }) {
  return (
    <UserDetailProvider>

      <div>
        <Header />
        
      <div className='pt-20 px-10 md:px-20 lg:px-40 xl:px-60'>
        {children}
      </div>

      </div>
    </UserDetailProvider>
  );
}

export default DashboardLayout;
