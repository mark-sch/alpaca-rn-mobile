import React from 'react'
import PropTypes from 'prop-types'
import {
    Image,
    ViewPropTypes,
    TouchableOpacity
} from 'react-native'

import {
    ApplicationStyles,
    Colors,
} from '../Themes'

const NavigationIcon = ({
    style,
    source,
    onPress
}) => {

    return (
        <TouchableOpacity onPress={onPress}>
            <Image
                style={[ApplicationStyles.screen.navSearchIcon, style]}
                source={source}
            />
        </TouchableOpacity>
    )
};

NavigationIcon.propTypes = {
    onPress: PropTypes.func,
    style: ViewPropTypes.style,
    source: PropTypes.number.isRequired,
}

export default NavigationIcon