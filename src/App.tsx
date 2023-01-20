import * as React from 'react';
import {
  Routes,
  Route,
  HashRouter, Outlet,
} from 'react-router-dom';
import Header from "./layout/Header";
import TabBar from "./layout/TabBar";
import Order from "./layout/Order";
import Login from "./layout/Login";
import AuthProvider from './auth/AuthProvider';
import RequireAuth from "./auth/RequireAuth";


export default function App() {
  return (
    <div className='min-w-[1200px] h-full h-screen border border-slate-300 bg-stone-500 relative'>
      <HashRouter>
        <AuthProvider>
          <Header/>
          <Routes>
            <Route path={"/"} element={<Login/>}/>
            <Route element={<Layout/>}>
              <Route path="/dashboard" element={<TabBar/>}/>
              <Route path="/order" element={<Order/>}/>
            </Route>
          </Routes>
        </AuthProvider>
      </HashRouter>
    </div>
  );
}

function Layout() {
  return (
    <RequireAuth>
      <Outlet/>
    </RequireAuth>
  );
}





