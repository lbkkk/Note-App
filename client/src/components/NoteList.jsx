import { NoteAddOutlined } from '@mui/icons-material'
import { Box, Card, CardContent, Grid, IconButton, List, Tooltip, Typography } from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLoaderData, useParams, useSubmit, useNavigate } from 'react-router-dom'

export default function NoteList() {
  const { noteId, folderId } = useParams() // lấy id của note từ đường dẫn
  const [activeNoteId, setActiveNoteId] = useState(noteId) // khởi tạo state activeNode với giá trị là null
  const  { folder } = useLoaderData(); // data này là trả về từ loader
  const submit = useSubmit();
  const navigate = useNavigate();

  console.log('[NoteList]', { folder });

  useEffect(() => {
    if (noteId) {
      setActiveNoteId(noteId);
      return;
    }

    if (folder?.notes?.[0]) {
      navigate(`note/${folder.notes[0].id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId, folder.notes]);

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
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
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
            folder.notes.map(({ id, content, updatedAt }) => {
              return (
                <Link
                  key={id}
                  to={`note/${id}`}
                  style={{ textDecoration: 'none' }}
                  onClick={() => setActiveNoteId(id)}
                  >
                    <Card sx={{ marginBottom: '5px',  bgcolor: id === activeNoteId ? 'rgb(255 211 140)' : null }}>
                      <CardContent sx={{ '&last-child': { pb: '10px' }, padding: '10px' }}>    
                        <div style={{ fontSize: 15, fontWeight: 'bold'}}
                        dangerouslySetInnerHTML={{
                          __html: `${content.substring(0, 30) || 'Empty'}`}}
                        />        
                        <Typography sx={{ fontSize: '10px', color: 'gray', marginTop: '20px' }}>
                          {moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                        </Typography>        
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
