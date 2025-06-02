
const UsersTable = ({ users, onDeleteUser, onAwardUser }) => {
  return (
    <div className="table-container">
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => onDeleteUser(user._id)}>Delete</button>
                <button onClick={() => onAwardUser(user._id)}>Award</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;

