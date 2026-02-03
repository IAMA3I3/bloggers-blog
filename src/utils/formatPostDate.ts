/**
 * Formats a date for blog posts with relative time for recent posts
 * and formatted date for older posts
 * 
 * @param date - The date to format
 * @returns Formatted date string
 * 
 * Examples:
 * - "Just now" (< 1 min)
 * - "5 mins ago"
 * - "3 hours ago"
 * - "2 days ago"
 * - "1st Jan, 2026" (> 7 days)
 */
export function formatPostDate(date: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    // Less than 1 minute
    if (diffInMinutes < 1) {
        return "Just now";
    }

    // Less than 1 hour
    if (diffInMinutes < 60) {
        return `${diffInMinutes} ${diffInMinutes === 1 ? 'min' : 'mins'} ago`;
    }

    // Less than 24 hours
    if (diffInHours < 24) {
        return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    }

    // Less than 7 days
    if (diffInDays < 7) {
        return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    }

    // 7 days or more - show formatted date
    return formatLongDate(date);
}

/**
 * Formats a date as "1st Jan, 2026"
 */
function formatLongDate(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();

    // Get ordinal suffix (st, nd, rd, th)
    const suffix = getOrdinalSuffix(day);

    return `${day}${suffix} ${month}, ${year}`;
}

/**
 * Returns the ordinal suffix for a number (st, nd, rd, th)
 */
function getOrdinalSuffix(day: number): string {
    if (day > 3 && day < 21) return 'th'; // 11th, 12th, 13th, etc.
    
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}