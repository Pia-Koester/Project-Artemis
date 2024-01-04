import { FaRegCalendar, FaClock, FaPersonDress } from "react-icons/fa6";
import { useParams } from "react-router-dom";

export default function ClassDetails() {
  const { id } = useParams();

  //instructor images based on name
  const photos = {
    Isabella:
      "https://static.wixstatic.com/media/87046c_459fa56301054dbe9d58e76c7284634c~mv2.jpg/v1/fill/w_378,h_520,fp_0.45_0.35,q_80,usm_0.66_1.00_0.01,enc_auto/87046c_459fa56301054dbe9d58e76c7284634c~mv2.jpg",
    Cosima:
      "https://static.wixstatic.com/media/87046c_2a44f60d1a8a47faad745a9a3b2e4fa1~mv2.jpg/v1/fill/w_656,h_920,fp_0.48_0.34,q_85,usm_0.66_1.00_0.01,enc_auto/87046c_2a44f60d1a8a47faad745a9a3b2e4fa1~mv2.jpg",
    Rolf: "https://static.wixstatic.com/media/87046c_8b75e3d5339f4d46b34471ccee515c3f~mv2.jpg/v1/fill/w_656,h_1040,fp_0.47_0.37,q_85,usm_0.66_1.00_0.01,enc_auto/87046c_8b75e3d5339f4d46b34471ccee515c3f~mv2.jpg",
  };
  return (
    <>
      <div className="Kurs-Informationen">
        {/* To Do: block für Kursinformationen erstellen */}
        <h1>Class Title</h1>
        <div className="carousel carousel-center rounded-box">
          <div className="carousel-item">
            <img
              src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
              alt="Pizza"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
              alt="Pizza"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
              alt="Pizza"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg"
              alt="Pizza"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg"
              alt="Pizza"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg"
              alt="Pizza"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
              alt="Pizza"
            />
          </div>
        </div>
      </div>
      <aside>
        <div>
          <div></div>
          <FaRegCalendar />
          <p>Date</p>
          <p>Date long format</p>
        </div>
        <div>
          <FaClock />
          <p>Time</p>
          <p>time formate start - end (duration)</p>
        </div>

        <div>
          <FaPersonDress />
          <p>capacity</p>
          <p>capacity with color indicating fullness</p>
        </div>
        <div className="avatar">
          <div className="w-24 mask mask-hexagon">
            <img src={photos.Isabella} />
          </div>
        </div>
        <button className="btn btn-primary">Book Now</button>
      </aside>
    </>
  );
}
