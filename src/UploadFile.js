import React ,{useState} from 'react';
import AWS from 'aws-sdk'
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';


const S3_BUCKET ='xxxxxxxxxx-YOUR-S3-BUCKET-NAME-xxxxxxxxxx';  //<-------------------------------- REQUIRED!
const REGION ='xxxxxxxxxx-YOUR-S3-REGION-NAME-xxxxxxxxxx';  // <-------------------------------- REQUIRED!


AWS.config.update({
     accessKeyId: 'xxxxxxx-YOUR-ACCESS-KEY-ID-xxxxxxx', // <-------------------------------- REQUIRED!
     secretAccessKey: 'xxxxxxx-YOUR-SECRET-ACCESS-KEY-xxxxxxx'  // <-------------------------------- REQUIRED!
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const UploadFile = () => {

    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {
        console.log(file);
        const params = {
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name,
            ContentType: file.type
        };

    myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
            setProgress(Math.round((evt.loaded / evt.total) * 100))
        })
        .send((err) => {
            if (err) console.log(err)
        })
    }
    console.log(progress)

    return (<div>
        <div>File Upload Progress is 
            <ProgressBar striped variant="success" now={progress} />
        </div>
        <br />
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
    </div>)
}

export default UploadFile;
