import {  createContext, useRef, useEffect } from "react";
import {  useFabricJSEditor } from "fabricjs-react";

import MainSection from "./components/MainSection";
const UserContext = createContext("");
function App() {
  const canvasRef1 = useRef(null);
  const photoEditCanvasRef = useRef(null);
  var canvasArray = [];
  var base64Array = []


  const { selectedObjects, editor } = useFabricJSEditor();



  const arr = [
    "https://image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/1/appearances/2,width=450,height=400",
    "https://image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/2/appearances/2,width=450,height=400",
    "https://image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/3/appearances/2,width=450,height=400",
    "https://image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/4/appearances/2,width=450,height=400",
    "https://image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/12/appearances/2,width=1200,height=1200",
  ];


  

  useEffect(() => {

    canvasRef1.current = canvasArray[0];
    
  }, [canvasArray])
  

  return (
    <div>
      <UserContext.Provider
        value={{
          canvasArray,
          canvasRef1,
          arr,
          editor,
          photoEditCanvasRef,
          base64Array
        }}
      >
        <MainSection />
      </UserContext.Provider>
    </div>
  );
}
export default App;

export { UserContext };
