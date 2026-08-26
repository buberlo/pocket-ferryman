import { useCallback, useEffect, useState } from 'react';
import * as ferryService from '../services/ferryService';
import { WEEKLY_ROWING_POWER } from '../constants';

const DEFAULT_FERRY_STATE = {
  boatProgress: 0,
  totalDistance: 0,
  weeklyPower: WEEKLY_ROWING_POWER,
  weeklyPowerUsed: 0,
  canRescue: false,
  updatedAt: 0,
};

export default function useFerry() {
  const [ferry, setFerry] = useState(DEFAULT_FERRY_STATE);
  const [isRescuing, setIsRescuing] = useState(false);
  const [error, setError] = useState(null);

  const mergeFerryState = useCallback((nextState) => {
    setFerry((previousState) => ({
      ...previousState,
      ...nextState,
      updatedAt: Date.now(),
    }));
  }, []);

  const refresh = useCallback(async () => {
    try {
      const nextState = await ferryService.getFerryState();
      mergeFerryState(nextState || {});
      setError(null);
    } catch (err) {
      setError(err?.message || 'Could not load ferry state.');
    }
  }, [mergeFerryState]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const applyStepDelta = useCallback(
    async (stepDelta) => {
      const delta = Number(stepDelta) || 0;
      if (delta <= 0) return;

      try {
        const nextState = await ferryService.applySteps(delta);
        mergeFerryState(nextState || {});
        setError(null);
      } catch (err) {
        setError(err?.message || 'Could not advance the ferry.');
      }
    },
    [mergeFerryState]
  );

  const rescueGhost = useCallback(
    async (taskId) => {
      setIsRescuing(true);

      try {
        const result = await ferryService.rescueGhost(taskId);
        mergeFerryState(result?.ferry || result || {});
        setError(null);
        return result;
      } catch (err) {
        const message = err?.message || 'The ghost slipped away.';
        setError(message);
        throw new Error(message);
      } finally {
        setIsRescuing(false);
      }
    },
    [mergeFerryState]
  );

  const resetWeeklyPower = useCallback(async () => {
    try {
      const nextState = await ferryService.resetWeeklyPower();
      mergeFerryState(nextState || {});
      setError(null);
    } catch (err) {
      setError(err?.message || 'Could not reset weekly rowing power.');
    }
  }, [mergeFerryState]);

  const canRescue = Boolean(ferry.canRescue && ferry.weeklyPower > 0);

  return {
    ferry,
    canRescue,
    isRescuing,
    error,
    refresh,
    applyStepDelta,
    rescueGhost,
    resetWeeklyPower,
  };
}