import { IPlant } from "@/lib/definitions";
import { createContext } from "react";

// Контекст выделенных строк таблицы Plant
// selected - выбранные на данный момент элементы
// onChangeCheckbox - изменить значение чекбокса
// onResetCheckboxes - сбросить все выбранные элементы
export const SelectedContext = createContext<{
    selected: string[],
    onChangeCheckbox: (_c: string) => void,
    onResetCheckboxes: () => void
}>({
    selected: [],
    onChangeCheckbox: () => { },
    onResetCheckboxes: () => { },
});
