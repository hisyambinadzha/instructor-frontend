function InstructorDetail({ instructor }) {
    if (instructor === null) {
        return (
            <div className="instructor-detail">
                <h2>No instructor selected</h2>
                <p>Click a instructor card to view details.</p>
            </div>
        )
    }
    return (
        <div className="instructor-detail">
            <p><strong>ID:</strong> {instructor.id}</p>
            <p><strong>Name:</strong> {instructor.name}</p>
            <p><strong>Specialization:</strong> {instructor.specialization}</p>
            <p><strong>Experience:</strong> {instructor.yearsExperience}{instructor.yearsExperience > 1 ? ' years' : ' year'}</p>
            <p><strong>Status:</strong> {instructor.status}</p>
        </div>
    );
}

export default InstructorDetail