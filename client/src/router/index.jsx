import { createBrowserRouter, Outlet } from 'react-router-dom';
import Note from '../components/Note.jsx';
import NoteList from '../components/NoteList.jsx';
import AuthProvider from '../context/AuthProvider.jsx';
import ErrorPage from '../pages/ErrorPage.jsx';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import { foldersLoader } from '../utils/folderUtils.js';
import { addNewNote, noteLoader, notesLoader, updateNote } from '../utils/noteUtils.js';
import ProtectedRoute from './ProtectedRoute.jsx';

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

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
            loader: foldersLoader,
            children: [
              {
                element: <NoteList />,
                path: `folders/:folderId`,
                action: addNewNote, // khi mà mình submit 1 method không phải là get thì cần phải định nghĩa action để thực hiện
                loader: notesLoader,
                children: [
                  {
                    element: <Note />,
                    path: `note/:noteId`,
                    action: updateNote,
                    loader: noteLoader,
                  }
                ]
              }
            ]
          },
        ],
      },
    ],
  },
]);