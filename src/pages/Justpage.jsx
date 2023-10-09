import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useContext } from "react";
import { signOut } from 'firebase/auth'
import { auth, storage } from "../firebase";
import { db } from "../firebase"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; //utilisé pour specifier ou et comment stocker les images    -   storage seem to be a service (can't change it as a variable)
import { addDoc, collection } from "firebase/firestore";
import AuthContext from '../context/AuthContext'
import FormText from '../components/FormText';
import { v4 } from 'uuid';





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

        if (imageUpload == null || inputValue == null) {
            alert("Both image and text are required.");
            return;
        }

        const imageId = v4().replace(/-/g, '')
        const postId = `post-${imageId}`;
        const imageUploadName = imageUpload.name + "-" + postId;

        try {

            // Téléchargement de l'image
            const path = `images/${imageUploadName}`
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


    return (
        <Container>
            <Row>
                <Col className='my-3' >
                    <h1>Just page</h1>
                    <button onClick={logout}> Sign Out </button>
                    <Col className='my-3'>
                        <h1>Create A Post</h1>
                        <div className="inputGp">
                            <label> Image</label>
                            <input type="file" id="submitButton" onChange={(even) => { setImageUpload(even.target.files[0]) }} />

                        </div>
                        <div className="inputGp">
                            <label> Caption:</label>
                            <FormText inputValue={inputValue} handleInputChange={handleInputChange} />

                        </div>
                        <button onClick={uploadImage}>Upload Image</button>
                    </Col>
                </Col>
            </Row>

        </Container>
    )
}

export default Justpage
