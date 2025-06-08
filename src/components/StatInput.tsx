import { useDebounce } from "../helpers/useDebounce";

type RollInputProps = {
  setter: (skill: number) => void;
  label: string;
  value: number;
};

export const StatInput = ({ setter, value, label }: RollInputProps) => {
  const inputHandler = useDebounce<React.ChangeEvent<HTMLInputElement>>((e) => setter(Number(e.target.value)), 1000);

  return (
    <label className="flex flex-col w-40 m-2 p-2 text-center">
      {label}
      <input className="text-center border-2 rounded-sm h-12" onChange={inputHandler} defaultValue={value} />
    </label>
  );
};
