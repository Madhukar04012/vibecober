import { API_ENDPOINTS } from '../config/api';
import { authService } from './auth';
import type { ProjectRequest, Project, GenerateProjectResponse } from '../types/api';

export const projectService = {
    // Create a new project
    async createProject(data: ProjectRequest): Promise<Project> {
        const token = authService.getToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(API_ENDPOINTS.PROJECTS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to create project');
        }

        return response.json();
    },

    // Generate project from idea
    async generateProject(idea: string): Promise<GenerateProjectResponse> {
        const response = await fetch(API_ENDPOINTS.GENERATE_PROJECT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idea }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to generate project');
        }

        return response.json();
    },

    // List all projects
    async listProjects(): Promise<Project[]> {
        const token = authService.getToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(API_ENDPOINTS.PROJECTS, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to list projects');
        }

        return response.json();
    },

    // Get project by ID
    async getProject(id: string): Promise<Project> {
        const token = authService.getToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(API_ENDPOINTS.PROJECT_BY_ID(id), {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to get project');
        }

        return response.json();
    },
};
