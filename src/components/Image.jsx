import React from 'react'





const FluidImage = (props) => {
    return <img src={props.url} />;
}


export default function Image() {



    const navigate = useNavigate()

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


    return (
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
    )
}
