import { differenceInCalendarDays, isSameDay, subDays } from 'date-fns';

/**
 * Calculates the current streak of completed tasks.
 * A streak is maintained if at least one task is completed every consecutive day.
 * @param {Array} tasks - List of all tasks
 * @returns {number} Current streak in days
 */
export const calculateStreak = (tasks) => {
    if (!tasks || tasks.length === 0) return 0;

    const completedTasks = tasks
        .filter(t => t.completed && t.updatedAt)
        .sort((a, b) => b.updatedAt.seconds - a.updatedAt.seconds);

    if (completedTasks.length === 0) return 0;

    let streak = 0;
    const today = new Date();

    // Check if a task was completed today
    const lastTaskDate = completedTasks[0].updatedAt.toDate();
    if (isSameDay(lastTaskDate, today)) {
        streak = 1;
    } else if (isSameDay(lastTaskDate, subDays(today, 1))) {
        // If not today, but yesterday, streak is still alive, count yesterday
        streak = 1;
    } else {
        // Streak broken
        return 0;
    }

    // Iterate backwards checking for consecutive days
    // This is a simplified check: just looks for unique days in the completed list
    const uniqueDays = new Set();
    completedTasks.forEach(t => {
        const d = t.updatedAt.toDate().toDateString();
        uniqueDays.add(d);
    });

    // To properly calculate exact consecutive days from history is complex if we only store 'updatedAt'.
    // For this 'Pro' feature MVP, we'll verify if we have coverage for previous days.
    // A more robust way is to just count unique days for now as "Total Active Days" or do a best-effort streak.

    // Let's do a rigorous check:
    let currentCheckDate = today;
    // If we didn't do something today yet, start checking from yesterday? 
    // Logic: Streak = 5 means Today(done) + Yes(done) + ...

    // Optimization: Just count unique completed days for now as "Total Flow"
    // The user wants "Daily streaks"
    // Let's implement a simple version:
    // 1. Get all unique completion dates
    // 2. Sort them
    // 3. Count backwards from today/yesterday

    const sortedDates = Array.from(uniqueDays)
        .map(d => new Date(d))
        .sort((a, b) => b - a);

    if (sortedDates.length === 0) return 0;

    let currentStreak = 0;
    let expectedDate = sortedDates[0]; // Most recent

    // If most recent is NOT today or yesterday, streak is 0
    if (differenceInCalendarDays(today, expectedDate) > 1) return 0;

    // Start counting
    for (let i = 0; i < sortedDates.length; i++) {
        // If this date is the expected date (consecutive), increment
        // (handling the first one correctly)

        // Actually simpler:
        // We have a list of dates. We check gaps.
        if (i === 0) {
            currentStreak = 1;
            continue;
        }

        const prevDate = sortedDates[i - 1];
        const thisDate = sortedDates[i];

        const diff = differenceInCalendarDays(prevDate, thisDate);

        if (diff === 1) {
            currentStreak++;
        } else {
            break; // Gap found
        }
    }

    return currentStreak;
};

/**
 * Generates regular "AI" suggestions based on task load and time.
 */
export const getAISuggestion = (tasks) => {
    const pending = tasks.filter(t => !t.completed);
    const highPriority = pending.filter(t => t.priority === 'high');
    const overdue = pending.filter(t => t.dueDate && t.dueDate.toDate() < new Date());

    if (overdue.length > 0) {
        return `⚠️ You have ${overdue.length} overdue tasks. Tackle "${overdue[0].text}" first to get back on track!`;
    }

    if (highPriority.length > 0) {
        return `🚀 Focus Mode: You have ${highPriority.length} high priority tasks. Start with "${highPriority[0].text}".`;
    }

    if (pending.length > 5) {
        return `📉 Your list is getting long (${pending.length} items). Try clearing the quick wins first!`;
    }

    if (pending.length === 0) {
        return `🎉 All caught up! Take a break or plan for tomorrow.`;
    }

    return `💡 Pro Tip: Breaking tasks into smaller steps helps maintain flow.`;
};
