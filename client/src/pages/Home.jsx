import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';
import useTasks from '../hooks/useTasks';
import SearchBar from '../components/SearchBar/SearchBar';
import FilterBar from '../components/FilterBar/FilterBar';
import SortDropdown from '../components/SortDropdown/SortDropdown';
import TaskList from '../components/TaskList/TaskList';
import Pagination from '../components/Pagination/Pagination';
import TaskForm from '../components/TaskForm/TaskForm';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal/ConfirmDeleteModal';

const Home = () => {
  const {
    tasks,
    loading,
    filters,
    pagination,
    isFormOpen,
    selectedTask,
    submitting,
    openForm,
    closeForm,
  } = useTaskContext();

  const {
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
    setFilter,
    setPage,
  } = useTasks();

  const [taskToDelete, setTaskToDelete] = useState(null);

  // ── Keyboard Shortcut: 'N' to open New Task form ────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isInputFocused =
        document.activeElement.tagName === 'INPUT' ||
        document.activeElement.tagName === 'TEXTAREA' ||
        document.activeElement.tagName === 'SELECT';

      if ((e.key === 'n' || e.key === 'N') && !isInputFocused && !isFormOpen && !taskToDelete) {
        e.preventDefault();
        openForm();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openForm, isFormOpen, taskToDelete]);

  const handleFormSubmit = async (taskData) => {
    let result;
    if (selectedTask) {
      result = await handleUpdateTask(selectedTask.id || selectedTask._id, taskData);
    } else {
      result = await handleCreateTask(taskData);
    }
    if (result.success) {
      closeForm();
    }
  };

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;
    const result = await handleDeleteTask(taskToDelete.id || taskToDelete._id);
    if (result.success) {
      setTaskToDelete(null);
    }
  };

  const handleClearFilters = () => {
    setFilter('search', '');
    setFilter('status', '');
    setFilter('priority', '');
    setFilter('sort', 'createdAt:desc');
  };

  return (
    <main className="page-content">
      {/* ── Filters and Controls Panel ── */}
      <section
        className="card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
        }}
        aria-label="Filter, Search and Sort Panel"
      >
        <div className="flex gap-4 flex-wrap items-center justify-between">
          <SearchBar
            value={filters.search}
            onChange={(val) => setFilter('search', val)}
          />
          <SortDropdown
            value={filters.sort}
            onChange={(val) => setFilter('sort', val)}
          />
        </div>
        <hr className="divider" style={{ margin: 0 }} />
        <div className="flex justify-between items-center flex-wrap gap-4">
          <FilterBar
            status={filters.status}
            priority={filters.priority}
            onStatusChange={(val) => setFilter('status', val)}
            onPriorityChange={(val) => setFilter('priority', val)}
          />
          {(filters.search || filters.status || filters.priority) && (
            <button className="btn btn-ghost btn-sm" onClick={handleClearFilters}>
              Reset Filters
            </button>
          )}
        </div>
      </section>

      {/* ── Task Grid List ── */}
      <section aria-label="Tasks List" style={{ minHeight: '320px' }}>
        <TaskList
          tasks={tasks}
          loading={loading}
          onEdit={openForm}
          onDelete={setTaskToDelete}
          onStatusChange={handleUpdateTask}
          onClearFilters={handleClearFilters}
        />
      </section>

      {/* ── Pagination Footer ── */}
      <Pagination pagination={pagination} onPageChange={setPage} />

      {/* ── Modals ── */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={closeForm}
        task={selectedTask}
        onSubmit={handleFormSubmit}
        submitting={submitting}
      />

      <ConfirmDeleteModal
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={handleConfirmDelete}
        taskTitle={taskToDelete?.title || ''}
        submitting={submitting}
      />
    </main>
  );
};

export default Home;
