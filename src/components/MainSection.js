import React, { createContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LeftSide from "./LeftSide";
import Middle from "./Middle";
import RightSide from "./RightSide";
// import Filter from "../pages/Filter";
// import Effect from "../pages/Effect";

const MainContext = createContext("");

export default function MainSection() {
  const [showCard, setshowCard] = useState();
  const [objModify, setobjModify] = useState(0)
  const [display, setdisplay] = useState(0);

  const [base64, setbase64] = useState()

  var anir = "Hello";

  
  return (
    <>
      <MainContext.Provider
        value={{
          anir,
          showCard,
          setshowCard,
          objModify, setobjModify,
          display, setdisplay,
          base64, setbase64
      }}
      >
        <Container  bg="light">
          <Row className="mt-5 mx-5">
            <Col xs={1}>
              <LeftSide />
            </Col>
            <Col className="mx-5" xs={6}>
              <Middle />
            </Col>
            <Col xs={4} >
              <RightSide />
            </Col>
          </Row>
          <hr />
          {/* <Filter /> */}
          {/* <Effect/> */}
        </Container>
      </MainContext.Provider>
    </>
  );
}
export { MainContext };
