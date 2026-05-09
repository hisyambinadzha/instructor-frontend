import { useParams } from "react-router-dom";

function InstructorDetailPage() {
    const { id } = useParams();

    return (
        <section>
            <h1>Instructor Detail Page</h1>
            <p>This is the instructor detail page.</p>
            <p>ID: {id}</p>
        </section>
    )
}

export default InstructorDetailPage;