/************ASyncThunk **************/

import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchContent } from './redux/userDetailSlice';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import Button from '@mui/material/Button';

import { RootState, AppDispatch } from './redux/store';
import { ProfileModal } from './profile/profileModal';
import { v4 as uuidv4 } from 'uuid';
import { updateContents } from './redux/userDetailSlice';
import { EditProfile } from './editProfile/editProfile';

export const UserDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    selectedFile: '',
    id: null,
  });
  console.log(selectedFile, 'userdetail');

  const { contents, isLoading, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (!contents?.length) dispatch(fetchContent());
  }, []);

  const handleAddUser = () => {
    setOpenProfile(!openProfile);
    const resData = {
      id: uuidv4(),
      email: email,
      first_name: name,
      avatar: selectedFile,
    };
    dispatch(updateContents(resData));

    setName('');
    setEmail('');
    setSelectedFile(null);

    setOpen(false);
  };

  const handleDeleteUser = (userId: any) => {
    dispatch(deleteUser(userId));
  };

  const handleEditUser = () => {
    setOpen(!open);
  };
  const onChangeEditHandler = (user: any) => {
    console.log('user:', user);
    setOpen(!open);
    setEditData({
      name: user.first_name,
      email: user.email,
      selectedFile: user.avatar,
      id: user.id,
    });
  };

  return (
    <div className="App">
      <ProfileModal
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        setName={setName}
        setEmail={setEmail}
        setSelectedFile={setSelectedFile}
        selectedFile={selectedFile}
        name={name}
        email={email}
        handleAddUser={handleAddUser}
      />

      <EditProfile
        open={open}
        setOpen={setOpen}
        handleEditUser={handleEditUser}
        selectedFile={editData.selectedFile}
        name={editData.name}
        email={editData.email}
        setEditData={setEditData}
        id={editData.id}
        editData={editData}
        setSelectedFile={setSelectedFile}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              {/* <TableCell>Last Name</TableCell> */}
              <TableCell>Email</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Remove User</TableCell>
              <TableCell>Edit User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contents?.length > 0 &&
              contents?.map((user: any, index: number) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.first_name}</TableCell>
                  {/* <TableCell>{user.last_name}</TableCell> */}
                  <TableCell>{user.email}</TableCell>

                  <TableCell>
                    <img
                      src={user.avatar}
                      key={user.avatar}
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '30px',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Remove
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => onChangeEditHandler(user)}
                      style={{ marginLeft: '30px' }}
                    >
                      Edit User
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div>
        {' '}
        <Button
          variant="contained"
          style={{ marginTop: '20px', marginLeft: '65%' }}
          onClick={() => setOpenProfile(!openProfile)}
        >
          Add New User
        </Button>
      </div>
    </div>
  );
};
