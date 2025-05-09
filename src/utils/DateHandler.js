import { format, parseISO } from 'date-fns';

/**
 * Utility functions for handling date formats in the application
 */
export const DateHandler = {
    /**
     * Formats a date for display
     * @param {Date|string|Object} date - Date object, ISO string, or Firebase timestamp
     * @param {string} formatStr - Format string for date-fns
     * @returns {string} Formatted date string
     */
    formatDate: (date, formatStr = "MMMM dd, yyyy") => {
        if (!date) return null;

        try {
            // Handle Firebase Timestamp object
            if (date.seconds && date.nanoseconds) {
                return format(new Date(date.seconds * 1000), formatStr);
            }

            // Handle ISO string
            if (typeof date === 'string') {
                // First try parsing as ISO
                try {
                    return format(parseISO(date), formatStr);
                } catch {
                    // If not ISO format, try as regular date string
                    return format(new Date(date), formatStr);
                }
            }

            // Handle Date object
            if (date instanceof Date) {
                return format(date, formatStr);
            }

            // If we got here, try to coerce to Date
            return format(new Date(date), formatStr);
        } catch (error) {
            console.error("Error formatting date:", error);
            return "Invalid date";
        }
    },

    /**
     * Converts a date to a simple YYYY-MM-DD format for sorting and filtering
     * @param {Date|string|Object} date - Date object, ISO string, or Firebase timestamp
     * @returns {string} Date in YYYY-MM-DD format
     */
    toSortableDate: (date) => {
        return DateHandler.formatDate(date, "yyyy-MM-dd");
    },

    /**
     * Checks if a date is in the past
     * @param {Date|string|Object} date - Date to check
     * @returns {boolean} True if date is in the past
     */
    isPastDate: (date) => {
        if (!date) return false;

        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            let compareDate;

            // Handle Firebase Timestamp
            if (date.seconds && date.nanoseconds) {
                compareDate = new Date(date.seconds * 1000);
            } else if (typeof date === 'string') {
                compareDate = new Date(date);
            } else if (date instanceof Date) {
                compareDate = date;
            } else {
                compareDate = new Date(date);
            }

            compareDate.setHours(0, 0, 0, 0);
            return compareDate < today;
        } catch (error) {
            console.error("Error checking if date is past:", error);
            return false;
        }
    }
};

export default DateHandler;