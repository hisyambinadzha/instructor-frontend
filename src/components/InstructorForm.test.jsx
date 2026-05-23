import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import InstructorForm from "./InstructorForm";

function renderCreateInstructor(props = {}) {
    const defaultProps = {
        initialData: null,
        onSubmit: vi.fn(),
        buttonText: "Create Instructor",
    };
    return render(
        <MemoryRouter>
            <InstructorForm {...defaultProps} {...props} />
        </MemoryRouter>
    );
}

describe("InstructorForm", () => {
    it("should failed when submitting an empty form", async () => {
        const user = userEvent.setup();
        const mockSubmit = vi.fn();

        renderCreateInstructor({ onSubmit: mockSubmit });

        screen.debug();

        await user.click(
            screen.getByRole("button", { name: /Cancel/i })
        );

        await user.click(
            screen.getByRole("button", { name: /Create Instructor/i })
        );

        expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Specialization is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Years of Experience is required/i)).toBeInTheDocument();

        expect(mockSubmit).not.toHaveBeenCalled();
    });

    it("should pass when submitting avalid form", async () => {
        const user = userEvent.setup();
        const mockSubmit = vi.fn();

        renderCreateInstructor({ onSubmit: mockSubmit });

        await user.type(
            screen.getByLabelText(/Name/i), "John Doe"
        );

        await user.type(
            screen.getByLabelText(/Email/i), "M2yYH@example.com"
        );

        await user.type(
            screen.getByLabelText(/Specialization/i), "Web Development"
        );
        await user.type(
            screen.getByLabelText(/Years of Experience/i), "5"
        );

        await user.click(
            screen.getByRole("button", { name: /Create Instructor/i })
        );

        expect(mockSubmit).toHaveBeenCalledWith({
            name: "John Doe",
            email: "M2yYH@example.com",
            specialization: "Web Development",
            yearsExperience: "5",
            status: "ACTIVE",
        });
    });
}); 