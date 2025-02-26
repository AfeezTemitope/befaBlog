import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AdminAuth from "./pages/AdminAuth.tsx";
import AdminPanel from "./admin/AdminPanel.tsx";

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
        path: '/AdminPanel',
        element: <AdminPanel/>
    }
]);

export default router;
