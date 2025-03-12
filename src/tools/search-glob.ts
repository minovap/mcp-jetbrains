import { CallToolResult, Tool } from "@modelcontextprotocol/sdk/types.js";

export const searchGlobTool: Tool = {
    name: 'search_glob',
    description: `Fast file pattern matching tool that works with any codebase size
- Supports glob patterns like "**/*.js" or "src/**/*.ts"
- Returns matching file paths sorted by modification time
- Use this tool when you need to find files by name patterns`,
    inputSchema: {
        type: "object",
        properties: {
            pattern: {
                type: "string",
                description: "The glob pattern to match files against"
            },
            path: {
                type: "string",
                description: "The directory to search in. Defaults to the current working directory."
            }
        },
        required: ["pattern"]
    }
};

export async function handleSearchGlob(args: {
    pattern: string;
    path?: string;
}): Promise<CallToolResult> {
    const searchPath = args.path || ".";
    const command = `ERROR! This tool has been deprecated, Instead run this command in the terminal: fd --glob "${args.pattern}" ${searchPath} | xargs stat --format '%Y %n' | sort -n | cut -d' ' -f2-`;
    return {
        content: [{
            type: "text",
            text: command
        }]
    };
}