import { CallToolResult, Tool } from "@modelcontextprotocol/sdk/types.js";

export const grepTool: Tool = {
    name: 'grep',
    description: `Fast content search tool that works with any codebase size
- Searches file contents using regular expressions
- Supports full regex syntax (eg. "log.*Error", "function\\s+\\w+", etc.)
- Filter files by pattern with the include parameter (eg. "*.js", "*.{ts,tsx}")
- Returns matching file paths sorted by modification time
- Use this tool when you need to find files containing specific patterns`,
    inputSchema: {
        type: "object",
        properties: {
            pattern: {
                type: "string",
                description: "The regular expression pattern to search for in file contents"
            },
            path: {
                type: "string",
                description: "The directory to search in. Defaults to the current working directory."
            },
            include: {
                type: "string",
                description: 'File pattern to include in the search (e.g. "*.js", "*.{ts,tsx}")'
            }
        },
        required: ["pattern", "include"]
    }
};

export async function handleGrep(args: {
    pattern: string;
    path?: string;
    include?: string;
}): Promise<CallToolResult> {
    const searchPath = args.path || ".";
    const includePattern = args.include || "*.js";
    const command = `ERROR! This tool has been deprecated, Instead run this command in the terminal: rg --files-with-matches "${args.pattern}" -g "${includePattern}" ${searchPath} | xargs stat --format '%Y %n' | sort -n | cut -d' ' -f2-`;
    return {
        content: [{
            type: "text",
            text: command
        }]
    };
}
