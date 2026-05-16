import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

function LoginPage() {
    const [email, setEmail] = useState("admin@gmail.com");
    const [password, setPassword] = useState("password");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleLogin(event) {
        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const data = await login(email, password);
            localStorage.setItem("token", data.token);
            localStorage.setItem("email", data.email);
            localStorage.setItem("role", data.role);
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            setError("Login failed. Please check your email and password.");
        } finally {
            setLoading(false);
        }
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