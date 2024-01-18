import { Modal, Box, TextField, Button } from '@mui/material';
import { useState } from 'react';

export const ProfileModal = ({
  openProfile,
  setOpenProfile,
  setName,
  setEmail,
  setSelectedFile,
  selectedFile,
  name,
  email,
  handleAddUser,
}: any) => {
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedFile(imageUrl);
    }
  };

  return (
    <Modal open={openProfile} onClose={() => setOpenProfile(!openProfile)}>
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ margin: '16px 0' }}
        />
        <Button variant="contained" onClick={handleAddUser}>
          Add New
        </Button>
      </Box>
    </Modal>
  );
};
