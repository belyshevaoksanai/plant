'use client'

import React from 'react';

import { IPlant } from "@/lib/definitions";

import { Table as DataTable } from '../table';
import { tableConfig } from './table-config';
import { SelectedContext } from './context';
import { useArrayState } from '@/hooks/useArrayState';

export function WithCheckboxTable({ plants }: { plants: IPlant[] }) {
    const [selected, { clear, toggle }] = useArrayState<string>([]);

    return (
        <SelectedContext.Provider value={{ selected, onChangeCheckbox: toggle, onResetCheckboxes: clear }}>
            <div className="mt-6 flow-root">
                <div className="inline-block min-w-full align-middle">
                    <DataTable
                        data={plants}
                        config={tableConfig}
                        height="h-80"
                    />
                </div>
            </div>
        </SelectedContext.Provider>
    )
}
