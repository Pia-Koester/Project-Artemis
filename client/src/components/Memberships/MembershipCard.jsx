import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MembershipCard({ plan, user }) {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const handlePurchase = () => {
    axios
      .post(
        "http://localhost:8080/memberships",
        { plan: plan?._id, user: user?._id },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Data from api", response.data);
        closeModal();
        notify();
        setTimeout(() => {
          navigate("/")
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status.toString() === "403") {
          navigate("/login");
        }
      });
  };

const notify = () =>
  toast.success('--Purchase Successful-- Redirecting to the class overview', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const closeModal = () => {
    modalRef.current.close(); // Close the modal
  };

  return (
    <>
      <div className="mx-auto mb-5 card w-96 bg-base-100 shadow-xl ">
        <figure className="px-10 pt-10">
          <img src={plan.image} alt={plan.title} className="rounded-xl" />
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

          <button
            className="btn"
            onClick={() => modalRef.current.showModal()} // Use the ref to show modal
          >
            Buy Now
          </button>
          <ToastContainer
            position="top-center"
            autoClose={1500}
            limit={1}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="light"
          />

          <dialog ref={modalRef} id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Confirm your purchase!</h3>
              <p className="py-4">
                You are about to purchase the following membership:
              </p>
              <div className="mx-auto card w-full bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                  <img src={plan.image} alt="Shoes" className="rounded-xl" />
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
                      <div className="stat-value text-base">
                        {plan.price + ",00€"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  <button
                    onClick={() => {
                      handlePurchase();
                    }}
                    className="btn btn-primary mr-3"
                  >
                    Confirm
                  </button>
                  <button className="btn">Cancel</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </>
  );
}
