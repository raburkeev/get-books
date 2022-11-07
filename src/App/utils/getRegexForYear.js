export const getRegexForYear = () => {
    const currentYear = new Date(Date.now()).getFullYear()
    const pattern = `^(?:[1-9]|\\d{2,3}|[1-4]\\d{3}|${currentYear})$`

    return new RegExp(pattern)
}
