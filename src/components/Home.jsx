import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'; //utilisé pour specifier ou et comment stocker les images    -   storage seem to be a service (can't change it as a variable)
import { storage, auth } from "../firebase";
import { signOut } from 'firebase/auth';

import { v4 } from 'uuid';

import FormText from './FormText';

import '../style/App.css'




function Home() {


    const navigate = useNavigate()
    const folderUrlImg = ref(storage, '/images')
    const folderUrlTxt = ref(storage, '/textes')
    const [imageList, setImageList] = useState([]);
    const [textList, setTextList] = useState([])
    const [imageUpload, setImageUpload] = useState(null)
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };


    const uploadImage = (e) => {         //upload the image to the database

        if (imageUpload == null || inputValue == null) {
            alert("Both image and text are required.");
            return;
        }

        const postId = `post-${v4()}`;
        const imageUploadName = imageUpload.name + "-" + postId;
        const textUpload = inputValue + "-" + postId

        try {

            alert('Image Upload Name:' + imageUploadName);
            alert('Text Upload Name:' + textUpload);

            // Téléchargement de l'image
            const imageRef = ref(storage, `images/${imageUploadName}`);
            uploadBytes(imageRef, imageUpload).then((imageSnapshot) => { // dans imageRef, mets imageUpload 
                getDownloadURL(imageSnapshot.ref).then((imageUrl) => {
                    setImageList((prev) => [...prev, imageUrl]);
                    console.log("imagelist : " + imageList)
                });

                // Téléchargement du texte
                const textRef = ref(storage, `textes/${textUpload}`);
                uploadBytes(textRef, textUpload).then((textSnapshot) => {
                    getDownloadURL(textSnapshot.ref).then((textUrl) => {
                        setTextList((prev) => [...prev, textUrl]);
                        console.log("textList : " + textList)
                    });
                });
            });
        } catch (error) {
            alert("An error occurred while uploading.");
        }
        // Réinitialisation du champ de téléchargement
    }
    //------------------------------------------
    // Upload Done
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

        setTextList([]);
        listAll(folderUrlTxt)
            .then((response) => {
                response.items.forEach((item) => {
                    getDownloadURL(item).then((url) => {
                        setTextList((prev) => [...prev, url]);
                    });
                });
            })

        textList.map((url) => {
            const parts = url.split('post');
            if (parts.length === 2) {
                const fileName = parts[0]; // Obtient le nom du fichier
                const id = parts[1]; // Obtient l'ID

                console.log('Nom du fichier :', fileName);
                console.log('ID :', id);
            }
        })



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

                        <ListGroup variant="flush" className='text-center fw-semibold' >

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

                        </ListGroup>
                    </Col>

                    <Col className=" mx-auto " xs={12} md={8} >

                        <div className='Home'>
                            <div>
                                {
                                    imageList.map((url) => {
                                        return <>
                                            <div className='rowCentredwContent' >
                                                <FluidImage url={url} className="imgInside" />
                                                {
                                                    //ajoute une condition, si id de image = id de text afficher les 2 si on  ne rien faire
                                                }
                                                <p></p>
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