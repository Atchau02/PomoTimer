type ButtonProps = {
  label: string;
  clickHandler: () => void;
};

function Button({ label, clickHandler }: ButtonProps) {
  return (
    <button
      onClick={clickHandler}
      className="
        px-5 py-2.5 
        rounded-xl 
        font-semibold 
        bg-gradient-to-br from-pink-100 to-blue-100
        text-gray-700 
        border border-white/40 
        shadow-md 
        hover:from-blue-100 hover:to-pink-100 
        hover:shadow-lg 
        hover:scale-105 
        transition-all duration-300 
        active:scale-95
      "
    >
      {label}
    </button>
  );
}

export default Button;
