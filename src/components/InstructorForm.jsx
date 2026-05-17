import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InstructorForm({ initialData, onSubmit, buttonText }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        email: initialData?.email || "",
        specialization: initialData?.specialization || "",
        yearsExperience: initialData?.yearsExperience || "",
        status: initialData?.status || "",
    });

    const [error, setError] = useState(null);

    function handleChange(event) {
        const { name, value, type, checked } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked ? "ACTIVE" : "INACTIVE" // map boolean → string
                    : value,
        }));
    }

    function validateForm() {
        const newError = {};

        if (!formData.name) {
            newError.name = "Name is required";
        } else if (formData.name.length < 3) {
            newError.name = "Name must be at least 3 characters";
        }

        if (!formData.email) {
            newError.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newError.email = "Invalid email format";
        }

        if (!formData.specialization) {
            newError.specialization = "Specialization is required";
        } else if (formData.specialization.length < 3) {
            newError.specialization = "Specialization must be at least 3 characters";
        }

        if (!formData.yearsExperience) {
            newError.yearsExperience = "Years of Experience is required";
        } else if (isNaN(formData.yearsExperience) || formData.yearsExperience <= 0) {
            newError.yearsExperience = "Years of Experience must be a positive number";
        }

        setError(newError);

        return Object.keys(newError).length === 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);

        if (!validateForm()) return;

        const data = {
            name: formData.name,
            email: formData.email,
            specialization: formData.specialization,
            yearsExperience: formData.yearsExperience,
            status: formData.status ? "ACTIVE" : "INACTIVE",
        }

        await onSubmit(data);
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Add name here... " />
                {error?.name && <p className="error-message">{error.name}</p>}
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Add email here... " />
                {error?.email && <p className="error-message">{error.email}</p>}
            </div>
            <div className="form-group">
                <label>Specialization</label>
                <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} placeholder="Add specialization here... " />
                {error?.specialization && <p className="error-message">{error.specialization}</p>}
            </div>
            <div className="form-group">
                <label>Years of Experience</label>
                <input type="number" name="yearsExperience" value={formData.yearsExperience} onChange={handleChange} placeholder="Add years of experience here... " />
                {error?.yearsExperience && <p className="error-message">{error.yearsExperience}</p>}
            </div>
            <div className="form-group checkbox-group">
                <label>
                    <input type="checkbox" name="status" checked={formData.status === "ACTIVE"} onChange={handleChange} />
                    Active
                </label>
            </div>
            <div className="form-actions">
                <button type="submit">{buttonText}</button>
                <button type="button" onClick={() => navigate("/instructors")}>
                    Cancel
                </button>
            </div>
        </form>
    );

}

export default InstructorForm;