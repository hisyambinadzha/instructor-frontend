import { useState } from 'react'
import './App.css'

function App() {
  const instructors = [
    {
      id: "1",
      name: "Alice Joshson",
      specialization: "Java",
      status: "ACTIVE",
      yearsOfExperience: 5
    },
    {
      id: "2",
      name: "Kumar K.",
      specialization: "MongoDB",
      status: "ACTIVE",
      yearsOfExperience: 8
    },
    {
      id: "3",
      name: "Michael Chew",
      specialization: "React",
      status: "INACTIVE",
      yearsOfExperience: 4
    }
  ];

  return (
    <div className="page">
      <h1>Course Instructor</h1>
      <p>View a list of instructors</p>
      <div className="instructor-list">
        {instructors.map((instructor) => (
          <div className='card' key={instructor.id}>
            <h2>{instructor.name}</h2>
            <p><strong>Specialization:</strong> {instructor.specialization}</p>
            <p><strong>Experience:</strong> {instructor.yearsOfExperience}{instructor.yearsOfExperience + instructor.yearsOfExperience > 1 ? ' years' : ' year'}</p>
            <p><strong>Status:</strong> {instructor.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
