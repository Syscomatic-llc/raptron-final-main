import { useState, useEffect } from "react";

export function useLoadingMessage(
  messages: string[],
  isSubmitting: boolean,
  intervalMs = 2000,
) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isSubmitting) {
      setIndex(0);
      return;
    }

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isSubmitting, messages.length, intervalMs]);

  return messages[index] || "Loading...";
}
