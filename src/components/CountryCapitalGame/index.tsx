import { FC, useMemo, useState } from "react";
import "./index.css";
import { shuffleArray } from "../../utils/shuffleArray";

type Props = {
  data: Record<string, string>;
};

const CountryCapitalGame: FC<Props> = (props) => {
  const [data, setData] = useState(() => props.data);
  const [selected, setSelected] = useState<string[]>([]);

  const buttons = useMemo(() => {
    const b = Object.entries(data).reduce<string[]>((acc, el) => {
      acc.push(...el);
      return acc;
    }, []);

    return shuffleArray(b);
  }, [data]);

  const validateSelected = ([v1, v2]: [string, string]): [boolean, string] => {
    if (data[v1] === v2) {
      return [true, v1];
    }

    if (data[v2] === v1) {
      return [true, v2];
    }

    return [false, ""];
  };

  const handleButtonClick = (value: string) => () => {
    if (selected.length === 0) {
      setSelected((prev) => [...prev, value]);
      return;
    }

    if (selected.length === 2) {
      setSelected([value]);
      return;
    }

    const newSelected = [...selected, value] as [string, string];
    const [isCorrect, key] = validateSelected(newSelected);

    if (isCorrect) {
      setData((prev) => {
        const newData = { ...prev };
        delete newData[key];

        return newData;
      });
      setSelected([]);
      return;
    }

    setSelected(newSelected);
  };

  const getButtonClassName = (value: string) => {
    const commonClassName = "btn";
    // selected will only have a length of 2 if the user selected the wrong country-capital combination
    const isWrong = selected.length === 2;
    const isIncluded = selected.includes(value);

    if (isWrong && isIncluded) {
      return `${commonClassName} error`;
    }

    if (isIncluded) {
      return `${commonClassName} selected`;
    }

    return commonClassName;
  };

  return (
    <div className="container">
      {buttons.map((v) => (
        <button
          type="button"
          key={v}
          onClick={handleButtonClick(v)}
          className={getButtonClassName(v)}
        >
          {v}
        </button>
      ))}
      {buttons.length === 0 && <p>Congratulations</p>}
    </div>
  );
};

export default CountryCapitalGame;
