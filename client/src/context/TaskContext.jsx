import { createContext, useContext, useReducer, useCallback } from 'react';
import { DEFAULT_SORT, PAGINATION_LIMIT } from '../utils/constants';

// ─── Initial State ────────────────────────────────────────────────────────────
const initialState = {
  tasks:      [],           // Current page of tasks from the API
  pagination: {
    total:      0,
    page:       1,
    limit:      PAGINATION_LIMIT,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  },
  filters: {
    search:   '',
    status:   '',
    priority: '',
    sort:     DEFAULT_SORT, // e.g. "createdAt:desc"
  },
  loading:         false,   // True during initial page load
  submitting:      false,   // True during create/update/delete
  error:           null,    // Error message string or null
  selectedTask:    null,    // Task being edited (null = create mode)
  isFormOpen:      false,   // Task form modal open state
};

// ─── Action Types ─────────────────────────────────────────────────────────────
export const ACTIONS = {
  SET_LOADING:      'SET_LOADING',
  SET_SUBMITTING:   'SET_SUBMITTING',
  SET_ERROR:        'SET_ERROR',
  SET_TASKS:        'SET_TASKS',
  ADD_TASK:         'ADD_TASK',
  UPDATE_TASK:      'UPDATE_TASK',
  REMOVE_TASK:      'REMOVE_TASK',
  SET_FILTERS:      'SET_FILTERS',
  SET_PAGE:         'SET_PAGE',
  OPEN_FORM:        'OPEN_FORM',
  CLOSE_FORM:       'CLOSE_FORM',
};

// ─── Reducer ──────────────────────────────────────────────────────────────────
const taskReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload, error: null };

    case ACTIONS.SET_SUBMITTING:
      return { ...state, submitting: action.payload };

    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false, submitting: false };

    case ACTIONS.SET_TASKS:
      return {
        ...state,
        tasks:      action.payload.data,
        pagination: action.payload.pagination,
        loading:    false,
        error:      null,
      };

    case ACTIONS.ADD_TASK:
      // Prepend the new task to the top of the list (optimistic feel)
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        pagination: {
          ...state.pagination,
          total: state.pagination.total + 1,
        },
        submitting: false,
      };

    case ACTIONS.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          (t.id || t._id) === (action.payload.id || action.payload._id) ? action.payload : t
        ),
        submitting: false,
      };

    case ACTIONS.REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((t) => (t.id || t._id) !== action.payload),
        pagination: {
          ...state.pagination,
          total: Math.max(0, state.pagination.total - 1),
        },
        submitting: false,
      };

    case ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        pagination: { ...state.pagination, page: 1 }, // Reset to first page on filter change
      };

    case ACTIONS.SET_PAGE:
      return {
        ...state,
        pagination: { ...state.pagination, page: action.payload },
      };

    case ACTIONS.OPEN_FORM:
      return {
        ...state,
        isFormOpen:   true,
        selectedTask: action.payload || null,
      };

    case ACTIONS.CLOSE_FORM:
      return { ...state, isFormOpen: false, selectedTask: null };

    default:
      return state;
  }
};

// ─── Context ──────────────────────────────────────────────────────────────────
const TaskContext = createContext(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // ── Form helpers ───────────────────────────────────────────────────────────
  const openForm = useCallback((task = null) => {
    dispatch({ type: ACTIONS.OPEN_FORM, payload: task });
  }, []);

  const closeForm = useCallback(() => {
    dispatch({ type: ACTIONS.CLOSE_FORM });
  }, []);

  const value = {
    ...state,
    dispatch,
    openForm,
    closeForm,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

// ─── Custom Hook ──────────────────────────────────────────────────────────────
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used inside a <TaskProvider>');
  }
  return context;
};

export default TaskContext;
