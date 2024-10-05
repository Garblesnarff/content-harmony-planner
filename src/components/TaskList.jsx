import React from 'react';

const TaskList = ({ tasks }) => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
          <p className="text-sm text-gray-600">Type: {task.contentType}</p>
          <p className="text-sm text-gray-600">Priority: {task.priority}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;