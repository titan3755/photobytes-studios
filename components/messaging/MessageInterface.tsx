'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { type User, type Message } from '@prisma/client';
import { type Session } from 'next-auth';
import {
  sendMessage,
  markMessagesAsRead,
} from '@/app/actions/messageActions';
import { Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

// Define the shape of the message prop
type MessageWithSender = Message & {
  sender: Pick<User, 'id' | 'name' | 'image' | 'role'>;
};

interface MessageInterfaceProps {
  orderId: string;
  messages: MessageWithSender[];
  currentUser: Session['user'];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function MessageInterface({
  orderId,
  messages,
  currentUser,
}: MessageInterfaceProps) {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // On load, scroll to bottom and mark messages as read
  useEffect(() => {
    scrollToBottom();
    // Mark messages as read on component mount
    markMessagesAsRead(orderId);
  }, [orderId, messages]); // Rerun if messages change

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await sendMessage(orderId, formData);
      if (result.success) {
        formRef.current?.reset();
      } else {
        toast.error(result.message || 'Failed to send message.');
      }
    });
  };

  return (
    <div className="flex h-[calc(100vh-200px)] flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      {/* --- Message List --- */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => {
          const isSender = message.senderId === currentUser.id;
          return (
            <div
              key={message.id}
              className={classNames(
                'flex items-end gap-3',
                isSender ? 'justify-end' : 'justify-start',
              )}
            >
              {/* Avatar (Show if not sender) */}
              {!isSender && (
                <Image
                  src={message.sender.image || '/default-avatar.png'} // You'll need a default avatar
                  alt={message.sender.name || 'Avatar'}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              {/* Message Bubble */}
              <div
                className={classNames(
                  'max-w-xs md:max-w-md lg:max-w-lg rounded-xl px-4 py-3 shadow',
                  isSender
                    ? 'bg-rose-600 text-white rounded-br-none'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none',
                )}
              >
                <p className="text-sm">{message.content}</p>
                <p
                  className={classNames(
                    'mt-1 text-xs',
                    isSender
                      ? 'text-rose-100/70'
                      : 'text-gray-500 dark:text-gray-400',
                  )}
                >
                  {new Date(message.createdAt).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* --- Message Input Form --- */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-b-lg">
        <form ref={formRef} action={handleSubmit} className="flex items-center gap-3">
          <input
            type="text"
            name="message"
            autoComplete="off"
            required
            disabled={isPending}
            className="flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-rose-600 text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-50"
          >
            <span className="sr-only">Send</span>
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}