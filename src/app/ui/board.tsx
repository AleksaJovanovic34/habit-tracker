import React, { useEffect, useState } from "react";
import Categories, { habits } from "./categories";

type FieldStatus = 0 | 1 | 2;

const initialState = (): Record<string, FieldStatus[]> =>
    habits.reduce((acc, habit) => {
        acc[habit.title] = Array(28).fill(0);
        return acc;
    }, {} as Record<string, FieldStatus[]>);

const loadState = (): Record<string, FieldStatus[]> => {
    if (typeof window !== 'undefined') {
        const savedState = localStorage.getItem('habitTrackerState');
        if (savedState) {
            return JSON.parse(savedState);
        }
    }
    return initialState();
};

const loadSelectedCategory = (): string => {
    if (typeof window !== "undefined") {
        const savedCategory = localStorage.getItem("selectedCategory");
        return savedCategory || habits[0].title;
    }
    return habits[0].title;
};

const Board: React.FC = () => {
    const [isHydrated, setIsHydrated] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>(loadSelectedCategory());
    const [categoryFieldStatus, setCategoryFieldStatus] = useState<Record<string, FieldStatus[]>>(loadState());

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

    const handleClicks = (index: number, event: React.MouseEvent<HTMLDivElement>): void => {
       const updatedStatus = [...categoryFieldStatus[selectedCategory]];

       if(event.altKey) updatedStatus[index] = 2;
       else updatedStatus[index] = ((updatedStatus[index] + 1) % 3) as FieldStatus;

       setCategoryFieldStatus({ ...categoryFieldStatus, [selectedCategory]: updatedStatus });
    }

    const handleReset = () => {
        setCategoryFieldStatus(initialState());
        localStorage.removeItem('habitTrackerState');
        localStorage.removeItem('selectedCategory');
    }
    
    if (!isHydrated) {
        return <div className="min-h-screen bg-black"></div>;
    }

    return (
        <>
        <div className="relative flex flex-col justify-center items-center min-h-screen pb-5 pt-5">
            <div className="flex flex-col place-items-start gap-4">
            <div className="w-full flex justify-start h-14 flex-col mb-5">
                <h1 className="text-white text-3xl">minimalist habit tracker</h1>
                <p className="text-txt-color">experience the power of compounding tasks</p>
            </div>
                <Categories 
                fieldStatus={categoryFieldStatus}
                selectedCategory={selectedCategory}
                onCategoryClick={handleCategoryClick}
                onReset={handleReset}/>
                <div className="mt-4" style={{width: '938px'}}>
                    <div className="flex justify-center items-center">
                        <div className="grid grid-cols-7 border-l border-t border-default-color cursor-pointer">
                            {categoryFieldStatus[selectedCategory]?.map((status, index) => (
                                <div key={index}
                                onClick={(e) => handleClicks(index, e)}
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
            <div className="absolute bottom-5 right-5 text-gray-500 select-none">by {' '} 
                <a href="https://github.com/AleksaJovanovic34/habit-tracker" className="text-txt-color hover:text-white" target="_blank">
                Aleksa</a>
            </div>
        </div>
        </>
    )
}

export default Board;