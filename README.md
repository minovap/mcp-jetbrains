## JetBrains MCP Proxy Server - With Apply Patch Tool!

## Quick Setup Guide

This fork of the JetBrains MCP Proxy Server provides two main enhancements:

1. **Apply Patch Tool**: Implements a new tool called `apply_patch` that uses [llm-diff-patcher](https://github.com/minovap/llm-diff-patcher) to intelligently apply AI-generated patches by matching context rather than relying on line numbers.

2. **Tool Whitelist**: Allows you to specify only the IntelliJ tools you need in the LLM context, reducing noise and improving performance.

### Requirements to run this MCP server:

1. Install the modified MCP plugin for IntelliJ: [mcp-server-plugin.jar](https://github.com/minovap/mcp-server-plugin/blob/master/build/libs/mcp-server-plugin.jar) (Choose "Install from disk" inside your IntelliJ IDE)

2. Configure your Claude Desktop (or other MCP-compatible client) with the following setup:

```json
{
  "mcpServers": {
    "code-editor": {
      "command": "npx",
      "args": ["tsx", "[path to cloned project folder]/mcp-jetbrains/src/index.ts"],
      "env": {
        "INTELLIJ_TOOLS_WHITELIST": "[\"execute_terminal_command\", \"get_terminal_text\", \"get_run_configurations\", \"run_configuration\", \"search_in_files_content\", \"list_files_in_folder\", \"replace_file_text_by_path\", \"get_file_text_by_path\", \"create_new_file_with_text\", \"get_open_in_editor_file_path\", \"get_open_in_editor_file_text\"]"
      }
    }
  }
}
```

The server proxies requests from client to JetBrains IDE.

## Install MCP Server plugin

https://plugins.jetbrains.com/plugin/26071-mcp-server

## Usage with Claude Desktop

To use this with Claude Desktop, add the following to your `claude_desktop_config.json`.
The full path on MacOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`, on Windows: `%APPDATA%/Claude/claude_desktop_config.json`.

```json
{
  "mcpServers": {
    "code-editor": {
      "command": "npx",
      "args": ["tsx", "[path to cloned project folder]/mcp-jetbrains/src/index.ts"],
      "env": {
        "INTELLIJ_TOOLS_WHITELIST": "[\"execute_terminal_command\", \"get_terminal_text\", \"get_run_configurations\", \"run_configuration\", \"search_in_files_content\", \"list_files_in_folder\", \"replace_file_text_by_path\", \"get_file_text_by_path\", \"create_new_file_with_text\", \"get_open_in_editor_file_path\", \"get_open_in_editor_file_text\"]"
      }
    }
  }
}
```

## Configuration

If you're running multiple IDEs with MCP server and want to connect to the specific one, add to the MCP server configuration:
```json
"env": {
  "IDE_PORT": "<port of IDE's built-in webserver>"
}
```

By default, we connect to IDE on  127.0.0.1 but you can specify a different address/host:
```json
"env": {
  "HOST": "<host/address of IDE's built-in webserver>"
}
```

To enable logging add:
```json
"env": {
  "LOG_ENABLED": "true"
}
```

## How to build
1. Tested on macOS
2. `brew install node pnpm`
3. Run `pnpm build` to build the project
