export type AgentRole = 'Team Leader' | 'Planner' | 'Engineer' | 'User';

export type AgentRunState = 'idle' | 'processing' | 'blocked' | 'resolved' | 'aborted';

export type IntegrationStatus = 'connected' | 'optional' | 'unavailable' | 'connecting' | 'error';

export type EditorAccessState = 'mocked' | 'read/write' | 'locked';

export type ChatMessageKind = 'user' | 'agent' | 'status' | 'issue' | 'thinking';

export type ChatMessageState = 'idle' | 'processing' | 'warning' | 'blocked' | 'error' | 'resolved' | 'aborted';

export interface ChatAuthor {
  name: string;
  role: AgentRole;
}

export interface ChatIssue {
  title: string;
  description?: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
}

export interface ChatMessageModel {
  id: string;
  kind: ChatMessageKind;
  author: ChatAuthor;
  timestamp: string;
  content?: string;
  stepsCount?: number;
  stepLabel?: string;
  issue?: ChatIssue;
  state?: ChatMessageState;
}

export type IDETabKey = 'design' | 'app' | 'console';

export interface ConsoleLogLine {
  id: string;
  level: 'info' | 'warn' | 'error' | 'success';
  timestamp: string;
  message: string;
}

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
}
