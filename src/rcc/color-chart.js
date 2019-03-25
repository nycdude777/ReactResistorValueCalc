import React from 'react'

import { $e } from '../lib/react-e-tag'

function ChartRow(item) {

    let bgColorRgb = item.color.r + ',' + item.color.g + ',' + item.color.b;
    let darkBgColors = ['Black', 'Brown', 'Red', 'Violet', 'Grey'];

    let rowStyle = {
        backgroundColor: 'rgba(' + bgColorRgb + ',1)',
        color: darkBgColors.some(dark => item.color.name === dark) ? '#ddd' : '#333'
    };
    return (
        <tr key={item.index} style={rowStyle} >
            <td>{item.color.name}</td>
            <td>{item.color.code}</td>
            <td>{item.color.ral}</td>
            <td>{item.value}</td>
            <td style={{ cursor: 'pointer' }} title={item.multiplier.value.toLocaleString('en')}>x{item.multiplier.notation.base}<sup>{item.multiplier.notation.power}</sup></td>
            <td>{item.tolerance.value}</td>
            <td>{item.tolerance.letter}</td>
        </tr>
    );
}

function ColorChart(props) {
    return (
        $e('table.chart',
            $e('thead', { key: 'thead' }),
            $e('tbody', { key: 'tbody' },
                props.items.map(item => ChartRow(item))
            ),
        )
    );
}

export default ColorChart