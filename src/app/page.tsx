"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import WorkoutData from "@/app/types/WorkoutData";

export default function Home() {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [workoutData, setWorkoutData] = useState<WorkoutData | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const handleUpload = async (formData: FormData) => {
    setIsFetching(true);

    const image = formData.get("image") as File;
    const requestFormData = new FormData();
    requestFormData.append("resource", image, image.name);

    const requestOptions: RequestInit = {
      method: "POST",
      body: requestFormData,
      redirect: "follow" as RequestRedirect
    };

    const response = await fetch("/submit", requestOptions);
    const result: WorkoutData = await response.json();
    setWorkoutData(result);
    setIsFetching(false);
    // Feedback
  }

  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main
        className="flex items-center justify-center py-32 px-16 sm:items-start">
        <form
          className="flex flex-col items-center gap-4"
          onSubmit={(formData) => {
            formData.preventDefault();
            const target = formData.target as HTMLFormElement;
            const formDataObj = new FormData(target);
            setIsDialogOpen(true);
            return handleUpload(formDataObj);
          }}>
          <Input type="file"
                 accept="image/*"
                 id="image"
                 name="image"
                 required/>
          <Button type="submit" variant="outline" size="lg">Upload</Button>
        </form>
        <Dialog open={isDialogOpen}>
          <DialogContent>
            {isFetching ?
              <DialogHeader>
                <DialogTitle>Processing...</DialogTitle>
              </DialogHeader>
              :
              <>
                <DialogHeader>
                  <DialogTitle>Workout Data</DialogTitle>
                  <DialogDescription>
                    {Object.entries(workoutData || {}).map(([key, value]) => (
                      <p key={key} className="py-2"><strong>{key}:</strong> {value !== null ? value.toString() : 'N/A'}
                      </p>
                    ))}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button onClick={() => {
                    setWorkoutData(null)
                    return setIsDialogOpen(false);
                  }}>Correct
                  </Button>
                  <Button onClick={() => {
                    setWorkoutData(null)
                    return setIsDialogOpen(false);
                  }}>Incorrect
                  </Button>
                </DialogFooter>
              </>
            }
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
