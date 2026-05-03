import { useEffect, useState } from 'react'
import './App.css'
import InstructorList from './components/InstructorList';
import InstructorDetail from './components/InstructorDetail';
import { getInstructors } from './services/instructorServices';

function App() {
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [seachTerm, setSearchTerm] = useState('');
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
    return instructor.name.toLowerCase().includes(seachTerm.toLowerCase());
  });

  return (
    <div className="page">
      <h1>Course Instructor</h1>
      <p>View a list of instructors</p>

      {loading && <p className="message">Loading instructors...</p>}

      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && (
        <div className='toolbar'>
          <input type='text' placeholder='Search instructors by keyword' value={seachTerm} onChange={(event) => setSearchTerm(event.target.value)}/>
          <button onClick={() => setSearchTerm('')}>Clear</button>
        </div>
      )}

      <p className="summary">Showing {filteredInstructors.length} of {instructors.length} instructors</p>

      <div className='layout'>
        <InstructorList instructors={filteredInstructors} onSelect={setSelectedInstructor} />
        <InstructorDetail instructor={selectedInstructor} />
      </div>
    </div>
  )
}

export default App
