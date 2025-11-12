type WorkoutData = {
  distance: number;
  distanceUnit: string;
  timeTaken: number;
  pace: number | null;
  paceUnit: string | null;
  startTime: string; // ISO 8601 date-time string
  endTime: string;   // ISO 8601 date-time string
  recordDate: string | null;
  explanation: string;
}

export default WorkoutData;