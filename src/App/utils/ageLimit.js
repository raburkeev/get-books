export const ageLimit = [
    {label: '0+', value: 1},
    {label: '6+', value: 2},
    {label: '12+', value: 3},
    {label: '16+', value: 4},
    {label: '18+', value: 5}
]

export const getAgeLimit = (value) => {
    if (ageLimit.map(el => el.value).includes(+value)) {
        const ageLimitObj = ageLimit.find(el => el.value === +value)
        return ageLimitObj.label
    } else {
        return value
    }
}

export const getAgeLimitFormat = (label) => {
    const ageLimitObj = ageLimit.find(el => el.label === label)

    return ageLimitObj.value.toString()
}
