import { create } from 'zustand';

// Core IDE state types
export type EditorState = 'idle' | 'running' | 'error';
export type RunState = 'idle' | 'compiling' | 'testing' | 'success' | 'error';

export interface ConsoleMessage {
    id: string;
    text: string;
    type: 'info' | 'success' | 'error' | 'command';
    timestamp: number;
}

export interface FileError {
    path: string;
    line?: number;
    message: string;
}

interface IDEState {
    // Editor state
    editorState: EditorState;
    currentFile: string | null;

    // Execution state
    runState: RunState;
    isExecuting: boolean;

    // Console
    consoleMessages: ConsoleMessage[];
    isConsoleStreaming: boolean;

    // Errors
    fileErrors: FileError[];
    errorFile: string | null;

    // File tree
    isFileTreeLocked: boolean;

    // Actions
    setEditorState: (state: EditorState) => void;
    setRunState: (state: RunState) => void;
    setCurrentFile: (file: string | null) => void;
    setIsExecuting: (executing: boolean) => void;

    // Console actions
    clearConsole: () => void;
    appendConsoleMessage: (message: Omit<ConsoleMessage, 'id' | 'timestamp'>) => void;
    setConsoleStreaming: (streaming: boolean) => void;

    // Error actions
    setFileError: (error: FileError | null) => void;
    clearFileErrors: () => void;

    // File tree actions
    lockFileTree: () => void;
    unlockFileTree: () => void;

    // Orchestration - the Run button owns everything
    executeRun: () => Promise<void>;
    abortExecution: () => void;
}

export const useIDEStore = create<IDEState>((set, get) => ({
    // Initial state
    editorState: 'idle',
    currentFile: null,
    runState: 'idle',
    isExecuting: false,
    consoleMessages: [],
    isConsoleStreaming: false,
    fileErrors: [],
    errorFile: null,
    isFileTreeLocked: false,

    // Basic setters
    setEditorState: (editorState) => set({ editorState }),
    setRunState: (runState) => set({ runState }),
    setCurrentFile: (currentFile) => set({ currentFile }),
    setIsExecuting: (isExecuting) => set({ isExecuting }),

    // Console actions
    clearConsole: () => set({ consoleMessages: [] }),

    appendConsoleMessage: (message) =>
        set((state) => ({
            consoleMessages: [
                ...state.consoleMessages,
                {
                    ...message,
                    id: `${Date.now()}-${Math.random()}`,
                    timestamp: Date.now(),
                },
            ],
        })),

    setConsoleStreaming: (isConsoleStreaming) => set({ isConsoleStreaming }),

    // Error actions
    setFileError: (error) =>
        set((state) => ({
            fileErrors: error ? [error] : [],
            errorFile: error ? error.path : null,
        })),

    clearFileErrors: () => set({ fileErrors: [], errorFile: null }),

    // File tree actions
    lockFileTree: () => set({ isFileTreeLocked: true }),
    unlockFileTree: () => set({ isFileTreeLocked: false }),

    // Abort execution
    abortExecution: () => {
        set({
            isExecuting: false,
            editorState: 'idle',
            runState: 'idle',
            isFileTreeLocked: false,
            isConsoleStreaming: false,
        });
    },

    // ORCHESTRATION: The Run button owns the entire app
    executeRun: async () => {
        const { appendConsoleMessage, setConsoleStreaming, clearConsole, clearFileErrors } = get();

        // 1. LOCK EVERYTHING
        set({
            isExecuting: true,
            editorState: 'running',
            runState: 'compiling',
            isFileTreeLocked: true,
            isConsoleStreaming: true,
        });

        // 2. CLEAR CONSOLE
        clearConsole();
        clearFileErrors();

        // Helper for delayed logging
        const log = async (text: string, type: ConsoleMessage['type'] = 'info', delay = 600) => {
            appendConsoleMessage({ text, type });
            await new Promise((resolve) => setTimeout(resolve, delay));
        };

        try {
            // 3. SIMULATED EXECUTION WITH HUMAN-FEELABLE DELAYS

            // Compile phase
            await log('$ npm run build', 'command', 800);
            await log('Compiling TypeScript...', 'info', 1200);
            await log('✓ Compiled successfully', 'success', 600);

            // Test phase
            set({ runState: 'testing' });
            await log('$ npm test', 'command', 800);
            await log('Running test suites...', 'info', 1000);
            await log('  ✓ components/Button.test.tsx', 'info', 400);
            await log('  ✓ utils/format.test.tsx', 'info', 400);

            // Simulate random error (30% chance for demo)
            const hasError = Math.random() < 0.3;

            if (hasError) {
                // ERROR PATH
                await log('  ✗ tests/auth.test.tsx', 'error', 600);
                await log('Error: Expected "authenticated" but received "pending"', 'error', 400);

                set({
                    editorState: 'error',
                    runState: 'error',
                    errorFile: 'tests/auth.test.tsx',
                    fileErrors: [
                        {
                            path: 'tests/auth.test.tsx',
                            line: 23,
                            message: 'Expected "authenticated" but received "pending"',
                        },
                    ],
                });

                await log('Build failed', 'error', 400);
            } else {
                // SUCCESS PATH
                await log('  ✓ tests/auth.test.tsx', 'success', 400);
                await log('✓ All tests passed (12/12)', 'success', 600);
                await log('Build complete', 'success', 400);

                set({
                    editorState: 'idle',
                    runState: 'success',
                });
            }
        } catch (error) {
            // Unexpected error
            await log('✗ Build failed unexpectedly', 'error', 400);
            set({
                editorState: 'error',
                runState: 'error',
            });
        } finally {
            // 4. UNLOCK EVERYTHING
            set({
                isExecuting: false,
                isFileTreeLocked: false,
                isConsoleStreaming: false,
            });
        }
    },
}));
