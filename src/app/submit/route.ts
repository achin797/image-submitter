import WorkoutData from "@/app/types/WorkoutData";
import {wait} from "next/dist/lib/wait";

export const POST = async (request: Request) => {
  const mockData: WorkoutData = {
    distance: 5.0,
    distanceUnit: 'km',
    timeTaken: 1800, // seconds
    pace: 6.0,
    paceUnit: 'min/km',
    startTime: '2025-11-12T07:00:00+05:30',
    endTime: '2025-11-12T07:30:00+05:30',
    recordDate: null,
    explanation: 'Morning run',
  };

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  await sleep(5000);

  return Response.json(mockData);
}