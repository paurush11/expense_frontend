import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { useUser } from '../../providers/UserProvider'
import FieldError from '../Error/FieldError'
interface LoginProps {
    onSwitchToSignup: () => void
}

export const Login = ({ onSwitchToSignup }: LoginProps) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {
        login,
        isLoggingIn,
        loginError,
        googleAuthInitiate,
        isGoogleAuthInitiatePending,
        googleAuthInitiateError
    } = useUser()


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await login({ email, password })
        } catch (error) {
            console.error('Login error:', error)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            await googleAuthInitiate()
        } catch (error) {
            console.error('Google login error:', error)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-[hsl(var(--card))] rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-[hsl(var(--foreground))] text-center">
                    Welcome Back
                </h2>


                <form onSubmit={handleSubmit} onReset={() => {
                    setEmail('')
                    setPassword('')
                }} className="space-y-6">
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
                                    ${loginError?.fieldErrors?.email ? 'border-[hsl(var(--destructive))]' : ''}`}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <FieldError errors={loginError?.fieldErrors?.email} />
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
                                    ${loginError?.fieldErrors?.password ? 'border-[hsl(var(--destructive))]' : ''}`}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <FieldError errors={loginError?.fieldErrors?.password} />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoggingIn}
                        className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] py-2 px-4 rounded-lg 
                            hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoggingIn ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[hsl(var(--border))]"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))]">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                        >
                            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                            Continue with Google
                        </button>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-[hsl(var(--muted-foreground))]">
                        Don't have an account?{' '}
                        <button
                            onClick={onSwitchToSignup}
                            className="text-[hsl(var(--primary))] hover:underline"
                            disabled={isGoogleAuthInitiatePending}
                        >
                            Sign up
                        </button>
                    </p>
                </div>
                <FieldError errors={googleAuthInitiateError?.fieldErrors?.non_field_errors} />
            </div>
        </div>
    )
} 