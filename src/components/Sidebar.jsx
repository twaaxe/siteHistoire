import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { signOut } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

import { storage, auth } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; //utilisé pour specifier ou et comment stocker les images    -   storage seem to be a service (can't change it as a variable)




function Sidebar() {

    const [imageUpload, setImageUpload] = useState(null)

    const navigate = useNavigate()

    const uploadImage = (e) => {         //upload the image to the database
        // console.log("zezezeze:" + imageUpload)

        const folderUrl = ref(storage, '/images')
        const [imageList, setImageList] = useState([]);

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


    const logout = async () => {
        await signOut(auth)
        navigate('/RegisterLogin');

    }


    return (


        <ListGroup variant="flush" className='text-center fw-semibold'>

            <ListGroup.Item action>
                <input type="file" id="submitButton" onChange={(even) => { setImageUpload(even.target.files[0]) }} />

            </ListGroup.Item>

            <ListGroup.Item action>
                <button onClick={uploadImage}>Upload Image</button>
            </ListGroup.Item>

            <ListGroup.Item action>
                <button onClick={logout}> Sign Out </button>
            </ListGroup.Item>


        </ListGroup>
    )
}
<div className='rowCentredwContent'>
</div >
export default Sidebar;

