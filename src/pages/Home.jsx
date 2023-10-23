import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useContext } from "react";
import AuthContext from '../context/AuthContext'

import { ref, listAll, getDownloadURL } from 'firebase/storage'; //utilisé pour specifier ou et comment stocker les images    -   storage seem to be a service (can't change it as a variable)
import { storage, db } from "../firebase";
import { getDocs, collection } from 'firebase/firestore'; // Importez collection et getDocs

import '../style/App.css'
import Justpage from './Justpage';



function Home() {
    //------------------------------------------
    // Upload
    //------------------------------------------
    const { currentUser } = useContext(AuthContext) // recupere le dispatch
    const folderUrlImg = ref(storage, `images/${currentUser.email}`)
    const [imageList, setImageList] = useState([]);
    const [documents, setDocuments] = useState([])
    const collectionRef = collection(db, 'azerty');
    const docsData = []

    //------------------------------------------
    // Display
    //------------------------------------------

    const FluidImage = (props) => {
        return <img src={props.url} />;
    }


    // GET IMAGES FROM STORAGE
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


    //GET IMAGES FROM COLLECTION DB
    useEffect(() => {
        getDocs(collectionRef)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc) {
                        docsData.push(doc.data());
                    }
                    setDocuments(docsData)
                });
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des documents:", error);
            });
    }, []);



    // RENDER MATCHING IDS
    const renderingPost = () => {
        return (
            <div>

                {imageList.map((url) => {
                    const urlString = url.toString();
                    const idFromLink = urlString.split("-post-")[1];
                    const idImageStorage = idFromLink.split("?alt=")[0];


                    const matchingDocs = documents.filter((doc) => doc.imageId === idImageStorage);

                    // const uniqueMatchingDocs = new Set();
                    // const filteredMatchingDocs = matchingDocs.filter((doc) => {
                    //     if (!uniqueMatchingDocs.has(doc.imageId)) {
                    //         uniqueMatchingDocs.add(doc.imageId);
                    //         return true;
                    //     }
                    //     return false;
                    // });


                    return matchingDocs.map((doc) => (
                        <div key={doc.imageId}>
                            <FluidImage url={url} />
                            <p>{doc.caption}</p>
                            <p>{doc.datePublication}</p>
                        </div>
                    ));
                })}
            </div>
        );
    }


    return (
        <>

            <Container className="" style={{ width: "100%", height: "100vh" }}>
                <Row className="d-flex justify-content-between" >
                    {/* UPLOAD POST AND SIGN OUT */}
                    <Col className="sideBar mt-4" xs={12} md={2} >
                        <Justpage />
                    </Col>
                    {/* <Col md={2}></Col> */}

                    {/* BODY OF APP */}
                    <Col className=" mx-auto Home" xs={12} md={8} >

                        {   // RENDER THE POST + CAPTION
                            renderingPost()

                        }

                    </Col>
                </Row>
            </Container >


        </>
    )
}

export default Home;

