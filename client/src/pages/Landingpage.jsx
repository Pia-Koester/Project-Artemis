import { motion } from "framer-motion";
import logo from "../assets/logos/phoenix-color.png";
import { useNavigate } from "react-router-dom";

export default function Landingpage({ setClicked }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full h-screen">
        <video
          src="https://res.cloudinary.com/ddj2xpjki/video/upload/v1704999948/backgroundVideo_aoucn2.mp4"
          playsInline
          loop
          muted
          className="w-max-full m-0-auto object-cover"
          autoPlay
        />
        <div className="absolute w-full h-full flex flex-col justify-center items-center text-white top-0 bg-neutral bg-opacity-50 gap-10">
          <img src={logo} className="w-24 justify-self-start" />
          <h1 className="text-9xl mb-6 font-titleFont font-bold">LEARN TO FIGHT</h1>
          <motion.button
            className="btn btn-primary text-2xl font-bold"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            onClick={() => {
              navigate("/");
            }}
          >
            NOW
          </motion.button>
        </div>
      </div>
    </>
  );
}
