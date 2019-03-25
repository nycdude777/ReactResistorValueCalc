const TOLERANCE = { //tolerances
    M: { value: 20 / 100, letter: 'M' },
    K: { value: 10 / 100, letter: 'K' },
    J: { value: 5 / 100, letter: 'J' },
    F: { value: 1 / 100, letter: 'F' },
    G: { value: 2 / 100, letter: 'G' },
    W: { value: 0.05 / 100, letter: 'W' },
    P: { value: 0.02 / 100, letter: 'P' },
    D: { value: 0.5 / 100, letter: 'D' },
    C: { value: 0.25 / 100, letter: 'C' },
    B: { value: 0.1 / 100, letter: 'B' },
    L: { value: 0.01 / 100, letter: 'L' },
    A: { value: 0.01 / 100, letter: 'A' },
    None: { value: 0, letter: '' }
};

const COLOR = { //colors
    Pink: { name: 'Pink', code: 'PK', ral: 3015, r: 255, g: 180, b: 255 },
    Silver: { name: 'Silver', code: 'SR', ral: null, r: 192, g: 192, b: 192 },
    Gold: { name: 'Gold', code: 'GD', ral: null, r: 225, g: 180, b: 0 },
    Black: { name: 'Black', code: 'BK', ral: 9005, r: 0, g: 0, b: 0 },
    Brown: { name: 'Brown', code: 'BN', ral: 8003, r: 128, g: 64, b: 0},
    Red: { name: 'Red', code: 'RD', ral: 3000, r: 255, g: 0, b: 0 },
    Orange: { name: 'Orange', code: 'OG', ral: 2003, r: 255, g: 128, b: 0 },
    Yellow: { name: 'Yellow', code: 'YE', ral: 1021, r: 255, g: 255, b: 0},
    Green: { name: 'Green', code: 'GN', ral: 6018, r: 92, g: 192, b: 92},
    Blue: { name: 'Blue', code: 'BU', ral: 5015, r: 32, g: 150, b: 255 },
    Violet: { name: 'Violet', code: 'VT', ral: 4005, r: 128, g: 0, b: 192 },
    Grey: { name: 'Grey', code: 'GY', ral: 7000, r: 64, g: 64, b: 64},
    White: { name: 'White', code: 'WH', ral: 1013, r: 255, g: 255, b: 255 }
};

//for each color, defines an array of band numbers for which it is not applicable.  
//NOTE: Band numbers are 1 based here for ease of reading
const BANDCOLOREXCLUSION = { 
    Pink: [1, 2, 3, 5],
    Silver: [1, 2, 3],
    Gold: [1, 2, 3],
    Black: [5],
    White: [5]
};

const COLORCODE = {};

function defineColorCode(index, color, digitValue, multiplier, tolerance) {
    COLORCODE[color.name] = {
        key: index,
        index: index,
        color: color,
        value: digitValue,
        multiplier: multiplier,
        tolerance: tolerance
    };
}

function p10(power) {
    //because it is easier to read pow10(7) than 10000000
    return {
        value: Math.pow(10, power), notation: { base: 10, power: power }
    }; 
}

function init() {

    defineColorCode(0, COLOR.Pink, 0, p10(-3), TOLERANCE.None);
    defineColorCode(1, COLOR.Silver, 0, p10(-2), TOLERANCE.K);
    defineColorCode(2, COLOR.Gold, 0, p10(-1), TOLERANCE.J);

    defineColorCode(3, COLOR.Black, 0, p10(0), TOLERANCE.None);
    defineColorCode(4, COLOR.Brown, 1, p10(1), TOLERANCE.F);
    defineColorCode(5, COLOR.Red, 2, p10(2), TOLERANCE.G);
    defineColorCode(6, COLOR.Orange, 3, p10(3), TOLERANCE.W);
    defineColorCode(7, COLOR.Yellow, 4, p10(4), TOLERANCE.P);
    defineColorCode(8, COLOR.Green, 5, p10(5), TOLERANCE.D);
    defineColorCode(9, COLOR.Blue, 6, p10(6), TOLERANCE.C);
    defineColorCode(10, COLOR.Violet, 7, p10(7), TOLERANCE.B);
    defineColorCode(11, COLOR.Grey, 8, p10(8), TOLERANCE.L);
    defineColorCode(12, COLOR.White, 9, p10(9), TOLERANCE.None);

}

