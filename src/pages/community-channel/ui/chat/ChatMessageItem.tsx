"use client";

import { MESSAGE_MAX_LENGTH, type Message } from "@/entities/message";
import { Avatar, Dropdown } from "@/shared/components";
import { cn, formatTimeShort } from "@/shared/utils";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface MessageAuthorView {
  displayName: string;
  avatarUrl?: string | null;
  isCommunityOwner: boolean;
}

interface ChatMessageItemProps {
  message: Message;
  author: MessageAuthorView;
  /** Первое сообщение в группе подряд идущих от одного автора */
  isGroupStart: boolean;
  canEdit: boolean;
  canDelete: boolean;
  onEdit: (content: string) => Promise<unknown>;
  onDelete: () => void;
}

export function ChatMessageItem({
  message,
  author,
  isGroupStart,
  canEdit,
  canDelete,
  onEdit,
  onDelete,
}: ChatMessageItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(message.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
    }
  }, [isEditing]);

  const startEditing = () => {
    setDraft(message.content);
    setIsEditing(true);
  };

  const saveEdit = async () => {
    const content = draft.trim();
    if (!content || content === message.content) {
      setIsEditing(false);
      return;
    }
    await onEdit(content);
    setIsEditing(false);
  };

  const actions = [
    ...(canEdit ? [{ icon: Pencil, label: "Редактировать", onClick: startEditing }] : []),
    ...(canDelete
      ? [{ icon: Trash2, label: "Удалить", onClick: onDelete, variant: "danger" as const }]
      : []),
  ];

  return (
    <div
      className={cn(
        "content-appear group relative flex gap-3 px-4 md:px-6 py-0.5 hover:bg-gray-50",
        isGroupStart && "mt-3"
      )}
    >
      <div className="w-10 shrink-0">
        {isGroupStart && <Avatar name={author.displayName} src={author.avatarUrl} size="m" />}
      </div>

      <div className="flex-1 min-w-0 pr-8 md:pr-0">
        {isGroupStart && (
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-ink">{author.displayName}</span>
            {author.isCommunityOwner && (
              <span className="text-xs font-medium text-primary-600">автор</span>
            )}
            <span className="text-[11px] font-mono text-gray-500">
              {formatTimeShort(message.createdAt)}
            </span>
          </div>
        )}

        {isEditing ? (
          <div className="mt-1 space-y-1">
            <textarea
              ref={textareaRef}
              value={draft}
              maxLength={MESSAGE_MAX_LENGTH}
              onChange={(event) => {
                setDraft(event.target.value);
                event.target.style.height = "auto";
                event.target.style.height = `${Math.min(event.target.scrollHeight, 160)}px`;
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  saveEdit();
                }
                if (event.key === "Escape") {
                  setIsEditing(false);
                }
              }}
              className="w-full resize-none rounded-[10px] bg-surface px-3 py-2 text-base text-ink inset-ring inset-ring-gray-200 focus:outline-none focus:inset-ring-2 focus:inset-ring-primary-500"
            />
            <p className="text-xs text-gray-500">Enter — сохранить · Esc — отменить</p>
          </div>
        ) : (
          <p className="text-sm text-gray-800 leading-[1.45] whitespace-pre-wrap break-words">
            {message.content}
            {message.editedAt && (
              <span className="ml-1.5 text-[11px] text-gray-500">(изменено)</span>
            )}
          </p>
        )}
      </div>

      {/* На таче hover нет — кнопка видна всегда */}
      {actions.length > 0 && !isEditing && (
        <div className="absolute right-4 md:right-6 -top-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <Dropdown
            trigger={
              <button
                type="button"
                aria-label="Действия с сообщением"
                className="touch-hit size-7 flex items-center justify-center rounded-lg bg-surface border border-gray-200 shadow-sm text-gray-500 hover:text-ink cursor-pointer"
              >
                <MoreHorizontal className="size-4" />
              </button>
            }
            items={actions}
            align="end"
          />
        </div>
      )}
    </div>
  );
}
