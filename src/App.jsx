import { useEffect, useState } from 'react'
import './App.css'
import InstructorList from './components/InstructorList';
import InstructorDetail from './components/InstructorDetail';
import { getInstructors } from './services/instructorServices';

function App() {
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [seachTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState("name-asc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchInstructors() {
      try {
        setLoading(true);
        const data = await getInstructors();
        setInstructors(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchInstructors();
  }, []);

  const filteredInstructors = instructors.filter((instructor) => {
    return instructor.name.toLowerCase().includes(seachTerm.toLowerCase()) || instructor.specialization.toLowerCase().includes(seachTerm.toLowerCase());
  });

  const sortedInstructors = [...filteredInstructors].sort((a, b) => {
    if (sortOption === "name-asc") {
      return a.name.localeCompare(b.name);
    }

    if (sortOption === "name-desc") {
      return b.name.localeCompare(a.name);
    }

    if (sortOption === "experience-asc") {
      return a.yearsExperience - b.yearsExperience;
    }

    if (sortOption === "experience-desc") {
      return b.yearsExperience - a.yearsExperience;
    }

    return 0;
  });

  return (
    <div className="page">
      <h1>Course Instructor</h1>
      <p>View a list of instructors</p>

      {loading && <p className="message">Loading instructors...</p>}

      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && (
        <div className='toolbar'>
          <input type='text' placeholder='Search instructors by keyword' value={seachTerm} onChange={(event) => setSearchTerm(event.target.value)} />
          <select value={sortOption} onChange={(event) => setSortOption(event.target.value)} >
            <option value="name-asc">Name A–Z</option>
            <option value="name-desc">Name Z–A</option>
            <option value="experience-asc">Experience Low to High</option>
            <option value="experience-desc">Experience High to Low</option>
          </select>
          <button onClick={() => setSearchTerm('')}>Clear</button>
        </div>
      )}

      <p className="summary">Showing {sortedInstructors.length} of {instructors.length} instructors</p>

      <div className='layout'>
        <InstructorList instructors={sortedInstructors} onSelect={setSelectedInstructor} /> 
        <InstructorDetail instructor={selectedInstructor} />
      </div>
    </div>
  )
}

export default App
