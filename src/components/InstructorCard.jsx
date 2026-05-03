function InstructorCard({ instructor, onSelect }) {
    return (
        <div className="instructor-card" onClick={() => onSelect(instructor)}>
            <h2>{instructor.name}</h2>
            <p><strong>Specialization:</strong> {instructor.specialization}</p>
            <p><strong>Experience:</strong> {instructor.experience}{instructor.experience + instructor.experience > 1 ? ' years' : ' year'}</p>
            <p><strong>Status:</strong> {instructor.status}</p>
        </div>
    );
}

export default InstructorCard