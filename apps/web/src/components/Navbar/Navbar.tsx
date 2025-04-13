import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUser,
    faBell,
    faSearch,
    faWallet,
} from '@fortawesome/free-solid-svg-icons'
import { useUser } from '../../providers/UserProvider'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ThemeToggle } from './ThemeToggle'
// import { NavItem } from '../../hooks/types';

interface NavbarProps {
    onThemeChange: (theme: 'theme-1' | 'theme-2') => void
}

// const navItems: NavItem[] = [
//     { icon: faBell, path: '/notifications', label: 'Notifications' },
//     { icon: faUser, path: '/profile', label: 'Profile' },
// ]

export const Navbar = ({
    onThemeChange,
}: NavbarProps) => {
    const {
        user,
        isAuthenticated,
        logout,
        logoutError,
    } = useUser()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logout()
            navigate('/login')
        } catch (error) {
            toast.error(logoutError?.message || 'Failed to logout')
        }
    }


    return (
        <div className={`${isAuthenticated ? 'h-40' : 'h-20'} bg-[hsl(var(--card))] flex justify-between px-8 ${isAuthenticated && 'rounded-b-[80px]'}  fixed top-0 left-0 right-0 z-30 `}>
            <div className="flex flex-col mt-5 z-60">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-[hsl(var(--primary))] flex items-center justify-center">
                        <FontAwesomeIcon
                            icon={faWallet}
                            className="w-6 h-6 text-[hsl(var(--primary-foreground))]"
                        />
                    </div>
                    {isAuthenticated && (
                        <h1 className="text-2xl font-semibold text-[hsl(var(--foreground))]">
                            Morning, {user?.first_name}
                        </h1>
                    )}
                </div>
            </div>
            <div className="flex flex-col mt-5 z-60">
                <div className="flex items-center space-x-6">
                    {isAuthenticated && (
                        <>
                            {/* Search Bar */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-64 px-4 py-2 rounded-lg bg-[hsl(var(--accent))] text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] focus:outline-none"
                                />
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
                                />
                            </div>
                        </>
                    )}


                    <div className="flex items-center space-x-4">
                        <ThemeToggle onThemeChange={onThemeChange} />

                        {isAuthenticated ? (
                            <>

                                <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[hsl(var(--muted))] hover:bg-[hsl(var(--muted-foreground))] transition-colors text-[hsl(var(--foreground))]">
                                    <FontAwesomeIcon icon={faBell} />
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-10 h-10 rounded-full flex items-center justify-center bg-[hsl(var(--muted))] hover:bg-[hsl(var(--muted-foreground))] transition-colors text-[hsl(var(--foreground))]"
                                >
                                    <FontAwesomeIcon icon={faUser} />
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <button
                                    className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </button>
                                <button
                                    className="bg-[hsl(var(--primary))] hover:opacity-90 text-[hsl(var(--primary-foreground))] px-4 py-2 rounded-lg transition-colors"
                                    onClick={() => navigate('/signup')}
                                >
                                    Sign Up
                                </button>

                            </div>
                        )}
                    </div>


                </div>
            </div>


        </div>
    )
} 