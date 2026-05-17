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

    const totalPages = Math.ceil(filteredInstructors.length / pageSize || 1);
    const paginatedInstructors = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredInstructors.slice(startIndex, endIndex);
    }, [filteredInstructors, currentPage, pageSize]);
    
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, pageSize]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

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
            {paginatedInstructors.length === 0 ? (
                <p>No instructors found</p>
            ) : (
                <div className="card-grid">
                    {paginatedInstructors.map((instructor) => (
                        <InstructorCard key={instructor.id} instructor={instructor} isAdmin={isAdmin} onDelete={null} />
                    ))}
                </div>
            )}
            <Pagination currentPage={currentPage} totalPages={totalPages} pageSize={pageSize} onPageChange={setCurrentPage} onPageSizeChange={setPageSize} />
        </section>
    )
}

export default InstructorsPage;