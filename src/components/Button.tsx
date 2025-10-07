type ButtonProps = {
  label: string;
  clickHandler: () => void;
};

function Button({ label, clickHandler }: ButtonProps) {
  return (
    <button
      onClick={clickHandler}
      className="px-4 py-2 border border-black text-black rounded-lg hover:bg-black hover:text-white transition"
    >
      {label}
    </button>
  );
}

export default Button;
