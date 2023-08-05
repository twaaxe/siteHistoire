import { useState, useEffect } from 'react';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'; //utilisé pour specifier ou et comment stocker les images    -   storage seem to be a service (can't change it as a variable)
import { storage, auth } from "../firebase";
import { signOut } from 'firebase/auth';
import { v4 } from 'uuid';
import '../style/App.css'

import { useNavigate } from 'react-router-dom';

import { Image } from './Image';




// const FluidImage = (props) => {
//     return <img src={props.url} />;
// }


function Home() {

    // const navigate = useNavigate()
    // const folderUrl = ref(storage, '/images')
    // const [imageList, setImageList] = useState([]);
    // const [imageUpload, setImageUlpoad] = useState(null)

    // const uploadImage = (e) => {         //upload the image to the database
    //     if (imageUpload == null) {
    //         alert("no image to upload");
    //         return
    //     } else {
    //         const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);//access the storage(firebase)  add and save it in the path as 2e parameter (create folder images)
    //         uploadBytes(imageRef, imageUpload).then((snapshot) => {
    //             getDownloadURL(snapshot.ref).then((url) => {
    //                 setImageList((prev) => [...prev, url]);

    //             });
    //         });
    //     };

    //     document.getElementById("submitButton").value = null
    // }




    const authArray = Object.entries(auth);
    useEffect(() => {

        if (!authArray[4][1]) {
            const showAlertAndNavigate = async () => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                alert('YOU ARE NOT LOGGED IN --> Login page');
                navigate('/RegisterLogin');
            };

            showAlertAndNavigate();
        } else {
            setImageList([]);
            listAll(folderUrl)
                .then((response) => {

                    response.items.forEach((item) => {
                        getDownloadURL(item).then((url) => {
                            setImageList((prev) => [...prev, url]);
                        });
                    });
                })
        }

    }, []);


    const logout = async () => {
        await signOut(auth)
        navigate('/RegisterLogin');

    }


    return (
        <>
            <div className='Home'>

                <div className='rowCentredwContent'>
                    <input type="file" id="submitButton" onChange={(even) => { setImageUlpoad(even.target.files[0]) }} />   {/*selection  */}
                    <button onClick={uploadImage}>Upload Image</button>     {/* envoi */}
                    <button onClick={logout}> Sign Out </button>
                </div >


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
        </>
    )
}

export default Home;