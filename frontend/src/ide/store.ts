import { create } from 'zustand';

export type IDEMode = 'idle' | 'running' | 'error';

interface IDEStore {
    mode: IDEMode;
    activeFile: string;
    locked: boolean;
    console: string[];
    errorFile?: string;

    run: () => Promise<void>;
    appendLog: (line: string) => void;
    setError: (file: string, message: string) => void;
    reset: () => void;
    setActiveFile: (file: string) => void;
}

export const useIDE = create<IDEStore>((set, get) => ({
    mode: 'idle',
    activeFile: 'backend/main.py',
    locked: false,
    console: [],

    appendLog: (line) =>
        set((s) => ({ console: [...s.console, line] })),

    setActiveFile: (file) => set({ activeFile: file }),

    run: async () => {
        set({ mode: 'running', locked: true, console: [] });

        const log = (l: string, t = 600) =>
            new Promise<void>((r) =>
                setTimeout(() => {
                    get().appendLog(l);
                    r();
                }, t)
            );

        await log('Compiling project…', 800);
        await log('Running tests…', 1000);
        await log('  ✓ backend/main.py', 400);
        await log('  ✓ backend/core/config.py', 400);

        // Simulate failure (30% chance)
        const hasError = Math.random() < 0.3;

        if (hasError) {
            await log('  ✗ backend/api/auth.py', 600);
            await log('❌ Authentication module failed', 400);
            set({
                mode: 'error',
                locked: false,
                errorFile: 'backend/api/auth.py',
            });
        } else {
            await log('  ✓ backend/api/auth.py', 400);
            await log('✓ All services healthy', 600);
            set({ mode: 'idle', locked: false });
        }
    },

    setError: (file, message) =>
        set({
            mode: 'error',
            errorFile: file,
            locked: false,
            console: [...get().console, `❌ ${message}`],
        }),

    reset: () =>
        set({ mode: 'idle', locked: false, errorFile: undefined }),
}));
