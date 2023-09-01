import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const New = ({ inputs, title }) => {
  const [category, setCategory] = useState("");
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPer] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPer(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);
  console.log(data);
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(collection(db, category)); // Generate a new document reference
      const newId = docRef.id; // Get the automatically generated unique ID
      const newData = {
        ...data,
        id: newId, // Add the unique ID to your data
        added: new Date().toLocaleDateString(),
      };
      await setDoc(docRef, newData); // Set the data with the unique ID to the document
      navigate(-1);
    } catch (err) {
      alert("Error Try Again");
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="Image"
            />
            <label htmlFor="file">
              სურათი :<DriveFolderUploadOutlinedIcon className="icon" />
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput"></div>
              <Box sx={{ width: "71%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Category"
                    onChange={handleChange}
                  >
                    <MenuItem value={"carusell"}>Most Wanted</MenuItem>
                    <MenuItem value={"allProducts"}>All Products</MenuItem>
                    <MenuItem value={"midderHero"}>3 Item Hero</MenuItem>
                    <MenuItem value={"electric"}>Electric</MenuItem>
                    <MenuItem value={"build"}>Build</MenuItem>
                    <MenuItem value={"cleaning"}>Cleaning</MenuItem>
                    <MenuItem value={"paint"}>Paint</MenuItem>
                    <MenuItem value={"handtools"}>Hand Tools</MenuItem>
                    <MenuItem value={"garden"}>Garden</MenuItem>
                    <MenuItem value={"water"}>Water</MenuItem>
                    <MenuItem value={"box"}>Box</MenuItem>
                    <MenuItem value={"gardenfurn"}>Garden Furniture</MenuItem>
                    <MenuItem value={"manipulator"}>Manipulator</MenuItem>
                    <MenuItem value={"tvitmcleli"}>Tvitmcleli</MenuItem>
                    <MenuItem value={"trailer"}>Trailer</MenuItem>
                    <MenuItem value={"users"}>Z-Register User</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  />
                </div>
              ))}
              <Button
                disabled={per !== null && per < 100}
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
              >
                Add Item
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default New;
