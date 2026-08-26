export const APP = {
  name: 'Pocket Ferryman',
  version: '1.0.0',
};

export const DB = {
  name: 'pocket_ferryman.db',
  version: 1,
  tables: {
    tasks: 'tasks',
    ferryState: 'ferry_state',
    weeklyPower: 'weekly_power',
  },
};

export const STEPS_PER_BOAT_MOVEMENT = 100;
export const WEEKLY_ROWING_POWER = 3;
export const PENANCE_DURATION_MS = 3000;

export const FERRY = {
  stepsPerMovement: STEPS_PER_BOAT_MOVEMENT,
  maxProgress: 100,
  minProgressDelta: 1,
  resetProgressOnRescue: true,
  boatAnimationDurationMs: 1400,
};

export const STEPS = {
  source: 'simulated',
  simulated: {
    enabled: true,
    stepsPerTick: 4,
    tickMs: 1000,
    minDelta: 1,
  },
};

export const POWER = {
  weeklyMax: WEEKLY_ROWING_POWER,
  costPerRescue: 1,
  resetDay: 0,
  resetHour: 4,
  storageKey: 'weekly_power',
};

export const PENANCE = {
  holdDurationMs: PENANCE_DURATION_MS,
  stabilityWindowMs: 500,
  maxDriftPx: 12,
  retryDelayMs: 900,
  title: 'Row Steady',
  description: 'Hold the screen still while you row.',
  success: 'The water calms.',
  failure: 'The ghost stirs again.',
};

export const TASKS = {
  statuses: {
    active: 'active',
    ignored: 'ignored',
    rescued: 'rescued',
    completed: 'completed',
  },
  whisperAfterMs: 60000,
  maxVisible: 5,
  defaultTitle: 'Unfinished task',
};

export const ANIMATIONS = {
  boat: require('../animations/boat.json'),
  ghost: require('../animations/ghost.json'),
};

export const UI = {
  colors: {
    background: '#0B1220',
    water: '#12324A',
    ghost: '#E8F1FF',
    accent: '#7FD1FF',
    warning: '#FFB86B',
    text: '#F5FAFF',
    muted: '#93A5B8',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
  },
  radius: {
    sm: 8,
    md: 14,
    lg: 22,
  },
  sizes: {
    ferrySceneHeight: 220,
    ghostCardHeight: 96,
    powerMeterHeight: 44,
  },
};

export const DEFAULT_STATE = {
  ferry: {
    progress: 0,
    lastStepTotal: 0,
    lastMovedAt: null,
  },
  power: {
    remaining: POWER.weeklyMax,
    weekKey: '',
  },
};