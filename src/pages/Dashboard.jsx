import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTasks } from '../integrations/supabase/hooks/useTasks';
import DayPlanner from '../components/DayPlanner';

const Dashboard = () => {
  const { data: tasks, isLoading, isError } = useTasks();

  if (isLoading) return <div>Loading tasks...</div>;
  if (isError) return <div>Error loading tasks</div>;

  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Content Calendar Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{tasks.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{pendingTasks}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Completed Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{completedTasks}</p>
          </CardContent>
        </Card>
      </div>
      <DayPlanner tasks={tasks} />
    </div>
  );
};

export default Dashboard;