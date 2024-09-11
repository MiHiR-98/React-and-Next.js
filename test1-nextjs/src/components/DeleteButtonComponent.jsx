'use client'

export function DeleteButtonComponent() {
  return (
    <>
      <button
        type="button"
        className="text-xs bg-black px-1 absolute right-0 top-0 hover:bg-red-600 outline-none"
        onClick={() => setIsDialogOpen(true)}
      >
        X
      </button>
    </>
  )
}
