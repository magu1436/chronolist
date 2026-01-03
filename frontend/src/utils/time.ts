

export const formattedTime = (time: Date) => {
    return time.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
}