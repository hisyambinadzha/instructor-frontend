import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getInstructors } from "../services/instructorServices";
import InstructorList from "../components/InstructorList";

function InstructorDetailPage() {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const role = localStorage.getItem("role");
    const isAdmin = role === "ADMIN";

    useEffect(() => {
        async function fetchInstructors() {
            try {
                const data = await getInstructors();
                setInstructors(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }
        fetchInstructors();
    }, []);

    return (
        <section>
            <div className="page-header">
                <div>
                    <h1>Instructor List Page</h1>
                    <p>This is the instructor list page.</p>
                </div>
                {isAdmin && (
                    <div className="page-actions">
                        <Link to="/instructors/create">Create Instructor</Link>
                    </div>
                )}
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {instructors.length === 0 ? (
                <p>No instructors found</p>
            ) : (
                <div className="card-grid">
                    {instructors.map((instructor) => (
                        <div className="card" key={instructor.id} >
                            <h2>{instructor.name}</h2>
                            <p>Specialization: {instructor.specialization}</p>
                            <p>Experience: {instructor.yearsExperience} years</p>
                            <p>Status: {instructor.status}</p>
                            <div className="card-actions">
                                <Link to={`/instructors/${instructor.id}`}>View Details</Link>
                                 {isAdmin && (
                                    <Link to={`/instructors/${instructor.id}/edit`}>Edit</Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}

export default InstructorDetailPage;