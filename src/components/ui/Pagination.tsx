"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"

type PaginationProps = {
    totalPages: number
    currentPage: number
    setCurrentPage: (page: number) => void
    onPageChange?: () => void
}

export default function Pagination({ totalPages, currentPage, setCurrentPage, onPageChange = () => { } }: PaginationProps) {

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)

        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        const maxVisible = isMobile ? 3 : 5 // Show fewer pages on mobile

        if (totalPages <= maxVisible + 2) {
            // Show all pages if total is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // Always show first page
            pages.push(1)

            if (isMobile) {
                // Mobile: show 1, ..., current, ..., last (or variations)
                if (currentPage <= 2) {
                    pages.push(2)
                    pages.push('ellipsis-end')
                } else if (currentPage >= totalPages - 1) {
                    pages.push('ellipsis-start')
                    pages.push(totalPages - 1)
                } else {
                    pages.push('ellipsis-start')
                    pages.push(currentPage)
                    pages.push('ellipsis-end')
                }
                pages.push(totalPages)
            } else {
                // Desktop: show more pages
                if (currentPage <= 3) {
                    for (let i = 2; i <= 4; i++) {
                        pages.push(i)
                    }
                    pages.push('ellipsis-end')
                    pages.push(totalPages)
                } else if (currentPage >= totalPages - 2) {
                    pages.push('ellipsis-start')
                    for (let i = totalPages - 3; i <= totalPages - 1; i++) {
                        pages.push(i)
                    }
                    pages.push(totalPages)
                } else {
                    pages.push('ellipsis-start')
                    pages.push(currentPage - 1)
                    pages.push(currentPage)
                    pages.push(currentPage + 1)
                    pages.push('ellipsis-end')
                    pages.push(totalPages)
                }
            }
        }
        return pages
    }

    const pageNumbers = getPageNumbers()

    return (
        <div className="mt-20 flex items-center justify-center gap-1 md:gap-2">
            <button
                disabled={currentPage === 1}
                onClick={() => {
                    setCurrentPage(currentPage - 1)
                    onPageChange()
                }}
                className="rounded-full border border-border dark:border-gray-500 px-3 py-2 text-sm text-muted disabled:opacity-40 md:px-4 hover:border-primary hover:text-primary disabled:pointer-events-none"
            >
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
            </button>

            {pageNumbers.map((page, i) => {
                if (typeof page === 'string') {
                    // Render ellipsis
                    return (
                        <span
                            key={page}
                            className="flex h-8 w-8 items-center justify-center text-muted md:h-10 md:w-10"
                        >
                            ...
                        </span>
                    )
                }

                return (
                    <button
                        key={page}
                        onClick={() => {
                            setCurrentPage(page)
                            onPageChange()
                        }}
                        className={`h-8 w-8 rounded-full text-sm transition md:h-10 md:w-10
                                ${currentPage === page
                                ? "bg-primary text-white"
                                : "border border-border dark:border-gray-500 text-muted hover:border-primary hover:text-primary"
                            }
                            `}
                    >
                        {page}
                    </button>
                )
            })}

            <button
                disabled={currentPage === totalPages}
                onClick={() => {
                    setCurrentPage(currentPage + 1)
                    onPageChange()
                }}
                className="rounded-full border border-border dark:border-gray-500 px-3 py-2 text-sm text-muted disabled:opacity-40 md:px-4 hover:border-primary hover:text-primary disabled:pointer-events-none"
            >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
            </button>
        </div>
    )
}