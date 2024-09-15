"use client";

import Navbar from "../components/Navbar";
import dayjs from "dayjs";

export default function Page() {
  const events = {
    location: "E7",
    log_events: [
      {
        event: "fall",
        time: 1726393317.650264,
      },
    ],
    name: "John Doe",
  };

  function convertDate(time: number) {
    return dayjs(time * 1000).format("YYYY-MM-DD, h:mm:ss A");
  }

  return (
    <>
      <Navbar />
      <div className="video-feed-container bg-[#0D0D0D] w-10/12 h-5/6 m-auto rounded-xl relative">
        <div className="absolute -top-10 h-12 w-fit p-5 bg-inherit rounded-lg flex gap-2 items-center justify-center">
          <img src="/history.svg" className="w-4 h-4" />
          <span className="">Event Log</span>
        </div>
        <div className="overflow-y-scroll h-[80%]">
          {events.log_events.map((event, index) => (
            <div
              key={index}
              className="event-log-item p-5 border-b border-gray-700"
            >
              <p className="text-white text-lg">
                {events.name} had a {event.event} at {events.location}
              </p>
              <p className="text-gray-400">{convertDate(event.time)}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
