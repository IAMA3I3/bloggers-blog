import { useEffect, useState } from "react"

export const useCountUp = (target: number, duration: number = 1500, enabled: boolean = true) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!enabled) return

        setCount(0)
        const steps = 60
        const stepDuration = duration / steps
        const increment = target / steps
        let current = 0

        const timer = setInterval(() => {
            current += increment
            if (current >= target) {
                setCount(target)
                clearInterval(timer)
            } else {
                setCount(Math.floor(current))
            }
        }, stepDuration)

        return () => clearInterval(timer)
    }, [target, duration, enabled])

    return count
}