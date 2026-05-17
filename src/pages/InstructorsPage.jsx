import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getInstructors, deleteInstructor } from "../services/instructorServices";
import InstructorCard from "../components/InstructorCard";
import SearchBox from "../components/SearchBox";
import Pagination from "../components/Pagination";

function InstructorsPage() {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState("");

    const role = localStorage.getItem("role");
    const isAdmin = role === "ADMIN";

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

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

    async function handleDeleteInstructor(instructor) {
        const shouldDelete = window.confirm(`Are you sure you want to delete this instructor? \n${instructor.name}`);
        if (!shouldDelete) {
            return;
        }

        try {
            setError(null);
            setSuccess("");

            await deleteInstructor(instructor.id);
            setSuccess("Instructor deleted successfully");
            setInstructors(instructors.filter(instructor => instructor.id !== id));
        } catch (error) {
            setError(error.message);
        }
    }

    const filteredInstructors = useMemo(() => {
        const keyword = searchTerm.toLowerCase().trim();

        if (!keyword) {
            return instructors;
        }
        return instructors.filter((instructor) => {
            const name = instructor.name.toLowerCase();
            const email = instructor.email.toLowerCase();
            const specializationMatch = instructor.specialization.toLowerCase();
            const status = instructor.status.toLowerCase();

            return (
                name.includes(keyword) ||    
                email.includes(keyword) ||
                specializationMatch.includes(keyword) ||
                status.includes(keyword)
            );
        });
    }, [instructors, searchTerm]);


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
            {error && <p className="error-message">Error: {error}</p>}
            {success && <p className="success-message">{success}</p>}
            <SearchBox searchTerm={searchTerm} onSearchChange={setSearchTerm} resultCount={filteredInstructors.length} totalCount={instructors.length} />
            {filteredInstructors.length === 0 ? (
                <p>No instructors found</p>
            ) : (
                <div className="card-grid">
                    {filteredInstructors.map((instructor) => (
                        <InstructorCard key={instructor.id} instructor={instructor} isAdmin={isAdmin} onDelete={handleDeleteInstructor} />
                    ))}
                </div>
            )}
            <Pagination currentPage={currentPage} totalPages={totalPages} pageSize={pageSize} onPageChange={setCurrentPage} onPageSizeChange={setPageSize} />
        </section>
    )
}

export default InstructorsPage;