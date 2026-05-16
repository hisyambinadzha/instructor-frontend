import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getInstructorById, updateInstructor } from "../services/instructorServices";
import InstructorForm from "../components/InstructorForm";

function InstructorEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [instructor, setInstructor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchInstructorById() {
            try {
                const data = await getInstructorById(id);
                setInstructor(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }
        fetchInstructorById();
    }, [id]);

    async function handleEditInstructor(data) {
        try {
            await updateInstructor(id, data);
            setMessage("Instructor updated successfully");

            setTimeout(() => {
                navigate("/instructors");
            }, 500);
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error || !instructor) {
        return (
            <section>
                <h1>Instructor Not Found</h1>
                <p className="error-message">Error: {error}</p>
                <button onClick={() => navigate("/instructors")}>Go Back</button>
            </section>
        );
    }

    return (
        <section>
            <div className="page-header">
                <h1>Edit Instructor</h1>
                <p>Ipdate the details of the selected instructor.</p>
            </div>
            <InstructorForm initialData={instructor} onSubmit={handleEditInstructor} buttonText="Edit Instructor" /> 
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </section>
    );
}

export default InstructorEditPage;