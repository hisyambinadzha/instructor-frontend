import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleLogin(event) {
        event.preventDefault();
        setError(null);
        setLoading(true);

        localStorage.setItem("token", "fake-token");
         navigate("/dashboard");
         setLoading(false);
    };

    return (
        <section>
            <h1>Login Page</h1>
            <p>This is the login page.</p>

            <form className="form" onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                </div>
                <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
                {error && <p className="error">{error}</p>}
            </form>
        </section>
    );
}

export default LoginPage;