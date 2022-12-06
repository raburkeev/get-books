const genresMock = require('../mock/genres.json')
const booksMock = require('../mock/books')
const Book = require('../models/Book')
const Genre = require('../models/Genre')

module.exports = async () => {
    // const books = await Book.find()
    // if (!books.length) {
    //     await createInitialEntity(Book, booksMock)
    // }

    const genres = await Genre.find()
    if (genres.length !== genresMock.length) {
        await createInitialEntity(Genre, genresMock)
    }
}

async function createInitialEntity(Model, data) {
    await Model.collection.drop()
    return Promise.all(
        data.map(async item => {
            try {
                delete item.id
                const newItem = new Model(item)
                await newItem.save()
                return newItem
            } catch (error) {
                return error
            }
        })
    )
}