import { Modal, Box, TextField, Button } from '@mui/material';
import { useState } from 'react';

export const ProfileModal = ({
  open,
  setOpen,
  setName,
  setEmail,
  setSelectedFile,
  selectedFile,
  name,
  email,
  handleAddUser,
}: any) => {
  // const [selectedFile, setSelectedFile] = useState(null);

  // const handleFileChange = (event: any) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //   //   const fileContent = event.target.result;
  //   // setSelectedFile(fileContent);
  //   console.log(event);

  // };

  // const handleAddUser = () => {
  //   if (name && email && selectedFile) {
  //     const newUser = {
  //       name,
  //       email,
  //       avatar: selectedFile ? URL.createObjectURL(selectedFile) : null,
  //     };

  //     console.log(newUser, 'newUser');

  //     //   onAddUser(newUser);

  //     setName('');
  //     setEmail('');
  //     setSelectedFile(null);
  //   }
  // };

  // const handleFileChange = (event: any) => {
  //   console.log(event, 'OOOOOOOOoo');

  //   const selectedFile = event.target.files[0];
  //   console.log(selectedFile, 'selectedFile');

  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     console.log(event, 'EBETTTTT');

  //     // const fileContent = event.target.result;
  //     // setSelectedFile(fileContent);

  //     // const imageData = {
  //     //   name: selectedFile?.name,
  //     //   file: fileContent,
  //     // };
  //   };
  // };

  const [userData, setUserData] = useState();

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedFile(imageUrl);
    }
  };
  // localStorage.setItem('avtar', selectedFile);

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
