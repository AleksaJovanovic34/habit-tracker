'use client'

import { BookOpen, Dumbbell, Footprints } from 'lucide-react'
import React from 'react';

export const habits = [
    {title: 'read', icon: BookOpen},
    {title: 'workout', icon: Dumbbell},
    {title: 'walk', icon: Footprints}
]

type CategoriesProps = {
    fieldStatus : Record<string, number[]>;
    selectedCategory : string;
    onCategoryClick: (category: string) => void;
};

const Categories: React.FC<CategoriesProps> = ({fieldStatus, selectedCategory, onCategoryClick}) => {
    
    return (
        <>
        <div className='flex justify-center gap-10'>
        <div className="inline-flex">
            <div className="grid grid-cols-3">
                {habits.map((habit) => (
                    <div key ={habit.title} 
                    onClick={() => onCategoryClick(habit.title)}
                    className={`border 
                        ${habit.title === selectedCategory
                            ? 'border-white' 
                            : 'border-default-color'
                        }`} 
                    style={{ width: '134px', height: '134px' }}>
                        <div className='flex gap-2 relative left-2 top-2'>
                            <habit.icon className={`w-5 h-5 
                                ${habit.title === selectedCategory
                                    ? 'text-white'
                                    : 'text-txt-color'
                                }`}/>
                            <span className={`text-sm 
                                ${habit.title === selectedCategory
                                    ? 'text-white' 
                                    : 'text-txt-color'
                                }`}>
                                {habit.title}
                            </span>
                        </div>
                        <div className="grid grid-cols-7 mt-6 mx-1">
                            {fieldStatus[habit.title].map((status, i) => (
                            <div key={i} className={`w-4 h-4 rounded-full mt-1 transition-all duration-200 ease-in-out ${
                                status===1
                                ? 'bg-green-txt'
                                : status === 2 
                                ? 'bg-red-txt' 
                                : 'bg-dot-color'
                            }`}>    
                            </div>
                         ))}
                        </div>
                    </div>
                ))}
            </div>  
        </div>
        <div className='relative ml-10 left-10 top-8 flex flex-col gap-3'>
            <h1 className='text-white text-3xl'>minimalist habit tracker</h1>
            <p className='text-txt-color text-l'>experience the power of compounding habits</p>
        </div>
        </div>
        </>
    )
}

export default Categories;