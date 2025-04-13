import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { useUser } from '../../providers/UserProvider'
import FieldError from '../Error/FieldError'
interface SignupProps {
    onSwitchToLogin: () => void
}


export const Signup = ({ onSwitchToLogin }: SignupProps) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')

    const {
        register,
        isRegistering,
        registerError,
    } = useUser()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await register({
                first_name: name,
                last_name: name,
                email,
                password,
                username: email,
                date_of_birth: dateOfBirth
            })
        } catch (error) {
            console.error('Signup error:', error)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-[hsl(var(--card))] rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-[hsl(var(--foreground))] text-center">
                    Create an Account
                </h2>


                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[hsl(var(--foreground))] text-sm font-medium mb-2">
                            Full Name
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FontAwesomeIcon icon={faUser} className="text-[hsl(var(--muted-foreground))]" />
                            </div>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg bg-[hsl(var(--background))] 
                                    border-[hsl(var(--border))] text-[hsl(var(--foreground))] 
                                    focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]
                                    ${registerError?.fieldErrors?.first_name ? 'border-[hsl(var(--destructive))]' : ''}`}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                        <FieldError errors={registerError?.fieldErrors?.first_name} />
                    </div>

                    <div>
                        <label className="block text-[hsl(var(--foreground))] text-sm font-medium mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FontAwesomeIcon icon={faEnvelope} className="text-[hsl(var(--muted-foreground))]" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg bg-[hsl(var(--background))] 
                                    border-[hsl(var(--border))] text-[hsl(var(--foreground))] 
                                    focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]
                                    ${registerError?.fieldErrors?.email ? 'border-[hsl(var(--destructive))]' : ''}`}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <FieldError errors={registerError?.fieldErrors?.email} />
                    </div>

                    <div>
                        <label className="block text-[hsl(var(--foreground))] text-sm font-medium mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FontAwesomeIcon icon={faLock} className="text-[hsl(var(--muted-foreground))]" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg bg-[hsl(var(--background))] 
                                    border-[hsl(var(--border))] text-[hsl(var(--foreground))] 
                                    focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]
                                    ${registerError?.fieldErrors?.password ? 'border-[hsl(var(--destructive))]' : ''}`}
                                placeholder="Choose a password"
                                required
                            />
                        </div>
                        <FieldError errors={registerError?.fieldErrors?.password} />
                    </div>

                    <div>
                        <label className="block text-[hsl(var(--foreground))] text-sm font-medium mb-2">
                            Date of Birth
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FontAwesomeIcon icon={faCalendar} className="text-[hsl(var(--muted-foreground))]" />
                            </div>
                            <input
                                type="date"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg bg-[hsl(var(--background))] 
                                    border-[hsl(var(--border))] text-[hsl(var(--foreground))] 
                                    focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]
                                    ${registerError?.fieldErrors?.date_of_birth ? 'border-[hsl(var(--destructive))]' : ''}`}
                                required
                            />
                        </div>
                        <FieldError errors={registerError?.fieldErrors?.date_of_birth} />
                    </div>

                    <button
                        type="submit"
                        disabled={isRegistering}
                        className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] py-2 px-4 rounded-lg 
                            hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isRegistering ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-[hsl(var(--muted-foreground))]">
                        Already have an account?{' '}
                        <button
                            onClick={onSwitchToLogin}
                            className="text-[hsl(var(--primary))] hover:underline"
                        >
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}