function getColorCodeItems(){
    return Object.keys(COLORCODE).map(key => COLORCODE[key]);
}


//shorthand
let pow = Math.pow;

function getRGB(r, g, b) {
    return r * pow(2, 16) +
        g * pow(2, 8) +
        b;
}

function getComponentsFromRGB(rgb) {
    let r = rgb >> 16;
    let gb = rgb - r * pow(2, 16);
    let g = gb >> 8;
    let b = gb - g * pow(2, 8);
    return [r, g, b];
}

function getColors() {
    return Object.keys(COLOR).map(key => COLOR[key]);
}

function getAvailableBandColors(bandIndex) { 

    let colors = getColors();

    return colors.filter(color => {
        if (BANDCOLOREXCLUSION[color.name]) {
            let excluded = BANDCOLOREXCLUSION[color.name].some(bandNumber => bandNumber === bandIndex + 1)
            if (excluded) {
                return false;
            }
        }
        return true;
    });
}

function getNearestColors(rgb, bandIndex) {

    let colors = typeof bandIndex !== 'undefined' ? getAvailableBandColors(bandIndex) : getColors();

    let distances = colors.map(c => {
        let dR = Math.abs(c.r) - rgb.r;
        let dG = Math.abs(c.g) - rgb.g;
        let dB = Math.abs(c.b) - rgb.b;
        return { key: c.name, d: Math.hypot(dR, dG, dB) };
    });

    distances.sort((a, b) => {
        if (a.d === b.d) return 0;
        if (a.d > b.d) return 1;
        return -1;
    });

    return distances;
}

function resolveColor(rgb, bandIndex) {
    let nearestColors = getNearestColors(rgb, bandIndex);
    let resolved = COLOR[nearestColors[0].key];
    return resolved;
}

function isNullOrUndefined(param){
    return typeof param === 'undefined' || param === null;
}

/**
 * Checks that the supplied color name is known, and that it is not excluded for a band.
 * @param {string} colorName Color name.
 * @param {integer} bandNumber Band number (1 based).
 */
function catchInvalidColor(colorName, bandNumber){
    
    //only check color names that are supplied
    if(isNullOrUndefined(colorName)){
        return;
    }

    if(isNullOrUndefined(COLOR[colorName]))  {
        throw 'Unknown color: ' + colorName;
    }
    
    if(BANDCOLOREXCLUSION[colorName]){
        //this color is on the list, check of it is excluded for this band number
        if(BANDCOLOREXCLUSION[colorName].some(n => bandNumber===n)){
            throw colorName + ' is not a valid color for band ' + bandNumber;
        }
    }
}

function missingRequiredParams(COLx100, COLx10, COLx1, M, T){
    if(isNullOrUndefined(COLx1) || isNullOrUndefined(COLx1) || isNullOrUndefined(M)){
        return true;
    }
}

function shortForm(ohms, denominator, letter){
 
    let value = ohms / denominator;

    let precision = 0;
    if(value < 10 && Math.round(value)!==value) {
        precision = 1;
    }
    
    return value.toFixed(precision) + letter;
}

/**
 * This is a private module function used by the public methods.  It calculates both 4 and 5 band resistance, depending on the presence of the first parameter (as in case with 5 band resistor).  
  */
