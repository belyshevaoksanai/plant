import { createContext } from "react";

// Контекст выделенных строк таблицы Plant
export const SelectedContext = createContext<string[]>([]);
