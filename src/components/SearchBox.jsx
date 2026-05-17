function SearchBox({ searchTerm, onSearchChange, resultCount, totalCount }) {
    return (
        <div className="search-box">
            <input type="text" value={searchTerm} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search by name, email, specialization, or status..." />
            {searchTerm && (
                <button type="button" onClick={() => onSearchChange("")}>Clear</button>
            )}
            <p>Showing {resultCount} of {totalCount} instructor(s)</p>
        </div>
    );

}

export default SearchBox;