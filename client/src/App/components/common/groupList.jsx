import React from 'react'
import PropTypes from 'prop-types'

const GroupList = ({items, selectedItem, onItemSelect, valueProperty, contentProperty}) => {
    return (
        <ul className="list-group">
            {items.map(item => {
                console.log(item)
                return (
                    <li className={`list-group-item ${item === selectedItem ? 'active' : ''}`}
                        key={item[valueProperty]}
                        role="button"
                        onClick={() => onItemSelect(item)}
                    >
                        {item[contentProperty]}
                    </li>
                )
            })}
        </ul>
    )
}

GroupList.defaultProps = {
    valueProperty: '_id',
    contentProperty: 'name'
}

GroupList.propTypes = {
    items: PropTypes.array,
    selectedItem: PropTypes.object,
    onItemSelect: PropTypes.func,
    valueProperty: PropTypes.string,
    contentProperty: PropTypes.string
}

export default GroupList
