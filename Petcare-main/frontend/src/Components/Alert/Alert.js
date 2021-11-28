import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const Alert = (props) => {

    const onAccept = () => {
        props.onSuccess();
        props.setIsShow(false);
    }
    return (
        <Modal
            basic
            onClose={() => props.setIsShow(false)}
            onOpen={() => props.setIsShow(true)}
            open={props.isShow}
            size='small'
        >
            <Header icon>
                <Icon name='cancel' />
                {props.header ?? 'Appointment Details'}
            </Header>
            <Modal.Content>
                <div style={{ display: 'flex', justifyContent: 'center', fontSize: '2rem' }}>
                    <p>Are You sure you want to continue?</p>
                </div>
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='red' inverted onClick={() => props.setIsShow(false)}>
                    <Icon name='remove' /> Cancel
                </Button>
                <Button color='green' inverted onClick={() => onAccept()}>
                    <Icon name='checkmark' /> Accpet
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default Alert
