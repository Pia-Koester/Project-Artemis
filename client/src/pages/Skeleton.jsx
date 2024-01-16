import logo from "../assets/logos/Wortbildmarke_anthra.svg";

export default function Skeleton() {
  return (
    <div>
      <div className="navbar bg-base-10 w-full">
        <img src={logo} className="w-12" />
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl mb-6 font-titleFont font-bold">
          Find your next class here
        </h1>{" "}
        <div className="grid grid-cols-7 grid-rows-5 gap-2 w-full justify-center">
          <div className="self-end">Monday</div>
          <div className="self-end">Tuesday</div>
          <div className="self-end">Wednesday</div>
          <div className="self-end">Thursday</div>
          <div className="self-end">Friday</div>
          <div className="self-end">Saturday</div>
          <div className="self-end">Sunday</div>
          <div className="skeleton h-32 w-full col-start-1 row-start-3"></div>
          <div className="skeleton h-32 w-full col-start-3 row-start-2"></div>
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-32 w-full"></div>
        </div>
      </div>
    </div>
  );
}
