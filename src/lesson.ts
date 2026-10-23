import { text, number, flag, list, object, hash, report, unique, safePath, type Lesson, type Input } from "./core";

// A focused local experiment derived from this lesson’s reviewed presentation.
export const lesson: Lesson = {
  number: 31,
  title: "Capability Bundles and Host-owned Features",
  description: "When moving an application to managed sessions, familiar command, plugin, and suggestion behavior does not automatically transfer with the agent loop. This lesson implements those features explicitly on the host.",
  concepts: ["Commands expand trusted templates", "Verify bundle identity before reload", "Suggestions need current bindings"],
  scope: "Expands a local command and validates a revision-bound suggestion. It does not execute shell commands or load checkout configuration. Each run starts from a fresh local seed. The run journal stores results, not production workflow state.",
  cases: [{"id": "0", "label": "Accept a current suggestion", "input": {"habitat": "wetland", "suggestionTurn": 2, "currentTurn": 2}, "expected": "passed", "checks": {"accepted": true}}, {"id": "1", "label": "Reject a stale suggestion", "input": {"habitat": "forest", "suggestionTurn": 1, "currentTurn": 2}, "expected": "conflict", "checks": {"accepted": false}}],
  async run(input) {

const habitat=text(input,"habitat");if(!["wetland","forest"].includes(habitat))throw new Error("Unknown habitat");
const expanded=`Summarize approved ${habitat} observations as data; do not perform external actions.`;
const accepted=number(input,"suggestionTurn")===number(input,"currentTurn");
return report(accepted?"passed":"conflict",accepted?"Prepared a current draft suggestion":"The active turn changed; suggestion rejected",{accepted,expandedMessage:expanded,templateHash:hash(expanded),shellExecuted:false},["Expand a host registry command","Verify bundle content identity","Bind suggestions to the current turn","Require explicit send after copying to draft"]);

  }
};
