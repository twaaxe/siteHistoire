import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'; //utilisé pour specifier ou et comment stocker les images    -   storage seem to be a service (can't change it as a variable)
import { storage, auth } from "../firebase";
import { signOut } from 'firebase/auth';

import { v4 } from 'uuid';

import FormText from '../components/FormText';

import '../style/App.css'
import Justpage from './Justpage';



function Home() {


    //------------------------------------------
    // Upload
    //------------------------------------------

    const navigate = useNavigate()
    const folderUrlImg = ref(storage, '/images')
    const folderUrlTxt = ref(storage, '/textes')
    const [imageList, setImageList] = useState([]);
    const [imageUpload, setImageUpload] = useState(null)
    const [inputValue, setInputValue] = useState('');
    const [textData, setTextData] = useState('');


    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    //------------------------------------------
    // Display
    //------------------------------------------

    const FluidImage = (props) => {
        return <img src={props.url} />;
    }


    useEffect(() => {


        setImageList([]);
        listAll(folderUrlImg)
            .then((response) => {

                response.items.forEach((item) => {
                    // console.log(item)
                    getDownloadURL(item).then((url) => {
                        setImageList((prev) => [...prev, url]);
                    });
                });
            })
        console.log(imageList)
    }, []);


    const logout = async () => {
        await signOut(auth)
        navigate('/RegisterLogin');

    }

    return (
        <>

            <Container className="   " style={{}}>
                <Row className="">

                    <Col className="sideBar mt-4 " xs={12} md={4}>
                        <Row>
                            {/* <ListGroup variant="flush" className='text-center fw-semibold' >

                                <ListGroup.Item action className="py-2" style={{ backgroundColor: "#F3E7D2" }}>
                                    <input type="file" id="submitButton" onChange={(even) => { setImageUpload(even.target.files[0]) }} />
                                </ListGroup.Item>

                                <ListGroup.Item action className="py-2" style={{ backgroundColor: "#F3E7D2" }}>
                                    <button onClick={uploadImage}>Upload Image</button>
                                </ListGroup.Item>
                                <FormText inputValue={inputValue} handleInputChange={handleInputChange} />

                                <ListGroup.Item action className="py-2" style={{ backgroundColor: "#F3E7D2" }}>
                                    <button onClick={logout}> Sign Out </button>
                                </ListGroup.Item>

                            </ListGroup> */}
                        </Row>
                        <Row className="my-5" >
                            <Justpage />
                        </Row>


                    </Col>

                    <Col className=" mx-auto " xs={12} md={8} >

                        <div className='Home'>
                            <div>
                                {
                                    imageList.map((url) => {
                                        return <>
                                            <div className='rowCentredwContent' >
                                                <FluidImage url={url} />
                                            </div>
                                        </>
                                    })
                                }
                            </div>
                        </div >

                    </Col>
                </Row>
            </Container >


        </>
    )
}

export default Home;