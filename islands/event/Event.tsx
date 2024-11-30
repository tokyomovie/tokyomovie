import { useSignal, useSignalEffect } from "@preact/signals";
import Button from "../Button.tsx";
import SelectField from "../form/SelectField.tsx";
import RSVPStatus from "./RSVPStatus.tsx";

export interface EventProps {
  eventId: number;
  eventTitle?: string;
  movieTitle: string;
  releaseYear: number;
  synopsis?: string;
  eventDescription: string;
  date: string;
  time: string;
  location: string;
  price: string;
  priceDescription?: string | null;
  rsvp: "no_rsvp" | "attending" | "not_attending";
  seatsLeft: number;
  promoUrl?: string | null;
  iconPath?: string | null;
}

export default function Event(props: EventProps) {
  const {
    eventId,
    eventTitle,
    movieTitle,
    releaseYear,
    synopsis,
    eventDescription,
    date,
    time,
    location,
    price,
    priceDescription,
    rsvp: initialRsvp = "no_rsvp",
    seatsLeft,
    promoUrl,
    iconPath,
  } = props;

  const rsvp = useSignal(initialRsvp);

  useSignalEffect(() => {
    if (rsvp.value === "no_rsvp") {
      return;
    }
    fetch(`/api/events/${eventId}/rsvp`, {
      method: "post",
      body: JSON.stringify({ attending: rsvp.value === "attending" }),
      credentials: "include",
    });
  });

  return (
    <>
      <div class="px-3 flex flex-col">
        <div class="my-2 p-2 shadow-block border border-highlight rounded">
          <p>{date}</p>
          <p>{time}</p>
        </div>
        <div class="my-2 p-2 shadow-block border border-highlight rounded">
          <p>@ {location}</p>
        </div>
        <div class="my-2 p-2 shadow-block border border-highlight rounded">
          <p>{price || "Free!"}</p>
          {priceDescription && <p>({priceDescription})</p>}
        </div>
        <div class="my-2 p-2 shadow-block border border-highlight rounded">
          <p>seats left:</p>
          <p>{seatsLeft}</p>
        </div>
        <div class="my-2 p-2 shadow-block border border-highlight rounded">
          <RSVPStatus rsvp={rsvp.value} />
        </div>
        <div class="my-2 p-2 shadow-block border border-highlight rounded">
          <SelectField
            name="rsvp"
            label="RSVP Update"
            value={rsvp.value}
            options={[{
              value: "no_rsvp",
              label: "",
            }, {
              value: "attending",
              label: "Attending",
            }, {
              value: "not_attending",
              label: "Not Attending",
            }]}
            onChange={(e) => {
              const newRsvp = e.currentTarget.value as
                | "no_rsvp"
                | "attending"
                | "not_attending";
              if (newRsvp === rsvp.value) return;
              if (newRsvp === "no_rsvp") return;
              rsvp.value = newRsvp;
            }}
          />
        </div>
      </div>
      <div class="py-5 px-3">
        <div class="py-2 flex">
          {eventTitle && (
            <div>
              <h2 class="text-2xl text-error">
                {eventTitle}
              </h2>
              <h3 class="text-xl text-error">{movieTitle} ({releaseYear})</h3>
            </div>
          )}
          {!eventTitle && (
            <div>
              <h2 class="text-2xl text-error">
                {movieTitle} ({releaseYear})
              </h2>
            </div>
          )}
        </div>
        <div>
          <p>{eventDescription}</p>
          {synopsis && (
            <div class="py-2">
              <h4 class="text-l text-error">Film Synopsis</h4>
              <p>{synopsis}</p>
            </div>
          )}
        </div>
        {iconPath && (
          <div>
            <div class="py-2">
              <img src={iconPath} />
            </div>
          </div>
        )}
        {promoUrl && (
          <div>
            <div class="py-2">
              <h4 class="text-l text-error">Event Promotion Page</h4>
              <p class="text-highlight">
                <a href={promoUrl}>
                  <div>
                    <img
                      src="/cyberdelia-2024/images/joey.jpg"
                      class="w-[100px]"
                    />
                  </div>
                  {"<"}(check it)
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
