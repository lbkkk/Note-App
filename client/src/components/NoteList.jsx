import { NoteAddOutlined } from '@mui/icons-material'
import { Box, Card, CardContent, Grid, IconButton, List, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, Outlet, useLoaderData, useParams, useSubmit } from 'react-router-dom'

export default function NoteList() {
  const { noteId, folderId } = useParams() // lấy id của note từ đường dẫn
  const [activeNoteId, setActiveNoteId] = useState(noteId) // khởi tạo state activeNode với giá trị là null
  const  { folder } = useLoaderData(); // data này là trả về từ loader
  const submit = useSubmit();

  console.log('[NoteList]', { folder });

  const handleAddNewNote = () => {
    submit(
      {
        content: '',
        folderId,
      },
      { method: 'post', action: `/folders/${folderId}` }
    );
  };

  return (
    <Grid container height="100%">
      <Grid item xs={4} sx={{ Width: '100%', maxWidth: 360, bgcolor: '#F0EBE3', height: '100%', padding: '10px', textAlign: 'left', overflowY: 'auto' }}>
        <List
          subheader={
            <Box>
              <Typography sx={{ fontWeight: 'bold' }}>
                Notes
              </Typography>
              <Tooltip title='Add Note' onClick={handleAddNewNote}>
                <IconButton size='small'>
                  <NoteAddOutlined />
                </IconButton>
              </Tooltip>
            </Box>
          }
        >
          {
            folder.notes.map(({ id, content }) => {
              return (
                <Link
                  key={id}
                  to={`notes/${id}`}
                  style={{ textDecoration: 'none' }}
                  onClick={() => setActiveNoteId(id)}
                  >
                    <Card sx={{ marginBottom: '5px',  bgcolor: id === activeNoteId ? 'rgb(255 211 140)' : null }}>
                      <CardContent sx={{ '&last-child': { pb: '10px' }, padding: '10px' }}>    
                        <div style={{ fontSize: 14, fontWeight: 'bold'}}
                        dangerouslySetInnerHTML={{
                          __html: `${content.substring(0, 30) || 'Empty'}`}}/>                
                      </CardContent>
                    </Card>
                </Link>
              )
            })
          }
        </List>
      </Grid>
      <Grid item xs={8}>
        <Outlet/>
        </Grid>
    </Grid>
  )
}
