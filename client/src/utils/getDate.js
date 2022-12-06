export const getDateDiff = (date) => {
    const date1 = new Date(date);
    const date2 = Date.now();
    const diffTime = Math.abs(date2 - date1);
    const diffsec = (Math.floor(diffTime / (1000))) % 60;
    const diffMin = (Math.floor(diffTime / (1000 * 60))) % 60;
    const diffHour = (Math.floor(diffTime / (1000 * 60 * 60))) % 60;
    const diffDays = (Math.floor(diffTime / (1000 * 60 * 60 * 24)));

    if (diffDays) return diffDays + " days ago"
    if (diffHour) return diffHour + " h ago"
    if (diffMin) return diffMin + " min ago"
    if (diffsec) return diffsec + " sec ago"
}

export const getDay = (date) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const datePost = new Date(date)

    let month = months[datePost.getMonth()];
    return `${month} ${datePost.getDate()}, ${datePost.getFullYear()}`
}