"use client"

import React, { useReducer } from 'react';

interface CounterProps {
    label: string;
    onChangeCount: (count: number) => void;
}

type Action = { type: 'increment' } | { type: 'decrement' };

function reducer(state: number, action: Action): number {
    switch (action.type) {
        case 'increment':
            return state + 1;
        case 'decrement':
            return state - 1 >= 0 ? state - 1 : state;
        default:
            throw new Error('Unexpected action');
    }
}

function Counter({ label, onChangeCount }: CounterProps) {
    const [count, dispatch] = useReducer(reducer, 0);

    const handleChangeCount = (newCount: number) => {
        onChangeCount(newCount);
    };

    return (
        <div className="flex items-center justify-center md:justify-start space-x-2">
            <button 
                className="px-4 py-2 bg-brand-primary text-white rounded-lg"
                onClick={() => {
                    dispatch({ type: 'decrement' });
                    handleChangeCount(count - 1);
                }}
                type="button"
            >
                -
            </button>
            <span className="text-lg md:w-24 text-center">{label}: {count}</span>
            <button 
                className="px-4 py-2 bg-brand-primary text-white rounded-lg"
                onClick={() => {
                    dispatch({ type: 'increment' });
                    handleChangeCount(count + 1);
                }}
                type="button"
            >
                +
            </button>
        </div>
    );
}

export default Counter;
