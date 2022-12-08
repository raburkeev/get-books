const Genre = require('../models/Genre')
const Book = require('../models/Book')
const genresMock = require('../mock/genres.json')
const booksMock = require('../mock/books')


module.exports = async () => {
    const genres = await Genre.find()
    if (genres.length !== genresMock.length) {
    await createInitialEntityGenres(Genre, genresMock)
    }

    const books = await Book.find()
    if (!books.length) {
        await createInitialEntityBooks(Book, booksMock)
    }
}

async function createInitialEntityGenres(Model, data) {
    await Model.collection.drop()
    return Promise.all(
        data.map(async item => {
            try {
                const newItem = new Model(item)
                await newItem.save()
                return newItem
            } catch (error) {
                console.log(error.message)
                return error
            }
        })
    )
}

async function createInitialEntityBooks(Model, data) {
    await Model.collection.drop()
    const genres = await Genre.find()
    return Promise.all(
        data.map(async (item) => {
            try {
                item.genre = genresMock.find(genre => genre.id === item.genre)
                const updatedGenre = genres.find(genre => genre.name === item.genre.name)
                const newItem = new Model({...item, genre: updatedGenre._id})
                delete newItem.id
                await newItem.save()
                return newItem
            } catch (error) {
                console.log(error.message)
                return error
            }
        })
    )
}