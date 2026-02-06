'use client';

import { useMemo } from 'react';

import { cn } from '@/lib/utils';

const mockFiles: Record<string, { path: string; language: 'ts' | 'tsx'; content: string }> = {
  'setup.ts': {
    path: 'tests/setup.ts',
    language: 'ts',
    content: `import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Ensures DOM is reset between tests
afterEach(() => {
  cleanup();
});

// Optional: mock browser APIs
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
`,
  },
  'auth.test.tsx': {
    path: 'src/components/auth/auth.test.tsx',
    language: 'tsx',
    content: `import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

function LoginButton() {
  return <button>Sign in</button>;
}

describe('LoginButton', () => {
  it('renders', () => {
    render(<LoginButton />);
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
`,
  },
  'vite.config.ts': {
    path: 'vite.config.ts',
    language: 'ts',
    content: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`,
  },
};

function splitLines(text: string) {
  return text.replace(/\r\n/g, '\n').split('\n');
}

const KEYWORDS = new Set([
  'import',
  'from',
  'export',
  'default',
  'const',
  'let',
  'function',
  'return',
  'describe',
  'it',
  'expect',
  'afterEach',
  'Object',
  'defineProperty',
  'true',
  'false',
  'null',
]);

function renderCodeLine(line: string) {
  if (!line) return ' ';

  const commentIdx = line.indexOf('//');
  const head = commentIdx >= 0 ? line.slice(0, commentIdx) : line;
  const comment = commentIdx >= 0 ? line.slice(commentIdx) : '';

  const parts: React.ReactNode[] = [];

  // Tokenize head into strings and non-strings.
  const stringRegex = /(['"`])(?:\\.|(?!\1).)*\1/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = stringRegex.exec(head)) !== null) {
    if (m.index > last) {
      parts.push(...renderNonString(head.slice(last, m.index)));
    }
    parts.push(
      <span key={`s-${m.index}`} className="text-slate-100">
        {m[0]}
      </span>
    );
    last = m.index + m[0].length;
  }
  if (last < head.length) {
    parts.push(...renderNonString(head.slice(last)));
  }

  if (comment) {
    parts.push(
      <span key="c" className="text-slate-500">
        {comment}
      </span>
    );
  }

  return parts;
}

function renderNonString(text: string) {
  const out: React.ReactNode[] = [];
  const wordRegex = /\b[A-Za-z_][A-Za-z0-9_]*\b/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = wordRegex.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const word = m[0];
    if (KEYWORDS.has(word)) {
      out.push(
        <span key={`k-${m.index}`} className="font-semibold text-slate-200">
          {word}
        </span>
      );
    } else {
      out.push(word);
    }
    last = m.index + word.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function CodeEditor({ activeFileId, className }: { activeFileId: string; className?: string }) {
  const file = mockFiles[activeFileId] ?? mockFiles['setup.ts'];

  const lines = useMemo(() => splitLines(file.content), [file.content]);

  return (
    <div className={cn('flex min-h-0 flex-1 flex-col', className)}>
      <div className="flex h-10 items-center justify-between border-b border-white/5 bg-white/5 px-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-100">{file.path}</p>
        </div>
        <p className="text-xs text-slate-400">TypeScript · mocked</p>
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        <pre className="m-0 min-h-full bg-transparent p-4 font-mono text-[12px] leading-5 text-slate-200">
          <code className="block w-full max-w-[980px]">
            {lines.map((line, idx) => (
              <div key={idx} className="grid grid-cols-[48px_1fr] gap-4">
                <span className="select-none text-right text-slate-500">{idx + 1}</span>
                <span className="whitespace-pre-wrap break-words">{renderCodeLine(line)}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
