// Đảm bảo rằng nếu user chưa đăng nhập thì không được truy cập vào trang home (root router) -> phải vào trang đăng nhập
import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

export default function ProtectedRoute(children) {
  console.log({accessToken: localStorage.getItem('accessToken')});
  if (!localStorage.getItem('accessToken')) { 
    return <Navigate to="/login" /> // nếu không có accessToken thì điều hướng về trang login
  }

  return (
    <Outlet />
  )
}
