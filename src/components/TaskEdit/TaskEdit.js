import React, { Component } from "react";
import { Button } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";

const theme = createTheme({
    palette: {
        primary: {
            main: "rgba(5, 58, 212, 0.82)",
        },
    },
});

export default class TaskEdit extends Component {
    render() {
        return (
            <div>
                <Dialog fullWidth open={this.props.editTaskDataModal} onClose={this.props.onChangeEditTaskHandler} modal={false} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update Task</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Task List</DialogContentText>
                        <div className="input-field-container">
                            <ThemeProvider theme={theme}>
                                <TextField autoFocus type="text" name="name" placeholder="Task Title" value={this.props.editTaskData.name} onChange={this.props.onChangeEditTaskHandler} className="task-name" color="primary" variant="outlined" style={{ width: "35%" }} />
                                <TextField type="text" name="description" placeholder="Task description" value={this.props.editTaskData.description} onChange={this.props.onChangeEditTaskHandler} color="primary" variant="outlined" style={{ width: "60%" }} />
                                <Checkbox type="checkbox" checked={this.props.editTaskData.completed} onChange={this.props.onChangeEditTaskHandler} />
                            </ThemeProvider>
                        </div>
                    </DialogContent>
                    <div className="text-success p-4 mt-2">
                        {this.props.successTaskUpdatedMsg}
                    </div>
                    <DialogActions>
                        <Button onClick={this.props.toggleEditTaskModal} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.props.updateTask} color="success" className="font-weight-bold add-task">
                            UPDATE
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}