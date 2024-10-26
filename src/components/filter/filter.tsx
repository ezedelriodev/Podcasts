import { FC, ChangeEvent, useState } from "react";
import "./filter.css";

interface Props {
  handleFilterChange: (event: ChangeEvent<HTMLInputElement>) => void;
  listLength: number;
}

const Filter: FC<Props> = (props) => {
  const { handleFilterChange, listLength } = props;
  const [focused, setFocused] = useState<boolean>(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <div className="filter__container">
      <span className="filter__counter">{listLength}</span>
      <input
        className="filter__input"
        data-testid="filter-input"
        type="text"
        onChange={handleFilterChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={focused ? "" : "Filter podcast..."}
      />
    </div>
  );
};

export default Filter;
