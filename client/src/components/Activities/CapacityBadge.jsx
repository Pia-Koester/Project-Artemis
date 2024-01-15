import clsx from "clsx";
import { useState } from "react";

export default function CapacityBadge({ openSlots, isBooked }) {
  //colors for conditional capacity badge
  //TO DO: remove if won't use!
  const capacityColors = {
    0: "badge-error",
    1: "badge-error",
    2: "badge-error",
    3: "badge-warning",
    4: "badge-warning",
  };
  return (
    <div className="m-2">
      {isBooked && (
        <span class="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-gray-900 dark:text-gray-300">
          Booked
        </span>
      )}
      {openSlots > 4 && (
        <span class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
          <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
          {openSlots} Spots
        </span>
      )}
      {openSlots <= 4 && openSlots > 2 && (
        <span class="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
          <span class="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
          {openSlots} Spots
        </span>
      )}
      {openSlots <= 2 && (
        <span class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
          <span class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
          {openSlots} Spot
        </span>
      )}
    </div>
  );
}
