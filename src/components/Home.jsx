import { useState, useEffect } from 'react';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'; //utilisé pour specifier ou et comment stocker les images    -   storage seem to be a service (can't change it as a variable)
import { storage, auth } from "../firebase";
import { v4 } from 'uuid';
import '../style/App.css'



const FluidExample = (props) => {
    return <img src={props.url} />;
}


function Home() {

    const folderUrl = ref(storage, '/images')

    const [imageList, setImageList] = useState([]);
    const [imageUpload, setImageUlpoad] = useState(null)

    const uploadImage = (e) => {         //upload the image to the database
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




    useEffect(() => {


        setImageList([]);

        listAll(folderUrl)
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

    }


    return (
        <>

            <div className='Home'>

                <div className='rowCentredwContent'>
                    <input type="file" id="submitButton" onChange={(even) => { setImageUlpoad(even.target.files[0]) }} />   {/*selection  */}
                    <button onClick={uploadImage}>Upload Image</button>     {/* envoi */}
                    <button onClick={logout}> Sign Out </button>
                </div>


                <div>
                    {imageList.map((url) => {

                        return <>
                            <div className='rowCentredwContent' >
                                <FluidExample url={url} className="imgInside" />
                            </div>

                        </>
                    })}



                </div>
            </div>
        </>
    )
}

export default Home;