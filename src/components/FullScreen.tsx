import { Link } from "react-router-dom";

const FullscreenImage = () => {
  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex items-end pb-10 pl-8 justify-center"
      style={{
        backgroundImage:
          "url('https://st.depositphotos.com/1032577/4119/i/450/depositphotos_41197145-stock-photo-quiz.jpg')",
      }}
    >
      <div className="flex lg:rounded-full xs:rounded-md xl:text-2xl sm:text-xs  lg:text-lg text-white hover:text-slate-950 hover:bg-slate-300 cursor-pointer lg:w-1/5 xs:min-w-10 xs:min-h-2  h-40 border border-2 border-stone-300 ml-2 lg:justify-center lg:items-center bg-stone-800 shadow-lg shadow-zinc-950">
        <Link to={"/quiz"}>
          <div className="flex justify-center items-center">
            <p>I want to play a game</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FullscreenImage;
