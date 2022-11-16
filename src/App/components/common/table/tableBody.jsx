/*eslint-disable*/
import React from 'react'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {getUserCart} from '../../../store/user'
import {getBooksByIds} from '../../../store/books'
// import _ from 'lodash'

const TableBody = ({data, columns}) => {
    const renderContent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component
            if (typeof component === 'function') {
                return component(item)
            }
            return component
        }

        return _.get(item, columns[column].path)
    }
    // const userCart = useSelector(getUserCart())
    // const booksFromCart = useSelector(getBooksByIds(userCart))
    // const filteredBooks = booksFromCart.map((book, index) => ({index: index + 1, name: book.name, author: book.author, price: book.price}))
    // console.log(filteredBooks)
    return (
        <tbody>
        {data.map(item => (
            <tr key={item.id}>
                {Object.keys(columns).map(column => (
                    <td key={column}>
                        {renderContent(item, column)}
                    </td>
                ))}
            </tr>
        ))}
        </tbody>
    )
}

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired
}

// {filteredBooks.map((book, index) => (
//     <tr key={index}>
//         {Object.keys(book).map((el, index) => (
//             <td key={book.name + index}>{book[el]}</td>
//         ))}
//     </tr>
// ))}


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
