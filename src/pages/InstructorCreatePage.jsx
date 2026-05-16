import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createInstructor } from "../services/instructorServices";
import InstructorForm from "../components/InstructorForm";

function InstructorCreatePage() {
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    async function handleCreateInstructor(data) {
        try {
            await createInstructor(data);
            setMessage("Instructor created successfully");

            setTimeout(() => {
                navigate("/instructors");
            }, 500);
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    return (
        <section>
            <div className="page-header">
                <h1>Create Instructor</h1>
                <p>Add a new instructor to the database.</p>
            </div>
            <InstructorForm initialData={null} onSubmit={handleCreateInstructor} buttonText="Create Instructor" /> 
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </section>
    );
}

export default InstructorCreatePage;