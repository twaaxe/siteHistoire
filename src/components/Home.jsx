import { useState, useEffect } from 'react';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'; //utilisé pour specifier ou et comment stocker les images    -   storage seem to be a service (can't change it as a variable)
import { storage, auth } from "../firebase";
import { signOut } from 'firebase/auth';
import { v4 } from 'uuid';
import '../style/App.css'

import { useNavigate } from 'react-router-dom';

import Sidebar from './Sidebar'
import { Container, Row, Col } from 'react-bootstrap';

import { ListGroup } from 'react-bootstrap';


const FluidImage = (props) => {
    return <img src={props.url} />;
}


function Home() {

    const navigate = useNavigate()
    const folderUrl = ref(storage, '/images')
    const [imageList, setImageList] = useState([]);
    const [imageUpload, setImageUpload] = useState(null)

    const uploadImage = (e) => {         //upload the image to the database
        if (imageUpload == null) {
            alert("no image to upload");
            return
        } else {
            const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);//access the storage(firebase)  add and save it in the path as 2e parameter (create folder images)
            uploadBytes(imageRef, imageUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setImageList((prev) => [...prev, url]);

                });
            });
        };

        document.getElementById("submitButton").value = null
    }

    //------------------------------------------


    //------------------------------------------


    useEffect(() => {
        setImageList([]);
        listAll(folderUrl)
            .then((response) => {

                response.items.forEach((item) => {
                    getDownloadURL(item).then((url) => {
                        setImageList((prev) => [...prev, url]);
                    });
                });
            })


    }, []);


    const logout = async () => {
        await signOut(auth)
        navigate('/RegisterLogin');

    }


    return (
        <>





            <Container className="  contentContainer" style={{}}>
                <Row>
                    <Col className="sideBar mt-4 " xs={12} md={4}>

                        <ListGroup variant="flush" className='text-center fw-semibold' >

                            <ListGroup.Item action className="py-2" style={{ backgroundColor: "#F3E7D2" }}>
                                <input type="file" id="submitButton" onChange={(even) => { setImageUpload(even.target.files[0]) }} />
                            </ListGroup.Item>

                            <ListGroup.Item action className="py-2" style={{ backgroundColor: "#F3E7D2" }}>
                                <button onClick={uploadImage}>Upload Image</button>
                            </ListGroup.Item>

                            <ListGroup.Item action className="py-2" style={{ backgroundColor: "#F3E7D2" }}>
                                <button onClick={logout}> Sign Out </button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Col>

                    <Col className=" mx-auto " xs={12} md={8} >

                        <div className='Home'>
                            <div>
                                {imageList.map((url) => {
                                    return <>
                                        <div className='rowCentredwContent' >
                                            <FluidImage url={url} className="imgInside" />
                                        </div>
                                    </>
                                })}

                            </div>
                        </div >

                    </Col>
                </Row>
            </Container >


        </>
    )
}

export default Home;