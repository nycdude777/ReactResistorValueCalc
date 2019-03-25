import React from 'react'
import AppModal from './app-modal'
import BandColorPicker from './band-color-picker'

import RCCCalculator from './rcc-calculator'

Array.prototype.toMap = function () {
    let map = {};
    this.forEach((item, key) => map[key] = item);
    return map;
};

class AxialResistor extends React.Component {

    constructor(props) {
        super(props);

        this.totalBandCount = 5;

        this.state = {
            colorPicker: {
                show: false
            },
            bandColor: Array(this.totalBandCount).fill(null).toMap(),
            bandCssStyle: Array(this.totalBandCount).fill({}).toMap(),
            selectedColor: null
        };

        //holds selection prior to setting the state
        this.newState = {};

        this.rcc = new RCCCalculator();
    }
    
    //each time a band color is selected, this function will try to calculate the result
    tryCalculateResistance() {

        let bands = Array(this.totalBandCount).fill(undefined);
        
        //band colors are stored as color objects, and they need to be resolved to Known color names 
        Object.keys(this.state.bandColor).forEach(key => {
            let color = this.state.bandColor[key];
            if(color) {
                bands[key] = this.rcc.resolveColor(color.rgb, key).name;
            }
        });

        let result;

        //if the 3rd band from the left has color, its a 5 band resistor
        if(bands[2]){
            result = this.rcc.getOhmsFrom5bands.apply(null, bands);
        }
        else{
            bands.splice(2,1);
            result = this.rcc.getOhmsFrom4bands.apply(null, bands);
        }

        if(result){
            this.setState({resistorData: result});
        }
        else{
            this.setState({resistorData: null});
        }
    }

    colorPickerClose()  {
        this.newState.colorPicker = { show: false };
        this.setState(this.newState, () => {
            this.tryCalculateResistance();
        });
        
    };

    colorPickerShow(bandIndex) {

        //if any bands to the left of clicked have not been assigned yet, quit.
        let keys = Object.keys(this.state.bandColor);
        let totheleft = keys.filter(key => parseInt(key)<bandIndex && parseInt(key) !==2); //ignore band 3

        if(totheleft.some(key => this.state.bandColor[key]===null))
        {
            return;
        }

        let resolvedColor;

        if(this.state.bandColor[bandIndex]){
            resolvedColor = this.rcc.resolveColor(this.state.bandColor[bandIndex].rgb, bandIndex);
        } 

        let availBandColors = this.rcc.getAvailableBandColors(bandIndex);
        let presetColors = availBandColors.map(col => { return { 
            color: 'rgb(' + col.r + ',' + col.g + ',' + col.b + ')', title: col.name }; 
        })

        this.setState({
            colorPicker: {
                show: true,
                bandIndex: bandIndex,
                presets: presetColors,
                title: 'Band ' + (bandIndex + 1)
            },
            selectedColor: this.state.bandColor[bandIndex],
            resolvedColor: resolvedColor
        });
    };

    bandColorSelected(color) {
        let index = this.state.colorPicker.bandIndex;
        let newColorMap = {};
        Object.assign(newColorMap, this.state.bandColor);
        newColorMap[index] = color;
        this.newState.bandColor = newColorMap;
        let newStyleMap = {};
        Object.assign(newStyleMap, this.state.bandCssStyle);
        if (color) {
            newStyleMap[index] = {
                backgroundColor: 'rgba(' + color.rgb.r + ',' + color.rgb.g + ',' + color.rgb.b + ',1)', backgroundImage: 'none'
            };
        }
        else {
            newStyleMap[index] = {};
        }
        this.newState.bandCssStyle = newStyleMap;
        let updatedState = {selectedColor: color};
        if(color){
            updatedState.resolvedColor = this.rcc.resolveColor(color.rgb, index);
        } 
        
        this.setState(updatedState);
    }
        
    //clear Button for the top right corner of the modal form
    getModalHeaderButton = () => {
        return {
            onClick: ()=>this.bandColorSelected(null),
            caption: "Clear"
        };
    }

    getTabFunction(tabNumber) {
        switch(tabNumber){
            case 1:
            case 2:
            case 3:
                return 'digit';
            case 4:
                return 'mult.';
            case 5:
                return 'tol.%';
        }
    }

    getBands() {
        return Array(this.totalBandCount).fill(null).map((band, index) => {
            return (
                <div key={index} style={this.state.bandCssStyle[index]} 
                    className="band" 
                    onClick={(e)=>this.colorPickerShow(index)}>
                    <div className="index-tab">{index+1}</div>
                    <div className="function-tab">{this.getTabFunction(index+1)}</div>
                </div>);
        });
    }
    
    
   
    getResistorData(){
        if(this.state.resistorData){
            let d = this.state.resistorData;
            return (
                <div className="data">
                    <div className="shortform">{(d.shortform ? d.shortform : d.ohms + String.fromCharCode(937)) }</div>
                    <div className="long-format">{Number(d.ohms).toLocaleString() + ' Ohm'}</div>
                    {
                        d.tolerance ?
                        (
                            <div>
                                <div className="tolerance-percent">{String.fromCharCode(177) + (d.tolerance * 100).toFixed(0) + '%'}</div>
                                <div className="tolerance-min">Min: {Number(d.min).toLocaleString() + ' Ohm'}</div>
                                <div className="tolerance-max">Max: {Number(d.max).toLocaleString() + ' Ohm'}</div>
                            </div>
                        )
                        :
                        <div>
                            Please select tolerance color (Band 5)
                        </div>
                    }
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <div className="resistor-model">
                    <div className="lead left"></div>
                    <div className="body">
                        {this.getBands()}
                    </div>
                    <div className="lead right"></div>

                    <AppModal 
                        show={this.state.colorPicker.show} 
                        onHide={() => this.colorPickerClose()} 
                        title={this.state.colorPicker.title} 
                        headerbutton={this.getModalHeaderButton()}>

                        <BandColorPicker 
                            selectedColor={this.state.selectedColor} 
                            resolvedColor={this.state.resolvedColor} 
                            onChangeComplete={(color) => this.bandColorSelected(color)} 
                            bandIndex={this.state.colorPicker.bandIndex} 
                            presets={this.state.colorPicker.presets}
                        />
                    </AppModal>
                </div>
                <div className="resistor-info">
                    <span>Click or Tap each band to select color.</span>

                    {this.getResistorData()}
                </div>
            </div>
        );
    }
}

export default AxialResistor