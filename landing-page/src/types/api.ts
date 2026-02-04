export interface User {
    id: string;
    email: string;
    name: string;
    created_at: string;
}

export interface Project {
    id: string;
    user_id: string;
    idea: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
}

export interface UserResponse {
    id: string;
    email: string;
    name: string;
    created_at: string;
}

export interface SignupRequest {
    email: string;
    password: string;
    name: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface ProjectRequest {
    idea: string;
}

export interface GenerateProjectResponse {
    message: string;
    data: any;
}

export interface ApiError {
    detail: string;
}
