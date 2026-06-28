import { useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useTaskContext, ACTIONS } from '../context/TaskContext';
import * as taskService from '../services/taskService';
import useDebounce from './useDebounce';
import { DEBOUNCE_DELAY } from '../utils/constants';

// ─── useTasks ─────────────────────────────────────────────────────────────────
// The single hook that handles all task data operations.
// Components call this hook and get back data + action functions.
// No component ever talks to taskService directly.

const useTasks = () => {
  const { dispatch, filters, pagination } = useTaskContext();

  // Debounce the search string so we don't fire an API call on every keystroke
  const debouncedSearch = useDebounce(filters.search, DEBOUNCE_DELAY);

  // Parse the combined "sortBy:order" string from filters.sort
  const [sortBy, order] = (filters.sort || 'createdAt:desc').split(':');

  // ── Load Tasks ─────────────────────────────────────────────────────────────
  const loadTasks = useCallback(async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const result = await taskService.fetchTasks({
        search:   debouncedSearch,
        status:   filters.status,
        priority: filters.priority,
        sortBy,
        order,
        page:     pagination.page,
        limit:    pagination.limit,
      });
      dispatch({ type: ACTIONS.SET_TASKS, payload: result });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      toast.error(error.message || 'Failed to fetch tasks');
    }
  }, [debouncedSearch, filters.status, filters.priority, sortBy, order, pagination.page, pagination.limit, dispatch]);

  // Re-fetch whenever any filter, sort, or page changes
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // ── Create Task ────────────────────────────────────────────────────────────
  const handleCreateTask = useCallback(async (taskData) => {
    dispatch({ type: ACTIONS.SET_SUBMITTING, payload: true });
    const loadId = toast.loading('Creating task...');
    try {
      const result = await taskService.createTask(taskData);
      dispatch({ type: ACTIONS.ADD_TASK, payload: result.data });
      toast.success('Task created successfully', { id: loadId });
      // Reload to get accurate pagination counts
      loadTasks();
      return { success: true };
    } catch (error) {
      dispatch({ type: ACTIONS.SET_SUBMITTING, payload: false });
      toast.error(error.message || 'Failed to create task', { id: loadId });
      return { success: false, message: error.message };
    }
  }, [dispatch, loadTasks]);

  // ── Update Task ────────────────────────────────────────────────────────────
  const handleUpdateTask = useCallback(async (id, taskData) => {
    dispatch({ type: ACTIONS.SET_SUBMITTING, payload: true });
    const loadId = toast.loading('Updating task...');
    try {
      const result = await taskService.updateTask(id, taskData);
      dispatch({ type: ACTIONS.UPDATE_TASK, payload: result.data });
      toast.success('Task updated successfully', { id: loadId });
      return { success: true };
    } catch (error) {
      dispatch({ type: ACTIONS.SET_SUBMITTING, payload: false });
      toast.error(error.message || 'Failed to update task', { id: loadId });
      return { success: false, message: error.message };
    }
  }, [dispatch]);

  // ── Delete Task ────────────────────────────────────────────────────────────
  // Optimistic update: remove from UI immediately, rollback if API fails
  const handleDeleteTask = useCallback(async (id) => {
    dispatch({ type: ACTIONS.SET_SUBMITTING, payload: true });
    // Optimistically remove from UI
    dispatch({ type: ACTIONS.REMOVE_TASK, payload: id });

    try {
      await taskService.deleteTask(id);
      toast.success('Task deleted successfully');
      // Reload to keep pagination accurate
      loadTasks();
      return { success: true };
    } catch (error) {
      // Rollback: reload the original task list
      loadTasks();
      toast.error(error.message || 'Failed to delete task');
      return { success: false, message: error.message };
    }
  }, [dispatch, loadTasks]);

  // ── Filter/Sort/Page helpers ───────────────────────────────────────────────
  const setFilter = useCallback((key, value) => {
    dispatch({ type: ACTIONS.SET_FILTERS, payload: { [key]: value } });
  }, [dispatch]);

  const setPage = useCallback((page) => {
    dispatch({ type: ACTIONS.SET_PAGE, payload: page });
  }, [dispatch]);

  return {
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
    setFilter,
    setPage,
    loadTasks,
  };
};

export default useTasks;
