import React, { useContext, useState, useRef } from "react";
import Canvas from "./Canvas";
import { UserContext } from "../App";
import { MainContext } from "./MainSection";

const Middle = React.memo(() => {
  const { canvasArray, canvasRef1, arr,  setshowCard } =
    useContext(UserContext);
  const { display, setdisplay } = useContext(MainContext);
  const divRef = useRef(null);

  // const [count, setcount] = useState(100);

  // ***** handleActiveCanvas *****

  const handleActiveCanvas = (i) => {
    canvasRef1.current = canvasArray[i];
    setdisplay(i);
  };
  //   // canvasRef1?.current &&  canvasRef1?.current.on("selection:created", handleJson);
  // const handleJson = () => {
  //   if (canvasRef1.current) {
  //     let json = canvasRef1.current.toDataURL({
  //       format: 'png',
  //       multiplier: 1.0,
  //     })

  //     console.log("👑👑👑👑json 😊😊",json);
  //   }

  // }

  return (
    <div>
      <div className="d-flex" style={{ marginBottom: 60,justifyContent:"center" }}>
        {arr.map((item, i) => (
          <>
            <div
              ref={divRef}
              className="ms-5"
              key={i}
              style={{
                // padding: 80,
                height: 400,
                width: 450,
                position: "relative",
                // border: "2px solid blue",
                display: i === display ? "block" : "none",
              }}
            >
              <div>
                <img src={item} alt="" className="img-fluid" />
              </div>
              <div
                style={{ position: "absolute", top: 120, left: 82 }}
                className="mx-1"
                key={i}
              >
                <Canvas
                  setshowCard={setshowCard}
                  width={160}
                  height={200}
                  key={i}
                  id={i}
                />
              </div>
            </div>
          </>
        ))}
      </div>
      {/* <hr /> */}
      <div className="d-flex px-5">
        {arr.map((item, i) => (
          <>
            <div
              className="card w-25 p-2 justify-content-center  text-info mx-2"
              onClick={() => handleActiveCanvas(i)}
              // style={{    backgroundImage: `url(${item})`}}
            >
              <div>
                <img src={item} alt="" className="img-fluid" />
              </div>
              {/* {         base64 &&  <img style={{position:"absolute" ,height:70, top:35 , left:45}} src={base64} alt="" className="img-fluid" />
}   */}
            </div>
          </>
        ))}
      </div>
      <br />
      {/* <button className='btn btn-dark' onClick={() => {handleActiveCanvas(1)}}>canvas {1}</button> */}
    </div>
  );
});

export default Middle;
