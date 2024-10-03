import { IPlant } from "@/lib/definitions";
import { createContext } from "react";

// Контекст выделенных строк таблицы Plant
export const SelectedContext = createContext<{
    selected: string[],
    onChangeCheckbox: (_c: IPlant) => void,
    onResetCheckboxes: () => void
}>({
    selected: [],
    onChangeCheckbox: () => { },
    onResetCheckboxes: () => { },
});
