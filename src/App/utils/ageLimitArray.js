export const ageLimitArray = [
    {label: '0+', value: 1},
    {label: '6+', value: 2},
    {label: '12+', value: 3},
    {label: '16+', value: 4},
    {label: '18+', value: 5}
]

export const getAgeLimit = (value) => {
    const ageLimit = ageLimitArray.find(el => {
        return el.value === +value
    })
    return ageLimit.label
}
