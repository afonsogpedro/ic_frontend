import React, { Component } from "react";
import { Button, Container } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import { Redirect } from "react-router-dom";
import TaskList from "../TaskList/TaskList";
import "./InputItemStyle.css";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import TaskEdit from "../TaskEdit/TaskEdit";

const theme = createTheme({
    palette: {
        primary: {
            main: "rgba(5, 58, 212, 0.82)",
        },
    },
});

export default class InputItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskData: {
                name: "",
                description: "",
                status: "",
            },
            showTaskData: [],
            successAlertMsg: "",
            taskDeleteMsg: "",
            editTaskDataModal: false,
            editTaskData: {
                name: "",
                description: "",
            },
            successTaskUpdatedMsg: "",
        };
    }
    componentDidMount() {
        this.getTaskData();
    }

    addItem = () => {
        let token = sessionStorage.getItem("token");
        var formdata = new FormData();
        formdata.append("name", this.state.taskData.name);
        formdata.append("description", this.state.taskData.description);
        var requestOptions = {
            method: "POST",
            body: formdata,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        fetch("http://localhost:8000/api/user/tasks", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === "success") {
                    this.setState({ successAlertMsg: result.message }, () =>
                        this.getTaskData()
                    );
                    setTimeout(() => {
                        this.setState({ successAlertMsg: "" });
                    }, 1000);
                }
                if (result.error === false) {
                    this.setState({
                        taskData: {
                            name: "",
                            description: "",
                        },
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    getTaskData() {
        let token = sessionStorage.getItem("token");
        var requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        fetch("http://localhost:8000/api/user/tasks", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === "success") {
                    this.setState({
                        showTaskData: result.data,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    onChangehandler = (e) => {
        const { taskData } = this.state;
        taskData[e.target.name] = e.target.value;
        console.log((taskData[e.target.name] = e.target.value));
        this.setState({ taskData });
    };
    clearList = () => {
        this.setState({
            showTaskData: [],
        });
    };
    handleDelete = (id) => {
        let token = sessionStorage.getItem("token");
        var requestOptions = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        fetch(
            "http://localhost:8000/api/user/tasks/" + id,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                if (result.status === "success") {
                    this.setState(
                        {
                            taskDeleteMsg: result.message,
                        },
                        () => this.getTaskData()
                    );
                    setTimeout(() => {
                        this.setState({ taskDeleteMsg: "" });
                    }, 1000);
                }
            });
    };
    toggleEditTaskModal = () => {
        this.setState({
            editTaskDataModal: !this.state.editTaskDataModal,
        });
    };
    onChangeEditTaskHandler = (e) => {
        let { editTaskData } = this.state;
        editTaskData[e.target.name] = e.target.value;
        this.setState({ editTaskData });
    };

    TaskEdit = (id, name, description, completed) => {
        this.setState({
            editTaskData: { id, name, description, completed },
            editTaskDataModal: !this.state.editTaskDataModal,
        });
    };

    updateTask = () => {
        let { id, name, description, completed } = this.state.editTaskData;
        let token = sessionStorage.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("name", name);
        urlencoded.append("description", description);
        urlencoded.append("completed", completed);

        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: urlencoded,
        };

        fetch(
            "http://localhost:8000/api/user/tasks/" + id,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                if (result.status === "success") {
                    this.setState(
                        {
                            editTaskDataModal: false,
                            editTaskData: { name, description, completed },
                        },
                        () => this.getTaskData()
                    );
                    setTimeout(() => {
                        this.setState({ editTaskDataModal: false });
                    }, 1000);
                }
                if (result.errors === false) {
                    this.setState({
                        successTaskUpdatedMsg: result.message,
                    });
                }
            })
            .catch((error) => console.log("error", error));
    };
    render() {
        const { name, description } = this.state.taskData;
        if (this.state.isLoggedIn === false) {
            return <Redirect to="/" />;
        }
        return (
            <Container className="themed-container mt-5" fluid="sm">
                <div className="input-field-container">
                    <ThemeProvider theme={theme}>
                        <TextField type="text" name="name" placeholder="Task Name" value={name} onChange={this.onChangehandler} color="primary" variant="outlined" />
                        <TextField type="text" name="description" placeholder="Task description" value={description} onChange={this.onChangehandler} color="primary" variant="outlined" style={{ width: "50%" }} />
                        <Button color="success" className="font-weight-bold add-task" onClick={this.addItem} >Add Task</Button>
                    </ThemeProvider>
                </div>
                <div className="text-success p-4 mt-2">{this.state.successAlertMsg}</div>
                {/*TASK list  */}
                <TaskList showTaskData={this.state.showTaskData} clearList={this.clearList} handleDelete={this.handleDelete} taskDeleteMsg={this.state.taskDeleteMsg} TaskEdit={this.TaskEdit} toggleEditTaskModal={this.toggleEditTaskModal} />
                {/* Model for Task Edit */}
                <TaskEdit toggleEditTaskModal={this.toggleEditTaskModal} editTaskDataModal={this.state.editTaskDataModal} onChangeEditTaskHandler={this.onChangeEditTaskHandler} TaskEdit={this.TaskEdit} editTaskData={this.state.editTaskData} updateTask={this.updateTask} successTaskUpdatedMsg={this.state.successTaskUpdatedMsg} />
            </Container>
        );
    }
}