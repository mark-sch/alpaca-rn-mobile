import Colors from './Colors';

const type = {
    base: 'Avenir-Book',
    bold: 'Avenir-Black',
}

const size = {
    h1: 38,
    h2: 34,
    h3: 30,
    h4: 26,
    h5: 20,
    h6: 19,
    input: 18,
    regular: 17,
    medium: 14,
    small: 12,
    tiny: 8.5
}

const style = {
    title: {
        fontFamily: type.bold,        
        fontSize: size.h5
    },
    h1: {
        fontFamily: type.bold,
        fontSize: 32,
        color: Colors.COLOR_CORE_TEXT
    },
    h2: {
        fontFamily: type.base,
        fontSize: 23,
        color: Colors.COLOR_CORE_TEXT
    },
    h3: {
        fontFamily: type.base,
        fontSize: 16,
        color: Colors.COLOR_CORE_TEXT
    }
}

export default {
    type,
    size,
    style
}
