import { useEffect, useState } from "react";

// Define the props type
interface TypingTextProps {
  text: string;
  speed?: number; // optional
}

export default function TypingText({ text, speed = 20 }: TypingTextProps) {
  const [displayed, setDisplayed] = useState<string>("");
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (index >= text.length) return; // stop when done

    const handle = setTimeout(() => {
      setDisplayed(text.slice(0, index + 1));
      setIndex(index + 1);
    }, speed);

    return () => clearTimeout(handle);
  }, [index, text, speed]);

  return (
    <p className="mt-6 text-white/90 text-xl sm:text-lg max-w-md whitespace-pre-wrap font-body">
      {displayed}
      {index < text.length && (
        <span className="inline-block ml-1 h-6 w-1 bg-white animate-blink" />
      )}
    </p>
  );
}
