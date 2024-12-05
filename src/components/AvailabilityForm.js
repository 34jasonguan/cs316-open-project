import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function AvailabilityForm({ events, userID }) {
  const [availabilities, setAvailabilities] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  const groupedEvents = events.reduce((acc, event) => {
    if (!acc[event.name]) {
      acc[event.name] = { name: event.name, dates: [] };
    }
    acc[event.name].dates.push({ id: event.id, date: event.date });
    return acc;
  }, {});

  const handleCheckboxChange = (eventId) => {
    setAvailabilities((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(availabilities);

    try {
      const response = await fetch("/api/submitAvailability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID, availabilities }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit availability: ${response.statusText}`);
      }

      const result = await response.json();
      alert("Availability submitted successfully!");
    } catch (error) {
      console.error("Error submitting availability:", error);
      alert("An error occurred while submitting your availability.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {Object.values(groupedEvents).map((eventGroup) => (
        <div key={eventGroup.name} className="space-y-4">
          <h3 className="font-semibold">{eventGroup.name}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {eventGroup.dates.map((eventDate) => (
              <div key={eventDate.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`event-${eventDate.id}`}
                  checked={availabilities[eventDate.id] || false}
                  onCheckedChange={() => handleCheckboxChange(eventDate.id)}
                />
                <Label htmlFor={`event-${eventDate.id}`}>
                  {new Date(eventDate.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </Label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Availability"}
      </Button>
    </form>
  );
}
