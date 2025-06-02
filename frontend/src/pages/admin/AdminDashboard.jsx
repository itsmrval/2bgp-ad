import React, { useState, useEffect } from 'react';
import {
  getUsers,
  deleteUser,
  getLevels,
  createLevel,
  deleteLevel,
  getScoreboard,
  awardUserPoints,
  register
} from '../../api/calls';
import UsersTable from './UsersTable';
import LevelsTable from './LevelsTable';
import AddUserModal from './AddUserModal';
import AddLevelModal from './AddLevelModal';
import AssignLevelModal from './AssignLevelModal';
import "../../assets/styles/admin.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const [levels, setLevels] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [showAssignLevelModal, setShowAssignLevelModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);

        const levelsData = await getLevels();
        setLevels(levelsData);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddUser = async (userData) => {
    try {
      await register(userData.username, userData.password);
      setShowUserModal(false);
      const updatedUsers = await getUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleAddLevel = async (levelData) => {
    try {
      await createLevel(levelData);
      setShowLevelModal(false);
      const updatedLevels = await getLevels();
      setLevels(updatedLevels);
    } catch (error) {
      console.error('Error creating level:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      const updatedUsers = await getUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteLevel = async (levelId) => {
    try {
      await deleteLevel(levelId);
      const updatedLevels = await getLevels();
      setLevels(updatedLevels);
    } catch (error) {
      console.error('Error deleting level:', error);
    }
  };

  const handleAwardPoints = async (userId, levelId) => {
    try {
      await awardUserPoints(userId, levelId);
      setShowAssignLevelModal(false);
    } catch (error) {
      console.error('Error awarding points:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin</h1>
      </header>
      <div className="dashboard-content">
        <section className="dashboard-section">
          <div className="section-header">
            <h2>Users</h2>
            <button className="add-button" onClick={() => setShowUserModal(true)}>Add User</button>
          </div>
          <UsersTable users={users} onDeleteUser={handleDeleteUser} onAwardUser={(userId) => { setCurrentUserId(userId); setShowAssignLevelModal(true); }} />
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <h2>Levels</h2>
            <button className="add-button" onClick={() => setShowLevelModal(true)}>Add Level</button>
          </div>
          <LevelsTable levels={levels} onDeleteLevel={handleDeleteLevel} />
        </section>
      </div>

      {showUserModal && <AddUserModal onClose={() => setShowUserModal(false)} onAddUser={handleAddUser} />}
      {showLevelModal && <AddLevelModal onClose={() => setShowLevelModal(false)} onAddLevel={handleAddLevel} />}
      {showAssignLevelModal && <AssignLevelModal levels={levels} onClose={() => setShowAssignLevelModal(false)} onAwardPoints={(levelId) => handleAwardPoints(currentUserId, levelId)} />}
    </div>
  );
};

export default AdminDashboard;
