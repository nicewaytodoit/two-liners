
import React, { Component } from "react";
import axios from "axios";

const msMongoUrl = "http://localhost:3001/api/";

class AppMERN extends Component {
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null
  };

  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 3000);
      this.setState({ intervalIsSet: interval });
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
    fetch(`${msMongoUrl}getData`)
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  putDataToDB = message => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }
    axios.post(`${msMongoUrl}putData`, {
      id: idToBeAdded,
      message: message
    });
  };

  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    let idDel = parseInt(idTodelete);
    this.state.data.forEach(item => {
      if (item.id === idDel) {
        objIdToDelete = item._id;
      }
    });
    axios.delete(`${msMongoUrl}deleteData`, {
      data: {
        id: objIdToDelete
      }
    });
  };

  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    let idUpd = parseInt(idToUpdate);
    this.state.data.forEach(dat => {
      console.log(dat.id, idUpd, dat.id === idUpd);
      if (dat.id === idUpd) {
        objIdToUpdate = dat._id;
      }
    });
    console.log(objIdToUpdate);
    axios.post(`${msMongoUrl}updateData`, {
      id: objIdToUpdate,
      update: { message: updateToApply }
    });
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <ul>
          {data.length <= 0 ? "NO DB ENTRIES YET" : data.map(item => (
            <li
              test="2"
              key={`li-${item._id}`}
              style={{ padding: "10px" }}
            >
              <span style={{ color: "gray" }}> id: </span> {item.id} <br />
              <span style={{ color: "gray" }}> data: </span>
              {item.message}
            </li>
          ))}
        </ul>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            onChange={e => this.setState({ message: e.target.value })}
            placeholder="add something in the database"
            style={{ width: "200px" }}
          />
          <button onClick={() => this.putDataToDB(this.state.message)}>
            ADD
          </button>
        </div>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            DELETE
          </button>
        </div>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of item to update here"
          />
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ updateToApply: e.target.value })}
            placeholder="put new value of the item here"
          />
          <button
            onClick={() =>
              this.updateDB(this.state.idToUpdate, this.state.updateToApply)
            }
          >
            UPDATE
          </button>
        </div>
      </div>
    );
  }
}

export default AppMERN;
