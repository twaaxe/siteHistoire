import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { ref, listAll, getDownloadURL } from 'firebase/storage'; //utilisé pour specifier ou et comment stocker les images    -   storage seem to be a service (can't change it as a variable)
import { useState, useEffect } from 'react';
import { storage } from "../firebase";
import Justpage from './Justpage';



function AllCollection() {
    const FluidImage = (props) => {
        return <img src={props.url} />;
    }
    const folderUrlImg = ref(storage, '/images')
    const [imageList, setImageList] = useState([]);
    const [folderImg, setFolderImg] = useState([])


    // GET dossier FROM STORAGE
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listAll(folderUrlImg);
                setFolderImg(response);

                const imagePromises = [];

                for (const key in response) {
                    for (const item of response[key]) {
                        const itemResponse = await listAll(item);
                        itemResponse.items.forEach(async (storageItem) => {
                            const url = await getDownloadURL(storageItem);
                            setImageList((prev) => [...prev, url]);
                        });
                    }
                }
            } catch (error) {
                // Gérez les erreurs ici
                console.error("Une erreur s'est produite :", error);
            }
        };

        fetchData();
    }, []);




    //RENDERING
    const renderingAllPost = () => {
        return (
            imageList.map((url, index) => (
                <FluidImage key={index} url={url} />
            ))
        );
    }



    return (

        <Container className="" style={{ width: "100%", height: "100vh" }}>
            <Row className="d-flex justify-content-between">

                {/* UPLOAD POST AND SIGN OUT */}
                <Col className="sideBar mt-4  " xs={12} md={2}>
                    <Row className="my-5" >
                        <Justpage />
                    </Row>
                </Col>

                {/* BODY OF APP */}
                <Col className=" mx-auto Home" xs={12} md={10} >
                    {   // RENDER THE POST + CAPTION
                        renderingAllPost()
                    }
                </Col>
            </Row>
        </Container >
    )
}

export default AllCollection
