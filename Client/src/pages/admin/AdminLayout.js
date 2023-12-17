import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Path from '../../ultils/path';

const AdminLayout = () => {
  const {isLogin, user} = useSelector(state => state.auth)
  console.log(isLogin, user)
if(!isLogin || !user || user?.role !== 'admin') return <Navigate to={`/${Path.LOGIN}`} replace={true}/>

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
