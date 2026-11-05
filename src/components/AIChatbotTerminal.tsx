"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal as TerminalIcon,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ChevronRight,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AI_QA, PROFILE } from "@/lib/profile-data";
import { useAudio } from "@/components/audio-provider";
import { cn } from "@/lib/utils";

type MessageRole = "user" | "assistant" | "system";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  done?: boolean;
}

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content: `Bonjour 👋 Je suis l'assistant IA d'Elie Tinah Ramanjakavelosoa. Posez-moi une question clé ou cliquez sur une suggestion pour explorer son profil en quelques secondes.`,
  done: true,
};

interface AIChatbotTerminalProps {
  open: boolean;
  onClose: () => void;
}

export function AIChatbotTerminal({ open, onClose }: AIChatbotTerminalProps) {
  const [messages, setMessages] = React.useState<Message[]>([WELCOME]);
  const [typing, setTyping] = React.useState(false);
  const [input, setInput] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { play } = useAudio();

  // Auto-scroll on new messages
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  // Welcome effect on open
  React.useEffect(() => {
    if (open) {
      play("open");
    }
  }, [open, play]);

  // Typewriter effect
  const typewriter = React.useCallback(
    (text: string, onDone?: () => void) => {
      setTyping(true);
      let i = 0;
      const messageId = Math.random().toString(36).slice(2);
      setMessages((prev) => [...prev, { id: messageId, role: "assistant", content: "", done: false }]);

      const interval = setInterval(
        () => {
          i += Math.max(1, Math.round(text.length / 120));
          const slice = text.slice(0, i);
          setMessages((prev) =>
            prev.map((m) => (m.id === messageId ? { ...m, content: slice } : m)),
          );

          if (i % 4 === 0) play("type");

          if (i >= text.length) {
            clearInterval(interval);
            setMessages((prev) =>
              prev.map((m) => (m.id === messageId ? { ...m, done: true } : m)),
            );
            setTyping(false);
            play("success");
            onDone?.();
          }
        },
        24,
      );
      return () => clearInterval(interval);
    },
    [play],
  );

  const handleAsk = React.useCallback(
    (rawQuestion: string) => {
      const question = rawQuestion.trim();
      if (!question || typing) return;

      // Find matching Q&A
      const match =
        AI_QA.find(
          (q) =>
            q.question.toLowerCase() === question.toLowerCase() ||
            q.id === question.toLowerCase(),
        ) ?? fuzzyMatch(question);

      const userMsg: Message = {
        id: Math.random().toString(36).slice(2),
        role: "user",
        content: question,
        done: true,
      };
      setMessages((prev) => [...prev, userMsg]);
      play("click");

      const response = match
        ? match.answer
        : `Je n'ai pas trouvé de réponse exacte à "${question}". Essayez une question clé ci-dessous ou contactez Elie directement à ${PROFILE.email} pour des infos personnalisées. 🚀`;

      // Simulate thinking delay
      const thinkingDelay = setTimeout(() => {
        typewriter(response);
      }, 400);

      return () => clearTimeout(thinkingDelay);
    },
    [typing, typewriter, play],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAsk(input);
    setInput("");
  };

  const handleReset = () => {
    play("toggle");
    setMessages([WELCOME]);
    setInput("");
    setTyping(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 p-0 backdrop-blur-md sm:items-center sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-cyan-500/30 bg-slate-950 shadow-2xl shadow-cyan-500/20 sm:h-[80vh] sm:rounded-2xl"
          >
            {/* Terminal header */}
            <div className="flex items-center justify-between border-b border-cyan-500/20 bg-slate-900/80 px-4 py-2.5 backdrop-blur">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <div className="ml-2 flex items-center gap-1.5 text-cyan-400">
                  <TerminalIcon className="h-4 w-4" />
                  <span className="font-mono text-xs font-medium">
                    elie@portfolio:~assistant
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-slate-400 hover:text-red-400"
                  onClick={handleReset}
                  aria-label="Réinitialiser la conversation"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-slate-400 hover:text-red-400"
                  onClick={() => {
                    play("toggle");
                    onClose();
                  }}
                  aria-label="Fermer le terminal"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Status bar */}
            <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-950/60 px-4 py-1.5 font-mono text-[10px] text-slate-500">
              <span className="inline-flex items-center gap-1">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                ONLINE
              </span>
              <span>·</span>
              <span className="text-cyan-500">model: elie-tinah-rag-v1</span>
              <span>·</span>
              <span>uptime: live</span>
              <span className="ml-auto hidden sm:inline">⚡ 0ms latency</span>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 font-mono text-[13px] leading-relaxed text-slate-200"
            >
              {messages.map((m) => (
                <MessageLine key={m.id} message={m} />
              ))}

              {typing && (
                <div className="mt-2 flex items-center gap-2 text-cyan-400/70">
                  <Bot className="h-3.5 w-3.5" />
                  <span className="text-xs">
                    <span className="blink">▊</span> thinking…
                  </span>
                </div>
              )}
            </div>

            {/* Suggested questions */}
            <div className="border-t border-slate-800 bg-slate-900/60 px-4 py-2">
              <div className="mb-2 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-500">
                <Sparkles className="h-3 w-3 text-cyan-500" />
                Suggestions rapides
              </div>
              <div className="flex flex-wrap gap-1.5">
                {AI_QA.slice(0, 5).map((qa) => (
                  <button
                    key={qa.id}
                    onClick={() => handleAsk(qa.question)}
                    onMouseEnter={() => play("hover")}
                    disabled={typing}
                    className="group flex items-center gap-1 rounded-md border border-cyan-500/20 bg-cyan-500/5 px-2 py-1 text-[11px] text-cyan-300 transition-all hover:border-cyan-500/40 hover:bg-cyan-500/10 disabled:opacity-40"
                  >
                    <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    {qa.short}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-cyan-500/20 bg-slate-900/80 px-3 py-2.5 backdrop-blur"
            >
              <span className="font-mono text-sm text-emerald-400">{">"}</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez une question sur Elie…"
                disabled={typing}
                className="flex-1 bg-transparent font-mono text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none disabled:opacity-50"
              />
              <Button
                type="submit"
                size="sm"
                disabled={typing || !input.trim()}
                className="bg-gradient-to-r from-cyan-500 to-violet-600 text-white hover:from-cyan-400 hover:to-violet-500"
              >
                <Send className="h-3.5 w-3.5" />
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MessageLine({ message }: { message: Message }) {
  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  if (isSystem) {
    return <div className="mb-2 text-xs text-slate-600">{message.content}</div>;
  }

  return (
    <div
      className={cn(
        "mb-3 flex items-start gap-2.5",
        isUser && "flex-row-reverse",
      )}
    >
      <div
        className={cn(
          "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md",
          isUser
            ? "bg-violet-500/15 text-violet-400"
            : "bg-cyan-500/15 text-cyan-400",
        )}
      >
        {isUser ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
      </div>
      <div
        className={cn(
          "max-w-[85%] rounded-lg px-3 py-2 text-[13px]",
          isUser
            ? "bg-violet-500/10 text-violet-100"
            : "bg-cyan-500/5 text-slate-100",
        )}
      >
        <p className="whitespace-pre-wrap">
          {message.content}
          {!message.done && <span className="blink ml-0.5 text-cyan-400">▊</span>}
        </p>
      </div>
    </div>
  );
}

function fuzzyMatch(question: string) {
  const q = question.toLowerCase();
  return AI_QA.find((item) => {
    const keywords = item.id.split("-").concat(item.short.toLowerCase().split(/\s+/));
    return keywords.some((kw) => kw.length > 3 && q.includes(kw));
  });
}
