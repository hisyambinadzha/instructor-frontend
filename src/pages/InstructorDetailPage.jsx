import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getInstructorById } from "../services/instructorServices";
import InstructorDetail from "../components/InstructorDetail";

function InstructorDetailPage() {
    const { id } = useParams();
    const [instructor, setInstructor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchInstructor() {
            try {
                const data = await getInstructorById(id);
                setInstructor(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }
        fetchInstructor();
    }, [id]);

    return (
        <section>
            <h1>Instructor Detail Page</h1>
            <p>This is the instructor detail page.</p>
            
            <div className="card-grid">
                <InstructorDetail instructor={instructor} />
            </div>
            <div>
                <Link to="/instructors">Back to Instructor List</Link>
            </div>
        </section>
    )
}

export default InstructorDetailPage;