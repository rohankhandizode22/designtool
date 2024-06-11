import React, { useLayoutEffect, useContext } from "react";
import { fabric } from "fabric";
import { UserContext } from "../App";
import { MainContext } from "./MainSection";

export default function Canvas({ id, width, height }) {
  const { canvasArray, canvasRef1 ,base64Array } =
    useContext(UserContext);
  const {  setshowCard, objModify, setobjModify } =
    useContext(MainContext);

  var canvas1;

  const handleObjectSelectionCreate = (e) => {
    if (canvasRef1.current) {
      var cardType = canvasRef1.current.getActiveObject().type;

      setshowCard(cardType);
      setobjModify(objModify + 1);
    }
  };
  const handleObjectSelectionCleared = (e) => {
    if (canvasRef1.current) {
      var cardType = canvasRef1.current.getActiveObject();
      setshowCard("product");
      setobjModify(0);
    }
  };
  // const handleObjectAdded = (e) => {
  //   // setshowCard(e.target.type)
  // };

  // const handleObjectmodified = () => {
  //   // alert("object Modify")
  //   // setobjModify(objModify + 1)
  //   // setobjModify(objModify + 1)
  //   // console.log("handleObjectmodified called");
  // };

  useLayoutEffect(() => {
    canvas1 = new fabric.Canvas(`canvas${id}`, {
      preserveObjectStacking: true,
    });

    canvasArray.push(canvas1);
    base64Array.push(id)

    canvas1.requestRenderAll();
    canvas1.on("selection:created", handleObjectSelectionCreate);
    canvas1.on("selection:cleared", handleObjectSelectionCleared);
    // canvas1.on("object:modified", handleObjectmodified);

    return () => {
      canvas1?.dispose();
    };
  }, []);
  return (
    <div style={{ marginLeft: 60 }}>
      <canvas
        id={`canvas${id}`}
        height={height}
        width={width}
        style={{ border: "2px dashed hotpink", display: "block" }}
      ></canvas>
    </div>
  );
}
