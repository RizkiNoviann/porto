import Aurora from "../components/Aurora";
import FallingText from "../components/FallingText";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Aurora
          colorStops={["#7A1CAC", "#EBD3F8", "#AD49E1"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      <div className=" flex items-center justify-center w-full h-full">
        <FallingText
          text="Welcome To My Portofolio"
          highlightWords={["Welcome", "My"]}
          trigger="hover"
          backgroundColor="transparent"
          wireframes={false}
          gravity={0.56}
          fontSize="3rem"
          mouseConstraintStiffness={0.9}
        />
        <button className="bg-red-500" onClick={() => navigate("/home")}>
          klik to continue{" "}
        </button>
      </div>
    </div>
  );
}
