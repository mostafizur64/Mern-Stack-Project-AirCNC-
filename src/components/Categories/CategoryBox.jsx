import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import qs from "query-string";
const CategoryBox = ({ label, icon: Icon }) => {
  const [params, setParams] = useSearchParams();
  const value = params.get("category");
  const navigate = useNavigate()
  console.log(value);
  const handleClick = () => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updateQuery = {
      ...currentQuery,
      category: label,
    };
    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updateQuery,
      },
      {skipNull:true},
    )
    navigate(url)
  };
  return (
    <div onClick={handleClick} className="flex flex-col items-center justify-center gap-2 cursor-pointer p-3 border-b-2 hover:text-neutral-800 border-transparent text-neutral-500">
      <Icon />
      <div className="text-sm font-medium">{label} gg</div>
    </div>
  );
};

export default CategoryBox;
