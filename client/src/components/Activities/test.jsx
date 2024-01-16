<aside className="card bg-white shadow-xl flex flex-col p-4  min-w-96 self-start row-span-1 h-full">
  <h1 className="text-2xl font-bold mb-4 lg:hidden">{activity.title}</h1>
  <div className="avatar self-center mt-3 sm:flex gap-2">
    <div className="grid grid-rows-2 mt-5">
      <p className="font-bold">Instructor:</p>
      <p>{activity.instructor.firstName}</p>
    </div>
    <div className="w-24 mask mask-hexagon">
      <img src={activity.instructor.image.url} />
    </div>
  </div>
  <div>
    <div className="flex gap-2 m-2">
      <FaRegCalendar className="text-2xl" />
      <p className="font-bold">Date</p>
    </div>
    <p>{formattedStartDate}</p>
  </div>
  <div>
    <div className="flex gap-2 m-2">
      <FaClock className="text-2xl" />
      <p className="font-bold">Time</p>
    </div>
    <p>
      {formattedStartTime} - {formattedEndTime} ({duration} Min.)
    </p>
  </div>

  <div>
    <div className="flex gap-2 m-2">
      <FaPersonDress className="text-2xl" />
      <p className="font-bold">Capacity</p>
    </div>
    <CapacityBadge openSlots={openSlots} />
  </div>

  <div className="flex justify-center flex-wrap">
    {user?.role !== "admin" && (
      <>
        {!user ||
        !user.classesRegistered.find((activity) => {
          return activity._id === id;
        }) ? (
          <button
            className="btn btn-primary mr-3 self-center mt-2"
            onClick={() => document.getElementById("my_modal_1").showModal()}
            disabled={openSlots <= 0}
          >
            Book Now
          </button>
        ) : (
          <>
            <button
              className="btn btn-secondary mr-3 self-center mt-2"
              onClick={() => document.getElementById("my_modal_1").showModal()}
              disabled={openSlots <= 0}
            >
              Cancel Booking
            </button>{" "}
            <button className="btn btn-square btn-outline">
              <FaCalendarPlus />
            </button>
          </>
        )}
      </>
    )}{" "}
    {user?.role !== "admin" && (
      <button
        className="btn btn-secondary mr-3 self-center mt-2"
        disabled={openSlots > 0}
      >
        Waitlist
      </button>
    )}
  </div>
</aside>;
