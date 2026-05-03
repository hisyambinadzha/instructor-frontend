import { useState } from 'react'
import './App.css'
import InstructorList from './components/InstructorList';

function App() {
  const [instructors, setInstructors] = useState([
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
  ]);

  return (
    <div className="page">
      <h1>Course Instructor</h1>
      <p>View a list of instructors</p>
      {InstructorList({ instructors, onSelect: setInstructors })}
    </div>
  )
}

export default App
