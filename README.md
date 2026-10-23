# C31 · Capability Bundles and Host-owned Features

Expands a local command and validates a revision-bound suggestion. It does not execute shell commands or load checkout configuration. Each run starts from a fresh local seed. The run journal stores results, not production workflow state.

## Concepts students will learn

- Commands expand trusted templates
- Verify bundle identity before reload
- Suggestions need current bindings

## Configure and run

Use Node.js 24 or later. In PowerShell, from this repository's folder:

```powershell
node --version
npm ci
Copy-Item .env.example .env
notepad .env
```

No API key is required for the local experiment. Optional live commentary requires your own API key, agent ID and environment ID. It explains the local result; it does not activate the integration discussed in the lesson.

For the optional live path, set your API key, then run npm run setup if you do not already have resource IDs. The script creates the environment before a text-only agent, saves each ID immediately, and reuses IDs already configured. It uses CLAUDE_MODEL or the source default; choose a model available to your account. An uncertain network failure may have created a resource: inspect your account before retrying.

```powershell
npm start
```

Open `http://127.0.0.1:3031`. Navigation leads to `/guide.html#learning`, `/guide.html#run-guide`, `/architecture.html`, and the application lab. If you change `PORT`, use the configured port. Keep the terminal running; stop with Ctrl+C. `npm run dev` also starts the web application.

Select the first scenario, inspect its editable fields, press Run experiment, and compare the outcome and evidence with the table above. Select another scenario to investigate the boundary condition.

## Create your .env file

Copy `.env.example` to `.env` and enter your own values. Do not commit the real file. Restart the server after editing it. The example contains safe placeholders; optional settings may be left blank to use source defaults. Resource IDs and keys stay on the server.

```dotenv
ANTHROPIC_API_KEY=your_api_key
CLAUDE_MANAGED_AGENT_ID=your_agent_id
CLAUDE_MANAGED_ENVIRONMENT_ID=your_environment_id
PORT=3031
```

## How the app was build

### 1. Expand a bounded host-owned command

Only the reviewed habitats are accepted. The expansion produces a data-summary message with a fixed no-external-actions instruction; it is not a shell command.

Source: [src/lesson.ts](src/lesson.ts#L13) · selected statements

```typescript
const habitat = text(input, "habitat");

if (!["wetland", "forest"].includes(habitat)) throw new Error("Unknown habitat");

const expanded = `Summarize approved ${habitat} observations as data; do not perform external actions.`;
```

### 2. Bind a suggestion to the active turn

A stale suggestion returns conflict rather than being accepted into a different turn. The evidence hashes the expanded template and keeps shellExecuted false; the message is only a prepared draft.

Source: [src/lesson.ts](src/lesson.ts#L15) · selected statements

```typescript
const accepted = number(input, "suggestionTurn") === number(input, "currentTurn");

return report(
  accepted ? "passed" : "conflict",
  accepted
    ? "Prepared a current draft suggestion"
    : "The active turn changed; suggestion rejected",
  {
    accepted,
    expandedMessage: expanded,
    templateHash: hash(expanded),
    shellExecuted: false,
  },
  [
    "Expand a host registry command",
    "Verify bundle content identity",
    "Bind suggestions to the current turn",
    "Require explicit send after copying to draft",
  ],
);
```

### Check your understanding

Run **Accept a current suggestion** in the application. Compare the result with these scenario expectations:

```json
{
  "input": {
    "habitat": "wetland",
    "suggestionTurn": 2,
    "currentTurn": 2
  },
  "expectedOutcome": "passed",
  "checkEvidence": {
    "accepted": true
  }
}
```

Then try **Reject a stale suggestion**. Its expected outcome is `conflict`; identify the condition or evidence field that explains the difference.

## Validation

```powershell
npm test
python scripts/verify-walkthrough.py
```

The source hash check detects when walkthrough excerpts need refreshing. Browser verification covers page navigation, readable text, mobile layout, dark mode, diagram and image routes. Local scenarios and live provider calls are recorded separately in the workspace verification report; local success is not evidence of a live provider operation.

## Repository contents

Application sources, student web pages, safe configuration example and documentation images are included. `node_modules`, `presentation`, `output`, `reviewed`, `v3`, `teaching-material`, build output, local journals, credentials and local resource files are ignored. Existing teaching videos and presentations remain in the original workspace.
