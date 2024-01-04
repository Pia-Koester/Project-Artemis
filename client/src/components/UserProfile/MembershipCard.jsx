import axios from "axios";

export default function MembershipCard({ plan, user }) {
  const handlePurchase = () => {
    axios
      .post(
        "http://localhost:8080/memberships",
        { plan: plan._id, user: user._id },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Data from api", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mx-auto card w-96 bg-base-100 shadow-xl ">
      <figure className="px-10 pt-10">
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{plan.title}</h2>
        <div className="stats bg-primary text-primary-content">
          <div className="stat">
            <div className="stat-title text-base">Maximum usage</div>
            <div className="stat-value text-base">
              {plan.totalCredits + " BOOKINGS"}
            </div>
          </div>

          <div className="stat">
            <div className="stat-title text-base">Price</div>
            <div className="stat-value text-base">{plan.price + ",00€"}</div>
          </div>
        </div>

        <button onClick={handlePurchase} className="btn btn-primary">
          Buy Now
        </button>
      </div>
    </div>
  );
}
