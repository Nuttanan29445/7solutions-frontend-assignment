import React from "react";
import Button from "./Button";

const ButtonList = ({ datas, addToTodo }) => {
  const renderedButton = datas.map((data) => {
    return (
      <Button key={data.name} onClick={() => addToTodo(data)}>
        {data.name}
      </Button>
    );
  });

  return (
    <div className="flex flex-col items-center gap-2 w-56">
      {renderedButton}
    </div>
  );
};

export default ButtonList;
