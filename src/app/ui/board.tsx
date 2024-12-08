'use client'

import React, { useState } from "react";
import Categories, { habits } from "./categories";

type FieldStatus = 0 | 1 | 2;

// export const habitData: number[] = Array.from({ length: 28 }, (_, index) => index + 1 );

const Board: React.FC = () => {

    const [selectedCategory, setSelectedCategory] = useState<string>(habits[0].title);

    const [categoryFieldStatus, setCategoryFieldStatus] = useState<Record<string, FieldStatus[]>>(
        habits.reduce((acc, habit) => {
            acc[habit.title] = Array(28).fill(0);
            return acc;
        }, {} as Record<string, FieldStatus[]>)
    );

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    }

    const handleSingleClick = (index: number): void => {
        const updatedStatus = [...categoryFieldStatus[selectedCategory]];
        updatedStatus[index] = 1;
        setCategoryFieldStatus({ ...categoryFieldStatus, [selectedCategory]: updatedStatus });
    }

    const handleDoubleClick = (index: number) : void => {
        const updatedStatus = [...categoryFieldStatus[selectedCategory]];
        updatedStatus[index] = 2; // when double click, field becomes green (after the first click) and then red. ?fix?
        setCategoryFieldStatus({ ...categoryFieldStatus, [selectedCategory]: updatedStatus })
    }

    return (
        <>
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col place-items-start gap-4" style={{width: '938px'}}>
                <Categories 
                fieldStatus={categoryFieldStatus}
                selectedCategory={selectedCategory}
                onCategoryClick={handleCategoryClick}/>

                <div className="mt-4">
                    <div className="flex justify-center items-center">
                        <div className="grid grid-cols-7">
                            {categoryFieldStatus[selectedCategory].map((status, index) => (
                                <div key={index}
                                onClick={() => handleSingleClick(index)}
                                onDoubleClick={() => handleDoubleClick(index)}
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