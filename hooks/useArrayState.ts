import { useState } from "react";

// Хук для управления состояния массива
// return: state - текущее состояние массива
//         add - метод для добавления в массив элемента
//         remove - метод для удаления из массива
//         toggle - если элемента нет в массиве, то добавится, иначе удалится
//         clear - очищение массива
export const useArrayState = <T>(initialState: T[] = []): [T[], {
    add: (_item: T) => void,
    remove: (_item: T) => void,
    toggle: (_item: T) => void,
    clear: () => void
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

    const toggle = (el: T) => {
        if (state.includes(el)) {
            remove(el)
        } else {
            add(el);
        }
    }

    return [state, { add, remove, toggle, clear }]
}
