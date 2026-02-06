import type { ChatMessageModel, ConsoleLogLine, FileNode } from '@/components/ide/types';

export const mockChat: ChatMessageModel[] = [
  {
    id: 'm1',
    kind: 'user',
    author: { name: 'You', role: 'User' },
    timestamp: '15:31',
    content: 'Enable Atoms Cloud for hosted runs. If it’s optional, keep me moving locally.',
  },
  {
    id: 'm2',
    kind: 'status',
    author: { name: 'System', role: 'Engineer' },
    timestamp: '15:31',
    stepLabel: '✓ Parsed request',
    content: 'Validated local workspace.\n→ Checking whether cloud credentials are present (optional).',
    state: 'processing',
  },
  {
    id: 'm2b',
    kind: 'status',
    author: { name: 'System', role: 'Engineer' },
    timestamp: '15:31',
    stepLabel: '⛔ Blocked',
    content: '⛔ Blocked: optional integration not connected\n✓ You can continue locally\n→ Resolve: Local fallback (recommended) or Connect Atoms Cloud',
    state: 'blocked',
  },
  {
    id: 'm3',
    kind: 'agent',
    author: { name: 'System', role: 'Engineer' },
    timestamp: '15:31',
    content: '✓ Running locally (cloud not required)',
    state: 'warning',
  },
  {
    id: 'm4',
    kind: 'thinking',
    author: { name: 'System', role: 'Engineer' },
    timestamp: '15:33',
    content: 'Planning next steps…',
    state: 'processing',
  },
];

export const mockConsole: ConsoleLogLine[] = [
  {
    id: 'l1',
    level: 'info',
    timestamp: '15:33:02',
    message: 'Starting dev server…',
  },
  {
    id: 'l2',
    level: 'info',
    timestamp: '15:33:04',
    message: 'Compiling client and server bundles',
  },
  {
    id: 'l3',
    level: 'warn',
    timestamp: '15:33:06',
    message: '⚠️  Detected missing ENV: ATOMS_CLOUD_TOKEN (optional for local preview)',
  },
  {
    id: 'l4',
    level: 'error',
    timestamp: '15:33:08',
    message: 'Build failed: One or more steps returned a non-zero exit code',
  },
  {
    id: 'l5',
    level: 'info',
    timestamp: '15:33:10',
    message: 'Retrying with cached artifacts…',
  },
  {
    id: 'l6',
    level: 'success',
    timestamp: '15:33:14',
    message: 'Ready on http://localhost:3000',
  },
];

export const mockFileTree: FileNode[] = [
  {
    id: 'src',
    name: 'src',
    type: 'folder',
    children: [
      {
        id: 'src-components',
        name: 'components',
        type: 'folder',
        children: [
          {
            id: 'src-components-auth',
            name: 'auth',
            type: 'folder',
            children: [
              { id: 'auth.test.tsx', name: 'auth.test.tsx', type: 'file' },
              { id: 'LoginButton.tsx', name: 'LoginButton.tsx', type: 'file' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'tests',
    name: 'tests',
    type: 'folder',
    children: [
      { id: 'setup.ts', name: 'setup.ts', type: 'file' },
    ],
  },
  { id: 'vite.config.ts', name: 'vite.config.ts', type: 'file' },
  { id: 'README.md', name: 'README.md', type: 'file' },
];
