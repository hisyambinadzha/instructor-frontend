import { Link } from "react-router-dom";

function InstructorCard({ instructor, isAdmin, onDelete }) {
    return (
        <div className="card">
            <h2>{instructor.name}</h2>
            <p><strong>Specialization:</strong> {instructor.specialization}</p>
            <p><strong>Experience:</strong> {instructor.yearsExperience}{instructor.yearsExperience > 1 ? ' years' : ' year'}</p>
            <p><strong>Status:</strong> {instructor.status}</p>
            <div className="card-actions">
                <Link to={`/instructors/${instructor.id}`}>View Details</Link>
                {isAdmin && (
                    <>
                        <Link to={`/instructors/${instructor.id}/edit`}>Edit</Link>
                        <button className="danger-button" type="button" onClick={() => onDelete(instructor)}>Delete</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default InstructorCard