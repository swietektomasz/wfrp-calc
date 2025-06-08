import { useDebounce } from "../helpers/useDebounce";

type RollInputProps = {
  setter: (lastRoll: number) => void;
  label: string;
  value: number;
};

export const RollInput = ({ setter, value, label }: RollInputProps) => {
  const inputHandler = useDebounce<React.ChangeEvent<HTMLInputElement>>((e) => setter(Number(e.target.value)), 1000);

  const handleRoll = () => {
    setter(Math.floor(Math.random() * 100) + 1);
  };

  return (
    <div className="flex flex-col">
      <label className="text-center" htmlFor={label}>
        {label}
      </label>
      <div>
        <input
          className="border-2 p-2 rounded-sm w-18 h-18 border-r-0 rounded-r-none text-center"
          id={label}
          max={100}
          min={1}
          onChange={inputHandler}
          type="tel"
          defaultValue={value}
        />

        <button
          onClick={handleRoll}
          className="border-2 p-2 rounded-sm -mx-1 h-18 w-18 border-l-0 rounded-l-none hover:bg-gray-300"
        >
          roll
        </button>
      </div>
    </div>
  );
};
