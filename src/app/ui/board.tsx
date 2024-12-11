"use client"
import React, { useEffect, useState } from "react";
import Categories, { habits } from "./categories";

type FieldStatus = 0 | 1 | 2;

const initialState = (): Record<string, FieldStatus[]> =>
    habits.reduce((acc, habit) => {
        acc[habit.title] = Array(28).fill(0);
        return acc;
    }, {} as Record<string, FieldStatus[]>);

const loadState = (): Record<string, FieldStatus[]> => {
    const savedState = localStorage.getItem("habitTrackerState");
    if (savedState) {
        return JSON.parse(savedState);
    }
    return initialState();
};

const loadSelectedCategory = (): string => {
    const savedCategory = localStorage.getItem("selectedCategory");
    return savedCategory || habits[0].title;
};

const Board: React.FC = () => {
    const [isHydrated, setIsHydrated] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>(loadSelectedCategory);
    const [categoryFieldStatus, setCategoryFieldStatus] = useState<Record<string, FieldStatus[]>>(loadState);

    useEffect(() => {
        setIsHydrated(true);
        setSelectedCategory(loadSelectedCategory());
        setCategoryFieldStatus(loadState());
    }, []);

    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem("habitTrackerState", JSON.stringify(categoryFieldStatus));
        }
    }, [categoryFieldStatus, isHydrated]);

    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem("selectedCategory", selectedCategory);
        }
    }, [selectedCategory, isHydrated]);

    const handleCategoryClick = (category: string): void => {
        setSelectedCategory(category);
    };

    const updateFieldStatus = (index: number, status: FieldStatus): void => {
        const updatedStatus = [...categoryFieldStatus[selectedCategory]];
        updatedStatus[index] = status;
        setCategoryFieldStatus({ ...categoryFieldStatus, [selectedCategory]: updatedStatus });
    }

    const handleAllClicks = (index: number, event: React.MouseEvent<HTMLDivElement>) => {
        if (event.altKey) updateFieldStatus(index, 2);
        else {
            if (event.detail === 1) updateFieldStatus(index, 1);
            else if (event.detail === 2) updateFieldStatus(index, 2);
            else if (event.detail === 3) updateFieldStatus(index, 0);
        }
    }

    const handleReset = () => {
        setCategoryFieldStatus(initialState());
        localStorage.removeItem('habitTrackerState');
        localStorage.removeItem('selectedCategory');
    }
    
    if (!isHydrated) {
        return <div className="hidden"></div>;
    }

    return (
        <>
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col place-items-start gap-4">
                <Categories 
                fieldStatus={categoryFieldStatus}
                selectedCategory={selectedCategory}
                onCategoryClick={handleCategoryClick}
                onReset={handleReset}/>
                <div className="mt-4" style={{width: '938px'}}>
                    <div className="flex justify-center items-center">
                        <div className="grid grid-cols-7 border-l border-t border-default-color">
                            {categoryFieldStatus[selectedCategory]?.map((status, index) => (
                                <div key={index}
                                onClick={(e) => handleAllClicks(index, e)}
                                // onDoubleClick={() => handleDoubleClick(index)}
                                className={`border-b border-default-color border-r text-xl flex justify-center items-center select-none
                                ${status === 1 ?
                                    'bg-green-background text-green-txt'
                                    : status === 2 ? 'bg-red-background text-red-txt' 
                                    : 'text-txt-color' }`} 
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