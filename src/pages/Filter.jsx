import React, { useEffect, useState, useContext } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";

import { fabric } from "fabric";
import { UserContext } from "../App";

export default function Filter(props) {  
  const { canvasRef1 } =
    useContext(UserContext);
  const [originalImg, setOriginalImg] = useState();
  const [image, setImage] = useState();
  useEffect(() => {
    if (canvasRef1.current?.getActiveObject()) {
      if (canvasRef1.current?.getActiveObject().type == "image") {
        setOriginalImg(canvasRef1.current.getActiveObject());
        setImage(canvasRef1.current.getActiveObject().getSrc());
      }
    }
  }, [canvasRef1.current?.getActiveObject()]);

  const setActiveImage = () => {
    if (canvasRef1.current?.getActiveObject()) {
      if (canvasRef1.current?.getActiveObject()?.type == "image") {
        setOriginalImg(canvasRef1.current.getActiveObject());
        setImage(canvasRef1.current.getActiveObject().getSrc());
      }
    }
  };
  if (canvasRef1.current) {
    
      canvasRef1.current.on("mouse:down", setActiveImage);

      // console.log("originalImg",originalImg);
      // console.log("canvasRef1.current",canvasRef1.current);
  }
  /************************* Set sepia effect *******************************/
  const handleSepia = (e) => {
    canvasRef1.current.getActiveObject().filters = [];
    canvasRef1.current.getActiveObject().applyFilters();
    canvasRef1.current.requestRenderAll();
    var sepia = new fabric.Image.filters.Sepia();  
    canvasRef1.current.getActiveObject().filters.push(sepia);
    var aspectRatio = originalImg.width / originalImg.height;
    canvasRef1.current
      .getActiveObject()
      .set("width", originalImg.height * aspectRatio);
    canvasRef1.current.getActiveObject().applyFilters();
    canvasRef1.current.requestRenderAll();

    // console.log(" canvasRef1.current from handleSepia" , canvasRef1.current);
  };

  /************************* Set invert effect *******************************/
  const handleInvert = (e) => {
    canvasRef1.current.getActiveObject().filters = [];
    canvasRef1.current.getActiveObject().applyFilters();
    canvasRef1.current.requestRenderAll();
    var invert = new fabric.Image.filters.Invert();
    canvasRef1.current.getActiveObject().filters.push(invert);
    var aspectRatio = originalImg.width / originalImg.height;
    canvasRef1.current
      .getActiveObject()
      .set("width", originalImg.height * aspectRatio);
    canvasRef1.current.getActiveObject().applyFilters();
    canvasRef1.current.requestRenderAll();
    // console.log(" handleInvert 👑👑 aspectRatio" , aspectRatio);
    // console.log(" canvasRef1.current._activeObject from handleInvert" , canvasRef1.current._activeObject);
    // console.log(" canvasRef1.current.getActiveObject() from handleInvert" , canvasRef1.current.getActiveObject());

  };

  /************************* Set grayscale effect *******************************/
  const handleGrayScale = (e) => {
    canvasRef1.current.getActiveObject().filters = [];
    canvasRef1.current.getActiveObject().applyFilters();
    canvasRef1.current.requestRenderAll();
    var grayscale = new fabric.Image.filters.Grayscale();
    canvasRef1.current.getActiveObject().filters.push(grayscale);
    var aspectRatio = originalImg.width / originalImg.height;
    canvasRef1.current
      .getActiveObject()
      .set("width", originalImg.height * aspectRatio);
    canvasRef1.current.getActiveObject().applyFilters();
    canvasRef1.current.requestRenderAll();
  };

  /************************* Set huerotation effect *******************************/
  const handleHueRotation = (e) => {
    canvasRef1.current.getActiveObject().filters = [];
    canvasRef1.current.getActiveObject().applyFilters();
    canvasRef1.current.requestRenderAll();
    var hue = new fabric.Image.filters.HueRotation({ rotation: 0.4 });
    canvasRef1.current.getActiveObject().filters.push(hue);
    var aspectRatio = originalImg.width / originalImg.height;
    canvasRef1.current
      .getActiveObject()
      .set("width", originalImg.height * aspectRatio);
    canvasRef1.current.getActiveObject().applyFilters();
    canvasRef1.current.requestRenderAll();
  };

  /************************* Set saturation effect *******************************/
  const handleSaturation = (e) => {
    canvasRef1.current.getActiveObject().filters = [];
    canvasRef1.current.getActiveObject().applyFilters();
    canvasRef1.current.requestRenderAll();
    var hue = new fabric.Image.filters.Saturation({ saturation: 1 });
    canvasRef1.current.getActiveObject().filters.push(hue);
    var aspectRatio = originalImg.width / originalImg.height;
    canvasRef1.current
      .getActiveObject()
      .set("width", originalImg.height * aspectRatio);
    canvasRef1.current.getActiveObject().applyFilters();
    canvasRef1.current.requestRenderAll();
  };

  /************************* Set Contrast effect *******************************/
  const handleContrast = (e) => {
    canvasRef1.current.getActiveObject().filters = [];
    canvasRef1.current.getActiveObject().applyFilters();
    canvasRef1.current.requestRenderAll();
    var contrast = new fabric.Image.filters.Contrast({ contrast: 0.25 });
    canvasRef1.current.getActiveObject().filters.push(contrast);
    var aspectRatio = originalImg.width / originalImg.height;
    canvasRef1.current
      .getActiveObject()
      .set("width", originalImg.height * aspectRatio);
    canvasRef1.current.getActiveObject().applyFilters();
    canvasRef1.current.requestRenderAll();
  };

  return (
    <>
      <div>
       
        <Row>
          <div className="d-flex">
            <Stack direction="horizontal" gap={1} className="abc">
              <div className="image_filter filter_newSec">
                <label className="btn btn-dark">
                  <input
                    type="radio"
                    name="effect"
                    className=" btn btn-dark"
                    id="btncheck1"
                    onClick={handleSepia}
                  />
                  <img className="img-fluid" width={150} height={175} src={image} crossOrigin="anonymous" style={{ filter: "sepia(100%)" }} />
                </label>
              </div>
              <div className="image_filter filter_newSec">
                <label className="btn ">
                  <input
                    type="radio"
                    name="effect"
                    className="btn-check"
                    id="btncheck1"
                    onClick={handleInvert}
                  />
                  <img crossOrigin="anonymous" className="img-fluid" width={150} height={175} src={image} style={{ filter: "invert(45)" }} />
                </label>
              </div>
              <div className="image_filter filter_newSec">
                <label className="btn ">
                  <input
                    type="radio"
                    name="effect"
                    className="btn-check"
                    id="btncheck1"
                    onClick={handleGrayScale}
                  />
                  <img crossOrigin="anonymous" className="img-fluid" width={150} height={175} src={image} style={{ filter: "grayscale(1)" }} />
                </label>
              </div>
              <div className="image_filter filter_newSec">
                <label className="btn ">
                  <input
                    type="radio"
                    name="effect"
                    className="btn-check"
                    id="btncheck1"
                    onClick={handleHueRotation}
                  />
                  <img crossOrigin="anonymous" className="img-fluid" width={150} height={175} src={image} style={{ filter: "hue-rotate(45)" }} />
                </label>
              </div>
              <div className="image_filter filter_newSec">
                <label className="btn ">
                  <input
                    type="radio"
                    name="effect"
                    className="btn-check"
                    id="btncheck1"
                    onClick={handleSaturation}
                  />
                  <img crossOrigin="anonymous" className="img-fluid" width={150} height={175} src={image} style={{ filter: "saturate(5)" }} />
                </label>
              </div>
              <div className="image_filter filter_newSec">
                <label className="btn ">
                  <input
                    type="radio"
                    name="effect"
                    className="btn-check"
                    id="btncheck1"
                    onClick={handleContrast}
                  />
                  <img crossOrigin="anonymous" className="img-fluid" width={150} height={175} src={image} style={{ filter: "contrast(1)" }} />
                </label>
              </div>
            </Stack>
          </div>
        </Row>
      </div>
Hello
{      originalImg &&  <img className="img-fluid" width={150} height={175} src={originalImg} alt="originalImg" />
}    </>
  );
}
