// ------------ Line Classifier (JavaScript syntax) ------------
import { useCallback } from "react";

export const useLineClassifier = () => {
  const classify = useCallback((line) => {
    const trimmed = line.trim();
    if (trimmed === "") return "blank";
    if (trimmed.startsWith("//")) return "comment";
    return "code";
  }, []);
  return { classify };
};
