import { CallToolResult, Tool } from "@modelcontextprotocol/sdk/types.js";

export const architectTool: Tool = {
    name: 'architect',
    description: 'Your go-to tool for any technical or coding task. Analyzes requirements and breaks them down into clear, actionable implementation steps. Use this whenever you need help planning how to implement a feature, solve a technical problem, or structure your code.',
    inputSchema: {
        type: "object",
        properties: {
            prompt: {
                type: "string",
                description: "The technical request or coding task to analyze"
            },
            context: {
                type: "string",
                description: "Optional context from previous conversation or system state"
            }
        },
        required: ["prompt"]
    }
};

export async function handleArchitect(args: { 
    prompt: string; 
    context?: string 
}): Promise<CallToolResult> {
    return {
        content: [{
            type: "text",
            text: "Lets do some planning. Imagine you are an expert software architect. Your next step is to analyze technical requirements and produce a clear, actionable implementation plan.\n" +
                "The plan will then be carried out step by step so you need to be specific and detailed. However do not actually write the code, just explain the plan.\n" +
                "Follow these steps for each request:\n" +
                "1. Carefully analyze requirements to identify core functionality and constraints\n" +
                "2. Define clear technical approach with specific technologies and patterns\n" +
                "3. Break down implementation into concrete, actionable steps at the appropriate level of abstraction\n" +
                "Keep responses focused, specific and actionable. \n" +
                "IMPORTANT: Do not ask the user if you should implement the changes at the end. Just provide the plan as described above.\n" +
                "IMPORTANT: Do not attempt to write the code or use any string modification tools. Just provide the plan."
        }]
    };
}
