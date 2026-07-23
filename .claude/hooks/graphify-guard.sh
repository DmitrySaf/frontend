#!/bin/sh
# graphify orientation guard (PreToolUse).
# Policy: consult the knowledge graph FIRST for orientation, fall back to grep/read
# when it doesn't help. Reworded from the stock `graphify hook-guard` output, which
# said "MANDATORY / you MUST" with no fallback and contradicted CLAUDE.md.
# Emits nothing when there is no graph, so it stays silent outside graphed repos.

graph="${CLAUDE_PROJECT_DIR:-.}/graphify-out/graph.json"
[ -f "$graph" ] || exit 0

cat <<'JSON'
{"hookSpecificOutput":{"hookEventName":"PreToolUse","additionalContext":"graphify-out/graph.json is available. Orient with the graph FIRST: `graphify explain \"<symbol>\"` and `graphify path \"<A>\" \"<B>\"` are reliable for callers/callees and how things connect; `graphify query \"<question>\"` is a broad sweep for orientation only (weak on behaviour-phrased questions). If the graph does not resolve it, fall back to grep/read — that is expected and allowed. Use grep/read directly to read actual logic or edit specific lines."}}
JSON
