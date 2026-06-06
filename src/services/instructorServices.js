const API_DOMAIN = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const API_BASE_URL = `${API_DOMAIN}/api/v1`;

function getHeaders() {
    const token = localStorage.getItem('token');
    return token ? { 
        'Authorization': `Bearer ${token}`, 
        "Content-Type": "application/json", 
    } : {};
}

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

export async function createInstructor(params) {
    const response = await fetch(`${API_BASE_URL}/instructors`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(params),
    });
    if (!response.ok) {
        throw new Error(`Failed to create instructor: ${response.statusText}`);
    }
    return response.json();
}

export async function updateInstructor(id, params) {
    const response = await fetch(`${API_BASE_URL}/instructors/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(params),
    });
    if (!response.ok) {
        throw new Error(`Failed to update instructor: ${response.statusText}`);
    }
    return response.json();
}

export async function deleteInstructor(id) {
    const response = await fetch(`${API_BASE_URL}/instructors/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
    });
    if (!response.ok) {
        throw new Error(`Failed to delete instructor: ${response.statusText}`);
    }
}