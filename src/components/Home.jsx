//17:30
//list all item with listAll()

import { useState, useEffect } from 'react';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'; //utilisé pour specifier ou et comment stocker les images    -   storage seem to be a service (can't change it as a variable)
import { storage } from './firebase';
import { v4 } from 'uuid';

// import Image from 'react-bootstrap/Image';

const FluidExample = (props) => {
    return <img src={props.url} />;
}


function Home() {

    const folderUrl = ref(storage, '/images')

    const [imageList, setImageList] = useState([]);
    const [imageUpload, setImageUlpoad] = useState(null)

    const uploadImage = (e) => {         //upload the image to the database
        if (imageUpload == null) return;

        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);//access the storage(firebase) and add a save it in the path as 2e parameter (create folder images)

        uploadBytes(imageRef, imageUpload).then(() => {     //actually upload the image in the database
            alert("Image Sent")
        })

        document.getElementById("submitButton").value = null

    }


    useEffect(() => {
        listAll(folderUrl)
            .then((response) => {

                response.items.forEach((item) => {
                    getDownloadURL(item).then((url) => {
                        setImageList((prev) => [...prev, url]);
                    });
                });


            })
    }, []);



    // useEffect(() => {
    //   listAll(folderUrl)
    //     .then((response) => {
    //       const promises = response.items.map((item) => {
    //         return getDownloadURL(item);
    //       });

    //       Promise.all(promises)
    //         .then((urlsArray) => {
    //           const uniqueUrls = [...new Set(urlsArray.flat())];
    //           setImageList((prev) => [...prev, ...uniqueUrls]);

    //         })
    //         .catch((error) => {
    //           console.log("Erreur lors de la récupération des URL de téléchargement :", error);
    //         });
    //     })
    //     .catch((error) => {
    //       console.log("Erreur lors de la récupération des éléments :", error);
    //     });
    // }, []);




    return (
        <>
            <div className='Home'>
                <input type="file" id="submitButton" onChange={(even) => { setImageUlpoad(even.target.files[0]) }} />   {/*selection  */}

                <button onClick={uploadImage}>Upload Image</button>     {/* envoi */}
            </div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',

            }}>
                {imageList.map((url) => {

                    return <>
                        <div className='imgContainer' >
                            <FluidExample url={url} className="imgInside" />
                        </div>

                    </>
                })}



            </div>
        </>
    )
}