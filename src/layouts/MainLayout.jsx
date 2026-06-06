import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

function MainLayout() {
    return (
        <>
            <NavBar />
            <main className="container">
                <Outlet />
            </main>
        </>
    );
}

export default MainLayout;