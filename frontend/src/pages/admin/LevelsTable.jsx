import React from "react";

const LevelsTable = ({ levels, onDeleteLevel }) => {
  return (
    <div className="table-container">
      <h3>Levels</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>HID</th>
            <th>Points</th>
            <th>URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {levels.map(level => (
            <tr key={level._id}>
              <td>{level.name}</td>
              <td>{level.hid}</td>
              <td>{level.points}</td>
              <td>{level.url}</td>
              <td>
                <button onClick={() => onDeleteLevel(level._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LevelsTable;

