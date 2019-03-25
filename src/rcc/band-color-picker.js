import React from 'react'
import { SketchPicker as ColorPicker } from 'react-color';

function BandColorPicker(props) {
    
    let getColorPicker = () => {
        //react-color throws an internal error during tests 
        if(!props.testing){
            
            return (
                <ColorPicker
                    disableAlpha={true}
                    color={props.selectedColor || {r:0, g:0, b:0}}
                    presetColors={props.presets}
                    onChangeComplete={props.onChangeComplete}
                />
            );
        }
    }

    let getDetails = () => {
        let content;
        if(props.resolvedColor) {
            
            let rgb = props.resolvedColor;

            let indicatorStyle = {
                backgroundColor: 'rgba('+rgb.r+','+rgb.g+','+rgb.b+',1)'
            };

            content = (
                <div>
                    <h5>Selected color: <div style={indicatorStyle} className="inlineColorIndicatorCircle"></div> <strong>{props.resolvedColor.name}</strong></h5>
                    <p>
                        {props.resolvedColor.description}
                    </p>
                </div>
            );
        }
        else{
            content = (
                <div>
                    <h5>Nothing selected.</h5>
                    <p>
                        Select band color.
                    </p>
                </div>
            );
        }

        return <div className="color-picker-panel right">{content}</div>
    }
    
    return (
        <div>
            <div className="color-picker-panel left">
                {getColorPicker()}
            </div>
            {getDetails()}
        </div>
    );

}

export default BandColorPicker