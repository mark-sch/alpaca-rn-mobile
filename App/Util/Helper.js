import moment from 'moment-timezone'
import _ from 'lodash'
import { showMessage, hideMessage } from "react-native-flash-message";

export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const changeTimeFormat = (value) => {
    return moment(value).tz('America/New_York').format('MM/D h:mm a z')
}

export const mergeArray = (array) => {
    var result = _(array)
        .groupBy(x => x.status)
        .map((value, key) => ({status: key, data: value}))
        .value()

    return result
}

export const convert = (value, percent = false) => {
    if (percent === false && value != undefined) {
        value = formatValue(value)
    }

    if (value > 0) {
        if (!percent) {
            return `+$${value}`
        } else
            return `+${value}%`
    } else if (value < 0) {
        value = Math.abs(value)
        if (!percent) {
            return `-$${value}`
        } else
            return `-${value}%`
    } else {
        if (!percent) {
            return `$${value}`
        } else
            return `${value}%`
    }
}

export const formatValue = (value) => {
    value = parseFloat(value).toFixed(2).toLocaleString()
    return value
}

export const showAlertMessage = (message, type) => {
    showMessage({
        message,
        type,
    })
}