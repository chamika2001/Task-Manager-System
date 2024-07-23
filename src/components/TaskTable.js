// src/components/TaskTable.js
import React from 'react';
import '../styles/dashboard.css'; // Import the regular CSS file

const orders = [
  { productName: 'JavaScript Tutorial', productNumber: '1', paymentStatus: 'High', status: 'Pending' },
  { productName: 'CSS Full Course', productNumber: '3', paymentStatus: 'Medium', status: 'Declined' },
  { productName: 'Create Web Site', productNumber: '4', paymentStatus: 'High', status: 'In-Progress' },
];

const TaskTable = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Task Name</th>
          <th>Task Number</th>
          <th>Priority</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.productNumber}>
            <td>{order.productName}</td>
            <td>{order.productNumber}</td>
            <td>{order.paymentStatus}</td>
            <td className={order.status === 'Declined' ? 'danger' : order.status === 'Pending' ? 'warning' : 'primary'}>
              {order.status}
            </td>
            <td className="primary">Details</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
