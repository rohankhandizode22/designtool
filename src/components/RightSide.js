import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Modal from "react-bootstrap/Modal";

import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import { UserContext } from "../App";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { FaFacebook, FaWhatsapp, FaAlignLeft, FaAlignCenter , FaAlignRight, FaBold, FaItalic, FaAlignJustify   } from "react-icons/fa";
import { fabric } from "fabric";
import { MainContext } from "./MainSection";
import Filter from "../pages/Filter";
import Effect from "../pages/Effect";
import "./color.css";
import { Tooltip } from 'react-tooltip'

export default function RightSide() {
  const {
    canvasRef1,
    canvasArray,
    textInput,
    arr,
    productData,
    photoEditCanvasRef,
  } = useContext(UserContext);

  const {  showCard, objModify, setdisplay,setbase64 } =
    useContext(MainContext);

  const [textSize, settextSize] = useState(20);
  const [bendText, setbendText] = useState(0);
  const [shareOffcanvas, setshareOffcanvas] = useState(false);
  const [photoPrintAreaOffcanvas, setphotoPrintAreaOffcanvas] = useState(false);
  const [textPrintAreaOffcanvas, settextPrintAreaOffcanvas] = useState(false)
  const [designPrintAreaOffcanvas, setdesignPrintAreaOffcanvas] = useState(false)
  const [editPhotoModal, seteditPhotoModal] = useState();
  const [editPhotoSrc, seteditPhotoSrc] = useState();
  const [editPhotoCard, seteditPhotoCard] = useState('Stencils')

  // 🌟🌟🌟🌟 share
  const shareUrl =
    "https://www.spreadshirt.com/create-your-own?productType=48&view=4&draft=O1l7e9YKEnFrvXQOZdqQ&affiliateId=8054&orgn=CYO&netw=OT";
  const title = "Example Title";

  // ******************* handleText
  const handleText = (e) => {
    if (canvasRef1.current) {
         if (canvasRef1.current
          .getActiveObject()) {

          
            var t = canvasRef1.current
              .getActiveObject("text")  
              .set("text", e.target.value);
      
            canvasRef1.current.requestRenderAll();
         }
      
    }
  };

  // canvasRef1.current?.on("selection:cleared", () => {});

  // ************ Text align
  const handleTextAlign = (align) => {
    if (canvasRef1.current?.getActiveObject()) {
      if (align === "left") {
        canvasRef1.current?.getActiveObject().set("textAlign", "left");
        canvasRef1.current.requestRenderAll();
      } else if (align === "right") {
        canvasRef1.current.getActiveObject().set("textAlign", "right");
        canvasRef1.current.requestRenderAll();
      } else {
        canvasRef1.current.getActiveObject().set("textAlign", "center");
        canvasRef1.current.requestRenderAll();
      }
    }
  };

  // ************* HandleFont

  const handleFont = (e) => {
    if (canvasRef1?.current) {
      var font = canvasRef1.current
        .getActiveObject()
        .set("fontFamily", e.target.value); 
      canvasRef1.current.requestRenderAll();
    }
  };

  // ************  handleColor

  const handleColor = (e) => {
    if (canvasRef1?.current) {
      // console.log(
      //   "from handleText color",
      //   canvasRef1.current.getActiveObject()
      // );
      var fill = canvasRef1.current
        .getActiveObject()
        .set("fill", e.target.value);
      canvasRef1.current.requestRenderAll();
    }
  };

  // ****** handleSendToBack
  const handleSendToBack = () => {
    if (canvasRef1.current) {
      const activeObject = canvasRef1?.current.getActiveObject();
      canvasRef1.current.sendToBack(activeObject);
      canvasRef1.current.requestRenderAll();  
    }
  };  

  // ****************   handleBringToFront
  const handleBringToFront = () => {
    if (canvasRef1.current) {
      const activeObject = canvasRef1?.current.getActiveObject();
      canvasRef1.current.bringToFront(activeObject);
      canvasRef1.current.requestRenderAll();
    }
  };

  // *********** handleCopy
  const handleCopy = () => {
    if (canvasRef1.current) {
      const activeObject = canvasRef1?.current.getActiveObject();

      activeObject.clone(function (arg) {
        canvasRef1.current.add(arg.set({ left: 100, top: 100, angle: 0 }));
      });
    }
  };

  // **********  handleRemove

  const handleRemove = () => {
    if (canvasRef1.current) {
      const activeObject = canvasRef1?.current.getActiveObject();
      canvasRef1.current.remove(activeObject);
      canvasRef1.current.requestRenderAll();
    }
  };

  // ********** handleBold

  const handleBold = () => {
    if (canvasRef1.current.getActiveObject()) {
      canvasRef1.current.getActiveObject().set("fontWeight", "bold");
      canvasRef1.current.requestRenderAll();
    }
  };

  // ***********  handleNormal
  const handleNormal = () => {
    if (canvasRef1.current.getActiveObject()) {
      canvasRef1.current.getActiveObject().set({ fontWeight: "normal", fontStyle: "normal" });
      // canvasRef1.current.getActiveObject().set("fontStyle", "normal");
      canvasRef1.current.requestRenderAll();
    }
  };

  // ************* handleItalic

  const handleItalic = () => {
    if (canvasRef1.current.getActiveObject()) {
      canvasRef1.current.getActiveObject().set("fontStyle", "italic");
      canvasRef1.current.requestRenderAll();
    }
  };
  // ************* handleFontStyleNormal

  const handleFontStyleNormal = () => {
    if (canvasRef1.current.getActiveObject()) {
      canvasRef1.current.getActiveObject().set("fontStyle", "normal");
      canvasRef1.current.requestRenderAll();
    }
  };

  const handleTextSize = (arg) => {
    if (canvasRef1.current.getActiveObject()) {
      arg === "minus" && settextSize(textSize - 1);
      arg === "plus" && settextSize(textSize + 1);
      canvasRef1.current.getActiveObject().set("fontSize", textSize);
      canvasRef1.current.requestRenderAll();
    }
  };

  const handleBendText = (e) => {
    setbendText(e.target.value);
    if (canvasRef1.current.getActiveObject()) {
      var path = new fabric.Path(`M 0 1 A  50  ${bendText} 360 1 1 300 1`, {
        fill: "transparent",
      });

      var curveText = canvasRef1.current
        .getActiveObject()
        .set("path", path)
        .set("textAlign", "center");

      canvasRef1.current.requestRenderAll();
    }
  };

  const handleAddObjInActiveCanvas = () => {
    if (canvasRef1.current) {
      // console.log(" after adding canvasRef1 from Dynamic5 🚴🚴🚴", canvasRef1);

      var rect = new fabric.Rect({
        left: 150,
        top: 50,
        fill: "#D81B60",
        width: 50,
        height: 50,
        strokeWidth: 2,
        stroke: "#880E4F",
        rx: 10,
        ry: 10,
        hasControls: true,
      });
      canvasRef1.current.add(rect);
      canvasRef1.current.renderAll();
    }
  };

  const handleEditPhoto = () => {
    seteditPhotoModal(true);

    if (canvasRef1.current) {
      const activeObject = canvasRef1?.current.getActiveObject();

      // console.log("activeObject from handle Copy",activeObject);
      // console.log("activeObject from handle Copy",activeObject._element.currentSrc);

      seteditPhotoSrc(activeObject._element.currentSrc);
    }
  };

  // ********************* handleDesignColor

  const handleDesignColor = (e) => {
    if (canvasRef1?.current) {
      var fill = canvasRef1.current
        .getActiveObject()
        ._objects[0].set("fill", e.target.value);
      canvasRef1.current.requestRenderAll();
    }
  };

  // console.log("🚴🚴🚴 hsndleShowCard from right side" ,hsndleShowCard);

  // ********************************  Canvas for PhotoEdit

  useLayoutEffect(() => {
    const canvas = new fabric.Canvas("photpEditCanvas");
    // console.log("😂😂  photoEditCanvasRef.current BEFORE",  photoEditCanvasRef.current);

    photoEditCanvasRef.current = canvas;

    // console.log("😂😂  photoEditCanvasRef.current AFTER",  photoEditCanvasRef.current);

    // Set the background image
    // fabric.Image.fromURL(editPhotoSrc, (img) => {
    //   canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
    //     scaleX: canvas.width / img.width,
    //     scaleY: canvas.height / img.height,
    //   });
    // });

    // if (canvasRef1.current) {

    //   if (canvasRef1.current.getActiveObject()) {
    //     const activeObj = canvasRef1?.current.getActiveObject().type === 'image'
    //     console.log("activeObj from photoEditCanvasRef" ,activeObj);

    //     if (activeObj) {

    //       if (canvas) {
    //         console.log(" photoEditCanvasRef.current", canvas);
    // console.log("canvasRef1?.current.getActiveObject()",canvasRef1?.current.getActiveObject());
    //        canvas.add(canvasRef1.current.getActiveObject())
    //        canvas.requestRenderAll()

    //         console.log(" After Adding photoEditCanvasRef.current", canvas);

    //       }

    //     }

    //   }

    // }

    // Clean up the canvas when the component unmounts
    return () => {
      // canvas.dispose();
    };
    // }, [editPhotoSrc]);
  }, []);

  useEffect(() => {
    // console.log("from objModify useEffect");

    // if (canvasRef1.current) {
    //   if (canvasRef1.current.getActiveObject()) {
    //     const activeObj =
    //       canvasRef1?.current.getActiveObject().type === "image";
    //     console.log("activeObj from photoEditCanvasRef", activeObj);

    //     if (activeObj) {
    //       if (photoEditCanvasRef.current) {
    //         console.log(
    //           " photoEditCanvasRef.current",
    //           photoEditCanvasRef.current
    //         );
    //         console.log(
    //           "canvasRef1?.current.getActiveObject()",
    //           canvasRef1?.current.getActiveObject()
    //         );
    //         // photoEditCanvasRef.current.add(
    //         //   canvasRef1.current.getActiveObject()
    //         // );
    //         // ************ stencil obj
    //         const stencil = new fabric.Rect({
    //           width:  photoEditCanvasRef.current.width,
    //           height: 100,
    //           fill: "transparent",
    //           opacity: 0.5,
    //           selectable: true, // Make the stencil not selectable
    //         });
    //         photoEditCanvasRef.current.add(stencil);

    //         photoEditCanvasRef.current.setBackgroundImage(
    //           "https://images.unsplash.com/photo-1684848140767-92b247834dc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2N3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=60",
    //           photoEditCanvasRef.current.renderAll.bind(
    //             photoEditCanvasRef.current
    //           )
    //         );
    //         // photoEditCanvasRef.current.requestRenderAll()

    //         console.log(
    //           " After Adding photoEditCanvasRef.current",
    //           photoEditCanvasRef.current
    //         );
    //       }
    //     }
    //   }
    // }
  }, [objModify]);

  // console.log();

  const handleActiveCanvas = (i) => {
    const activeObj = canvasRef1.current.getActiveObject();

    if (activeObj) {
      const preCanvas = canvasRef1.current;

      preCanvas.remove(activeObj);
      preCanvas.requestRenderAll();

      canvasRef1.current = canvasArray[i];
      setdisplay(i);

      const currentCanvas = canvasRef1.current;
      currentCanvas.add(activeObj);
      currentCanvas.requestRenderAll();

      setphotoPrintAreaOffcanvas(false);
      setdesignPrintAreaOffcanvas(false)
      settextPrintAreaOffcanvas(false)
    }

    // if (canvasRef1.current) {
    //   canvasRef1.current.add(activeObj)
    //   canvasRef1.current.requestRenderAll()
    // }
  };
// **********  for  base64
  const handleModify = () => {


    // console.log("handleModify called",canvasRef1.current);

    if (canvasRef1.current) {
      let json = canvasRef1.current.toDataURL({
        format: 'png',
        multiplier: 1.0,  
        // objects: objectsToExport
      })

      setbase64(json)
  
      // console.log("json",json);
    }
   
  }

  if (canvasRef1.current) {
    
    // canvasRef1.current.on('object:modified', handleModify)
  }

  // ****************** get Active obj Image 

  // if (canvasRef1.current) {
  //   const activeObject = canvasRef1?.current.getActiveObject();

  //   // console.log("activeObject from handle Copy",activeObject);
  //   // console.log("activeObject from handle Copy",activeObject._element.currentSrc);

  //   seteditPhotoSrc(activeObject._element.currentSrc);
  // }


  // console.log("editPhotoModal",editPhotoModal);

  return (
    <>
      {/* 🌟🌟🌟🌟🌟🌟🌟 navbar */}

      <Navbar bg="light" variant="light">   
     
          {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
          <Nav className="me-0 " style={{justifyContent:"space-around",alignItems:"center", width:"100%"}}>
            
            <Nav.Link className=" text-center text-dark supportdiv" href="#home">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.6em" height="1.6em"
                        fill="currentColor" class="header-button__icon mb-1">
                        <path
                            d="M21.4,29.9c-1.1,0-2.2-0.2-3.3-0.7c-7-3-12.5-8.6-15.4-15.6C2,11.8,1.9,9.8,2.5,8c1.8-5.2,5.9-5.9,7.6-5.9
                    c0.8,0,1.4,0.5,1.7,1.2l0,0L14,9c0.3,0.7,0.1,1.5-0.4,2l-1.5,1.4l7.3,7.3l1.5-1.5c0.5-0.5,1.3-0.7,2-0.4l5.8,2.4
                    c0.7,0.3,1.2,1,1.2,1.8c-0.2,3.2-2.2,6.1-5.2,7.3C23.6,29.7,22.5,29.9,21.4,29.9z M10,4.2c-1.3,0-4.2,0.6-5.6,4.5
                    C3.9,10.1,4,11.6,4.5,13c2.7,6.4,7.8,11.6,14.2,14.4c1.6,0.7,3.4,0.7,5.1,0c2.3-0.9,3.8-3,3.9-5.5l-5.6-2.3l-1.5,1.5
                    c-0.7,0.7-1.9,0.7-2.6,0l-7.5-7.4c-0.7-0.7-0.7-1.9,0-2.6L12,9.6L10,4.2z M25.9,13.9c-0.8-3.9-3.9-7-7.8-7.8v2.1
                    c2.8,0.7,5,2.9,5.8,5.8L25.9,13.9L25.9,13.9z M27.9,13.9h2C29,7.8,24.2,3,18.1,2.1v2C23.1,4.9,27,8.9,27.9,13.9z">
                        </path>
                    </svg>  <br/>
                  <span > Support </span>
            </Nav.Link>


            <Nav.Link className="text-center text-dark" href="#features">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.6em" height="1.6em"
                        fill="currentColor" class="header-button__icon mb-1">
                        <path
                            d="M28.73 6.65l-4-4.33A1 1 0 0024 2H4a1 1 0 00-1 1v26a1 1 0 001 1h24a1 1 0 001-1V7.33a1 1 0 00-.27-.68zM9 4h14v6H9zm18 24H5V4h2v7a1 1 0 001 1h16a1 1 0 001-1V5.56l2 2.16zM15.92 14.1a4 4 0 104 4 4 4 0 00-4-4zm0 6a2 2 0 112-2 2 2 0 01-2 2z">
                        </path>
                    </svg>   <br/>

              Save
            </Nav.Link>

            {/* <Nav.Link className="mx-5" href="#pricing">
              Share
            </Nav.Link> */}
            <Button
              variant="light"
              className="border-1  text-center "
              onClick={() => setshareOffcanvas(true)}
            >
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.6em" height="1.6em"
                        fill="currentColor" class="header-button__icon mb-1">
                        <path
                            d="M23.6 20.5c-1.1 0-2.1.4-2.8 1.2v.1L12.5 17c.1-.3.2-.7.2-1.1 0-.3-.1-.7-.1-1l8.3-4.7c.8.8 1.8 1.2 2.8 1.2 1.1 0 2.1-.4 2.8-1.2.8-.8 1.2-1.8 1.2-2.8s-.4-2.1-1.2-2.8-1.8-1.2-2.8-1.2c-1.1 0-2.1.4-2.8 1.2-.8.8-1.2 1.8-1.2 2.8 0 .4.1.7.2 1l-8.3 4.7s0-.1-.1-.1c-.8-.6-1.8-1-2.9-1-1.1 0-2.1.4-2.8 1.2-.8.7-1.2 1.7-1.2 2.8 0 1.1.4 2.1 1.2 2.8.8.8 1.8 1.2 2.8 1.2 1.1 0 2.1-.4 2.8-1.2l8.3 4.7c-.4 1.3 0 2.8 1 3.8.8.8 1.8 1.2 2.8 1.2 1.1 0 2.1-.4 2.8-1.2.8-.8 1.2-1.8 1.2-2.8s-.4-2.1-1.2-2.8c-.6-.8-1.6-1.2-2.7-1.2zM22.2 6.1c.4-.4.9-.6 1.4-.6.5 0 1 .2 1.4.6.8.8.8 2 0 2.8-.4.4-.9.6-1.4.6-.5 0-1-.2-1.4-.6-.8-.8-.8-2 0-2.8zM8.6 18c-.5 0-1-.2-1.4-.6-.8-.8-.8-2 0-2.8.4-.4.9-.6 1.4-.6.5 0 1 .2 1.4.6.8.8.8 2 0 2.8-.3.4-.9.6-1.4.6zM25 25.9c-.4.4-.9.6-1.4.6-.5 0-1-.2-1.4-.6-.8-.8-.8-2 0-2.8.4-.4.9-.6 1.4-.6.5 0 1 .2 1.4.6.8.7.8 2 0 2.8z">
                        </path>
                    </svg> <br/>
              Share
            </Button>


            <Nav.Link className="ms-0 text-center text-dark" href="#pricing">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.4em" height="1.4em"
                        fill="currentColor" class="header-button__icon mb-1">
                        <path
                            d="m11 18.8-7.8 7.7v-4.1H0V32h9.6v-3.2H5.4l7.8-7.8-2.2-2.2ZM22.4 0v3.2h4.1L18.7 11l2.3 2.3 7.8-7.9v4.2H32V0h-9.6Z">
                        </path>
                    </svg> <br/>
                    Full Screen
            </Nav.Link>
          </Nav>
       
      </Navbar>

      {/* 🌟🌟🌟🌟🌟🌟 card for Product Color 🌟🌟🌟🌟🌟🌟 card for byDefault*/}
      {showCard === "text" ? (
        <Card style={{ width: "100%"  }}>
          <Card.Body style={{padding:"0px"}}>
            {/* <Card.Title className="text-center mt-3">Text</Card.Title>
            <hr /> */}
         
            <Card.Text className="border-1 mt-3">

              <textarea
                onChange={(e) => {
                  handleText(e);
                }}
                value={textInput}
                name=""
                id=""
                cols="44"
                rows="4"
                placeholder="Enter Your Text" className="text-center pt-3 mx-3 mb-2"
              ></textarea>
              <br />


              <div className=" text-controls">
              <Tooltip id="my-tooltip" />

              {/* ********** color */}
              <div className="colordiv" data-tooltip-id="my-tooltip" data-tooltip-content="Font Color" data-tooltip-place="top">
  
              <input
                type="color"
                onChange={(e) => {
                  handleColor(e);
                }}
                className=" colorpicker "
              />
        
              </div>


              <div className="vr"> </div>
              
              {/* BOLD */}
              <button onClick={handleBold} className=" bolddiv  mx-1 " data-tooltip-id="my-tooltip" data-tooltip-content="Bold" data-tooltip-place="top">
              <FaBold/>
              </button>

              <div className="vr"> </div>

              {/* NORMAL */}
              <button onClick={handleNormal} className=" bolddiv mx-1" data-tooltip-id="my-tooltip" data-tooltip-content="Normal" data-tooltip-place="top">
                N
              </button>

              <div className="vr"> </div>

              {/* ITALIC */}
              <button onClick={handleItalic} className=" bolddiv mx-1" data-tooltip-id="my-tooltip" data-tooltip-content="Italic" data-tooltip-place="top">
              <FaItalic />
              </button>

              <div className="vr"> </div>

              {/* FS NORMAL */}
              {/* <button
                onClick={handleFontStyleNormal}
                className="btn btn-dark mx-1"
              >
                {" "}
                fs Normal
              </button> */}

            
                <div 
                  className="ms-2"
                  onClick={() => {
                    handleTextAlign("left");
                  }} data-tooltip-id="my-tooltip" data-tooltip-content="Align Left" data-tooltip-place="top"
                >
                  <FaAlignLeft />
                </div>

                <div className="vr"> </div>
                
                <div
                  className="ms-2"
                  onClick={() => {
                    handleTextAlign("center");
                  }} data-tooltip-id="my-tooltip" data-tooltip-content="Align Center" data-tooltip-place="top"
                >
                  <FaAlignCenter />
                </div>

                <div className="vr"> </div>

                <div
                  className="ms-2"
                  onClick={() => {
                    handleTextAlign("right");
                  }} data-tooltip-id="my-tooltip" data-tooltip-content="Align Right" data-tooltip-place="top"
                >
                  <FaAlignRight />
                </div>

                <div className="vr"> </div>

                <div
                  className="ms-2"
                  onClick={() => {
                    handleTextAlign("right");
                  }} data-tooltip-id="my-tooltip" data-tooltip-content="Align Justify" data-tooltip-place="top"
                >
                  <FaAlignJustify  />
                </div>

                
              </div>
              
              {/* <hr /> */}
                
              {/* *********** font Style  Archive */}

              <div class="dropdown text-center mt-3">
                {/* <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Select Font
                </button> */}
                {/* <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" > */}
                  
                  <select className="form-select w-50 text-center mx-auto" onClick={handleFont}>
                    <option value={null}>Select font</option>
                    <option value="Monoton">Monoton</option>
                    <option value="Cursive">Cursive</option>
                    <option value="Great Vibes">Great Vibes </option>
                    <option value="Playball">Playball</option>
                    <option value="Orbitron">Orbitron</option>
                    <option value="impact">Impact</option>
                    <option value="Permanent Marker">Permanent Marker</option>
                    <option value="MeGrim">MeGrim</option>
                    <option value="BUNGEE INLINE">BUNGEE INLINE</option>
                    <option value="verdana">Verdana</option>
                    <option value="Euphorigenic">Euphorigenic</option>
                    <option value="courier">Courier</option>
                    {/*  */}
                  </select>
                {/* </ul> */}
              </div>

              {/* <hr/> */}
              
              {/* *********** Text size */}

              <div className="d-flex my-3">
                <button className="btn btn-outline-dark  w-100 border-start-0" >Text Size </button>
                <button
                  onClick={() => handleTextSize("minus")}
                  className="btn btn-outline-dark px-4 minusdiv"
                >
                  -
                </button>
                <button className="btn btn-outline-dark px-4 minusdiv">
                  {textSize}
                </button>
                <button
                  onClick={() => handleTextSize("plus")}
                  className="btn btn-outline-dark px-4 minusdiv border-end-0"
                >
                  +
                </button>
              </div>

              {/* <hr /> */}


              {/* curveText */}
              <div className="d-flex justify-content-between">
                <button className="btn ">Bend Text </button>
                <button className="btn btn-outline-dark me-3">{bendText} </button>
              </div>
              
              <input
                type="range"
                onChange={(e) => handleBendText(e)}
                className="form-range mt-2 px-2"
                min="-50"
                max="50"
                value={bendText}
                step="2"
              />

              
              <hr />

              <div className="d-flex  lastdiv">

                {/* SEND TO BACK */}
                <button
                  onClick={handleSendToBack}
                  className=" sendtoback mx-1"
                >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.5em" height="1.5em" fill="currentColor">
                                    <path d="M19 13V2H2v17h11v11h17V13Zm-4.29 0L17 10.71V13ZM4 4h2.29L4 6.29Zm0 3.71L7.71 4h2.58L4 10.29Zm0 4L11.71 4h2.58L4 14.29ZM4 17v-1.29L15.71 4H17v1.29L5.29 17Zm2.71 0L17 6.71v2.58L13.29 13H13v.29L9.29 17Zm4 0L13 14.71V17ZM28 28H15V15h13ZM24 8V5.41l4.29 4.3 1.42-1.42L25.41 4H28V2h-6v6h2z">
                                    </path>
                                </svg>
                                <br/>
                 <span>Send to back</span> 
                </button>

                  {/* BRING TO FRONT */}
                <button
                  onClick={handleBringToFront}
                  className=" sendtoback mx-1"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.5em" height="1.5em" fill="currentColor">
                                    <path d="M28 4v2.59l-4.29-4.3-1.42 1.42L26.59 8H24v2h6V4h-2zm-9 9V2H2v17h11v11h17V13Zm6.29 2L15 25.29v-2.58L22.71 15ZM15 21.29v-2.58L18.71 15h2.58ZM17.29 15 15 17.29V15ZM4 17V4h13v9h-4v4Zm24 11h-2.29L28 25.71Zm0-3.71L24.29 28h-2.58L28 21.71Zm0-4L20.29 28h-2.58L28 17.71Zm0-4L16.29 28H15v-1.29L26.71 15H28Z">
                                    </path>
                                </svg>
                                <br/>
                  <span>Bring to Front</span>
                </button>

                {/* PRINT */}
                <button className=" sendtoback mx-1"  onClick={() => settextPrintAreaOffcanvas(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.5em" height="1.5em" fill="currentColor">
                                    <path d="M13 19v7H6V6h7v7h2V4H4v24h11v-9h-2zm4-15v6h2V6h7v20h-7v-4h-2v6h11V4H17zm.34 9.17L19.17 15H10v2h9.17l-1.83 1.83 1.42 1.41L23 16l-4.24-4.24-1.42 1.41z">
                                    </path>
                                </svg>
                                 <br/>
                                <span>Print Area </span></button>

                {/* COPY */}
                <button onClick={handleCopy} className=" sendtoback mx-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.5em" height="1.5em" fill="currentColor">
                                    <path d="M27.3 2.49H13.24a2.57 2.57 0 0 0-2.57 2.57v1.79H6.73a1.67 1.67 0 0 0-1.67 1.67v20a1.67 1.67 0 0 0 1.67 1.68h15a1.67 1.67 0 0 0 1.67-1.67v-2.09h3.9a2.57 2.57 0 0 0 2.57-2.57V5.06a2.57 2.57 0 0 0-2.57-2.57zM21.36 28.2H7.06V8.85h14.3zm6.51-4.33a.57.57 0 0 1-.57.57h-3.94V8.52a1.67 1.67 0 0 0-1.67-1.67h-9V5.06a.57.57 0 0 1 .57-.57H27.3a.57.57 0 0 1 .57.57z">
                                    </path>
                                </svg>
                                <br/>
                  <span> Copy </span>
                </button>

                {/* DELETE */}
                <button onClick={handleRemove} className=" sendtoback mx-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.5em" height="1.5em" fill="currentColor">
                                    <path d="m10.992 23.623.022-11.38 2 .003-.022 11.38zm3.928 0 .021-11.38 2 .003-.021 11.38zm4.077 0 .022-11.38 2 .003-.022 11.38zM27.94 5.75h-7.66a4.4 4.4 0 0 0-8.68 0H3.94v2H5v.29L6.71 26.6a3.73 3.73 0 0 0 3.76 3.4h10.94a3.73 3.73 0 0 0 3.76-3.4L26.81 8v-.29h1.11zm-4.76 20.68A1.75 1.75 0 0 1 21.41 28H10.47a1.75 1.75 0 0 1-1.77-1.57L7.07 7.87h17.75zM15.94 4.09a2.41 2.41 0 0 1 2.28 1.66h-4.56a2.41 2.41 0 0 1 2.28-1.66z">
                                    </path>
                                </svg>
                  <br/>
                 <span> Delete</span>
                </button>


              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      ) : showCard === "image" ? (
        <Card style={{ width: "100%"  }}>
          <Card.Body>
            {/* <Card.Title className="text-center">Upload Card</Card.Title>
            <hr />
            <Card.Subtitle className="mb-2 text-muted"> </Card.Subtitle> */}
            <Card.Text className="border-1 mt-2">
              <div className="d-flex justify-content-between">
                <p>Print Method</p>
                <p>Digital Method</p>
              </div>
              <hr />
              <div
                onClick={() => {
                  handleEditPhoto();
                }}
              >
                Edit Photo{" "}
              </div>
              <hr />
         
              <div className="d-flex uploaddiv">

                {/* SEND TO BACK */}
                <button
                  onClick={handleSendToBack}
                  className="sendtoback mx-1"
                >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.5em" height="1.5em" fill="currentColor">
                                    <path d="M19 13V2H2v17h11v11h17V13Zm-4.29 0L17 10.71V13ZM4 4h2.29L4 6.29Zm0 3.71L7.71 4h2.58L4 10.29Zm0 4L11.71 4h2.58L4 14.29ZM4 17v-1.29L15.71 4H17v1.29L5.29 17Zm2.71 0L17 6.71v2.58L13.29 13H13v.29L9.29 17Zm4 0L13 14.71V17ZM28 28H15V15h13ZM24 8V5.41l4.29 4.3 1.42-1.42L25.41 4H28V2h-6v6h2z">
                                    </path>
                                </svg>
                                <br/>
                 <span>Send to back</span> 
                </button>

                {/* BRING TO FRONT */}
                <button
                  onClick={handleBringToFront}
                  className=" sendtoback mx-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.5em" height="1.5em" fill="currentColor">
                                    <path d="M28 4v2.59l-4.29-4.3-1.42 1.42L26.59 8H24v2h6V4h-2zm-9 9V2H2v17h11v11h17V13Zm6.29 2L15 25.29v-2.58L22.71 15ZM15 21.29v-2.58L18.71 15h2.58ZM17.29 15 15 17.29V15ZM4 17V4h13v9h-4v4Zm24 11h-2.29L28 25.71Zm0-3.71L24.29 28h-2.58L28 21.71Zm0-4L20.29 28h-2.58L28 17.71Zm0-4L16.29 28H15v-1.29L26.71 15H28Z">
                                    </path>
                                </svg>
                                <br/>
                  <span>Bring to Front</span>
                </button>

                {/* PRINT AREA */}
                <button
                  className="sendtoback mx-1"
                  onClick={() => setphotoPrintAreaOffcanvas(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.5em" height="1.5em" fill="currentColor">
                                    <path d="M13 19v7H6V6h7v7h2V4H4v24h11v-9h-2zm4-15v6h2V6h7v20h-7v-4h-2v6h11V4H17zm.34 9.17L19.17 15H10v2h9.17l-1.83 1.83 1.42 1.41L23 16l-4.24-4.24-1.42 1.41z">
                                    </path>
                                </svg>
                                 <br/>
                                <span>Print Area </span>
                </button>

                {/* COPY */}
                <button onClick={handleCopy} className="sendtoback mx-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.5em" height="1.5em" fill="currentColor">
                                    <path d="M27.3 2.49H13.24a2.57 2.57 0 0 0-2.57 2.57v1.79H6.73a1.67 1.67 0 0 0-1.67 1.67v20a1.67 1.67 0 0 0 1.67 1.68h15a1.67 1.67 0 0 0 1.67-1.67v-2.09h3.9a2.57 2.57 0 0 0 2.57-2.57V5.06a2.57 2.57 0 0 0-2.57-2.57zM21.36 28.2H7.06V8.85h14.3zm6.51-4.33a.57.57 0 0 1-.57.57h-3.94V8.52a1.67 1.67 0 0 0-1.67-1.67h-9V5.06a.57.57 0 0 1 .57-.57H27.3a.57.57 0 0 1 .57.57z">
                                    </path>
                                </svg>
                                <br/>
                  <span> Copy </span>
                </button>

                {/* DELETE */}
                <button onClick={handleRemove} className="sendtoback mx-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.5em" height="1.5em" fill="currentColor">
                                    <path d="m10.992 23.623.022-11.38 2 .003-.022 11.38zm3.928 0 .021-11.38 2 .003-.021 11.38zm4.077 0 .022-11.38 2 .003-.022 11.38zM27.94 5.75h-7.66a4.4 4.4 0 0 0-8.68 0H3.94v2H5v.29L6.71 26.6a3.73 3.73 0 0 0 3.76 3.4h10.94a3.73 3.73 0 0 0 3.76-3.4L26.81 8v-.29h1.11zm-4.76 20.68A1.75 1.75 0 0 1 21.41 28H10.47a1.75 1.75 0 0 1-1.77-1.57L7.07 7.87h17.75zM15.94 4.09a2.41 2.41 0 0 1 2.28 1.66h-4.56a2.41 2.41 0 0 1 2.28-1.66z">
                                    </path>
                                </svg>
                  <br/>
                 <span> Delete</span>
                </button>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      ) : showCard === "group" ? (
        <Card style={{ width: "100%"  }}>
          <Card.Body>
            {/* <Card.Title className="text-center">Design Card</Card.Title>
            <hr />
            <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle> */}
            <Card.Text className="border-1 mt-2">
          
              <strong>
                {" "}
                Colors :{" "}
                <input
                  className="mx-5"
                  type="color"
                  onChange={(e) => handleDesignColor(e)}
                />
              </strong>

              <hr />
             
              <div className="d-flex designdiv">

                {/* SEND TO BACK */}
                <button
                  onClick={handleSendToBack}
                  className=" sendtoback mx-1"
                >
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.5em" height="1.5em" fill="currentColor">
                                    <path d="M19 13V2H2v17h11v11h17V13Zm-4.29 0L17 10.71V13ZM4 4h2.29L4 6.29Zm0 3.71L7.71 4h2.58L4 10.29Zm0 4L11.71 4h2.58L4 14.29ZM4 17v-1.29L15.71 4H17v1.29L5.29 17Zm2.71 0L17 6.71v2.58L13.29 13H13v.29L9.29 17Zm4 0L13 14.71V17ZM28 28H15V15h13ZM24 8V5.41l4.29 4.3 1.42-1.42L25.41 4H28V2h-6v6h2z">
                                    </path>
                                </svg>
                                <br/>
                 <span>Send to back</span> 
                </button>

                {/* BRING TO FRONT */}
                <button
                  onClick={handleBringToFront}
                  className="sendtoback mx-1"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.5em" height="1.5em" fill="currentColor">
                                    <path d="M28 4v2.59l-4.29-4.3-1.42 1.42L26.59 8H24v2h6V4h-2zm-9 9V2H2v17h11v11h17V13Zm6.29 2L15 25.29v-2.58L22.71 15ZM15 21.29v-2.58L18.71 15h2.58ZM17.29 15 15 17.29V15ZM4 17V4h13v9h-4v4Zm24 11h-2.29L28 25.71Zm0-3.71L24.29 28h-2.58L28 21.71Zm0-4L20.29 28h-2.58L28 17.71Zm0-4L16.29 28H15v-1.29L26.71 15H28Z">
                                    </path>
                                </svg>
                                <br/>
                  <span>Bring to Front</span>
                </button>

                {/* PRINT AREA */}
                <button className="sendtoback mx-1" onClick={() => setdesignPrintAreaOffcanvas(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.5em" height="1.5em" fill="currentColor">
                                    <path d="M13 19v7H6V6h7v7h2V4H4v24h11v-9h-2zm4-15v6h2V6h7v20h-7v-4h-2v6h11V4H17zm.34 9.17L19.17 15H10v2h9.17l-1.83 1.83 1.42 1.41L23 16l-4.24-4.24-1.42 1.41z">
                                    </path>
                                </svg>
                                 <br/>
                                <span>Print Area </span>
                </button>

                {/* COPY */}
                <button onClick={handleCopy} className=" sendtoback mx-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.5em" height="1.5em" fill="currentColor">
                                    <path d="M27.3 2.49H13.24a2.57 2.57 0 0 0-2.57 2.57v1.79H6.73a1.67 1.67 0 0 0-1.67 1.67v20a1.67 1.67 0 0 0 1.67 1.68h15a1.67 1.67 0 0 0 1.67-1.67v-2.09h3.9a2.57 2.57 0 0 0 2.57-2.57V5.06a2.57 2.57 0 0 0-2.57-2.57zM21.36 28.2H7.06V8.85h14.3zm6.51-4.33a.57.57 0 0 1-.57.57h-3.94V8.52a1.67 1.67 0 0 0-1.67-1.67h-9V5.06a.57.57 0 0 1 .57-.57H27.3a.57.57 0 0 1 .57.57z">
                                    </path>
                                </svg>
                                <br/>
                  <span> Copy </span>
                </button>

                {/* DELETE */}
                <button onClick={handleRemove} className=" sendtoback   mx-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.5em" height="1.5em" fill="currentColor">
                                    <path d="m10.992 23.623.022-11.38 2 .003-.022 11.38zm3.928 0 .021-11.38 2 .003-.021 11.38zm4.077 0 .022-11.38 2 .003-.022 11.38zM27.94 5.75h-7.66a4.4 4.4 0 0 0-8.68 0H3.94v2H5v.29L6.71 26.6a3.73 3.73 0 0 0 3.76 3.4h10.94a3.73 3.73 0 0 0 3.76-3.4L26.81 8v-.29h1.11zm-4.76 20.68A1.75 1.75 0 0 1 21.41 28H10.47a1.75 1.75 0 0 1-1.77-1.57L7.07 7.87h17.75zM15.94 4.09a2.41 2.41 0 0 1 2.28 1.66h-4.56a2.41 2.41 0 0 1 2.28-1.66z">
                                    </path>
                                </svg>
                  <br/>
                 <span> Delete</span>
                </button>

              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <Card.Title className="text-center">Product Card</Card.Title>
            <hr />
            <Card.Subtitle className="mb-2 text-muted">
              <h5>Product Details</h5>
            </Card.Subtitle>
            <hr />
            <Card.Text>
              <h6>Product Name : xyz...</h6>
              <h6>Product Id : {productData?.id}</h6>
              <h6>Product Avtar : </h6>{" "}
              <img
                src={productData?.url}
                alt="Product Img"
                height={100}
                width={150}
              />
              <h6>Product Name : xyz...</h6>
              <br />
              <h5>Product Color :</h5> <input type="color" />
            </Card.Text>
          </Card.Body>
        </Card>
      )}

      {/* 🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟 offcanvas  for Share */}

      <Offcanvas
        placement="end"
        show={shareOffcanvas}
        onHide={() => setshareOffcanvas(false)}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Share</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FacebookShareButton url={shareUrl} quote={title}>
            <h1>
              <FaFacebook />
            </h1>
          </FacebookShareButton>
          <WhatsappShareButton url={shareUrl} title={title}>
            <h1 className="mx-5">
              <FaWhatsapp />
            </h1>
          </WhatsappShareButton>
        </Offcanvas.Body>
      </Offcanvas>

      {/*offcanvas for printArea photo  */}
      <Offcanvas
        placement="end"
        show={photoPrintAreaOffcanvas}
        onHide={() => setphotoPrintAreaOffcanvas(false)}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Photo Print Area</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="row">
            {arr.map((item, i) => (
              <div className="col-sm-6 my-2 gap-1">
                <div
                  className="card"
                  onClick={() => {
                    handleActiveCanvas(i);
                  }}
                >
                  <img src={item} alt="" className="img-fluid" />
                </div>
              </div>
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      {/*offcanvas for printArea Text  */}
      <Offcanvas
        placement="end"
        show={textPrintAreaOffcanvas}
        onHide={() => settextPrintAreaOffcanvas(false)}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Text Print Area</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="row">
            {arr.map((item, i) => (
              <div className="col-sm-6 my-2 gap-1">
                <div
                  className="card"
                  onClick={() => {
                    handleActiveCanvas(i);
                  }}
                >
                  <img src={item} alt="" className="img-fluid" />
                </div>
              </div>
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      {/*offcanvas for printArea Design  */}
      <Offcanvas
        placement="end"
        show={designPrintAreaOffcanvas}
        onHide={() => setdesignPrintAreaOffcanvas(false)}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Design Print Area</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="row">
            {arr.map((item, i) => (
              <div className="col-sm-6 my-2 gap-1">
                <div
                  className="card"
                  onClick={() => {
                    handleActiveCanvas(i);
                  }}
                >
                  <img src={item} alt="" className="img-fluid" />
                </div>
              </div>
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* ************* modalWindow for Edit Photo */}

      <Modal
        size="xl"
        show={editPhotoModal}
        onHide={() => seteditPhotoModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            <div className="d-flex justify-content-between">
              <div className="text-center mx-5"> Product Modal </div>
              <div className="text-center " style={{ marginLeft: 500 }}>
                {" "}
                Product Modal{" "}
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-sm-6">
              <div className="offset-3">
                <canvas
                  id="photpEditCanvas"
                  height={20}
                  width={20}
                  style={{ border: "2px dashed hotpink" }}
                ></canvas>
                 
{                 editPhotoSrc && <img src={editPhotoSrc}  className="img-fluid" alt="" />
}              </div>
            </div>
            <div className="col-sm-6">
              <div className="card">
                <div className="card-header">
                  <div className="d-flex">
                    <h4 className="mx-5 text-center" onClick={() => seteditPhotoCard("Stencils")}>Stencils</h4>
                    <h4 className="mx-5 text-center" onClick={() => seteditPhotoCard("Filter")}>Filter</h4>
                    <h4 className="mx-5 text-center" onClick={() => seteditPhotoCard("Setting")}>Setting</h4>
                  </div>
                </div>
             {  editPhotoCard === "Stencils"  ? <div className="card-body d-flex">
                    
               <div className="mx-2">
               <img src="http://fabricjs.com/assets/133.svg" alt=""  className="img-fluid" height={100} width={100}/>
               </div>
                  
               <div className="mx-2">

                    <img src="http://fabricjs.com/assets/58.svg" alt=""  className="img-fluid" height={100} width={100}/>
                 </div>
                 <div className="mx-2">

                    <img src="https://designer.spreadshirt.com/designer-service/v1/masks/bc9fc49c-e66e-4c2c-b836-7d2ea2fc55a0/render?width=250" alt=""  className="img-fluid" height={100} width={100}/>
                    </div>
                </div>
               : editPhotoCard === "Filter" ? <div className="card-body">
                  <Filter />
                 
                </div>
               : <div className="card-body">
               
                  {canvasRef1?.current && <Effect />}
                </div>
             }
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
