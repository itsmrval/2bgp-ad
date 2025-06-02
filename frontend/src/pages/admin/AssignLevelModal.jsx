import React from "react";

const AssignLevelModal = ({ levels, onClose, onAwardPoints }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const levelId = e.target.levelSelect.value;
    onAwardPoints(levelId);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h3>Assign Level to User</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Level:</label>
            <select name="levelSelect">
              {levels.map(level => (
                <option key={level._id} value={level._id}>{level.name} ({level.points} pts)</option>
              ))}
            </select>
          </div>
          <button type="submit">Assign Level</button>
        </form>
      </div>
    </div>
  );
};

export default AssignLevelModal;

