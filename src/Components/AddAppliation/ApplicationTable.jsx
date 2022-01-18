import React, { Component } from "react";
import "../../css/application_css/application_manage.css";
import ApplicationService from "../../Services/ApplicationService";
import ApplicationDetails from "./ApplicationDetails";

export default class ApplicationTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allApplications: [],
      selected: [],
      isChecked: [],
      show: false,
      application: "",
      count: 0,
    };
    this.onItemCheckHandler = this.onItemCheckHandler.bind(this);
    this.showModel = this.showModel.bind(this);
    this.closeModel = this.closeModel.bind(this);
  }

  componentDidMount() {
    ApplicationService.getApplicationByCenterId(this.props.centerID)
      .then((res) => {
        this.setState({ allApplications: res.data.data });
      })
      .catch((error) => {
        alert(`${error.response.data.message}`);
      });
  }

  onItemCheckHandler(application) {
    if (this.state.isChecked.length === 0) {
      this.state.isChecked.push(application);
    } else {
      let unChecked;
      this.state.isChecked.map((item, index) => {
        if (item._id === application._id) {
          unChecked = true;
          this.state.isChecked.splice(index, 1);
        }
      });
      if (unChecked != true) {
        this.state.isChecked.push(application);
      }
      unChecked = false;
    }

    let count = this.state.isChecked.length;
    let checkedItems = this.state.isChecked;
    this.props.applicationCount(count, checkedItems);
    console.log(this.state.isChecked);
  }

  showModel(item) {
    this.setState({ application: item });
    this.setState({ show: true });
  }

  closeModel() {
    this.setState({ show: false });
  }

  render() {
    return (
      <div>
        <div className="app-bottom-container">
          <div className="app_table_body">
            <table className="table app-table">
              <thead className="app_table_head">
                <tr>
                  <th style={{ width: "40px" }} id="tbl-head-cell">
                    <div
                      className="form-check app_checkbox"
                      style={{
                        display: "flex",
                        alignItem: "center",
                        justifyContent: "center",
                        background: "inherit",
                      }}
                    ></div>
                  </th>
                  <th id="tbl-head-cell">Ref. NO</th>
                  <th id="tbl-head-cell">First Name</th>
                  <th id="tbl-head-cell">Last Name</th>
                  <th id="tbl-head-cell">Address</th>
                  <th id="tbl-head-cell">Date of birth</th>
                  <th id="tbl-head-cell">Age</th>
                </tr>
              </thead>
              <tbody>
                {this.state.allApplications.length > 0 &&
                  this.state.allApplications.map((item, index) => (
                    <tr key={index} className="tbl-body-row">
                      <td style={{ width: "40px" }}>
                        <div
                          className="form-check app_checkbox"
                          style={{
                            display: "flex",
                            alignItem: "center",
                            justifyContent: "center",
                            background: "inherit",
                          }}
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="checked"
                            id="flexCheckDefault"
                            onChange={(event) => this.onItemCheckHandler(item)}
                          />
                        </div>
                      </td>
                      <td onClick={(event) => this.showModel(item)}>
                        {item.refNumber}
                      </td>
                      <td onClick={(event) => this.showModel(item)}>
                        {item.firstName}
                      </td>
                      <td onClick={(event) => this.showModel(item)}>
                        {item.lastName}
                      </td>
                      <td onClick={(event) => this.showModel(item)}>
                        {item.address}
                      </td>
                      <td onClick={(event) => this.showModel(item)}>
                        {item.dateOfBirth.toString().slice(0, 10)}
                      </td>
                      <td onClick={(event) => this.showModel(item)}>
                        {item.age}
                      </td>
                    </tr>
                  ))}
                <ApplicationDetails
                  show={this.state.show}
                  application={this.state.application}
                  handleClose={this.closeModel}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
