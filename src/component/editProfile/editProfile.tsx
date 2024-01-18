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
  setSelectedFile,
}: any) => {
  const dispatch = useDispatch();

  console.log(selectedFile, 'EditProfile');

  const [showProfile, setShowProfile] = useState(false);

  const handleDone = () => {
    dispatch(
      editUser({
        updatedData: {
          id: editData.id,
          first_name: editData.name,
          email: editData.email,
          avatar: editData.selectedFile,
        },
      })
    );

    setEditData('');

    setOpen(false);
    setShowProfile(false);
  };

  const [fileInfo, setFileInfo] = useState(
    selectedFile ? selectedFile.name : ''
  );

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditData({ ...editData, selectedFile: imageUrl });
      setFileInfo(file.name);
    }
  };
  console.log('Updated Profile', selectedFile);

  const handleUserProfile = () => {
    setShowProfile(true);
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
          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          margin="normal"
        />
        <TextField
          label="Email"
          fullWidth
          value={editData.email}
          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
          margin="normal"
        />
        {showProfile && (
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ margin: '16px 0' }}
          />
        )}

        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <p>Your Profile</p>
          <img
            src={editData?.selectedFile}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '30px',
            }}
          />
          <Button
            color="secondary"
            variant="contained"
            size="small"
            onClick={handleUserProfile}
          >
            Edit Profile
          </Button>
        </div>

        <Button variant="contained" onClick={handleDone}>
          Done
        </Button>
      </Box>
    </Modal>
  );
};
