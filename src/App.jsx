import React, { Component } from "react";
import "./App.css";
import { Button, Spinner, Form, FormGroup, Row, Col } from "react-bootstrap";
/* eslint eqeqeq: 0 */
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import BasicMap from "./BasicMap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      earth: false,
      count: 0,
      int: 0,
      more: false,
      dolgota_second: "180",
      dolgota_first: "-180",
      shirota_second: "90.0",
      shirota_first: "-90.0",
      hourscount: -1,
      minimalpes: false,
      animation: false,
      dolgotamax: "180",
      dolgotamin: "-180",
      shirotamax: "90.0",
      shirotamin: "-90.0",
      markerdolgota: 0,
      markershirota: 0,
      pesmin: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.OnclickButton = this.OnclickButton.bind(this);
    this.ButtonBack = this.ButtonBack.bind(this);
    this.ButtonNext = this.ButtonNext.bind(this);
    this.handleChangeInputs = this.handleChangeInputs.bind(this);
    this.handleChangeHour = this.handleChangeHour.bind(this);
    this.OnclickButtonSave = this.OnclickButtonSave.bind(this);
    this.handleChangePes = this.handleChangePes.bind(this);

    this.handleChangeMinimalPes = this.handleChangeMinimalPes.bind(this);
    this.handleChangeMarkerAdd = this.handleChangeMarkerAdd.bind(this);

    this.handleChangeanimation = this.handleChangeanimation.bind(this);
  }

  OnclickButtonSave(e) {
    window.SaveFile(
      this.state.dolgotamax,
      this.state.dolgotamin,
      this.state.shirotamax,
      this.state.shirotamin,
      this.state.pesmin
    );

    e.preventDefault();
  }
  OnclickButton(e) {
    e.preventDefault();
    if (this.state.more) {
      window.Openfile(
        this.state.int,
        this.state.shirota_first,
        this.state.shirota_second,
        this.state.dolgota_first,
        this.state.dolgota_second
      );
    } else {
      window.Openfile(
        this.state.int,
        this.state.shirota_first,
        this.state.shirota_second,
        this.state.dolgota_first,
        this.state.dolgota_second
      );
    }
  }
  componentWillMount() {
    localStorage.clear();
  }
  componentDidMount() {
    if (!this.state.earth) {
      let timerID = setInterval(() => {
        if (localStorage.length > 0) {
          clearInterval(timerID);
          this.setState({
            earth: true,
          });
          document.body.style.background = "#000011";
        }
      }, 1000);
    }
  }

  handleChange(event) {
    const value = event.target.value;

    this.setState({
      int: value,
    });
  }

  handleChangeMarkerAdd() {
    this.setState({
      marker: !this.state.marker,
    });
  }

  handleChangeMinimalPes() {
    window.MinimalPes();

    this.setState({
      minimalpes: !this.state.minimalpes,
    });
  }

  handleChangeanimation() {
    this.setState(
      {
        animation: !this.state.animation,
      },
      () => {
        if (this.state.animation) {
          var timerID = setInterval(() => {
            if (
              this.state.count + 1 ==
              JSON.parse(localStorage.getItem("massive")).length
            ) {
              this.setState({
                count: 0,
              });
            } else {
              this.setState({
                count: this.state.count + 1,
              });
            }

            if (!this.state.animation) {
              clearInterval(timerID);
            }
          }, 1000);
        }
      }
    );
  }

  handleChangePes(event) {
    const value = event.target.value;

    this.setState({
      pesmin: value,
    });
  }

  handleChangeHour(event) {
    const value = event.target.value;

    this.setState({
      hourscount: value,
    });
  }

  handleChangeInputs(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  }

  ButtonNext() {
    if (this.state.count + 1 !== parseInt(localStorage.getItem("length"))) {
      this.setState({
        count: this.state.count + 1,
        disabled: true,
      });
    }

    setTimeout(() => this.setState({ disabled: false }), 2000);
  }

  ButtonBack() {
    if (this.state.count !== 0) {
      this.setState({
        count: this.state.count - 1,
        disabled: true,
      });
    }
    setTimeout(() => this.setState({ disabled: false }), 2000);
  }

  BackHour(i) {
    var time = "00:00";
    var length = JSON.parse(localStorage.getItem("massive")).length;

    if (length == 13) {
      if (i == 0) {
        time = "00:00";
      } else if (i * 2 == 24) {
        time = "00:00";
      } else {
        time = i * 2 + ":00";
      }
    } else {
      if (i == 0) {
        time = "00:00";
      } else if (i == 24) {
        time = "00:00";
      } else {
        time = i + ":00";
      }
    }
    return time;
  }

  render() {
    return (
      <>
        <div className="App">
          {this.state.fetching ? (
            <Spinner animation="border" />
          ) : (
            <>
              <div className="App-header">
                <h2 className="h2-main">IONEX Viewer</h2>
              </div>

              <div className="App-intro">
                {this.state.more && (
                  <div>
                    <Row className="flex-bruh-middle">
                      <Col md={3}>
                        <h2 className="h2-new">Широта</h2>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <input
                            name="shirota_first"
                            className="form-control"
                            placeholder="-90.0"
                            onChange={this.handleChangeInputs}
                            value={this.state.shirota_first}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={1}>
                        <h2 className="h2-new">до</h2>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <input
                            name="shirota_second"
                            className="form-control"
                            placeholder="90.0"
                            value={this.state.shirota_second}
                            onChange={this.handleChangeInputs}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="flex-bruh-middle">
                      <Col md={3}>
                        <h2 className="h2-new">Долгота</h2>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <input
                            name="dolgota_first"
                            className="form-control"
                            placeholder="-180"
                            value={this.state.dolgota_first}
                            onChange={this.handleChangeInputs}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={1}>
                        <h2 className="h2-new">до</h2>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <input
                            name="dolgota_second"
                            className="form-control"
                            placeholder="180"
                            value={this.state.dolgota_second}
                            onChange={this.handleChangeInputs}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                )}
                <Button
                  variant="warning"
                  id="openButton"
                  onClick={this.OnclickButton}
                >
                  Выбрать файл IONEX
                </Button>
                <div
                  id="datafile"
                  style={{
                    position: "absolute",
                    right: 10,
                    top: 5,
                    fontSize: 13,
                  }}
                />
              </div>

              <Form.Control
                style={{ display: "none" }}
                as="textarea"
                id="textarea"
                rows="20"
              />
            </>
          )}
        </div>
        {this.state.earth && (
          <div id="mapbasic">
            <Tabs>
              <TabList>
                <Tab>Общая карта</Tab>
                <Tab>Экспорт данных</Tab>
              </TabList>

              <TabPanel>
                <BasicMap
                  marker={this.state.marker}
                  markershirota={this.state.markershirota}
                  markerdolgota={this.state.markerdolgota}
                  data={
                    this.state.minimalpes
                      ? JSON.parse(
                          localStorage.getItem("massiveminimalpesfiltred")
                        )[this.state.count]
                      : JSON.parse(localStorage.getItem("massive"))[
                          this.state.count
                        ]
                  }
                />
                <div className="my-button">
                  <Button variant="dark" onClick={this.ButtonBack}>
                    Пред. час
                  </Button>

                  <div className="timeclass">
                    Время: {this.BackHour(this.state.count)}
                  </div>

                  <Button variant="dark" onClick={this.ButtonNext}>
                    След. час
                  </Button>
                </div>
                <br />
                <Row className="flex-bruh-middle">
                  <Col style={{ width: "450px" }}>
                    <FormGroup style={{ maxWidth: "320px", margin: "auto" }}>
                      <FormGroup className="flex-bruh" style={{ margin: 0 }}>
                        <h2 className="h2-new">Добавить маркер</h2>
                        <label className="switch">
                          <input
                            type="checkbox"
                            onClick={this.handleChangeMarkerAdd}
                            checked={this.state.marker}
                          />
                          <span className="slider round"></span>
                        </label>
                      </FormGroup>

                      <FormGroup className="flex-bruh" style={{ margin: 0 }}>
                        <h2 className="h2-new">Убрать низкие TEC</h2>
                        <label className="switch">
                          <input
                            type="checkbox"
                            onClick={this.handleChangeMinimalPes}
                            checked={this.state.minimalpes}
                          />
                          <span className="slider round"></span>
                        </label>
                      </FormGroup>

                      <FormGroup className="flex-bruh" style={{ margin: 0 }}>
                        <h2 className="h2-new">Включить анимацию</h2>
                        <label className="switch">
                          <input
                            type="checkbox"
                            onClick={this.handleChangeanimation}
                            checked={this.state.animation}
                          />
                          <span className="slider round"></span>
                        </label>
                      </FormGroup>
                    </FormGroup>
                  </Col>

                  {this.state.marker && (
                    <Col style={{ width: "450px" }}>
                      <Row className="flex-bruh-middle">
                        <Col>
                          <h2 className="h2-new">Долгота маркера</h2>
                        </Col>
                        <Col>
                          <FormGroup>
                            <input
                              name="markerdolgota"
                              className="form-control"
                              placeholder="-180 до 180"
                              value={this.state.markerdolgota}
                              onChange={this.handleChangeInputs}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="flex-bruh-middle">
                        <Col>
                          <h2 className="h2-new">Широта маркера</h2>
                        </Col>
                        <Col>
                          <FormGroup>
                            <input
                              name="markershirota"
                              className="form-control"
                              placeholder="-90 до 90"
                              value={this.state.markershirota}
                              onChange={this.handleChangeInputs}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  )}
                </Row>
              </TabPanel>

              <TabPanel>
                <Col md={12}>
                  <Row
                    className="flex-bruh-middle"
                    style={{ marginTop: "20px" }}
                  >
                    <Col md={3}>
                      <h2 className="h2-new">Долгота (градусы)</h2>
                    </Col>

                    <Col md={4}>
                      <FormGroup>
                        <input
                          name="dolgotamin"
                          className="form-control"
                          placeholder="-180"
                          value={this.state.dolgotamin}
                          onChange={this.handleChangeInputs}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={1}>
                      <h2 className="h2-new">до</h2>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <input
                          name="dolgotamax"
                          className="form-control"
                          placeholder="180"
                          value={this.state.dolgotamax}
                          onChange={this.handleChangeInputs}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row className="flex-bruh-middle">
                    <Col md={3}>
                      <h2 className="h2-new">Широта (градусы)</h2>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <input
                          name="shirotamin"
                          className="form-control"
                          placeholder="-90.0"
                          onChange={this.handleChangeInputs}
                          value={this.state.shirotamin}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={1}>
                      <h2 className="h2-new">до</h2>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <input
                          name="shirotamax"
                          className="form-control"
                          placeholder="90.0"
                          value={this.state.shirotamax}
                          onChange={this.handleChangeInputs}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="flex-bruh-middle">
                    <Col md={3}>
                      <h2 className="h2-new">Точки ПЭС</h2>
                    </Col>
                    <Col md={9}>
                      <Form.Control
                        as="select"
                        style={{ marginBottom: "15px" }}
                        value={this.state.pesmin}
                        onChange={this.handleChangePes}
                      >
                        <option selected value="0">
                          Все значения TECU
                        </option>

                        <option value="100">Больше 100 TECU </option>
                        <option value="200">Больше 200 TECU</option>
                        <option value="300">Больше 300 TECU</option>
                      </Form.Control>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      md={12}
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button
                        variant="success"
                        id="openButton"
                        style={{ display: "block" }}
                        onClick={this.OnclickButtonSave}
                      >
                        Сохранить в Excel
                      </Button>
                    </Col>
                    <Col md={12}>
                      <div
                        style={{
                          color: "#fff",
                          textAlign: "right",
                          marginTop: "15px",
                        }}
                        id="filesozdan"
                      />
                    </Col>
                  </Row>
                </Col>

                <div
                  style={{ color: "#fff", position: "fixed", bottom: "10px" }}
                >
                  Исходный код программы на GitHub:
                  https://github.com/matador96/ionex-analyzer &nbsp; &nbsp;
                  <br />
                  Разработчик: atubrah@mail.ru
                  <br />
                  Для перезапуска приложения: CTRL + R
                </div>
              </TabPanel>
            </Tabs>
          </div>
        )}
      </>
    );
  }
}

export default App;
