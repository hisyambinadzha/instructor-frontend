import InstructorCard from "./InstructorCard";

function InstructorList({ instructors, onSelect }) {
    if (instructors.length === 0) {
        return <p>No instructors found</p>
    }

    return (
        <div className="instructor-list">
            {instructors.map((instructor) => (
                <InstructorCard key={instructor.id} instructor={instructor} onSelect={onSelect} />
            ))}
        </div>
    );
}

export default InstructorList