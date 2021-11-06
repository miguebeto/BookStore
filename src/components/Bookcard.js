import { useState } from 'react';
import { Card, CardTitle, CardImg, CardBody, Button, Modal } from 'reactstrap';
import '../App.js'

export const  BookCard = ({ 
    thumbnail,
    title,
    pageCount,
    language,
    author,
    publisher,
    description,
    previewLink,
    infoLink
 }) => {

    //states
    const [ modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return <Card style={{ width: '233px' }} className="m-auto">
        <CardImg top style={{ width: "100%", height: '233px' }} src={thumbnail} alt="Card image" />
        <CardBody>
            <CardTitle className='card-title'>{ title }</CardTitle>
            <Button onClick={toggle}>More Info</Button>
        </CardBody>
        <Modal isOpen={modal} toggle={toggle}>
            <div className="modal-header d-flex justify-content-center">
            <h5 className="modal-title text-center" id='exampleModalLabel'>{ title }</h5>
            <button aria-label='close' className='close' type='button' onClick={ toggle }>
                <span aria-hidden={true}>X</span>
            </button>
            </div>
            <div className="modal-body">
                <div className="d-flex justify-content-between">
                    <img src={thumbnail} alt={title} style={{ width: "100%", height: '233px' }}/>
                    <div>
                        <p>Page Count: { pageCount }</p>
                        <p>Language: { language }</p>
                        <p>Author: { author }</p>
                        <p>Publisher: { publisher }</p>
                    </div>
                </div>
                <div className="mt-3">{description}</div>
                <div className="modal-footer">
                        <div className="left-slide">
                            <a href={previewLink} className="btn-link" color="default" type="button" target="_blank" rel="noopener noreferrer">Preview Link</a>
                        </div>
                        <div className="divider"></div>
                        <div className="right-slide">
                            <a href={infoLink} className="btn-link" color="default" type="button" target="_blank" rel="noopener noreferrer">Info Link</a>
                        </div>
                    </div>                    
                </div>
        </Modal>
    </Card>
}