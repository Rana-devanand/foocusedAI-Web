import { useState, useEffect } from "react";

interface TypewriterOptions {
  typingSpeed?: number;
  erasingSpeed?: number;
  pauseDuration?: number;
  smoothness?: boolean; // New option for random variance
}

export function useTypewriter(
  words: string[],
  {
    typingSpeed = 150,
    erasingSpeed = 100,
    pauseDuration = 2000,
    smoothness = true,
  }: TypewriterOptions = {},
) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && subIndex === 0) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    if (!isDeleting && subIndex === words[index].length) {
      setIsPaused(true);
      return;
    }

    // Add random variance for human-like typing
    const variance = smoothness && !isDeleting ? Math.random() * 100 - 50 : 0;
    const speed = isDeleting ? erasingSpeed : typingSpeed + variance;

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
      },
      Math.max(30, speed), // Ensure speed doesn't go too low
    );

    return () => clearTimeout(timeout);
  }, [
    subIndex,
    index,
    isDeleting,
    isPaused,
    words,
    typingSpeed,
    erasingSpeed,
    pauseDuration,
    smoothness,
  ]);

  return words[index].substring(0, subIndex);
}
