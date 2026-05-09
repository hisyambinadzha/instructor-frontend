const API_BASE_URL = 'http://localhost:8080/api/v1';

export async function getInstructors() {
    const response = await fetch(`${API_BASE_URL}/instructors`);
    if (!response.ok) {
        throw new Error(`Failed to fetch instructors: ${response.statusText}`);
    }
    return response.json();
}

export async function getInstructorById(id) {
    const response = await fetch(`${API_BASE_URL}/instructors/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch instructor: ${response.statusText}`);
    }
    return response.json();
}