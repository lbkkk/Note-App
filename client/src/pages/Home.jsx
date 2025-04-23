import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import UserMenu from '../components/UserMenu.jsx'
import FolderList from '../components/FolderList.jsx'
import { Outlet, useLoaderData } from 'react-router-dom'
import PushNotification from '../components/PushNotification.jsx'

export default function Home() {
  const { folders } = useLoaderData(); // data folders này là trả về từ loader

  // console.log('[HomePage]', {data});

  return (
    <>
      <Typography variant='h4' sx={{ mb: '20px'}}>Note App</Typography> 
      <Box sx={{ display: 'flex', justifyContent: 'right', mb: '10px' }}>
        <UserMenu />
        <PushNotification/>
      </Box> 

      {/* height: '50vh' => cao = 1/2 trình duyệt */}
      <Grid
        container
        sx={{ height: '50vh', boxShadow: '0 0 15px 0 rgb(193 193 193 / 60%)' }}
      >
        <Grid item xs={3} sx={{ height: '100%' }}> {/* xs = {3} => 3/12 = 25% width */}
          <FolderList 
            folders={ folders }
          />
        </Grid>
        <Grid item xs={9} sx={{ height: '100%' }}>
          <Outlet/>
        </Grid>
      </Grid>
    </>
  )
}
