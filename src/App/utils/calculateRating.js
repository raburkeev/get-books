export const calculateRating = (rating) => {
    const totalRatings = Object.keys(rating).reduce((acc, r) => acc + rating[r], 0)
    const ratingsSum = Object.keys(rating).reduce((acc, r) => acc + rating[r] * (+r + 1), 0)
    const avgRating = ratingsSum / totalRatings
    return avgRating.toFixed(1)
}
