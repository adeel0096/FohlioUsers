import React, { useEffect, useState } from 'react';
import { ADD_USER, DELETE_USER, GET_USERS, UPDATE_USER } from '../../entities/queries/user';
import { useMutation, useQuery } from '@apollo/client';
import { AgGridReact } from "ag-grid-react";
import { USER_ROLE_OPTIONS, USER_STATUS_OPTIONS } from '../../shared/config/constants';
import "../../shared/lib/agGridSetup";
import useUserStore from '../../app/providers/zustand/userStore';
import UserHeader from '../../features/user/userHeader';
import UserModal from '../../features/user/userModal';
import { User } from '../../entities/user';
import { App, theme } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useAgGridTheme } from '../../shared/lib/useAgGridTheme';
import { getColumnsDef } from '../../shared/lib/userGridUtils';

const { useApp } = App;
export const Users = () => {
  const {data, loading} = useQuery(GET_USERS);
  const [addUser] = useMutation(ADD_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  const {users, setUsers, addUserOptimistic, updateUserOptimistic, deleteUserOptimistic, replaceUser} = useUserStore();
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User| undefined>(undefined);
  const {modal, message} = useApp();
  const customGridTheme = useAgGridTheme();

  useEffect(() => {
    if (data?.users) setUsers(data.users);
  }, [data, setUsers]);

  const handleSubmit = async(newUser: User) => {
    const isEditing = Boolean(newUser.id);
    if(!isEditing)
    {
      const tempId = new Date().getTime();
      const optimisticUser = {...newUser, id: tempId};
      const rollBack = addUserOptimistic(optimisticUser);
      try{
        const {data}  = await  addUser({
          variables: newUser,
        });
        if(data?.addUser) {
          replaceUser(tempId, data.addUser);
          message.success("User added successfully");
        }
      }
      catch(e) {
        rollBack();
        message.error("Failed to add user");
      }
    } 
    else {
      await callUpdateUser(newUser);
    }

    setShowUserModal(false);
  }

  const callUpdateUser = async (newUser: User)=>{
    const rollBack = updateUserOptimistic(newUser); 
    try{
      const {data} = await updateUser({variables: newUser})
      if(data?.updateUser) {
        replaceUser(data.updateUser.id, data.updateUser);
        message.success("User updated successfully");
      }
    }
    catch(e) {
      rollBack();
      message.error("Failed to update user");
    }
  }

  const handleAddUser = () => {
    setSelectedUser(undefined);
    setShowUserModal(true);
  }

  const handlerEditUser = (user: User) => {
    setSelectedUser(user);
    setShowUserModal(true);
  }

  const handleCancel = () => {
    setShowUserModal(false);
    setSelectedUser(undefined);
  }

  const onDeleteUser = async (id: number) => {
    const rollBack = deleteUserOptimistic(id);
    try{
      const {data} = await deleteUser({variables: {id}});
      if(!data?.deleteUser) {
        rollBack();
        message.error("Failed to delete user");
      }
      else {
        message.success("User deleted successfully");
      }
    }
    catch(e) {
      rollBack();
      message.error("Failed to delete user");
    }
  }

  const handleDeleteUser = (id: number) => {
    modal.confirm({
      title: 'Are you sure you want to delete this user?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        onDeleteUser(id);
      }
    });
  }
  
  return (
    <div className='h-full flex flex-col'>
      <div className='h-[10%]'>
        <UserHeader title="User List" buttonText="Add User" onAdd={handleAddUser}/>
      </div>
      <div className={`h-[90%]`}>
          <AgGridReact
          rowData={users}
          columnDefs={getColumnsDef(handlerEditUser, handleDeleteUser, callUpdateUser)}
          pagination={true}
          loading={loading}
          stopEditingWhenCellsLoseFocus
          theme={customGridTheme}
          tooltipShowDelay={0}
          />
      </div>
      <UserModal
        visible={showUserModal}
        onCancel={handleCancel}
        roleOptions={USER_ROLE_OPTIONS}
        statusOptions={USER_STATUS_OPTIONS}
        onSubmit={handleSubmit}
        user={selectedUser}
      />
    </div>
  );
}