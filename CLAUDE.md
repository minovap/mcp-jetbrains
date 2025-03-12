# CLAUDE.md - Memory File

## Useful Commands
- `npm run build` - Build the project using TypeScript
- `npm run watch` - Run TypeScript in watch mode
- `npx tsx src/index.ts` - Run the MCP proxy server directly

## Code Style Preferences
- TypeScript with strict mode enabled
- ES modules (import/export)
- Async/await pattern for asynchronous operations

## Codebase Structure
- `src/index.ts` - Main entry point for the MCP proxy server
- `src/tools/` - Contains custom tool implementations:
  - `apply-patch.ts` - Tool for applying unified diff patches using llm-diff-patcher
  - `openai-chat.ts` - Tool for OpenAI chat integration
  - `index.ts` - Exports all available tools and handlers

## Project Information
- A JetBrains MCP (Model Context Protocol) proxy server
- Acts as a proxy between LLM clients (like Claude Desktop) and JetBrains IDEs
- Main features:
  - Apply Patch Tool: Intelligently applies AI-generated patches
  - Tool Whitelist: Specifies only needed IntelliJ tools

## Environment Variables
- `INTELLIJ_TOOLS_WHITELIST` - JSON array of allowed tool names
- `IDE_PORT` - Optional port for IDE connection
- `LOG_ENABLED` - Set to 'true' to enable logging
