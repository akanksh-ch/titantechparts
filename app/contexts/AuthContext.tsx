import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '~/lib/api';

interface User {
    _id: string;
    username: string;
    email: string;
    roles: string[];
    isActive: boolean;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check if user is logged in on mount
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('access_token');
            const storedUser = localStorage.getItem('user');

            if (token && storedUser) {
                try {
                    // Verify token is still valid by fetching current user
                    const currentUser = await authApi.getCurrentUser();
                    setUser(currentUser);
                } catch (error) {
                    // Token invalid, clear storage
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('user');
                    setUser(null);
                }
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const data = await authApi.login(username, password);
            localStorage.setItem('access_token', data.access_token);

            // Fetch user details after login
            const currentUser = await authApi.getCurrentUser();
            setUser(currentUser);
            localStorage.setItem('user', JSON.stringify(currentUser));
        } catch (error: any) {
            throw new Error(error.response?.data?.detail || 'Login failed');
        }
    };

    const register = async (username: string, email: string, password: string) => {
        try {
            const newUser = await authApi.register(username, email, password);

            // Auto-login after registration
            await login(username, password);
        } catch (error: any) {
            throw new Error(error.response?.data?.detail || 'Registration failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
