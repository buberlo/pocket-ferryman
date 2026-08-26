import { openDatabaseSync } from 'expo-sqlite';
import { WEEKLY_ROWING_POWER } from '../constants';

const DB_NAME = 'pocket-ferryman.db';

const db = openDatabaseSync(DB_NAME);

function getWeekKey(timestamp = Date.now()) {
  const date = new Date(timestamp);
  const yearStart = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((date - yearStart) / 86400000);
  const week = Math.floor((dayOfYear + yearStart.getDay() + 1) / 7) + 1;

  return `${date.getFullYear()}-W${String(week).padStart(2