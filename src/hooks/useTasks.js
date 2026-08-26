import { useCallback, useEffect, useState } from 'react';
import taskService from '../services/taskService';
import ferryService from '../services/ferryService';

const getRemainingPower = (power) => {
  if (typeof power === 'number') return power;
  if (power && typeof power.remaining === 'number') return power.remaining;
  if (power && typeof power.power === 'number') return power.power;
  return 0;
};

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const nextTasks