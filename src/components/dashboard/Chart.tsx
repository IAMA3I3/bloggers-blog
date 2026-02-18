"use client"

import { useStateContext } from "@/context/StateContext";
import { BasicCard } from "../containers/Cards";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { mockPosts } from "@/temp/postsData";

function getGroupingStrategy(posts: typeof mockPosts) {
    if (posts.length === 0) return "day";

    const dates = posts.map(p => new Date(p.createdAt).getTime());
    const minDate = Math.min(...dates);
    const maxDate = Math.max(...dates);
    const diffDays = (maxDate - minDate) / (1000 * 60 * 60 * 24);

    if (diffDays <= 60) return "day";
    if (diffDays <= 365) return "week";
    return "month";
}

function getGroupKey(date: Date, strategy: "day" | "week" | "month"): string {
    if (strategy === "month") {
        return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    }

    if (strategy === "week") {
        // Get the Monday of the week
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        d.setDate(diff);
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }

    // day
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function getSortKey(date: Date, strategy: "day" | "week" | "month"): number {
    if (strategy === "month") {
        return new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    }

    if (strategy === "week") {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        d.setDate(diff);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
    }

    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

export default function Chart() {
    const { isDarkTheme } = useStateContext();
    const posts = mockPosts;

    const strategy = getGroupingStrategy(posts);

    const grouped = posts.reduce<Record<string, { label: string; sortKey: number; count: number }>>(
        (acc, post) => {
            const date = new Date(post.createdAt);
            const label = getGroupKey(date, strategy);
            const sortKey = getSortKey(date, strategy);

            if (!acc[label]) {
                acc[label] = { label, sortKey, count: 0 };
            }
            acc[label].count += 1;
            return acc;
        },
        {}
    );

    const chartData = Object.values(grouped)
        .sort((a, b) => a.sortKey - b.sortKey)
        .map(({ label, count }) => ({ name: label, posts: count }));

    const strategyLabel =
        strategy === "day" ? "Daily" : strategy === "week" ? "Weekly" : "Monthly";

    const axisColor = isDarkTheme ? "#e3e3e3" : "#666666";

    return (
        <BasicCard noBackground>
                <h3 className="text-base sm:text-lg font-semibold mb-1">
                    Posts
                </h3>
                <p className="text-xs sm:text-sm text-muted mb-4">
                    {strategyLabel} posts tracking
                </p>

                <div className="h-64 sm:h-72 md:h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                        <LineChart
                            data={chartData}
                            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke={axisColor} />
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 12, fill: axisColor }}
                                tickLine={{ stroke: axisColor }}
                                axisLine={{ stroke: axisColor }}
                            />
                            <YAxis
                                allowDecimals={false}
                                tick={{ fontSize: 12, fill: axisColor }}
                                tickLine={{ stroke: axisColor }}
                                axisLine={{ stroke: axisColor }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: isDarkTheme ? "#2d2d2d" : "white",
                                    border: `1px solid ${isDarkTheme ? "#666666" : "#e3e3e3"}`,
                                    borderRadius: "8px",
                                    fontSize: "12px",
                                }}
                                labelStyle={{ fontWeight: "bold", marginBottom: "4px" }}
                            />
                            <Line
                                type="monotone"
                                dataKey="posts"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                dot={{ fill: "#3b82f6", r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
        </BasicCard>
    );
}