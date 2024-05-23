// frontend/src/components/DegreeForm.js
import React, { useState } from 'react';

const DegreeForm = ({ onSubmit }) => {
  const [courseName, setCourseName] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [deployedTo, setDeployedTo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ courseName, universityName, deployedTo });
    setCourseName('');
    setUniversityName('');
    setDeployedTo('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Course Name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
      />
      <input
        type="text"
        placeholder="University Name"
        value={universityName}
        onChange={(e) => setUniversityName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Deployed To"
        value={deployedTo}
        onChange={(e) => setDeployedTo(e.target.value)}
      />
      <button type="submit">Mint Degree</button>
    </form>
  );
};

export default DegreeForm;