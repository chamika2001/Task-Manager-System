import React from 'react';

const TaskRow = ({ task, index, onDelete, onViewImage }) => {
  const { title, description, date, priority, status, imageUrl } = task;

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{title}</td>
      <td>{description}</td>
      <td>{date}</td>
      <td>{priority}</td>
      <td>{status}</td>
      <td>
        <button onClick={() => onViewImage(imageUrl || 'No Image')}>View</button>
      </td>
      <td><button onClick={() => onDelete(task.id)}>Delete</button></td>
    </tr>
  );
};

export default TaskRow;
