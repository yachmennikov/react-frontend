import React, { useRef, useState, useEffect } from 'react';
import './Input.css';
import Button from './Button';

const ImageUpload = props => {
    const [file, setFile] = useState();
    const [prevURL, setPrevURL] = useState();
    const [isValid, setIsValid] = useState(false);
    const filePickerRef = useRef();

    useEffect( () => {
        if (!file) {
           return 
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPrevURL(fileReader.result)
        }
        fileReader.readAsDataURL(file)
    }, [file])

    const pickedHandler = event => {
        let pickedFile;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true)
            fileIsValid = true
        } else {
            setIsValid(false);
            fileIsValid = false
        }
        props.onInput(props.id, pickedFile, fileIsValid)        
    }
    const pickImageHandler = () => {
        filePickerRef.current.click()
    }
    
    return (
        <div className="form-control">
            <input 
                type="file" 
                id={props.id} 
                style={{display: 'none'}} 
                accept=".jpg, .png, .jpeg"
                ref={filePickerRef}
                onChange={pickedHandler}
            />
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview">
                   { prevURL && <img src={prevURL} alt="Preview"/> }
                   { !prevURL && <p>Please pick a image</p> }
                </div>
            </div>
            <Button type="button" onClick={pickImageHandler}>Pick image</Button>
            { !isValid && <p>{props.errorText}</p> }
        </div>
    )
}

export default ImageUpload