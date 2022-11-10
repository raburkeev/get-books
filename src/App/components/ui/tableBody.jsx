import React from 'react'
import {useSelector} from 'react-redux'
import {getUserCart} from '../../store/user'
import {getBooksByIds} from '../../store/books'

const TableBody = () => {
    const userCart = useSelector(getUserCart())
    const booksFromCart = useSelector(getBooksByIds(userCart))
    const filteredBooks = booksFromCart.map((book, index) => ({index: index + 1, name: book.name, author: book.author, price: book.price}))
    console.log(filteredBooks)
    return (
        <tbody>
            {filteredBooks.map((book, index) => (
                <tr key={index}>
                    {Object.keys(book).map((el, index) => (
                        <td key={book.name + index}>{book[el]}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    )
}
// <tbody>
// <tr>
//     <td scope="row">1</td>
//     <td>Mark</td>
//     <td>Otto</td>
//     <td>@mdo</td>
//     <td>@mdo</td>
// </tr>
// <tr>
//     <td scope="row">2</td>
//     <td>Jacob</td>
//     <td>Thornton</td>
//     <td>@fat</td>
//     <td>@fat</td>
// </tr>
// <tr>
//     <td scope="row">3</td>
//     <td>Larry the Bird</td>
//     <td>@twitter</td>
//     <td>@twitter</td>
//     <td>@twitter</td>
// </tr>
// </tbody>

export default TableBody
