import React from 'react';
import TaskCard from '../TaskCard/TaskCard';
import Loading from '../Loading/Loading';
import EmptyState from '../EmptyState/EmptyState';

const TaskList = ({ tasks, loading, onEdit, onDelete, onStatusChange, onClearFilters }) => {
  if (loading) {
    return <Loading type="skeleton" />;
  }

  if (tasks.length === 0) {
    return <EmptyState onClearFilters={onClearFilters} />;
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 'var(--space-4)',
        width: '100%',
      }}
    >
      {tasks.map((task) => (
        <TaskCard
          key={task.id || task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};

export default TaskList;
