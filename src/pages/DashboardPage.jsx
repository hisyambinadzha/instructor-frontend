import { useState, useEffect } from "react";
import { getInstructors } from "../services/instructorServices";

function DashboardPage() {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error || !instructors) {
        return (
            <section>
                <h1>Instructor Not Found</h1>
                <p className="error-message">Error: {error}</p>
                <button onClick={() => navigate("/instructors")}>Go Back</button>
            </section>
        );
    }

    const totalInstructors = instructors.length;
    const activeInstructors = instructors.filter((instructor) => instructor.status === "ACTIVE").length;
    const inactiveInstructors = instructors.filter((instructor) => instructor.status === "INACTIVE").length;

    return (
        <section>
            <h1>Dashboard</h1>
            <p>This is the dashboard page.</p>
            <div className="card-grid">
                <div className="card">
                    <h2>Total Instructors</h2>
                    <p className="metric">{totalInstructors}</p>
                </div>
                <div className="card">
                    <h2>Active Instructors</h2>
                    <p className="metric">{activeInstructors}</p>
                </div>
                <div className="card">
                    <h2>Inactive Instructors</h2>
                    <p className="metric">{inactiveInstructors}</p>
                </div>
            </div>
        </section>
    );
}

export default DashboardPage;