'use client'

import Board from "./ui/board"

export default function Page() {
  
  return (
    <div className="relative flex flex-col min-h-screen">
      <div className="flex justify-center items-center flex-grow h-24">
        <h1 className="text-white text-xl left-10 top-2">minimalist habit tracker</h1>
      </div>
      <Board/>
      </div>
  )
}
