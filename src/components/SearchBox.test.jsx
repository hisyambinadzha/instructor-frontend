import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SearchBox from "./SearchBox";

describe("SearchBox", () => {
    it("calls onSearchChange when user types item", async () => {
        const user = userEvent.setup();
        const mockSearchChange = vi.fn();

        render(
            <SearchBox
                searchTerm=""
                onSearchChange={mockSearchChange}
                resultCount={0}
                totalCount={5}
            />        
        );

        await user.type(screen.getByPlaceholderText(/search/i), "j");

        expect(mockSearchChange).toHaveBeenCalledWith("j");
    });

    if("clears the search term when Clear is clicked", async () => {
        const user = userEvent.setup();
        const mockSearchChange = vi.fn();

        render(
            <SearchBox
                searchTerm="java"
                onSearchChange={mockSearchChange}
                resultCount={2}
                totalCount={5}
            />        
        );

        await user.click(screen.getByRole("button", { name: /clear/i }));

        expect(mockSearchChange).toHaveBeenCalledWith("");
    });
});