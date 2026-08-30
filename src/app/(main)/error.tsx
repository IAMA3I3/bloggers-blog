"use client"

import { Button } from "@/components/ui/Button"
import { IoMdRefresh } from "react-icons/io"

// Scoped to the (main) route group so it renders inside the existing layout
// (nav/footer stay mounted) instead of falling through to global-error.tsx,
// which replaces the entire page. Shows a generic message rather than
// error.message since this boundary is reachable by anonymous visitors.
export default function ErrorBoundary({ reset }: { error: Error & { digest?: string }, reset: () => void }) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-24">
            <div className="text-2xl font-thin text-red-500">Something went wrong</div>
            <p className="text-muted max-w-md">
                We couldn&apos;t load this page. Please try again in a moment.
            </p>
            <Button text="Try again" icon={IoMdRefresh} variant="secondary" outlined onClick={reset} />
        </div>
    )
}
