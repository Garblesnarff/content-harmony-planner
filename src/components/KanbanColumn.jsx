import React from 'react';
import TaskCard from './TaskCard';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

const KanbanColumn = ({ title, tasks, onUpdateTask, onDeleteTask }) => {
  return (
    <div className="flex-1 min-w-[300px] bg-gray-100 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {tasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
      <Button variant="ghost" className="w-full mt-4">
        <Plus className="mr-2 h-4 w-4" /> Add another card
      </Button>
    </div>
  );
};

export default KanbanColumn;