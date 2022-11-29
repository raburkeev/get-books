export const getStyleForGenreBadge = (color) => {
    if (color === 'warning' || color === 'info' || color === 'light') {
        return `${color} text-dark`
    } else {
        return color
    }
}
