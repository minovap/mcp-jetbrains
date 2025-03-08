import { openaiChatTool, handleOpenAIChat } from './openai-chat.js';
import { applyPatchTool, handleApplyPatch } from './apply-patch.js';
import { CallToolResult, Tool } from "@modelcontextprotocol/sdk/types.js";

export const availableTools: Tool[] = [openaiChatTool, applyPatchTool];

// Tool handler registry
type ToolHandlers = {
    [key: string]: (args: any) => Promise<CallToolResult>;
};

// Register tool handlers
export const toolHandlers: ToolHandlers = {
    openai_chat: handleOpenAIChat,
    apply_patch: handleApplyPatch
};

// Function to handle tool calls
export async function handleTool(name: string, args: any): Promise<CallToolResult> {
    const handler = toolHandlers[name];
    
    if (handler) {
        return handler(args);
    }
    
    return {
        content: [{
            type: "text",
            text: `No handler found for tool: ${name}`
        }],
        isError: true
    };
}
