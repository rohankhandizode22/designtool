import React, { useContext, useEffect, useState } from "react";
import {
  Col,
  Form,
  Nav,
  Row,  
  Stack,
  Tab,
} from "react-bootstrap";

import { fabric } from "fabric";
import { useTranslation} from "react-i18next";
import { UserContext } from "../App";

export default function Effect() {  
  const { canvasRef1, editor } = useContext(UserContext);
  const { t } = useTranslation();
  // const [Contrast, setContrast] = useState();

  
  
  useEffect(() => {
    // console.log("canvasRef1?.current.getActiveObject() from Effect 🥰🥰" ,canvasRef1?.current.getActiveObject());
    if (canvasRef1?.current.getActiveObject()) {
      // console.log(canvasRef1.current.getActiveObject()?.filters);
      if (canvasRef1?.current.getActiveObject().type === "image") {
        var c = new fabric.Image.filters.Contrast({
          contrast: 0,
        });
        canvasRef1.current.getActiveObject().filters.push(c);

        var s = new fabric.Image.filters.Saturation({
          saturation: 0,
        });
        canvasRef1.current.getActiveObject().filters.push(s);

        var h = new fabric.Image.filters.HueRotation({
          rotation: 0,
        });
        canvasRef1.current.getActiveObject().filters.push(h);

        var b = new fabric.Image.filters.Blur({
          blur: 0,
        });
        canvasRef1.current.getActiveObject().filters.push(b);

        var N = new fabric.Image.filters.Noise({
          noise: 0,
        });
        canvasRef1.current.getActiveObject().filters.push(N);

        var b = new fabric.Image.filters.Brightness({
          brightness: 0,
        });
        canvasRef1.current.getActiveObject().filters.push(b);
      }
    }
  }, [canvasRef1?.current.getActiveObject()]);

  const setFilters = () => {
    if (canvasRef1?.current.getActiveObject()) {
      if (canvasRef1?.current.getActiveObject().type == "image") {
        var c = new fabric.Image.filters.Contrast({
          contrast: 0,
        });
        canvasRef1.current.getActiveObject().filters.push(c);

        var s = new fabric.Image.filters.Saturation({
          saturation: 0,
        });
        canvasRef1.current.getActiveObject().filters.push(s);

        var h = new fabric.Image.filters.HueRotation({
          rotation: 0,
        });
        canvasRef1.current.getActiveObject().filters.push(h);

        var b = new fabric.Image.filters.Blur({
          blur: 0,
        });
        canvasRef1.current.getActiveObject().filters.push(b);

        var N = new fabric.Image.filters.Noise({
          noise: 0,
        });
        canvasRef1.current.getActiveObject().filters.push(N);

        var b = new fabric.Image.filters.Brightness({
          brightness: 0,
        });
        canvasRef1.current.getActiveObject().filters.push(b);
      }
    }
  };

  const [brightness, setBrightness] = useState(
    canvasRef1?.current.getActiveObject()?.filters[5]?.brightness
  );
  const [contras, setContras] = useState(
    canvasRef1?.current.getActiveObject()?.filters[0]?.contrast
  );
  const [noise, setNoise] = useState(
    canvasRef1?.current.getActiveObject()?.filters[4]?.noise
  );
  const [hue, setHue] = useState(
    canvasRef1?.current.getActiveObject()?.filters[2]?.rotation
  );
  const [saturation, setSaturation] = useState(
    canvasRef1?.current.getActiveObject()?.filters[1]?.saturation
  );
  const [blur, setBlur] = useState(
    canvasRef1?.current.getActiveObject()?.filters[3]?.blur
  );

  useEffect(() => {
    setBrightness(
      canvasRef1?.current.getActiveObject()?.filters[5]?.brightness
    );
    setContras(canvasRef1?.current.getActiveObject()?.filters[0]?.contrast);
    setNoise(canvasRef1?.current.getActiveObject()?.filters[4]?.noise);
    setHue(canvasRef1?.current.getActiveObject()?.filters[2]?.rotation);
    setSaturation(
      canvasRef1?.current.getActiveObject()?.filters[1]?.saturation
    );
    setBlur(canvasRef1?.current.getActiveObject()?.filters[3]?.blur);
  }, [canvasRef1.current.getActiveObject()]);

  /************************ handle Brigntness ***********************/
  const handleBrightness = (e) => {
    if (canvasRef1.current.getActiveObject()) {
      canvasRef1.current.getActiveObject().filters[5].brightness =
        e.target.value;
      setBrightness(e.target.value);

      canvasRef1.current.getActiveObject().applyFilters();
      canvasRef1.current.requestRenderAll();
    }
  };

  /************************ handle Contrast ***********************/
  const handleContrast = (e) => {
    if (canvasRef1.current.getActiveObject()) {
      canvasRef1.current.getActiveObject().filters[0].contrast = e.target.value;
      setContras(e.target.value);
      canvasRef1.current.getActiveObject().applyFilters();
      canvasRef1.current.requestRenderAll();
    }
  };

  /************************ handleSaturation ***********************/
  const handleSaturation = (e) => {
    if (canvasRef1.current.getActiveObject()) {
      canvasRef1.current.getActiveObject().filters[1].saturation =
        e.target.value;
      setSaturation(e.target.value);
      canvasRef1?.current.getActiveObject().applyFilters();
      editor?.canvas.requestRenderAll();
    }
  };  

  /**************************** handle hue ******************/
  const handleHue = (e) => {
    if (canvasRef1.current.getActiveObject()) {
      canvasRef1.current.getActiveObject().filters[2].rotation = e.target.value;
      setHue(e.target.value);
      // var filter= new fabric.Image.filters.HueRotation({
      //     rotation:e.target.value
      //    });
      //    selectedObjects[0].filters.push(filter);
      canvasRef1.current.getActiveObject().applyFilters();
      canvasRef1.current.requestRenderAll();
    }
  };
  /**************************Handle blur***********************/
  const handleBlur = (e) => {
    if (canvasRef1.current.getActiveObject()) {
      canvasRef1.current.getActiveObject().filters[3].blur = e.target.value;
      setBlur(e.target.value);
      //    var filter= new fabric.Image.filters.Blur({
      //     blur:e.target.value
      //    });
      //    selectedObjects[0].filters.push(filter);
      canvasRef1.current.getActiveObject().applyFilters();
      canvasRef1.current.requestRenderAll();
    }
  };
  /************ Handle noise ***************/
  const handleNoise = (e) => {
    if (canvasRef1.current.getActiveObject()) {
      canvasRef1.current.getActiveObject().filters[4].noise = e.target.value;
      setNoise(e.target.value);
      // var filter= new fabric.Image.filters.Noise({
      //     noise:e.target.value
      //    });
      //    selectedObjects[0].filters.push(filter);
      canvasRef1.current.getActiveObject().applyFilters();
      canvasRef1.current.requestRenderAll();
    }
  };

  /*********** Handle effect ***************/
  const handleSepia = () => {
    var sepia = new fabric.Image.filters.Sepia();
    canvasRef1.current.getActiveObject().filters.push(sepia);
    canvasRef1.current.getActiveObject().applyFilters();
    canvasRef1.current.requestRenderAll();
  };

  const handleBrownie = () => {
    var brownie = new fabric.Image.filters.Brownie();
    canvasRef1.current.getActiveObject().filters.push(brownie);
    canvasRef1.current.getActiveObject().applyFilters();
    canvasRef1.current.requestRenderAll();
  };

  const handleVintage = () => {
    var vintage = new fabric.Image.filters.Vintage();
    canvasRef1.current.getActiveObject().filters.push(vintage);
    canvasRef1.current.getActiveObject().applyFilters();
    canvasRef1.current.requestRenderAll();
    //console.log(selectedObjects);
  };

  const [invertImg, setInvertImg] = useState();
  const handleInvert = (e) => {
    if (e.target.checked) {
      var invert = new fabric.Image.filters.Invert();
      canvasRef1.current.getActiveObject().filters.push(invert);
      canvasRef1.current.getActiveObject().applyFilters();
      canvasRef1.current.requestRenderAll();
    } else {
      //console.log(editor);

      //   var b= new fabric.Image.filters.Invert();
      //   setInvertImg(selectedObjects[0].filters.pop(b))
      //   console.log(invertImg);

      var invert = fabric.Image.filters.Invert;
      canvasRef1.current.getActiveObject().filters.pop(invert);
      canvasRef1.current.getActiveObject().applyFilters();
      canvasRef1.current.requestRenderAll();
    }
  };

  const removeFilter = () => {
    var invert = new fabric.Image.filters.Invert();
    canvasRef1.current.getActiveObject().filters = [];
    canvasRef1.current.getActiveObject().applyFilters();
    setFilters();
    canvasRef1.current.requestRenderAll();
  };

  return (
    <>
      <div>
      ***************** Setting *******************************
        <Row>
          <div className="close_back">
            <div
              className="next_btn"
              onClick={() => {
                // props.categoaryFilterEdit("all");
              }}
            >
              {/* <img src={left} /> */}
            </div>

            <div className="textE_btn CategoaryHeader-title">
              <p>{t("effect")}</p>
            </div>

            <div className="back_btn CategoaryHeader-back"></div>
          </div>
        </Row>

        <div className="effectEdit_Section">
          <Row>
            <Stack direction="horizontal" gap={2} className="Align_Section">
              <div className="IneerTextHead">{t("brightness")}</div>
              <div className=" ms-auto">
                <Form.Range
                  min="-1"
                  max="1"
                  step="0.1"
                  value={brightness}
                  onChange={handleBrightness}
                />
              </div>
              <input
                type="text"
                class="form-control output_NewRange"
                value={brightness}
                onChange={(e) => {
                  setBrightness(e.target.value);
                  handleBrightness(e);
                }}
              />
            </Stack>
          </Row>
          <Row>
            <Stack direction="horizontal" gap={2} className="Spacing_Section">
              <div className="IneerTextHead">{t("contrast")}</div>
              <div className=" ms-auto">
                <Form.Range
                  min="-1"
                  max="1"
                  step="0.1"
                  value={contras}
                  onChange={handleContrast}
                />
              </div>
              <input
                type="text"
                class="form-control output_NewRange"
                value={contras}
                onChange={(e) => {
                  setContras(e.target.value);
                  handleContrast(e);
                }}
              />
            </Stack>
          </Row>

          <Row>
            <Stack direction="horizontal" gap={2} className="Spacing_Section">
              <div className="IneerTextHead">{t("saturation")}</div>
              <div className=" ms-auto">
                <Form.Range
                  min="-10"
                  max="10"
                  value={saturation}
                  onChange={handleSaturation}
                />
              </div>
              <input
                type="text"
                class="form-control output_NewRange"
                value={saturation}
                onChange={(e) => {
                  setSaturation(e.target.value);
                  handleSaturation(e);
                }}
              />
            </Stack>
          </Row>
          <Row>
            <Stack direction="horizontal" gap={2} className="Spacing_Section">
              <div className="IneerTextHead">{t("hue")}</div>
              <div className=" ms-auto">
                <Form.Range
                  min="-10"
                  max="10"
                  value={hue}
                  onChange={handleHue}
                />
              </div>
              <input
                type="text"
                class="form-control output_NewRange"
                value={hue}
                onChange={(e) => {
                  setHue(e.target.value);
                  handleHue(e.target.value);
                }}
              />
            </Stack>
          </Row>
          <Row>
            <Stack direction="horizontal" gap={2} className="Spacing_Section">
              <div className="IneerTextHead">{t("blur")}</div>
              <div className=" ms-auto">
                <Form.Range
                  min="-1"
                  step="0.1"
                  max="1"
                  value={blur}
                  onChange={handleBlur}
                />
              </div>
              <input
                type="text"
                class="form-control output_NewRange"
                value={blur}
                onChange={(e) => {
                  setBlur(e.target.value);
                  handleBlur(e);
                }}
              />
            </Stack>
          </Row>
          <Row>
            <Stack direction="horizontal" gap={2} className="Spacing_Section">
              <div className="IneerTextHead">{t("noise")}</div>
              <div className=" ms-auto">
                <Form.Range
                  min="-1"
                  step="0.1"
                  max="1"
                  value={noise}
                  onChange={handleNoise}
                />
              </div>
              <input
                type="text"
                class="form-control output_NewRange"
                value={noise}
                onChange={(e) => {
                  setNoise(e.target.value);
                  handleNoise(e);
                }}
              />
            </Stack>
          </Row>

          <Row>
            <Stack direction="horizontal" gap={2} className="Spacing_Section">
              <div className="IneerTextHead">{t("none")}</div>

              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  onChange={removeFilter}
                  value=""
                  id="flexCheckDefault"
                />
              </div>
            </Stack>
          </Row>
        </div>

        {/* mobile responsive */}

        <div className="effectEdit_responsive">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={3} style={{ padding: 0 }}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link
                      eventKey="zero"
                      onClick={() => {
                        // props.categoaryFilterEdit("all");
                      }}
                    >
                      {t("back")} {t("button")}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="first">{t("brightness")}</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">{t("contrast")}</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">{t("saturation")}</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="fourth">{t("hue")}</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="fifth">{t("blur")}</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="sixth">{t("noise")}</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="seventh">{t("none")}</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9} className="order-first order-md-last">
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Stack
                      direction="horizontal"
                      gap={2}
                      className="Align_Section"
                    >
                      <div className="">{t("brightness")}</div>
                      <div className=" ms-auto">
                        <Form.Range
                          min="-1.5"
                          max="5.5"
                          value={brightness}
                          onChange={handleBrightness}
                        />
                      </div>
                      <input
                        type="text"
                        class="form-control output_NewRange"
                        value={brightness}
                        onChange={(e) => {
                          setBrightness(e.target.value);
                          handleBrightness(e);
                        }}
                      />
                    </Stack>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Stack
                      direction="horizontal"
                      gap={2}
                      className="Spacing_Section"
                    >
                      <div className="">{t("contrast")}</div>
                      <div className=" ms-auto">
                        <Form.Range
                          min="0.1"
                          max="10"
                          value={contras}
                          onChange={handleContrast}
                        />
                      </div>
                      <input
                        type="text"
                        class="form-control output_NewRange"
                        value={contras}
                        onChange={(e) => {
                          setContras(e.target.value);
                          handleContrast(e);
                        }}
                      />
                    </Stack>
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <Stack
                      direction="horizontal"
                      gap={2}
                      className="Spacing_Section"
                    >
                      <div className="">{t("saturation")}</div>
                      <div className=" ms-auto">
                        <Form.Range
                          min="-10"
                          max="10"
                          value={saturation}
                          onChange={handleSaturation}
                        />
                      </div>
                      <input
                        type="text"
                        class="form-control output_NewRange"
                        value={saturation}
                        onChange={(e) => {
                          setSaturation(e.target.value);
                          handleSaturation(e);
                        }}
                      />
                    </Stack>
                  </Tab.Pane>
                  <Tab.Pane eventKey="fourth">
                    <Stack
                      direction="horizontal"
                      gap={2}
                      className="Spacing_Section"
                    >
                      <div className="">{t("hue")}</div>
                      <div className=" ms-auto">
                        <Form.Range
                          min="-10"
                          max="10"
                          value={hue}
                          onChange={handleHue}
                        />
                      </div>
                      <input
                        type="text"
                        class="form-control output_NewRange"
                        value={hue}
                        onChange={(e) => {
                          setHue(e.target.value);
                          handleHue(e);
                        }}
                      />
                    </Stack>
                  </Tab.Pane>
                  <Tab.Pane eventKey="fifth">
                    <Stack
                      direction="horizontal"
                      gap={2}
                      className="Spacing_Section"
                    >
                      <div className="">{t("blur")}</div>
                      <div className=" ms-auto">
                        <Form.Range
                          min="-5"
                          max="5"
                          value={blur}
                          onChange={handleBlur}
                        />
                      </div>
                      <input
                        type="text"
                        class="form-control output_NewRange"
                        value={blur}
                        onChange={(e) => {
                          setBlur(e.target.value);
                          handleBlur(e);
                        }}
                      />
                    </Stack>
                  </Tab.Pane>
                  <Tab.Pane eventKey="sixth">
                    <Stack
                      direction="horizontal"
                      gap={2}
                      className="Spacing_Section"
                    >
                      <div className="">{t("noise")}</div>
                      <div className=" ms-auto">
                        <Form.Range onChange={handleNoise} value={noise} />
                      </div>
                      <input
                        type="text"
                        class="form-control output_NewRange"
                        value={noise}
                        onChange={(e) => {
                          setNoise(e.target.value);
                          handleNoise(e);
                        }}
                      />
                    </Stack>
                  </Tab.Pane>
                  <Tab.Pane eventKey="seventh">
                    <Stack
                      direction="horizontal"
                      gap={2}
                      className="Spacing_Section"
                    >
                      <div className="">{t("none")}</div>

                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          onChange={removeFilter}
                          value=""
                          id="flexCheckDefault"
                        />
                      </div>
                    </Stack>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    </>
  );
}
