"use client";

import { MESSAGE_MAX_LENGTH } from "@/entities/message";
import { cn } from "@/shared/utils";
import { PaperAirplaneRightBold20 } from "@frosted-ui/icons";
import { useRef, useState } from "react";

const COUNTER_THRESHOLD = MESSAGE_MAX_LENGTH - 200;

interface ChatComposerProps {
  channelName: string;
  onSend: (content: string) => Promise<unknown>;
  isSending: boolean;
}

export function ChatComposer({ channelName, onSend, isSending }: ChatComposerProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const canSend = value.trim().length > 0 && !isSending;

  const autoGrow = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  const handleSend = async () => {
    const content = value.trim();
    if (!content || isSending) return;

    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      await onSend(content);
    } catch {
      // Ошибка показана тостом в мутации — возвращаем текст, чтобы не потерять
      setValue(content);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="shrink-0 px-3 md:px-6 pb-safe-3 md:pb-4 pt-2">
      <div className="relative flex items-end gap-3 px-3.5 py-2.5 rounded-[12px] bg-gray-100 inset-ring inset-ring-gray-200 focus-within:inset-ring-2 focus-within:inset-ring-primary-500 transition-shadow">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            autoGrow();
          }}
          onKeyDown={handleKeyDown}
          placeholder={`Написать в #${channelName}…`}
          maxLength={MESSAGE_MAX_LENGTH}
          rows={1}
          className="flex-1 resize-none bg-transparent text-base text-ink placeholder:text-gray-500 focus:outline-none leading-[1.45] max-h-[120px]"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend}
          aria-label="Отправить"
          className={cn(
            "shrink-0 pb-0.5 touch-hit transition-[color,transform,opacity] duration-150 ease-out-quart cursor-pointer",
            canSend
              ? "text-primary-600 hover:text-primary-500 active:scale-90"
              : "text-gray-400 opacity-70 cursor-default"
          )}
        >
          <PaperAirplaneRightBold20 className="size-5" />
        </button>
      </div>

      {value.length >= COUNTER_THRESHOLD && (
        <p className="mt-1 text-right text-xs font-mono text-gray-500 animate-in fade-in duration-200">
          {value.length} / {MESSAGE_MAX_LENGTH}
        </p>
      )}
    </div>
  );
}
