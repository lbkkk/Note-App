import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import AuthProvider from "../context/AuthProvider.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import NoteList from "../components/NoteList.jsx";
import Note from "../components/Note.jsx";
import { notesLoader, noteLoader } from "../utils/noteUtils.js";
import { folderLoaders } from "../utils/folderUltis.js";

const AuthLayout = () => {
  return <AuthProvider><Outlet/></AuthProvider>
}

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Login />,
        path: '/login',
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            path: '/',
            loader: folderLoaders,
            children: [
              {
                element:  <NoteList/>,
                path: `folders/:folderId`,
                loader: notesLoader,
                children: [
                  {
                    element: <Note/>,
                    path: `notes/:noteId`,
                    loader: noteLoader,
                  }
                ]
              }
            ]
          }
        ]
      } 
    ]
  }
])