import React, { useState } from "react";

const AddLevelModal = ({ onClose, onAddLevel }) => {
  const [levelData, setLevelData] = useState({
    name: "",
    hid: "",
    flag: "",
    points: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLevelData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddLevel(levelData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h3>Add New Level</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={levelData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>HID:</label>
            <input type="text" name="hid" value={levelData.hid} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Flag:</label>
            <input type="text" name="flag" value={levelData.flag} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Points:</label>
            <input type="number" name="points" value={levelData.points} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea name="description" value={levelData.description} onChange={handleChange} required />
          </div>
          <button type="submit">Add Level</button>
        </form>
      </div>
    </div>
  );
};

export default AddLevelModal;

