import React,{useContext} from 'react'
import { UserContext } from '../App';
import { fabric } from 'fabric'

export default function Footer() {
    const {canvasArray ,canvasRef1} = useContext(UserContext)


    const handleAddObjInCanvas = () => {   

        if (canvasRef1.current) {
          
      
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
        canvasRef1.current.add(rect)
        canvasRef1.current.renderAll()
      }
      }
  return (
    <div>Footer
    
    <button className='btn btn-dark' onClick={() => {handleAddObjInCanvas()}}>addobj</button>
</div>
  )
}
