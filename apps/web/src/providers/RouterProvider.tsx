import { BrowserRouter, useNavigate } from "react-router-dom";

import { Navigate } from "react-router-dom";
import { useUser } from "./UserProvider";
import { Home } from "../components/Home/Home";
import { TransactionsPage } from "../components/Transactions/TransactionsPage";
import { Login } from "../components/Auth/Login";
import { Signup } from "../components/Auth/Signup";
import ChatProvider from "./ChatProvider";
// import { SettingsPage } from "../components/Settings/SettingsPage";
// import { ProfilePage } from "../components/Profile/ProfilePage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useUser();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}
function RouterProvider({ children }: { children: React.ReactNode }) {
    return (
        <BrowserRouter>
            <ChatProvider>
                {children}
            </ChatProvider>
        </BrowserRouter>
    );
}

const routes = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useUser();
    return [
        {
            path: "/",
            element: isAuthenticated ? <ProtectedRoute><Home /></ProtectedRoute> : <Navigate to="/login" replace />
        },
        {
            path: "/transactions",
            element: isAuthenticated ? <ProtectedRoute><TransactionsPage /></ProtectedRoute> : <Navigate to="/login" replace />
        },
        {
            path: "/login",
            element: !isAuthenticated ? <Login onSwitchToSignup={() => navigate('/signup')} /> : <Navigate to="/" replace />
        },
        {
            path: "/signup",
            element: !isAuthenticated ? <Signup onSwitchToLogin={() => navigate('/login')} /> : <Navigate to="/" replace />
        }
        // {
        //     path: "/settings",
        //     element: <ProtectedRoute><SettingsPage /></ProtectedRoute>
        // },
        // {
        //     path: "/profile",
        //     element: <ProtectedRoute><ProfilePage /></ProtectedRoute>
        // }
    ]
}

export { RouterProvider, ProtectedRoute, routes };
