'use client'

import React, { useState } from "react";
import Categories, { habits } from "./categories";
// import { setTimeout } from "timers/promises";
// import { clearTimeout } from "timers";

type FieldStatus = 0 | 1 | 2;

const Board: React.FC = () => {

    const [selectedCategory, setSelectedCategory] = useState<string>(habits[0].title);
    const [categoryFieldStatus, setCategoryFieldStatus] = useState<Record<string, FieldStatus[]>>(
        habits.reduce((acc, habit) => {
            acc[habit.title] = Array(28).fill(0);
            return acc;
        }, {} as Record<string, FieldStatus[]>)
    );
    const [clickCount, setClickCount] = useState(0);
    const clickTimeout = React.useRef<NodeJS.Timeout | null>(null);

    const handleCategoryClick = (category: string): void => {
        setSelectedCategory(category);
    };

    const handleSingleClick = (index: number): void => {
        const updatedStatus = [...categoryFieldStatus[selectedCategory]];
        updatedStatus[index] = 1;
        setCategoryFieldStatus({ ...categoryFieldStatus, [selectedCategory]: updatedStatus });
    }

    const handleDoubleClick = (index: number) : void => {
        const updatedStatus = [...categoryFieldStatus[selectedCategory]];
        updatedStatus[index] = 2; // when double click, field becomes green (after the first click) and then red. ?fix?
        setCategoryFieldStatus({ ...categoryFieldStatus, [selectedCategory]: updatedStatus });
    }

    const handleTrippleClick = (index: number) => {
        const updatedStatus = [...categoryFieldStatus[selectedCategory]];
        updatedStatus[index] = 0;
        setCategoryFieldStatus({ ...categoryFieldStatus, [selectedCategory]: updatedStatus })
    };

    const handleAllClicks = (index: number) => {
        setClickCount((prev) => prev + 1);

        if (clickTimeout.current) {
            clearTimeout(clickTimeout.current);
        }

        clickTimeout.current = setTimeout(() => {
            if (clickCount === 0) handleSingleClick(index);
            else if (clickCount === 1) handleDoubleClick(index);
            else if (clickCount === 2) handleTrippleClick(index);

            setClickCount(0);
        }, 200);
    }


    return (
        <>
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col place-items-start gap-4">
                <Categories 
                fieldStatus={categoryFieldStatus}
                selectedCategory={selectedCategory}
                onCategoryClick={handleCategoryClick}/>
                <div className="mt-4" style={{width: '938px'}}>
                    <div className="flex justify-center items-center">
                        <div className="grid grid-cols-7">
                            {categoryFieldStatus[selectedCategory].map((status, index) => (
                                <div key={index}
                                onClick={() => handleAllClicks(index)}
                                // onDoubleClick={() => handleDoubleClick(index)}
                                className={`border text-xl flex justify-center items-center select-none
                                ${status === 1 ?
                                    'bg-green-background text-green-txt border-green-background'
                                    : status === 2 ? 'bg-red-background text-red-txt border-red-background' 
                                    : 'border-default-color text-txt-color' }`} 
                                style={{ width: '134px', height: '134px'}}> 
                                {/* could define width and height in the tailwind.config.ts as, for example, w-34 h-34 */}
                                {index+1}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Board;