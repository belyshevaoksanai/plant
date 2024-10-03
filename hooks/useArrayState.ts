import { useState } from "react";

// Хук для управления состояния массива
export const useArrayState = <T>(initialState: T[] = []): [T[], {
    add: (_item: T) => void, remove: (_item: T) => void, clear: () => void
},] => {
    const [state, setState] = useState(initialState);

    const add = (el: T) => {
        setState(s => [...s, el]);
    }

    const remove = (el: T) => {
        setState(s => s.filter((item) => el !== item));
    }

    const clear = () => {
        setState([]);
    }

    return [state, { add, remove, clear }]
}