'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { TopToolbar, type EditorMode } from '@/components/ide/TopToolbar';
import { StatusBar } from '@/components/ide/StatusBar';
import { IDEPanel } from '@/components/ide/IDEPanel';
import { FileTree } from '@/components/ide/FileTree';
import { EditorTabs } from '@/components/ide/EditorTabs';
import { CodeEditor } from '@/components/ide/CodeEditor';
import { ChatPanel, type ResolveStrategy } from '@/components/chat/ChatPanel';
import type { AgentRunState, ChatMessageModel, ConsoleLogLine, FileNode, IDETabKey, IntegrationStatus } from '@/components/ide/types';
import { mockChat, mockFileTree } from '@/components/ide/mock-data';

function nowHHMM() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

function nowHHMMSS() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

export function EditorLayout() {
  const [mode, setMode] = useState<EditorMode>('editor');

  const [ideTab, setIdeTab] = useState<IDETabKey>('app');

  const [agentState, setAgentState] = useState<AgentRunState>('blocked');

  const [atomsStatus, setAtomsStatus] = useState<IntegrationStatus>('optional');
  const [githubStatus] = useState<IntegrationStatus>('optional');
  const [isResolving, setIsResolving] = useState(false);

  const [messages, setMessages] = useState<ChatMessageModel[]>(() => mockChat);

  const [consoleLines, setConsoleLines] = useState<ConsoleLogLine[]>([]);
  const [runLabel, setRunLabel] = useState<string>('Idle');
  const [previewLabel, setPreviewLabel] = useState<string | undefined>(undefined);
  const runTimeoutsRef = useRef<number[]>([]);
  const runSeqRef = useRef(0);

  useEffect(() => {
    return () => {
      runTimeoutsRef.current.forEach((t) => window.clearTimeout(t));
      runTimeoutsRef.current = [];
    };
  }, []);

  const [activeFileId, setActiveFileId] = useState('setup.ts');
  const tabs = useMemo(
    () => [
      { id: 'setup.ts', label: 'setup.ts' },
      { id: 'auth.test.tsx', label: 'auth.test.tsx' },
      { id: 'vite.config.ts', label: 'vite.config.ts' },
    ],
    []
  );

  const fileTreeNodes = useMemo<FileNode[]>(() => mockFileTree, []);

  const handleResolve = (strategy: ResolveStrategy) => {
    if (isResolving) return;

    setIsResolving(true);
    setAgentState('processing');

    if (strategy === 'connect_atoms_cloud') {
      setAtomsStatus('connecting');
    }

    const thinkId = `m-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      {
        id: thinkId,
        kind: 'status',
        author: { name: 'System', role: 'Engineer' },
        timestamp: nowHHMM(),
        stepLabel: '✓ Parsed request',
        content: `→ Resolving: ${strategy === 'local_fallback' ? 'Local fallback' : 'Connect Atoms Cloud'}…`,
        state: 'processing',
      },
    ]);

    window.setTimeout(() => {
      if (strategy === 'connect_atoms_cloud') {
        setAtomsStatus('connected');
      }

      setAgentState('resolved');

      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}-status`,
          kind: 'status',
          author: { name: 'System', role: 'Engineer' },
          timestamp: nowHHMM(),
          stepLabel: strategy === 'local_fallback' ? '✓ Resolved locally' : '✓ Connected Atoms Cloud',
          content:
            strategy === 'local_fallback'
              ? '✓ Running locally (cloud not required)'
              : '✓ Cloud connected (hosted runs available)',
          state: 'resolved',
        },
      ]);

      window.setTimeout(() => setAgentState('idle'), 900);

      setIsResolving(false);
    }, 1200);
  };

  const handleSendMessage = (text: string) => {
    const sentAt = nowHHMM();

    setMessages((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}-user`,
        kind: 'user',
        author: { name: 'You', role: 'User' },
        timestamp: sentAt,
        content: text,
        state: 'idle',
      },
      {
        id: `m-${Date.now()}-status`,
        kind: 'status',
        author: { name: 'System', role: 'Engineer' },
        timestamp: sentAt,
        stepLabel: '✓ Parsed request',
        content: 'Captured intent and selected a safe default.\n→ Executing the next step.',
        state: 'processing',
      },
    ]);

    setAgentState('processing');

    const triggersCloud = /\b(cloud|deploy|hosted|atoms)\b/i.test(text);
    const triggersGitHub = /\b(github|pr|pull request|repo)\b/i.test(text);

    window.setTimeout(() => {
      if (triggersCloud || triggersGitHub) {
        setAgentState('blocked');
        setMessages((prev) => [
          ...prev,
          {
            id: `m-${Date.now()}-blocked`,
            kind: 'status',
            author: { name: 'System', role: 'Engineer' },
            timestamp: nowHHMM(),
            stepLabel: '⛔ Blocked',
            content:
              'Waiting for optional integration.\nNothing is broken — you can continue locally.\n→ Choose a resolve option to proceed.',
            state: 'blocked',
          },
        ]);
        return;
      }

      setAgentState('resolved');
      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}-resolved`,
          kind: 'status',
          author: { name: 'System', role: 'Engineer' },
          timestamp: nowHHMM(),
          stepLabel: '✓ Resolved (local)',
          content: '✓ Completed locally',
          state: 'resolved',
        },
      ]);

      window.setTimeout(() => setAgentState('idle'), 900);
    }, 650);
  };

  const editorLocked = agentState === 'blocked';

  const appendConsole = (level: ConsoleLogLine['level'], message: string) => {
    setConsoleLines((prev) => [
      ...prev,
      {
        id: `l-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        level,
        timestamp: nowHHMMSS(),
        message,
      },
    ]);
  };

  const clearRunTimers = () => {
    runTimeoutsRef.current.forEach((t) => window.clearTimeout(t));
    runTimeoutsRef.current = [];
  };

  const schedule = (ms: number, fn: () => void) => {
    const t = window.setTimeout(fn, ms);
    runTimeoutsRef.current.push(t);
  };

  const handleRun = () => {
    if (runLabel === 'Running') return;

    runSeqRef.current += 1;
    const seq = runSeqRef.current;
    clearRunTimers();

    setMode('app');
    setIdeTab('console');
    setRunLabel('Running');
    setPreviewLabel('Loading preview…');
    setConsoleLines([]);

    appendConsole('info', 'Starting local run…');

    schedule(250, () => {
      if (runSeqRef.current !== seq) return;
      appendConsole('info', 'Compiling…');
    });

    schedule(650, () => {
      if (runSeqRef.current !== seq) return;
      appendConsole('info', 'Running tests…');
    });

    schedule(1050, () => {
      if (runSeqRef.current !== seq) return;
      appendConsole('warn', '⚠️  Optional integrations are disabled (running locally).');
    });

    schedule(1350, () => {
      if (runSeqRef.current !== seq) return;
      appendConsole('error', 'FAIL  src/components/auth/auth.test.tsx');
      appendConsole('error', 'AssertionError: expected true but received false');
    });

    schedule(1700, () => {
      if (runSeqRef.current !== seq) return;
      appendConsole('info', 'Re-running after cache reset…');
    });

    schedule(2150, () => {
      if (runSeqRef.current !== seq) return;
      appendConsole('success', 'PASS  tests/setup.ts');
      appendConsole('success', 'PASS  src/components/auth/auth.test.tsx');
      appendConsole('success', '2 passed, 0 failed');
    });

    schedule(2450, () => {
      if (runSeqRef.current !== seq) return;
      const ts = nowHHMMSS();
      appendConsole('success', `Preview reloaded (${ts})`);
      setPreviewLabel(`Reloaded at ${ts}`);
      setRunLabel('Ready');
      setIdeTab('app');
    });

    schedule(5200, () => {
      if (runSeqRef.current !== seq) return;
      setRunLabel('Idle');
    });
  };

  return (
    <div
      className={cn(
        'h-[100dvh] overflow-hidden',
        'bg-gradient-to-br from-slate-950 via-slate-950 to-indigo-950',
        'text-slate-100'
      )}
    >
      <TopToolbar
        appName="NOVA AI Assistant"
        workspaceName="Workspace"
        mode={mode}
        onModeChange={setMode}
        onRun={handleRun}
        runDisabled={runLabel === 'Running'}
      />

      <main className="mx-auto h-[calc(100dvh-3rem)] max-w-[1600px] overflow-hidden p-4">
        <div className="flex h-full min-h-0 gap-4">
          <aside className="h-full w-[360px] shrink-0 overflow-hidden rounded-xl border border-white/5 bg-slate-950/30 backdrop-blur-xl">
            <ChatPanel
              messages={messages}
              agentState={agentState}
              atomsStatus={atomsStatus}
              githubStatus={githubStatus}
              isResolving={isResolving}
              onResolve={handleResolve}
              onSendMessage={handleSendMessage}
            />
          </aside>

          <section className="h-full min-w-0 flex-1 overflow-hidden rounded-xl border border-white/5 bg-slate-950/20 backdrop-blur-xl shadow-sm">
            {mode === 'app' ? (
              <div className="h-full">
                <IDEPanel
                  consoleLines={consoleLines}
                  tab={ideTab}
                  onTabChange={setIdeTab}
                  previewLabel={previewLabel}
                />
              </div>
            ) : (
              <div className="flex h-full flex-col">
                <div className="flex min-h-0 flex-1">
                  <div className="w-[280px] shrink-0 border-r border-white/5 bg-slate-950/20">
                    <div className="h-full overflow-auto p-3">
                      <FileTree
                        nodes={fileTreeNodes}
                        activeId={activeFileId}
                        onSelectFile={setActiveFileId}
                        disabled={editorLocked}
                      />
                    </div>
                  </div>

                  <div className="relative min-w-0 flex-1">
                    <EditorTabs tabs={tabs} activeId={activeFileId} onChange={setActiveFileId} />
                    <div className="relative min-h-0 flex-1 bg-slate-950/70 shadow-inner before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-10 before:bg-gradient-to-b before:from-black/35 before:to-transparent after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(1200px_700px_at_20%_0%,rgba(0,0,0,0.30),transparent_60%)]">
                      <CodeEditor activeFileId={activeFileId} className="h-full" />
                    </div>

                    {editorLocked ? (
                      <div className="absolute inset-0 z-10 grid place-items-center bg-slate-950/50 backdrop-blur-sm">
                        <div className="max-w-[420px] rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-center">
                          <p className="text-sm font-semibold text-slate-100">Editor locked</p>
                          <p className="mt-1 text-xs leading-relaxed text-slate-300">
                            Waiting for an optional integration. Nothing is broken — resolve using local fallback to keep working.
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <StatusBar atomsStatus={atomsStatus} githubStatus={githubStatus} runLabel={runLabel} />
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
