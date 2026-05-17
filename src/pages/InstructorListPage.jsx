import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getInstructors } from "../services/instructorServices";
import InstructorList from "../components/InstructorList";
import InstructorCard from "../components/InstructorCard";

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
                        <InstructorCard key={instructor.id} instructor={instructor} isAdmin={isAdmin} />
                    ))}
                </div>
            )}
        </section>
    )
}

export default InstructorDetailPage;