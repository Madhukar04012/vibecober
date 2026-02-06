'use client';

import { useState } from 'react';

import type { ConsoleLogLine, IDETabKey } from '@/components/ide/types';
import { TabSwitcher } from '@/components/ide/TabSwitcher';
import { AppPreview } from '@/components/ide/AppPreview';
import { ConsolePanel } from '@/components/ide/ConsolePanel';

export function IDEPanel({
  consoleLines,
  rightPanelToggle,
  tab: controlledTab,
  onTabChange,
  defaultTab,
  previewLabel,
}: {
  consoleLines: ConsoleLogLine[];
  rightPanelToggle?: React.ReactNode;
  tab?: IDETabKey;
  onTabChange?: (v: IDETabKey) => void;
  defaultTab?: IDETabKey;
  previewLabel?: string;
}) {
  const [internalTab, setInternalTab] = useState<IDETabKey>(defaultTab ?? 'app');
  const tab = controlledTab ?? internalTab;
  const setTab = onTabChange ?? setInternalTab;

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-12 items-center justify-between border-b border-white/10 px-3">
        <TabSwitcher value={tab} onChange={setTab} />

        <div className="flex items-center gap-2">{rightPanelToggle}</div>
      </div>

      <div className="min-h-0 flex-1">
        {tab === 'design' ? (
          <div id="panel-design" role="tabpanel" aria-label="Design panel" className="h-full">
            <AppPreview mode="design" previewLabel={previewLabel} />
          </div>
        ) : null}

        {tab === 'app' ? (
          <div id="panel-app" role="tabpanel" aria-label="App viewer" className="h-full">
            <AppPreview mode="app" previewLabel={previewLabel} />
          </div>
        ) : null}

        {tab === 'console' ? (
          <div id="panel-console" role="tabpanel" aria-label="Console" className="h-full">
            <ConsolePanel lines={consoleLines} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
