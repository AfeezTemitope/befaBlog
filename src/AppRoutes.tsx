import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AdminAuth from "./pages/AdminAuth.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/admin",
        element: <AdminAuth />,
    },
]);

export default router;