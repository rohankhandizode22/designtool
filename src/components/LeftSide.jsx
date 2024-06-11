import React, { useContext, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
// import CardHeader from "react-bootstrap/esm/CardHeader";
import { UserContext } from "../App";
import Modal from "react-bootstrap/Modal";
import { fabric } from "fabric";
import axios from "axios";
import { MainContext } from "./MainSection";
import "./color.css";
import "./DesignModal.css";
import { FaSearch } from "react-icons/fa";
import categories from "./categories";



export default function LeftSide() {
  const [uploadModal, setuploadModal] = useState();
  const [designModal, setdesignModal] = useState();
  const [productModal, setproductModal] = useState();

  const { canvasRef1 } = useContext(UserContext);

  const {  setshowCard } = useContext(MainContext);

  const [data, setdata] = useState([]);
  const [designFilesData, setdesignFilesData] = useState([]);
  const [showImgInModle, setshowImgInModle] = useState(false);

  // ************* handle json Data

  useEffect(() => {
    const test = async () => {
      const { data } = await axios.get("http://localhost:5000/uploadedFiles");
      const designFiles = await axios.get("http://localhost:5000/designFiles");

      // console.log("designFiles",designFiles.data);

      setdesignFilesData(designFiles.data);

      // console.log(" get uploaded file's data from App .js", data);
      setdata(data);
    };

    test();
  }, []);

  // ***********   handleAddtext
  const handleAddtext = () => {
    setshowCard("text");
    if (canvasRef1.current) {
      const text = new fabric.Text("Enter Your Text", {
        left: 80,
        top: 50,
        fill: "#27f702",
        fontFamily: "Arial",
        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "italic",
        textAlign: "center",
        originX: "center",
        originY: "center",
      });

      canvasRef1.current.add(text);
      canvasRef1.current.requestRenderAll();
    }
  };

  // ************************** handleUpload

  const handleUpload = () => {
    setshowCard("image");

    setuploadModal(true);
  };

  // ************ handleDesign

  const handleDesign = () => {
    setshowCard("group");

    setdesignModal(true);
  };

  // *************** handleProductModle

  const handleProductModle = () => {
    setproductModal(true);
  };

  // ****************** handleUploadFile

  const handleUploadFile = async (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    // console.log("file", file);

    if (file) {
      const result = await axios.post("http://localhost:8000/uploadedFiles", {
        url: file,
      });
    }

    //  getuploadedfiles

    const { data } = await axios.get("http://localhost:8000/uploadedFiles");

    setdata(data);
  };

  // ************  handleUploadImageInCanvas
  const handleUploadImageInCanvas = (url) => {
    setuploadModal(false);
    if (url && canvasRef1.current) {
      var img = new Image();

      img.src = url;
      img.onload = function () {
        var imgInstance = new fabric.Image(img, {
          left: 10,
          top: 50,
          scaleX: 0.3,
          scaleY: 0.3,
        });

        canvasRef1.current.add(imgInstance);
        canvasRef1.current.renderAll();
      };
    }
  };

  // ******************** handleDesign Canvas
  const handleDesignInCanvas = (url) => {
    setdesignModal(false);

    if (url && canvasRef1.current) {
      // // **** previous
      // var img = new Image();

      // img.src = url;
      // img.onload = function () {
      //   var imgInstance = new fabric.Image(img, {
      //     left: 10,
      //     top: 50,
      //     scaleX: 0.3,
      //     scaleY: 0.3,
      //   });

      //   canvasRef1.current.add(imgInstance);
      //   canvasRef1.current.renderAll();
      // };

      // *****new
      fabric.loadSVGFromURL(url, function (objects) {
        var group = new fabric.Group(objects, {
          left: 50,
          top: 50,
          selected: true,
        });
        group.scaleToWidth(50);
        group.scaleToHeight(50);
        canvasRef1.current._setActiveObject(group);
        canvasRef1.current.viewportCenterObject(group);
        // setgroup(1);
        canvasRef1.current.add(group);
        canvasRef1.current.renderAll();
        // setType('');
        // setDragFlag(false);
        // movingClipart.current=null;
        //  canvasRef1.current.off('drop', dropClipart);
      });
    }
  };
  // *********  @@@@@@@@@@@@@@@@

  // fabric.loadSVGFromURL(url, function (objects) {
  //   var group = new fabric.Group(objects, {
  //       left: 10,
  //       top: 10,
  //       selected: true
  //   });
  //   group.scaleToWidth(50);
  //   group.scaleToHeight(50);
  //    canvasRef1.current._setActiveObject(group);
  //    canvasRef1.current.viewportCenterObject(group);
  //   // setgroup(1);
  //    canvasRef1.current.add(group);
  //    canvasRef1.current.renderAll();
  //   // setType('');
  //   // setDragFlag(false);
  //   // movingClipart.current=null;
  //    canvasRef1.current.off('drop', dropClipart);

  // });
  // *********  @@@@@@@@@@@@@@@@

  // ***************** handleProductInCanvas

  const handleProductInCanvas = (arg) => {
    setproductModal(false);
    if (arg && canvasRef1.current) {
      var img = new Image();

      img.src = arg.url;
      img.onload = function () {
        var imgInstance = new fabric.Image(
          img,
          {
            left: 10,
            top: 50,
            scaleX: 0.3,
            scaleY: 0.3,
          },
          { crossOrigin: "anonymous" }
        );

        canvasRef1.current.add(imgInstance);
        canvasRef1.current.renderAll();
      };
    }
  };

  // *************   handleShowImgInModle

  const handleShowImgInModle = (url) => {
    setshowImgInModle(url);
  };

  // ************* handleSelectFromUploadModal

  const handleSelectFromUploadModal = (url) => {
    setuploadModal(false);
    setshowImgInModle(false);
    if (url && canvasRef1.current) {
      var img = new Image();

      img.src = url.url;
      img.onload = function () {
        var imgInstance = new fabric.Image(img, {
          left: 10,
          top: 50,
          scaleX: 0.3,
          scaleY: 0.3,
        });

        canvasRef1.current.add(imgInstance);
        canvasRef1.current.renderAll();
      };
    }
  };

  // ***************** handleDeleteFromUploadModal

  const handleDeleteFromUploadModal = async (arg) => {
    setuploadModal(false);
    setshowImgInModle(false);

    if (arg) {
      const deletedData = await axios.delete(
        `http://localhost:8000/uploadedFiles/${arg.id}`
      );
      // console.log("deletedData", deletedData);

      //  after delet get remaning data
      const { data } = await axios.get("http://localhost:8000/uploadedFiles");
      // console.log("after delete data get data", data);

      setdata(data);
    }
  };

  // **************** handleUndo

  const handleUndo = () => {

    // console.log("handleUndo called 🥰🥰🥰");
    
    if (canvasRef1.current) {
    canvasRef1?.current.undo();
      
    }  
    
  };

  const handleRedo = () => {
    
    if (canvasRef1.current) {
    canvasRef1?.current.redo();
      
    }
    
  };


  const btnWhite = {
    color:"black",
    backgroundColor: "white",
    borderColor: "white",
    textDecoration:"none"
  };

  // const categories = [
  //   { name: 'Football', image: ['https://print10.websitestagingserver.co/wp-content/plugins/uploads/wtpbiz/cliparts/Football-13.svg','https://print10.websitestagingserver.co/wp-content/plugins/uploads/wtpbiz/cliparts/Football-14.svg', 'https://print10.websitestagingserver.co/wp-content/plugins/uploads/wtpbiz/cliparts/Football-12.svg','https://print10.websitestagingserver.co/wp-content/plugins/uploads/wtpbiz/cliparts/Football-09.svg'] },
  //   { name: 'Flowers', image: ['https://via.placeholder.com/150?text=Flowers'] },
  //   { name: 'Money', image: ['https://via.placeholder.com/150?text=Money'] },
  //   { name: 'Baby', image:  ['https://via.placeholder.com/150?text=Baby' ]},
  //   { name: 'Spring', image: ['https://via.placeholder.com/150?text=Spring'] },
  //   { name: 'Fox', image: ['https://via.placeholder.com/150?text=Fox'] },
  //   { name: 'Crown', image: ['https://via.placeholder.com/150?text=Crown'] },
  //   { name: 'Camping', image: ['https://via.placeholder.com/150?text=Camping'] }
  //   // Add more categories as needed
  // ];

  const [selectedCategory, setSelectedCategory] = useState(null);

  // const getRepeatedImages = (image) => {
  //   let repeatedImages = [];
  //   for (let i = 0; i < 4; i++) {
  //     repeatedImages = repeatedImages.concat(image);
  //   }
  //   return repeatedImages;
  // };

  return (
    <>
      <Card className="bg-white border-0 shadow">

        {/* PRODUCTS */}
        <Button
          className="border-1 text-center p-1 mt-2  menu-button" 
          onClick={() => {
            handleProductModle();
          }} style={btnWhite}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.8em" height="1.8em"
                        fill="currentColor">
                        <path
                            d="m.7 11.1 6 5.9L8 15.6v10.5c0 1.6 1.3 2.9 2.9 2.9h10.2a3 3 0 0 0 3-2.9V15.5l1.4 1.5 6-5.9-8.1-8h-5.3v1a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-1H8.7zm2.8 0 6-6h2.6c.5 1.7 2.1 3 3.9 3a4 4 0 0 0 3.9-3h2.7l6 6-3.1 3-3.4-3.5v15.5c0 .5-.4.9-1 .9H10.9a.9.9 0 0 1-.9-.9V10.6l-3.4 3.5z">
                        </path>
                    </svg> <br />
           <span style={{fontSize:14}}>Products</span> 
        </Button>

        {/* DESIGN */}
        <Button
          className="border-1  text-center p-1 mt-3 menu-button"  style={btnWhite}
          onClick={() => {
            handleDesign();
          }}
        >
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.8em" height="1.8em"
                        fill="currentColor">
                        <circle cx="12.97" cy="12.55" r="2.5"></circle>
                        <path
                            d="M29.21 5.91a2.88 2.88 0 0 0-2.05-.86H4.93a3 3 0 0 0-2.93 3v16a3 3 0 0 0 .85 2.11 2.88 2.88 0 0 0 2.09.89h22.21a3 3 0 0 0 2.93-3v-16a3 3 0 0 0-.87-2.14zM4.93 7.05h22.23a.9.9 0 0 1 .64.27 1 1 0 0 1 .3.73v14.66L20 14.57l-6.61 6.67L9.3 18.3 4 23.62V8.05a1 1 0 0 1 .93-1zM27.14 25H5.39l4.12-4.13 4.07 2.94 6.42-6.4L27.48 25a.87.87 0 0 1-.34 0z">
                        </path>
                    </svg> <br />
                    <span style={{fontSize:14}}>Design </span>
        </Button>

        {/* TEXT */}
        <Button
          className="border-1  text-center  p-1 mt-3 menu-button"  style={btnWhite}
          onClick={() => {
            handleAddtext();
          }}
        >
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.8em" height="1.8em"
                    fill="currentColor">
                    <path
                        d="M26.9 2H6.1c-2 0-3.6 1.6-3.6 3.6v4.5h2V5.6c.1-.9.8-1.6 1.6-1.6h9.3v24H10v2h12.9v-2h-5.5V4h9.4c.9 0 1.6.7 1.6 1.6v4.5h2V5.6c0-2-1.6-3.6-3.5-3.6z">
                    </path>
                </svg> <br />
                <span style={{fontSize:14}}>Text </span>
        </Button>{" "}

        {/* UPLOAD */}
        <Button
          className="border-1  text-center  p-1 my-3 menu-button"  style={btnWhite}
          onClick={() => {
            handleUpload();
          }}
        >
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.8em" height="1.8em"
                        fill="currentColor">
                        <path
                            d="M29.71 16.52v10.1a4.42 4.42 0 0 1-2.37.54H4.57a4.43 4.43 0 0 1-2.28-.54v-10.1H0v10.29c0 1.55 1.86 2.64 4.57 2.64h22.77c2.74 0 4.66-1.15 4.66-2.67V16.5Zm-14.76-9.6v12.97h2.28V6.94L19.3 9l1.61-1.61-4.82-4.83-4.8 4.81 1.61 1.62 2.06-2.06Z">
                        </path>
                    </svg> <br />
                    <span style={{fontSize:14}}> Upload </span>
        </Button>{" "}
      </Card>
      <br />

      <Card className="bg-white  border-0 shadow">
        
        {/* UNDO */}
        <Button style={btnWhite}  onClick={handleUndo}
          className="border-1 text-center p-1 mt-2 menu-button" >
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.8em" height="1.8em" fill="currentColor"
                    class="menu__undo-redo__icon">
                    <path
                        d="M22 9.32H5.5l4.63-4.62-2.01-2.02-8.13 8.07 8.13 8.11 2.01-2.01-4.73-4.67H22a7.14 7.14 0 1 1 0 14.28h-5.71v2.86h5.7a10 10 0 1 0 0-20Z">
                    </path>
                </svg><br />
                    <span style={{fontSize:14}}>Undo </span>
        </Button>


        {/* REDO */}
        <Button style={{color:"black", textDecoration:"none", opacity:0.2,  backgroundColor: "white", border:"none"}}  
          className="border-1 text-center p-1 mt-3  menu-button" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.8em" height="1.8em" fill="currentColor"
                    class="menu__undo-redo__icon">
                    <path
                        d="m23.8 2.7-2 2 4.7 4.7H10a10 10 0 1 0 0 20h5.7v-3H10a7.1 7.1 0 1 1 0-14.2h16.6L21.8 17l2 2 8.2-8.2-8.2-8.1Z">
                    </path>
                </svg><br />
                    <span style={{fontSize:14}}>Redo </span>
        </Button>

      </Card>
      

      {/* 🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟 Modal window for products */}

      <Modal
        size="xl"
        show={productModal}
        onHide={() => setproductModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            <div className="text-center"> Product Modal </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-4 offset-1">
              <div className="row">
                {data.map((item, i) => (
                  <div className="col-2" key={i}>
                    <img
                      src={item.url}
                      alt={i}
                      height={60}
                      className="mx-2 my-1"
                      onClick={() => {
                        handleProductInCanvas(item);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div
              className="col-6 offset-1"
              style={{ marginTop: 200, marginLeft: 500, height: 300 }}
            >
              {/* <input type="file" onChange={handleUploadFile} /> */}
            </div>
          </div>
        </Modal.Body>
      </Modal>


      {/* 🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟 Modal window for Design */}

      <Modal
        size="xl"
        show={designModal}
        onHide={() => setdesignModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" style={{width:"100%"}}>
            <div className="text-center">Design Modal</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row" >

            <div className="col-4 ">
              {/* <div className="row"> 
              {designFilesData.map((item, i) => (
                  <div className="col-2" key={i}>
                    <img
                      src={item.url}
                      alt={i}
                      height={60}
                      className="mx-2 my-1"
                      onClick={() => {
                        handleDesignInCanvas(item.url);
                      }}
                    />
                  </div>
                ))} 
                {/* </div> */}

                 <div className="sidebar">
                    
                    <div className="input-group mb-3 ">
                                   
                         <input type="text" placeholder="Find designs" className=" form-control border-end-0" aria-describedby="basic-addon2" />
                          <span className="input-group-text bg-white" id="basic-addon2"><FaSearch/></span>
                      
                      </div>
                    <h4 className="mb-3">Bestsellers</h4>
                    <ul>
                      {categories.map((category) => (
                        <li key={category.name} onClick={() => setSelectedCategory(category)}>
                          {/* <img src={category.image[0]} alt={category.name} className="category-image" /> */}
                          <span>{category.name}</span>
                        </li>
                      ))}
                    </ul>
                </div>

              
            </div>

            <div
              className="col-8  mx-auto " style={{height:"500px", overflow:"auto"}}
              // style={{ marginTop: 200, marginLeft: 500, height: 300 }}
            >
              {/* <input type="file" onChange={handleUploadFile} /> */}
              <div className="main-area">
            {selectedCategory ? (
            
            <div className="image-grid">
            {selectedCategory.image.map((image, index) => (
              <img key={index} src={image} alt={selectedCategory.name} className="selected-image" />
            ))}
          </div>
        //   <div className="image-grid">
        //   {getRepeatedImages(selectedCategory.image).map((image, index) => (
        //     <img key={index} src={image} alt={selectedCategory.name} className="selected-image" />
        //   ))}
        // </div>


            ) : (
              // <div className="default-message">
              //   {/* <img src="https://via.placeholder.com/150?text=Placeholder" alt="What are you looking for?" /> */}
              //   <h2>What are you looking for?</h2>
              // </div>

             <div class="design-list">
              <div class="design-list__content">
                  <div class="start-a-search">
  
                      <div class="start-a-search__image"><img
                              src="https://assets.spreadshirt.net/cyo/images/imagestack.png"
                              width="137" height="119" alt="" />
                          <h2>What are you looking for?</h2>
                      </div>
                  </div>
              </div>
          </div>

            )}
          </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* 🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟 Modal windo for Upload */}

      <Modal
        size="xl"
        show={uploadModal}
        onHide={() => setuploadModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            <div className="text-center">upload Modal</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-4 offset-1">
              <div className="row">
                {data.map((item, i) => (
                  <div className="col-2" key={i}>
                    <img
                      src={item.url}
                      alt={i}
                      height={60}
                      className="mx-2 my-1"
                      onClick={() => {
                        handleShowImgInModle(item);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div
              className="col-6 offset-1"
              style={{ marginTop: 200, marginLeft: 500, height: 300 }}
            >
              {showImgInModle ? (
                <div
                  className="d-flex justify-content-center "
                  style={{ marginTop: -130 }}
                >
                  <img
                    src={showImgInModle.url}
                    alt="showImgInModle"
                    height={200}
                  />
                  <hr />
                  <br />
                  <br />
                  <br />
                  <div>
                    <button
                      className="btn btn-dark"
                      onClick={() => {
                        handleDeleteFromUploadModal(showImgInModle);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-dark"
                      onClick={() => {
                        handleSelectFromUploadModal(showImgInModle);
                      }}
                    >
                      Select
                    </button>
                  </div>
                </div>
              ) : (
                <input type="file" onChange={handleUploadFile} />
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
