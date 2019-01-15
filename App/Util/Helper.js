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
    return parseFloat(value).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}

export const showAlertMessage = (message, type) => {
    showMessage({
        message,
        type,
    })
}

export const getYesterdayStart = () => {
    var start = new Date()
    start.setDate(start.getDate() - 1)
    start.setHours(0,0,0,0)

    return start.toISOString()
}

export const getYesterdayEnd = () => {
    var end = new Date()
    end.setDate(end.getDate() - 1)
    end.setHours(23,59,59,999)

    return end.toISOString()
}

export const getTodayStart = () => {
    var start = new Date()
    start.setHours(0,0,0,0)

    return start.toISOString()
}

export const getTodayEnd = () => {
    var end = new Date()
    end.setHours(23,59,59,999)

    return end.toISOString()
}