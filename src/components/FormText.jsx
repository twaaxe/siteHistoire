import Form from 'react-bootstrap/Form';

function FormText({ inputValue, handleInputChange }) {

    return (
        <div className='my-2'>
            <Form.Control
                type="description"
                className="descriptionText"
                onChange={handleInputChange}
                value={inputValue}
            />
            <Form.Text id="passwordHelpBlock" muted>
                Enter text with this image
            </Form.Text>
        </div>
    );
}

export default FormText;
