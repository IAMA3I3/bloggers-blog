import { Post } from "@/types/post";

export const posts: Post[] = [
    {
        _id: "1",
        title: "Getting Started with Modern React Development",
        content:
            "React has evolved significantly over the years, and modern React development focuses heavily on functional components and hooks. In this article, we explore how hooks like useState, useEffect, and useContext simplify state management and side effects. We’ll also look at common patterns, performance tips, and how to structure your components for scalability.",
        userId: "user_1",
        category: "web-development",
        featured: true,
        media: [
            {
                url: "https://picsum.photos/800/500?random=1",
                type: "image",
                filename: "react-cover.jpg",
                size: 245678,
                uploadedAt: new Date("2024-10-12T09:15:00"),
            },
            {
                url: "https://picsum.photos/800/500?random=2",
                type: "image",
                filename: "react-hooks.jpg",
                size: 198234,
                uploadedAt: new Date("2024-10-12T09:18:00"),
            },
        ],
        createdAt: new Date("2024-10-10T14:30:00"),
        updatedAt: new Date("2024-10-11T10:45:00"),
    },
    {
        _id: "2",
        title: "How to Stay Productive in a Distracted World",
        content:
            "Productivity is no longer just about working harder—it’s about working smarter. With constant notifications and digital noise, maintaining focus has become a skill. This post breaks down practical techniques such as time blocking, deep work sessions, and intentional breaks to help you regain control of your time.",
        userId: "user_2",
        category: "productivity",
        featured: false,
        media: [
            {
                url: "https://picsum.photos/800/500?random=3",
                type: "image",
                filename: "focus.jpg",
                size: 312456,
                uploadedAt: new Date("2024-09-05T11:00:00"),
            },
        ],
        createdAt: new Date("2024-09-04T08:20:00"),
        updatedAt: new Date("2024-09-06T16:10:00"),
    },
    {
        _id: "3",
        title: "Understanding Clean Architecture",
        content:
            "Clean Architecture is about separating concerns and protecting business logic from external dependencies. In this article, we explore the core principles behind Clean Architecture, its layers, and how it helps teams build maintainable and testable applications over time.",
        userId: "user_3",
        category: "architecture",
        featured: true,
        media: [
            {
                url: "https://picsum.photos/800/500?random=4",
                type: "image",
                filename: "architecture-diagram.jpg",
                size: 421345,
                uploadedAt: new Date("2024-08-18T13:40:00"),
            },
        ],
        createdAt: new Date("2024-08-17T09:00:00"),
        updatedAt: new Date("2024-08-20T17:25:00"),
    },
    {
        _id: "4",
        title: "Why TypeScript Improves Developer Confidence",
        content:
            "TypeScript adds static typing to JavaScript, making it easier to catch errors early and improve collaboration across teams. This post explains how TypeScript enhances readability, refactoring confidence, and long-term project stability.",
        userId: "user_1",
        category: "web-development",
        featured: false,
        media: [],
        createdAt: new Date("2024-07-02T10:10:00"),
        updatedAt: new Date("2024-07-03T12:00:00"),
    },
    {
        _id: "5",
        title: "Morning Habits That Boost Daily Output",
        content:
            "Your morning routine sets the tone for the rest of the day. From intentional planning to avoiding early distractions, we examine habits that help professionals start their day with clarity and momentum.",
        userId: "user_4",
        category: "productivity",
        featured: true,
        media: [
            {
                url: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
                type: "video",
                filename: "morning-routine.mp4",
                size: 12567890,
                uploadedAt: new Date("2024-06-10T07:30:00"),
            },
        ],
        createdAt: new Date("2024-06-09T18:45:00"),
        updatedAt: new Date("2024-06-10T09:00:00"),
    },
    {
        _id: "6",
        title: "Monoliths vs Microservices: Making the Right Choice",
        content:
            "There’s no one-size-fits-all architecture. This article compares monolithic and microservices architectures, outlining their advantages, drawbacks, and when each approach makes sense depending on team size and project scope.",
        userId: "user_3",
        category: "architecture",
        featured: false,
        media: [
            {
                url: "https://picsum.photos/800/500?random=6",
                type: "image",
                filename: "microservices.jpg",
                size: 387654,
                uploadedAt: new Date("2024-05-14T15:20:00"),
            },
            {
                url: "https://picsum.photos/800/500?random=7",
                type: "image",
                filename: "monolith.jpg",
                size: 356789,
                uploadedAt: new Date("2024-05-14T15:25:00"),
            },
        ],
        createdAt: new Date("2024-05-13T11:00:00"),
        updatedAt: new Date("2024-05-15T09:40:00"),
    },
    {
        _id: "7",
        title: "CSS Grid vs Flexbox in Real Projects",
        content:
            "CSS Grid and Flexbox solve different layout problems. In this guide, we break down when to use each, common pitfalls, and how combining them leads to clean and responsive UI designs.",
        userId: "user_2",
        category: "web-development",
        featured: false,
        media: [
            {
                url: "https://picsum.photos/800/500?random=8",
                type: "image",
                filename: "css-layouts.jpg",
                size: 278901,
                uploadedAt: new Date("2024-04-03T14:10:00"),
            },
        ],
        createdAt: new Date("2024-04-02T09:30:00"),
        updatedAt: new Date("2024-04-04T08:15:00"),
    },
    {
        _id: "8",
        title: "Remote Work Without Burning Out",
        content:
            "Remote work offers flexibility, but it can blur the line between work and rest. This post shares strategies for setting boundaries, maintaining mental health, and staying effective while working remotely.",
        userId: "user_4",
        category: "productivity",
        featured: false,
        media: [],
        createdAt: new Date("2024-03-11T16:00:00"),
        updatedAt: new Date("2024-03-12T10:30:00"),
    },
    {
        _id: "9",
        title: "Designing Systems That Scale",
        content:
            "Scalability is about more than handling traffic—it’s about resilience and maintainability. We discuss caching strategies, database optimization, and architectural patterns that help systems grow gracefully.",
        userId: "user_5",
        category: "architecture",
        featured: true,
        media: [
            {
                url: "https://picsum.photos/800/500?random=9",
                type: "image",
                filename: "scalable-systems.jpg",
                size: 489123,
                uploadedAt: new Date("2024-02-01T12:00:00"),
            },
        ],
        createdAt: new Date("2024-01-31T17:20:00"),
        updatedAt: new Date("2024-02-02T09:45:00"),
    },
    {
        _id: "10",
        title: "JavaScript Performance Optimization Techniques",
        content:
            "Performance issues often stem from small inefficiencies. This article covers profiling tools, memory leaks, and best practices to keep JavaScript applications fast and responsive.",
        userId: "user_1",
        category: "web-development",
        featured: false,
        media: [],
        createdAt: new Date("2023-12-05T10:00:00"),
        updatedAt: new Date("2023-12-06T11:30:00"),
    },
    {
        _id: "11",
        title: "Using Time Blocking to Regain Control of Your Day",
        content:
            "Time blocking is a powerful productivity method that encourages intentional planning. Learn how to structure your day into focused blocks and reduce context switching.",
        userId: "user_2",
        category: "productivity",
        featured: false,
        media: [
            {
                url: "https://picsum.photos/800/500?random=10",
                type: "image",
                filename: "time-blocking.jpg",
                size: 245111,
                uploadedAt: new Date("2023-11-18T09:10:00"),
            },
        ],
        createdAt: new Date("2023-11-17T15:00:00"),
        updatedAt: new Date("2023-11-18T12:45:00"),
    },
    {
        _id: "12",
        title: "Event-Driven Architecture for Modern Apps",
        content:
            "Event-driven architecture enables systems to be more reactive and loosely coupled. This post introduces key concepts, use cases, and common tools used in event-driven systems.",
        userId: "user_3",
        category: "architecture",
        featured: false,
        media: [
            {
                url: "https://picsum.photos/800/500?random=11",
                type: "image",
                filename: "event-driven.jpg",
                size: 334567,
                uploadedAt: new Date("2023-10-09T14:00:00"),
            },
        ],
        createdAt: new Date("2023-10-08T10:30:00"),
        updatedAt: new Date("2023-10-10T09:00:00"),
    },
    {
        _id: "13",
        title: "Exploring the Next.js App Router",
        content:
            "The Next.js App Router introduces a new mental model for building React applications. We walk through layouts, server components, and data fetching strategies.",
        userId: "user_1",
        category: "web-development",
        featured: true,
        media: [
            {
                url: "https://picsum.photos/800/500?random=12",
                type: "image",
                filename: "nextjs-router.jpg",
                size: 298765,
                uploadedAt: new Date("2023-09-14T13:25:00"),
            },
        ],
        createdAt: new Date("2023-09-13T09:00:00"),
        updatedAt: new Date("2023-09-15T16:40:00"),
    },
    {
        _id: "14",
        title: "Avoiding Burnout in Tech Careers",
        content:
            "Burnout is common in fast-paced tech environments. This article discusses early warning signs, prevention strategies, and how to build sustainable work habits.",
        userId: "user_4",
        category: "productivity",
        featured: false,
        media: [],
        createdAt: new Date("2023-08-01T11:15:00"),
        updatedAt: new Date("2023-08-02T10:00:00"),
    },
    {
        _id: "15",
        title: "Layered Architecture in Practice",
        content:
            "Layered architecture provides structure and clarity in application design. We explore how to organize code into layers and avoid common anti-patterns.",
        userId: "user_5",
        category: "architecture",
        featured: false,
        media: [
            {
                url: "https://picsum.photos/800/500?random=13",
                type: "image",
                filename: "layered-architecture.jpg",
                size: 367890,
                uploadedAt: new Date("2023-07-05T14:50:00"),
            },
        ],
        createdAt: new Date("2023-07-04T09:30:00"),
        updatedAt: new Date("2023-07-06T12:20:00"),
    },
    {
        _id: "16",
        title: "Random Lessons Learned from Software Engineering",
        content:
            "After years of building software, certain lessons stand out—communication matters, simple solutions scale better, and learning never stops. This post shares reflections from real-world experience.",
        userId: "user_6",
        category: "others",
        featured: false,
        media: [],
        createdAt: new Date("2023-06-10T16:00:00"),
        updatedAt: new Date("2023-06-11T09:10:00"),
    },
]

