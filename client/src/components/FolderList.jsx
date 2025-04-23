import { Box, Card, CardContent, List, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { Link, useParams  } from 'react-router-dom'
import NewFolder from './NewFolder.jsx'


export default function FolderList({folders}) { // truyền danh sách các folders đc lấy từ BE

  const { folderId } = useParams() // lấy id của folder từ đường dẫn
  console.log({folderId})
  const [activeFolderId, setActiveFolderId] = useState(folderId) // khởi tạo state activeFolder với giá trị là folderId

  return (
    <List sx={{ width: '100%', bgcolor: '#7D9D9C', height: '100%', padding: '10px', textAlign: 'left' , overflowY: 'auto' }}
      subheader={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ fontWeight: 'bold', color: '#fff' }}>
            Folders
          </Typography>
          <NewFolder />
        </Box>
      }
    >
      {
        folders?.map(({ id, name }) => {
          return (
            <Link
              key={id} // mỗi folder = 1 key
              to={`folders/${id}`} // đường dẫn đến folder
              style={{ textDecoration: 'none' }} // bỏ gạch chân
              onClick={() => setActiveFolderId(id)} // khi click vào folder thì set activeFolderId = id của folder đó
            >
              <Card sx={{ mb: '5px',  bgcolor: id === activeFolderId ? 'rgb(255 211 140)' : null }}>
                <CardContent 
                  sx={{ '&last-child': { pb: '10px' }, padding: '10px' }}
                  >
                  <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
                    {name} {/* tên folder */}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          )
        })
      }
    </List>
  )
}