function _getOhms(COLx100, COLx10, COLx1, M, T){

    //first check that a minimum set of arguments is supplied
    if(missingRequiredParams(COLx100, COLx10, COLx1, M, T)){
        return null;
    }
    
    //make sure that if colors are supplied, that they are valid for the bands
    catchInvalidColor(COLx100, 1);
    catchInvalidColor(COLx10, 2);
    catchInvalidColor(COLx1, 3);
    catchInvalidColor(M, 4);
    catchInvalidColor(T, 5);

    let v1 = 0, v2, v3, m, t, ohms;

    //this param would be missing for 4 band resistor
    if(COLx100) {
        v1 = COLORCODE[COLx100].value * 100; 
    }
        
    v2 = COLORCODE[COLx10].value * 10;  
    v3 = COLORCODE[COLx1].value;  

    m = COLORCODE[M].multiplier.value;
    ohms = (v1 + v2 + v3) * m;
    
    let result = { 
        ohms: ohms, 
        K: ohms>=1000 ? shortForm(ohms, 1000, 'K') : null,
        M: ohms>=1000000 ? shortForm(ohms, 1000000, 'M') : null 
    };

    if(result.M){
        result.shortform = result.M;
    }
    else if(result.K){
        result.shortform = result.K;
    }
    
    if(T) {
        t = COLORCODE[T].tolerance.value;
        let min = ohms * (1 - t);
        let max = ohms * (1 + t);

        result.tolerance = t;
        result.min = min;
        result.max = max;
    }

    return result;
}


function getOhmsFrom4bands(band1, band2, band3, band4){
    return _getOhms(null, band1, band2, band3, band4);
}


function getOhmsFrom5bands(band1, band2, band3, band4, band5){
    return _getOhms(band1, band2, band3, band4, band5);
}


class RCCCalculator {
    constructor(){
        init();
    }
    
    get TOLERANCE() {
        return COLOR;
    }

    get COLOR() {
        return COLOR;
    }

    get COLORCODE() {
        return COLORCODE;
    }

    get BANDCOLOREXCLUSION() {
        return BANDCOLOREXCLUSION;
    }
    
    getColors(){
        return getColors();
    }

    getColorCodeItems() {
        return getColorCodeItems();
    }

    getAvailableBandColors(bandIndex) { 
        return getAvailableBandColors(bandIndex);
    }

    getNearestColors(rgb, bandIndex) {
        return getNearestColors(rgb, bandIndex);
    }

    resolveColor(rgb, bandIndex) {
        return resolveColor(rgb, bandIndex);
    }

    /**
     * @description Calculates Ohms resistance of a 4 band resistor.  Supplied color names must match one of 13 Capitalized names defined as keys in the COLOR dictionary object (i.e. Pink, Silver, Gold, Black, Brown, Red, Orange, Yellow, Green, Blue, Violet, Grey, White)
     * 
     * @param {string} band1 - 1st band color (1 of 2 significant figures)
     * @param {string} band2 - 2nd band color (2 of 2 significant figures)
     * @param {string} band3 - 3rd band color (Multiplier)
     * @param {string} band4 - 4th band color (Tolerance)
     * 
     * @returns {object} An object of the following structure: { ohms: 2200,  tolerance: 0.1 } == 2200 Ohms +-10% == 2.2K +-10%  
     */
    getOhmsFrom4bands(band1, band2, band3, band4){
        return _getOhms(null, band1, band2, band3, band4);
    }

    /**
     * @description Calculates Ohms resistance of a 5 band resistor.  Supplied color names must match one of 13 Capitalized names defined as keys in the COLOR dictionary object (i.e. Pink, Silver, Gold, Black, Brown, Red, Orange, Yellow, Green, Blue, Violet, Grey, White)
     * 
     * @param {string} band1 - 1st band color (1 of 3 significant figures)
     * @param {string} band2 - 2nd band color (2 of 3 significant figures)
     * @param {string} band3 - 3rd band color (3 of 3 significant figures)
     * @param {string} band4 - 4rd band color (Multiplier)
     * @param {string} band5 - 5th band color (Tolerance)
     * 
     * @returns {object} An object of the following structure: { ohms: 2200,  tolerance: 0.1, ... } == 2200 Ohms +-10% == 2.2K +-10%  
     */
    getOhmsFrom5bands(band1, band2, band3, band4, band5){
        return _getOhms(band1, band2, band3, band4, band5);
    }
}


export default RCCCalculator

