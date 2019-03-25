import React from 'react'
import { Modal, Button } from 'react-bootstrap'

/**
 * Generic Modal Dialog used by the app.  The final dialog is constructed through composition.
 */
class AppModal extends React.Component {
    getHeaderButton = (props) => {
        if(props.headerbutton){
            return (
                <Button variant="secondary" onClick={props.headerbutton.onClick}>
                    {props.headerbutton.caption}
                </Button>
            );
        }
    };
    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.title}
                    </Modal.Title>
                    {this.getHeaderButton(this.props)}
                </Modal.Header>
                <Modal.Body>
                    {this.props.children}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AppModal