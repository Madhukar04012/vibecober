import { API_ENDPOINTS } from '../config/api';
import type { SignupRequest, LoginRequest, AuthResponse, UserResponse } from '../types/api';

const TOKEN_KEY = 'vibecober_token';

export const authService = {
    // Store token in localStorage
    setToken(token: string) {
        localStorage.setItem(TOKEN_KEY, token);
    },

    // Get token from localStorage
    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    },

    // Remove token
    removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    },

    // Signup
    async signup(data: SignupRequest): Promise<UserResponse> {
        const response = await fetch(API_ENDPOINTS.AUTH_SIGNUP, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Signup failed');
        }

        return response.json();
    },

    // Login
    async login(data: LoginRequest): Promise<AuthResponse> {
        const response = await fetch(API_ENDPOINTS.AUTH_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Login failed');
        }

        const authData = await response.json();
        this.setToken(authData.access_token);
        return authData;
    },

    // Get current user
    async getCurrentUser(): Promise<UserResponse> {
        const token = this.getToken();
        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch(API_ENDPOINTS.AUTH_ME, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                this.removeToken();
            }
            const error = await response.json();
            throw new Error(error.detail || 'Failed to get user');
        }

        return response.json();
    },

    // Logout
    logout() {
        this.removeToken();
    },
};
