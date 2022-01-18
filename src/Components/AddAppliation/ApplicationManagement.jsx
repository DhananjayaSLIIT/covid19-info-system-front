import React, { Component, lazy, Suspense } from "react";
import "../../css/application_css/application_manage.css";
import TopStatusUser from "../TopStatusBar/TopStatusUser";
import Footer from "../Footer/Footer";
import { VscLoading } from "react-icons/vsc";
import ConfirmAssign from "./ConfirmAssign";
import ApplicationService from "../../Services/ApplicationService";
const ApplicationTable = lazy(() => import("./ApplicationTable"));

export default class ApplicationManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirm: false,
      applicationCount: 0,
      selectedID: "",
      selectedItem: "",
      isChecked: [],
      count: 0,
    };
    this.countChange = this.countChange.bind(this);
    this.showModel = this.showModel.bind(this);
    this.closeModel = this.closeModel.bind(this);
  }

  componentWillMount() {
    document.addEventListener("dblclick", () => {
      this.setState({ selectedID: "" });
      this.setState({ selectedItem: "" });
    });
  }

  applicationOnClickHandler(event, selectedItem) {
    this.setState({ isActive: true });
    this.setState({ selectedID: selectedItem._id });
    this.setState({ selectedItem: selectedItem });
  }

  componentDidMount() {
    ApplicationService.getApplicationCount(this.props.match.params.prgID).then(res =>{
      console.log(this.props.match.params.prgID);
      this.setState({count:res.data.data});
    }).catch((error) => {

    });
  }

  countChange(count, checked) {
    if (count != null) {
      this.setState({ applicationCount: this.state.count + count });
      this.setState({ isChecked: checked });
    }
  }


  showModel() {
    this.setState({ showConfirm: true });
  }

  closeModel() {
    this.setState({ showConfirm: false });
  }

  render() {
    return (
      <div className="a">
        <TopStatusUser />
        <div className="container" id="app-middle-container">
          <div className="app-content">
            <div className="app-top-container">
              <div style={{ backgroundColor: "inherit" }}>
                <h3
                  style={{
                    backgroundColor: "inherit",
                    fontSize: "large",
                    width: "300px",
                  }}
                >
                  Program Management
                </h3>
                <p style={{ backgroundColor: "inherit" }}></p>
              </div>
              <div className="app-add-btn-div">
                <p
                  style={{
                    paddingTop: "15px",
                    paddingRight: "30px",
                    backgroundColor: "inherit",
                    fontSize: "30px",
                    fontWeight: "bold",
                    fontFamily: "Times new Roman",
                  }}
                >
                  {this.state.applicationCount}/
                  {this.props.match.params.maxCount}
                </p>
                <button className="cen-btn-add" onClick={this.showModel}>
                  {" "}
                  ADD TO PROGRAM
                </button>
                <ConfirmAssign
                  showConfirm={this.state.showConfirm}
                  handleClose={this.closeModel}
                  checkedItems={this.state.isChecked}
                  programID={this.props.match.params.prgID}
                  applicationCount = {this.state.applicationCount}
                  maxCount = {this.props.match.params.maxCount}
                />
              </div>
            </div>
            <div className="app-middle-container"></div>
            <Suspense
              fallback={
                <div className="fallback">
                  {" "}
                  <VscLoading className="loading_icon" />{" "}
                </div>
              }
            >
              <ApplicationTable
                centerID={this.props.match.params.id}
                applicationCount={this.countChange}
              />
            </Suspense>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
