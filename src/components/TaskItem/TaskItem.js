import React from "react";
import 'font-awesome/css/font-awesome.min.css';

const TaskItem = (props) => {
    const { name, description, completed, handleDelete, TaskEdit } = props;
    return (
        <li className="list-group-item d-flex text-capitalize justify-content-between my-2">
            <div className="d-flex">
                <b style={{ marginRight: "100px" }}>{name}</b>
                <h6>{description}</h6>
            </div>
            <div className="d-flex">
                <h6>{(() => {
                    switch (completed) {
                        case 0:   return "Not Completed";
                        default:  return "Completed";
                    }
                })()}</h6>
            </div>
            <div className="todo-icons">
                <span className="mx-2 text-success" onClick={TaskEdit}>
                    <i className="fa fa-pencil" />
                </span>
                <span className="mx-2 text-danger" onClick={handleDelete}>
                    <i className="fa fa-trash" />
                </span>
            </div>
        </li>
    );
};

export default TaskItem;