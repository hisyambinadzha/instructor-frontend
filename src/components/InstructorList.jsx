import InstructorCard from "./InstructorCard";

function InstructorList({ instructors, isAdmin }) {
    if (instructors.length === 0) {
        return <p>No instructors found</p>
    }

    return (
        <div className="card-grid">
            {instructors.map((instructor) => (
                <InstructorCard key={instructor.id} instructor={instructor} isAdmin={isAdmin} onDelete={null} />
            ))}
        </div>
    );
}

export default InstructorList