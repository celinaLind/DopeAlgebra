import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Send, Bot } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatInterfaceProps {
  onMessageSend?: (message: string) => void;
  messages?: Message[];
  isLoading?: boolean;
}

const DEFAULT_MESSAGES: Message[] = [
  {
    id: "1",
    content:
      "Meow! I'm your feline friend here to help you create a purrfect cat meme game! What kind of cat-tastic game shall we make today?",
    sender: "ai",
    timestamp: new Date(),
  },
];

const ChatInterface = ({
  onMessageSend = () => {},
  messages = DEFAULT_MESSAGES,
  isLoading = false,
}: ChatInterfaceProps) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      onMessageSend(inputMessage);
      setInputMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-full w-full bg-circus-yellow/10 border-2 border-circus-purple shadow-lg">
      <div className="p-4 border-b border-circus-purple/20">
        <h2 className="text-xl font-semibold text-circus-purple">
          Purr-fessor AI
        </h2>
        <p className="text-sm text-circus-purple/70">
          Share your cat meme game idea and I'll help make it paw-some!
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-circus-blue text-white"
                    : "bg-circus-pink/20 text-circus-purple"
                }`}
              >
                {message.sender === "ai" && (
                  <div className="flex items-center gap-2 mb-1">
                    <Bot size={16} className="text-circus-purple" />
                    <span className="text-xs font-medium text-circus-purple">
                      AI Assistant
                    </span>
                  </div>
                )}
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-circus-pink/20">
                <div className="flex items-center gap-2">
                  <Bot size={16} className="text-circus-purple" />
                  <span className="text-xs font-medium text-circus-purple">
                    AI Assistant
                  </span>
                </div>
                <div className="animate-pulse flex space-x-2 mt-2">
                  <div className="h-2 w-2 bg-circus-purple rounded-full"></div>
                  <div className="h-2 w-2 bg-circus-purple rounded-full"></div>
                  <div className="h-2 w-2 bg-circus-purple rounded-full"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-circus-purple/20">
        <div className="flex gap-2">
          <Input
            placeholder="Describe your game idea..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 border-circus-purple/30 focus:border-circus-purple"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-circus-purple hover:bg-circus-purple/90 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;
