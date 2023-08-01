import { DateRange } from "react-date-range";

const DatePicker = ({ value, handleSelect }) => {
  return (
    <DateRange
      ranges={[value]}
      onChange={handleSelect}
      rangeColors={["#F43F5E"]}
      date={new Date(value.startDate)}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date(value.startDate)}
      maxDate={new Date(value.endDate)}
    />
  );
};

export default DatePicker;
