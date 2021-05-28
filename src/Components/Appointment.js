import React, { Component } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
let api = 'http://localhost:8000/'

class AppointmentApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modal: false,
        dateTime:'',
        user: [],
    };
  }

  componentDidMount = async() =>{
    await fetch(api + "listUsers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((Response) => Response.json())
        .then((Result) => {
            this.setState({user : Result.data});
        });
  }
  
  addSlots = () => {
    this.setState({modal:true});
  }

  accept = async (val) => {
    await fetch(api + "updateUserAccept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: val,  }),
      })
        .then((Response) => Response.json())
        .then((Result) => {
            this.setState({user : Result.data});
        });
    }

  reject = async (val) => {
    await fetch(api + "updateUserReject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: val,  }),
      })
        .then((Response) => Response.json())
        .then((Result) => {
            this.setState({user : Result.data});
        });
  }

  slotSubmit = () => {
    console.log(this.state.dateTime);
  }
  
  
  render() {
    const {user, modal} = this.state;
    return (
    <div>
        <AppBar position="static">
            <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            AB
          </IconButton>
          <Typography variant="h6">
            Appointment Booking
          </Typography>
        </Toolbar>
        </AppBar>
        <div className="text-right">
            <button onClick={this.addSlots}>Add Slots</button>
        </div>
        <table className="center">
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Appointment Detail</th>
                <th>Accept / Reject</th>
            </tr>
            <tbody>
                {user ? (user.map((data) => {
                    return (
                        <tr>
                            <td style={{textTransform: 'capitalize'}}>{data.firstName}</td>
                            <td style={{textTransform: 'capitalize'}}>{data.lastName}</td>
                            <td>{data.email}</td>
                            <td>{data.appointmentRequest}</td>
                            <td style={{textTransform: 'capitalize'}}>{!data.status ? <span><button onClick={() => this.accept(data._id)}>Accept</button> <button onClick={() => this.reject(data._id)}>Reject</button></span> : data.status}</td>
                        </tr>
                    )
                })
                ) : (
                <tr>
                    <td>Abc</td>
                    <td>Def</td>
                    <td>abcdef@gmail.com</td>
                    <td>28/05/2021 9:00</td>
                    <td>Accept / Reject</td>
                </tr>)
                } 
                </tbody>
    </table>
    


    {modal && (
          <div className="modal-box">
              <div  className="modal-box-content">
              <span
                className="close-modal"
                onClick={() => this.setState({ modal: false })}
              >
                &times;
              </span>
                <label>Birthday (date and time):</label>
                <input type="datetime-local" onChange={(event) => this.setState({ dateTime: event.target.value })}/>
                <button onClick={this.slotSubmit}>Submit</button>
              </div>
          </div>
        )}
    </div>
    );
  }
}
export default AppointmentApp;
