import React, { useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useContext } from "react";
import AuthContext from '../context/AuthContext'
import { signOut } from 'firebase/auth'
import { auth, storage } from "../firebase";
import { db } from "../firebase"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; //utilisé pour specifier ou et comment stocker les images    -   storage seem to be a service (can't change it as a variable)
import { addDoc, collection } from "firebase/firestore";
import FormText from '../components/FormText';
import { v4 } from 'uuid';
import LogoutButton from '../components/LogoutButton'






function Justpage() {
    const { currentUser } = useContext(AuthContext) // recupere le dispatch
    const [imageUpload, setImageUpload] = useState("")
    const [inputValue, setInputValue] = useState('');
    const postsCollectionRef = collection(db, "azerty");
    const [imageList, setImageList] = useState([]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const logout = async () => {
        await signOut(auth)
        alert("logout done")
        window.location.reload();
    }


    const uploadImage = async (e) => {         //upload the image to the database

        const imageId = v4().replace(/-/g, '')
        const postId = `post-${imageId}`;
        const imageUploadName = imageUpload.name + "-" + postId;


        if (imageUpload.name == undefined) {
            alert("Pls select a picture")
        } else {

            try {

                // Téléchargement de l'image
                const path = `images/${currentUser.email}/${imageUploadName}`
                const imageRef = ref(storage, path);
                uploadBytes(imageRef, imageUpload).then((imageSnapshot) => { // dans imageRef, mets imageUpload 
                    getDownloadURL(imageSnapshot.ref).then((imageUrl) => {
                        setImageList((prev) => [...prev, imageUrl]);
                    });
                });

                alert('Image Upload Name:' + imageUploadName);
                alert(("imageRef = " + `images/${imageUploadName}`))

                const author = currentUser.email;
                const caption = inputValue;
                const datePublication = new Date().toLocaleDateString();
                await addDoc(postsCollectionRef, { author, caption, datePublication, path, imageId });
                window.location.pathname = "/";

            } catch (error) {
                alert("An error occurred while uploading.");
            }
            // Réinitialisation du champ de téléchargement
        }

    }
    // console.log(currentUser.email)


    return (
        <Container>
            <Row>
                <Col className='my-3 ' >
                    <Col className='my-3 '>
                        <div className="inputGp d-flex  justify-content-center">
                            <label className="custom-file-upload">
                                <input type="file" id="fileInput" className="" onChange={(event) => { setImageUpload(event.target.files[0]) }} />
                                Choose File
                            </label>
                        </div>
                        <div className="inputGp">
                            <FormText inputValue={inputValue} handleInputChange={handleInputChange} />

                        </div>
                        <button style={{ width: "100%" }} className="custom-file-upload" onClick={uploadImage}>Upload Image</button>
                    </Col>
                </Col>

            </Row>

            <Row>
                <Col className="d-flex  justify-content-center">
                    <LogoutButton />
                </Col>

            </Row>

        </Container>
    )
}

export default Justpage
