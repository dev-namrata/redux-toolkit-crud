import { Modal, Box, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editUser } from '../redux/userDetailSlice';

export const EditProfile = ({
  open,
  setOpen,
  name,
  email,
  id,
  selectedFile,
  userId,
  setEditData,
  editData,
}: any) => {
  const dispatch = useDispatch();
  console.log(editData, 'After Eidted');

  const handleDone = () => {
    dispatch(
      editUser({
        updatedData: {
          id: editData.id,
          first_name: editData.name,
          email: editData.email,
        },
      })
    );

    setEditData('');

    setOpen(false);
  };

  const handleNameChange = (e: any) => {
    setEditData({ ...editData, name: e.target.value });
  };

  const handleEmailChange = (e: any) => {
    setEditData({ ...editData, email: e.target.value });
  };

  return (
    <Modal open={open} onClose={() => setOpen(!open)}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <TextField
          label="Name"
          fullWidth
          value={editData.name}
          onChange={handleNameChange}
          margin="normal"
        />
        <TextField
          label="Email"
          fullWidth
          value={editData.email}
          onChange={handleEmailChange}
          margin="normal"
        />
        <input type="file" accept="image/*" style={{ margin: '16px 0' }} />
        <Button variant="contained" onClick={handleDone}>
          Done
        </Button>
      </Box>
    </Modal>
  );
};
