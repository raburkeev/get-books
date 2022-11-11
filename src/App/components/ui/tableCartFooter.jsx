import React from 'react'
import PropTypes from 'prop-types'

const TableCartFooter = ({data}) => {
    const cartSum = data.reduce((acc, el) => acc + el.price, 0)
    return (
        <tfoot className="table-primary">
            <tr>
                <td>
                    <h5>
                        Итог:
                    </h5>
                </td>
                <td/>
                <td/>
                <td/>
                <td>
                    <h5>
                        {cartSum}р.
                    </h5>
                </td>
            </tr>
        </tfoot>
    )
}

TableCartFooter.propTypes = {
    data: PropTypes.array
}

export default TableCartFooter
