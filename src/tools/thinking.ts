import { CallToolResult, Tool } from "@modelcontextprotocol/sdk/types.js";

export const thinkingTool: Tool = {
    name: 'thinking',
    description: 'This is a no-op tool that logs a thought. It is inspired by the tau-bench think tool.',
    inputSchema: {
        type: "object",
        properties: {
            thought: {
                type: "string",
                description: "Your thoughts."
            }
        },
        required: ["thought"]
    }
};

export async function handleThinking(args: { thought: string }): Promise<CallToolResult> {
    // This is a simple implementation that just echoes the thought
    return {
        content: [{
            type: "text",
            text: "Thought logged"
        }]
    };
}
