import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { currentUser } from "@clerk/nextjs/server";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = async ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event?.organizer?._id?.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event?.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />
      {/* IS EVENT CREATOR ... */}

      {isEventCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/events/${event._id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>

          <DeleteConfirmation eventId={event._id} />
        </div>
      )}

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        {/* {!hidePrice && (
          <div className="flex gap-2">
            {event?.tickets?.map((data: any, i: any) => {
              return (
                <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
                  {`${data.type}: $${data.price}`}
                </span>
              );
            })}

            <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
              {event?.category?.name}
            </p>
          </div>
        )} */}
        <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
          {event?.category?.name}
        </p>
        {/* <div className="flex flex-wrap gap-2">
          {event?.tickets?.map((data: any, i: any) => {
            return (
              <span className="p-semibold-14 rounded-full bg-green-100 px-4 py-1 text-green-60">
                {`${data.type}: $${data.price}`}
              </span>
            );
          })}
        </div> */}

        <div className="flex flex-wrap gap-3">
          {event?.tickets?.map((data: any, i: any) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-2 rounded-lg border border-green-200 bg-green-50 shadow-sm">
              <span className="text-sm font-semibold text-green-600">
                {data.type}
              </span>
              <span className="text-sm text-gray-500">
                Price:{" "}
                <span className="text-green-700 font-medium">
                  ${data.price}
                </span>
              </span>
              <span className="text-sm text-gray-500">
                Available:{" "}
                <span className="text-green-700 font-medium">
                  {data.availability}
                </span>
              </span>
            </div>
          ))}
        </div>

        <p className="p-medium-16 p-medium-18 text-grey-500">
          {formatDateTime(event?.startDateTime).dateTime}
        </p>

        <Link href={`/events/${event?._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
            {event?.title}
          </p>
        </Link>

        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {event?.organizer?.firstName} {event?.organizer?.lastName}
          </p>

          {hasOrderLink && (
            <Link href={`/orders?eventId=${event?._id}`} className="flex gap-2">
              <p className="text-primary-500">Order Details</p>
              <Image
                src="/assets/icons/arrow.svg"
                alt="search"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
