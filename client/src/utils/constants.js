// ─── Application-wide constants ───────────────────────────────────────────────
// Central location for all enum values so they are never hardcoded in components.

export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  DONE: 'done',
};

export const TASK_STATUS_LABELS = {
  [TASK_STATUS.TODO]: 'To Do',
  [TASK_STATUS.IN_PROGRESS]: 'In Progress',
  [TASK_STATUS.DONE]: 'Done',
};

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

export const TASK_PRIORITY_LABELS = {
  [TASK_PRIORITY.LOW]: 'Low',
  [TASK_PRIORITY.MEDIUM]: 'Medium',
  [TASK_PRIORITY.HIGH]: 'High',
};

export const SORT_OPTIONS = [
  { value: 'createdAt:desc', label: 'Newest First' },
  { value: 'createdAt:asc', label: 'Oldest First' },
  { value: 'dueDate:asc', label: 'Due Date (Earliest)' },
  { value: 'dueDate:desc', label: 'Due Date (Latest)' },
  { value: 'priority:desc', label: 'Priority (High → Low)' },
  { value: 'priority:asc', label: 'Priority (Low → High)' },
  { value: 'title:asc', label: 'Title (A → Z)' },
];

export const DEFAULT_SORT = 'createdAt:desc';

export const PAGINATION_LIMIT = 9;

export const DEBOUNCE_DELAY = 350; 
