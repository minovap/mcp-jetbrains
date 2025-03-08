import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import {CallToolResult, Tool} from "@modelcontextprotocol/sdk/types.js";

export const openaiChatTool: Tool = {
    name: "openai_chat",
    description: "This tool sends messages to OpenAI's chat completion API using the specified model.",
    inputSchema: {
        type: "object",
        properties: {
            messages: {
                type: "array",
                description: "Array of messages to send to the API",
                items: {
                    type: "object",
                    properties: {
                        role: {
                            type: "string",
                            enum: ["system", "user", "assistant"],
                            description: "Role of the message sender"
                        },
                        content: {
                            type: "string",
                            description: "Content of the message"
                        }
                    },
                    required: ["role", "content"]
                }
            },
        },
        required: ["messages"]
    }
};

type ChatToolArgs = {
    messages: Array<{ role: string; content: string }>;
};

export async function handleOpenAIChat(args: ChatToolArgs): Promise<CallToolResult> {
    try {
        // Initialize OpenAI client with Groq
        const apiKey = process.env.OPENAI_API_KEY || '';
        const baseURL = process.env.OPENAI_API_BASE_URL || '';
        const model = process.env.OPENAI_API_MODEL || '';
        const openai = new OpenAI({
            apiKey,
            baseURL,
        });

        // Convert messages to OpenAI's expected format
        const messages: ChatCompletionMessageParam[] = args.messages.map(msg => ({
            role: msg.role as "system" | "user" | "assistant",
            content: msg.content
        }));

        // Call OpenAI API
        const completion = await openai.chat.completions.create({
            messages,
            model,
        });

        // Return the response
        return {
            content: [{
                type: "text",
                text: completion.choices[0]?.message?.content || "No response received"
            }]
        };
    } catch (error) {
        return {
            content: [{
                type: "text",
                text: `OpenAI API error: ${(error as Error).message}`
            }],
            isError: true
        };
    }
}
