// frontend/src/components/DegreeList.js
import React from 'react';

const DegreeList = ({ degrees }) => {
  return (
    <div>
      <h2>Degree List</h2>
      {degrees.map((degree, index) => (
        <div key={index}>
          <p>Course Name: {degree.courseName}</p>
          <p>University Name: {degree.universityName}</p>
          <p>Deployed From: {degree.deployedFrom}</p>
          <p>Deployed To: {degree.deployedTo}</p>
        </div>
      ))}
    </div>
  );
};

export default DegreeList;