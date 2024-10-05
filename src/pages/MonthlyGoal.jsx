import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const MonthlyGoal = () => {
  const [goal, setGoal] = useState('');
  const [currentProgress, setCurrentProgress] = useState(0);
  const [targetValue, setTargetValue] = useState(0);

  const handleSetGoal = () => {
    // Here you would typically save the goal to your backend
    console.log('Goal set:', goal);
  };

  const handleUpdateProgress = () => {
    // Here you would typically update the progress in your backend
    setCurrentProgress(Math.min(currentProgress + 1, targetValue));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Monthly Goal</h1>
      <Card>
        <CardHeader>
          <CardTitle>Set Your Monthly Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Enter your goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Target value"
              value={targetValue}
              onChange={(e) => setTargetValue(parseInt(e.target.value))}
            />
            <Button onClick={handleSetGoal}>Set Goal</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Goal Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={(currentProgress / targetValue) * 100} />
            <p>{currentProgress} / {targetValue}</p>
            <Button onClick={handleUpdateProgress}>Update Progress</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthlyGoal;