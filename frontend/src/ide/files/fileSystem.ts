export interface FileNode {
    name: string;
    path: string;
    type: 'file' | 'folder';
    children?: FileNode[];
}

export const vibeCoberFileSystem: FileNode[] = [
    {
        name: 'backend',
        path: 'backend',
        type: 'folder',
        children: [
            {
                name: 'api',
                path: 'backend/api',
                type: 'folder',
                children: [
                    { name: 'routes.py', path: 'backend/api/routes.py', type: 'file' },
                    { name: 'deps.py', path: 'backend/api/deps.py', type: 'file' },
                ],
            },
            {
                name: 'core',
                path: 'backend/core',
                type: 'folder',
                children: [
                    { name: 'config.py', path: 'backend/core/config.py', type: 'file' },
                    { name: 'security.py', path: 'backend/core/security.py', type: 'file' },
                ],
            },
            { name: 'main.py', path: 'backend/main.py', type: 'file' },
            { name: 'database.py', path: 'backend/database.py', type: 'file' },
            { name: 'requirements.txt', path: 'backend/requirements.txt', type: 'file' },
            { name: '.env', path: 'backend/.env', type: 'file' },
        ],
    },
    {
        name: 'frontend',
        path: 'frontend',
        type: 'folder',
        children: [
            {
                name: 'app',
                path: 'frontend/app',
                type: 'folder',
                children: [
                    { name: 'page.tsx', path: 'frontend/app/page.tsx', type: 'file' },
                    { name: 'layout.tsx', path: 'frontend/app/layout.tsx', type: 'file' },
                ],
            },
            {
                name: 'components',
                path: 'frontend/components',
                type: 'folder',
                children: [
                    { name: 'ui', path: 'frontend/components/ui', type: 'folder', children: [] },
                    { name: 'Button.tsx', path: 'frontend/components/Button.tsx', type: 'file' },
                ],
            },
            { name: 'package.json', path: 'frontend/package.json', type: 'file' },
            { name: 'tailwind.config.js', path: 'frontend/tailwind.config.js', type: 'file' },
            { name: 'tsconfig.json', path: 'frontend/tsconfig.json', type: 'file' },
        ],
    },
    { name: '.gitignore', path: '.gitignore', type: 'file' },
    { name: 'README.md', path: 'README.md', type: 'file' },
    { name: 'Procfile', path: 'Procfile', type: 'file' },
];

export const getFileContent = (path: string): string => {
    if (path.endsWith('.json')) return '{\n  "name": "vibecober",\n  "version": "1.0.0"\n}';
    if (path.endsWith('.py')) return 'from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/")\ndef read_root():\n    return {"Hello": "World"}';
    if (path.endsWith('.tsx')) return 'export default function Component() {\n  return <div>Hello World</div>;\n}';
    if (path.endsWith('.md')) return '# VibeCober\n\nProject documentation...';
    if (path.endsWith('.env')) return 'DATABASE_URL=postgresql://user:pass@localhost:5432/db';
    return '// File content preview';
};
