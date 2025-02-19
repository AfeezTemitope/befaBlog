import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AdminAuth from "./pages/AdminAuth.tsx";
import PlayerCreation from "./admin/PlayerCreation.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/admin",
        element: <AdminAuth />,
    },
    {
        path: 'PlayerCreation',
        element: <PlayerCreation/>
    }
]);

export default router;