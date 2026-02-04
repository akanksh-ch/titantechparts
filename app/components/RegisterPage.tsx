import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ShoppingBag } from 'lucide-react';
import { useAuth } from '~/contexts/AuthContext';

export function RegisterPage() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);

        try {
            await register(username, email, password);
            navigate('/home');
        } catch (err: any) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="w-full max-w-md">
                {/* Logo and Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                        <ShoppingBag className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h1 className="mb-2">Create Account</h1>
                    <p className="text-muted-foreground">Sign up to start shopping with us</p>
                </div>

                {/* Register Form */}
                <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Error Message */}
                        {error && (
                            <div className="p-3 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
                                {error}
                            </div>
                        )}

                        {/* Username Field */}
                        <div className="space-y-2">
                            <label htmlFor="username" className="block">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="Choose a username"
                                required
                                disabled={isLoading}
                                minLength={3}
                            />
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="Enter your email"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="Choose a password"
                                required
                                disabled={isLoading}
                                minLength={6}
                            />
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="confirm-password" className="block">
                                Confirm Password
                            </label>
                            <input
                                id="confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="Confirm your password"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating account...' : 'Sign Up'}
                        </button>
                    </form>
                </div>

                {/* Login Link */}
                <p className="text-center mt-6 text-muted-foreground">
                    Already have an account?{' '}
                    <button
                        onClick={() => navigate('/login')}
                        className="text-primary hover:underline"
                        disabled={isLoading}
                    >
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    );
}
