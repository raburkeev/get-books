import React from 'react'
import PropTypes from 'prop-types'

const GroupList = ({items, selectedItem, onItemSelect, valueProperty, contentProperty}) => {
    return (
        <ul className="list-group">
            {Object.keys(items).map(item => {
                return (
                    <li className={`list-group-item ${items[item] === selectedItem ? 'active' : ''}`}
                        key={items[item][valueProperty]}
                        role="button"
                        onClick={() => onItemSelect(items[item])}
                    >
                        {items[item][contentProperty]}
                    </li>
                )
            })}
        </ul>
    )
}

GroupList.defaultProps = {
    valueProperty: 'id',
    contentProperty: 'name'
}

GroupList.propTypes = {
    items: PropTypes.object,
    selectedItem: PropTypes.object,
    onItemSelect: PropTypes.func,
    valueProperty: PropTypes.string,
    contentProperty: PropTypes.string
}

export default GroupList
