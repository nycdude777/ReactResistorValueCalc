import React from 'react'

import { Container, Jumbotron, Button } from 'react-bootstrap'
import ColorChart from './rcc/color-chart'
import AppModal from './rcc/app-modal'
import AxialResistor from './rcc/axial-resistor'

import RCCCalculator from './rcc/rcc-calculator'

import './rcc/rcc.css'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { chartShown: false, helpShown: false };
        this.showChart = () => this.setState({ chartShown: true });
        this.showHelp = () => this.setState({ helpShown: true });
        this.closeModal = () => this.setState({ helpShown: false, chartShown: false });

        this.rcc = new RCCCalculator();
    }
    
    getPageHeader = () => {
        return (
            <div style={{textAlign: 'center'}}>
                <h2>Resistor Value Calculator</h2>
                <Button variant="outline-primary" onClick={this.showChart}>View chart</Button>
                <Button variant="outline-primary" onClick={this.showHelp}>Show help</Button>
            </div>
        );
    };

    getModalContent(){
        if(this.state.chartShown){
            let items = this.rcc.getColorCodeItems();
            return <ColorChart items={items}/>;
        }
        else{
            return (
                <ul>
                    <li>To calculate the value of a 4-band resistor, select bands 1, 2, 4 and 5, skipping band 3.</li>
                    <li>A 4-band resisor value is calculated using the first two digits (bands 1 and 2) multiplied by the color value of band 4.</li>
                    <li>To calculate the value of a 5 band resistor, select bands 1, 2 and 3 as your THIRD digit, and then, as before, the multiplier and tolerance.</li>
                    <li>Multiplier and tolerance bands are always bands 4 and 5, they do not shift.</li>
                </ul>
            );
        }
    }

    getModal(){
        let modalShown = this.state.chartShown || this.state.helpShown;
        let modalTitle;
        if(this.state.chartShown){
            modalTitle = 'Resistor Color Codes';
        }
        else{
            modalTitle = 'How to';
        }
        return (
            <AppModal 
                show={modalShown} 
                onHide={this.closeModal} 
                title={modalTitle}>
                {this.getModalContent()}
            </AppModal>
        );
    }

    render() {
        return (
            <div>
                <Container>
                    <Jumbotron key="jumbotron">
                        {this.getPageHeader()}
                    </Jumbotron>

                    {this.getModal()}

                    <AxialResistor/>
                </Container>
            </div>
        );
    }
}

export default App