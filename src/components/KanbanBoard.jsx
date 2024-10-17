import React from 'react';
import { useTasks, useUpdateTask } from '../integrations/supabase/hooks/useTasks';
import KanbanColumn from './KanbanColumn';

const KanbanBoard = ({ onDeleteTask }) => {
  const { data: tasks, isLoading, isError } = useTasks();
  const updateTaskMutation = useUpdateTask();

  if (isLoading) return <div>Loading tasks...</div>;
  if (isError) return <div>Error loading tasks</div>;

  const columns = [
    { title: 'Upcoming', status: 'upcoming' },
    { title: 'In Progress', status: 'in_progress' },
    { title: 'Done', status: 'done' },
  ];

  const getTasksForColumn = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      await updateTaskMutation.mutateAsync(updatedTask);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  return (
    <div className="flex space-x-4 overflow-x-auto pb-4">
      {columns.map(column => (
        <KanbanColumn
          key={column.status}
          title={column.title}
          tasks={getTasksForColumn(column.status)}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;