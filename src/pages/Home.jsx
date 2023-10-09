import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'; //utilisé pour specifier ou et comment stocker les images    -   storage seem to be a service (can't change it as a variable)
import { storage, auth, db } from "../firebase";
import { doc, getDocs, collection, QuerySnapshot } from 'firebase/firestore'; // Importez collection et getDocs

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
    const [imageList, setImageList] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [documents, setDocuments] = useState('')

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


    imageList.map((url) => {
        // if (url.split('-post') == ) 

    })





    return (
        <>

            <Container className="   " style={{}}>
                <Row className="">

                    {/* UPLOAD POST AND SIGN OUT */}
                    <Col className="sideBar mt-4 " xs={12} md={4}>
                        <Row className="my-5" >
                            <Justpage />
                        </Row>
                    </Col>

                    {/* BODY OF APP */}
                    <Col className=" mx-auto " xs={12} md={8} >
                        <div className='Home'>
                            <div>
                                {   // RENDER THE POST + CAPTION

                                    //GET IMAGES FROM STORAGE
                                    imageList.map((url) => {
                                        const urlString = url.toString()
                                        const idFromLink = urlString.split("-post-")[1]
                                        const idImageStorage = idFromLink.split("?alt=")[0];

                                        {   //GET IMAGES FROM COLLECTION DB
                                            const idImageCollection = ""
                                            const collectionRef = collection(db, 'azerty');
                                            getDocs(collectionRef)
                                                // console.log(collectionRef)
                                                .then((querySnapshot) => {
                                                    querySnapshot.forEach((doc) => {
                                                        setDocuments(doc.data())
                                                        // console.log("Données du document:", documents);
                                                    });
                                                })
                                                .catch((error) => {
                                                    console.error("Erreur lors de la récupération des documents:", error);
                                                });
                                        }

                                        // RENDER MATCHING IDS
                                        for (const key in documents) {
                                            const docId = documents.imageId;

                                            if (docId.toString() == idImageStorage.toString()) {
                                                return <>

                                                    <FluidImage url={url} />
                                                    <p> {documents.caption} </p>
                                                    <p>{documents.datePublication}</p>

                                                </>
                                            }
                                        }
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

