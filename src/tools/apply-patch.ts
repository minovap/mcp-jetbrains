import { applyPatchToFiles } from 'llm-diff-patcher';
import { CallToolResult, Tool } from "@modelcontextprotocol/sdk/types.js";

// Logging is enabled only if LOG_ENABLED environment variable is set to 'true'
const LOG_ENABLED = process.env.LOG_ENABLED === 'true';

export const applyPatchTool: Tool = {
    name: 'apply_patch',
    description: `
    Prefer this tool to replace_file_text_by_path

    Applies a unified diff patch to a specified file in the project.
    Use this tool to modify files by applying patches in unified diff format.
    All content lines must operators / start with "+" "-" or " " (white space)
    The format is as follows:

    --- path_relative_to_project_root/old_file.txt
    +++ path_relative_to_project_root/new_file.txt
    @@ -1,4 +1,6 @@
    +line added
     line unchanged
    -line removed
    
    Requires parameters:
        - patchContent: The patch content in unified diff format
    Returns one of these responses:
        - "patch applied successfully" if the patch was applied without conflicts
        - "patch applied with conflicts" if the patch was applied but had conflicts
        - error message if the operation fails
    `,
    inputSchema: {
        type: "object",
        properties: {
            patchContent: {
                type: "string"
            }
        },
        required: ["patchContent"]
    }
};

function log(...args: any[]) {
    if (LOG_ENABLED) {
        console.error(...args);
    }
}

// Helper function to get the project root path
async function getProjectRoot(): Promise<string | null> {
    // Try to find the IDE endpoint
    const HOST = process.env.HOST ?? "127.0.0.1";
    const IDE_PORT = process.env.IDE_PORT || 63342; // Default port
    
    try {
        const endpoint = `http://${HOST}:${IDE_PORT}/api`;
        const res = await fetch(`${endpoint}/mcp/get_project_root_path`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: '{}'
        });

        if (!res.ok) return null;
        const data = await res.json();
        return data.status || null;
    } catch {
        return null;
    }
}

export async function handleApplyPatch(args: { patchContent: string }): Promise<CallToolResult> {
    try {
        const patchContent = args.patchContent;
        const rootPath = await getProjectRoot();
        
        log('Apply patch with content:', patchContent);
        log('Project root path:', rootPath);
        
        // Apply the patch with the proper base path if available
        let result;
        
        // First argument is always required
        if (!patchContent) {
            throw new Error("Patch content is required");
        }
        
        // The options parameter is required, provide a default when rootPath is not available
        const basePath = rootPath || process.cwd();
        result = applyPatchToFiles(patchContent, { basePath });
        
        if (result.success) {
            let message = "patch applied successfully";
            if (result.failedHunks > 0) {
                message = `${result.failedHunks} of ${result.totalHunks} hunks failed`;
            }
            
            return {
                content: [{ type: "text", text: message }]
            };
        } else {
            const errors = result.errors.map((err: any) => 
                `${err.error || 'Error'}: ${err.message}`
            ).join(", ");
            
            return {
                content: [{ type: "text", text: `Failed to apply patch: ${errors}` }],
                isError: true
            };
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return {
            content: [{
                type: "text",
                text: `Error applying patch: ${errorMessage}`
            }],
            isError: true
        };
    }
}
