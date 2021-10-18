import React, { Component } from "react";
import Button from "reactstrap/lib/Button";
import TaskItem from "../TaskItem/TaskItem";

export default class TaskList extends Component {
    render() {
        const {
            showTaskData,
            clearList,
            handleDelete,
            taskDeleteMsg,
            TaskEdit,
        } = this.props;
        let taskData = [];
        if (showTaskData.length) {
            taskData = showTaskData.map((task) => {
                return (
                    <TaskItem key={task.id} name={task.name} description={task.description} completed={task.completed}
                      handleDelete={
                          () => {
                              handleDelete(task.id);
                          }
                      }
                      taskDeleteMsg={
                          taskDeleteMsg
                      }
                      TaskEdit={
                          () => {
                              TaskEdit(task.id, task.name, task.description);
                          }
                      }
                    />
                );
            });
        }
        return (
            <ul className="list-group my-2">
                <h3 className="text-capitalize">Task List </h3>
                <div className="d-flex justify-content-between mb-5">
                    Task and Description
                </div>
                <li className="list-group-item d-flex text-capitalize justify-content-between my-2">
                    <div className="d-flex">
                        <b style={{ marginRight: "100px" }}>Task Name</b>
                        <b style={{ marginRight: "100px" }}>Description</b>
                    </div>
                    <div className="d-flex">
                        <b style={{ marginRight: "100px" }}>Status</b>
                    </div>
                    <div className="todo-icons">
                        <b style={{ marginRight: "100px" }}>Actions</b>
                    </div>
                </li>
                {taskData}
                <Button color="danger" onClick={clearList}>
                    Clear all
                </Button>
                <p className="text-danger">{taskDeleteMsg}</p>
            </ul>
        );
    }
}