import React from "react";

interface TimeDisplayProps {
    seconds: number; // total seconds to convert
}

/**
 * Converts seconds into minutes and seconds format.
 * Example: 125 -> "2m 5s"
 */
const TimeDisplay: React.FC<TimeDisplayProps> = ({ seconds }) => {
    // Ensure non-negative integer
    const safeSeconds =
        Number.isFinite(seconds) && seconds >= 0 ? Math.floor(seconds) : 0;

    const minutes = Math.floor(safeSeconds / 60);
    const remainingSeconds = safeSeconds % 60;

    // Format with leading zeros
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return (
        <span>
            {formattedMinutes}:{formattedSeconds}
        </span>
    );
};

export default TimeDisplay;
