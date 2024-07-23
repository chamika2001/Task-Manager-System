import React from 'react';

const TaskTable = () => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Description</th>
          <th>Date</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Image</th>
          <th>Delete task</th>
        </tr>
      </thead>
      <tbody>
        {/* Table rows will be populated here */}
      </tbody>
    </table>
  );
};

export default TaskTable;
