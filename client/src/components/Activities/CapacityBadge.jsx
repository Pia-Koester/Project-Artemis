import clsx from "clsx";
import { useState } from "react";

export default function CapacityBadge({ activity }) {
  const [openSlots, setOpenSlots] = useState(
    activity.capacity - activity.registeredUsers.length
  );
  //colors for conditional capacity badge
  const capacityColors = {
    0: "badge-error",
    1: "badge-error",
    2: "badge-error",
    3: "badge-warning",
    4: "badge-warning",
  };
  return (
    <div className={clsx("badge badge-lg", capacityColors[openSlots])}>
      {openSlots > 0 ? openSlots : "Full"}
    </div>
  );
}
