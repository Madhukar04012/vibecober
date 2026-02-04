export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
    // Auth
    AUTH_SIGNUP: '/api/auth/signup',
    AUTH_LOGIN: '/api/auth/login',
    AUTH_ME: '/api/auth/me',

    // Projects
    PROJECTS: '/api/projects',
    PROJECT_BY_ID: (id: string) => `/api/projects/${id}`,

    // Generation
    GENERATE_PROJECT: '/api/generate/project',
} as const;
