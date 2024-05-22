import React from "react";
import Button from "./Button";

const TodoContainer = ({
  stackData,
  types,
  removeFromTodo,
  removeStackData,
}) => {
  const onClickButton = (e, item) => {
    e.stopPropagation();
    removeFromTodo(item);
  };

  const renderedTodoContainer = types.map((type) => {
    const renderTodoData = stackData.map((item) => {
      if (item.type === type) {
        return (
          <div key={item.name}>
            <Button onClick={(e) => onClickButton(e, item)}>{item.name}</Button>
          </div>
        );
      }
    });
    return (
      <div
        key={type}
        className="mx-3 border-2 border-gray-200 w-72 flex flex-col items-center min-h-[600px] font-semibold"
        onClick={removeStackData}
      >
        <h2 className="border-b-2 w-full text-center bg-gray-200">{type}</h2>
        <div className="flex flex-col gap-2 mt-2">{renderTodoData}</div>
      </div>
    );
  });

  return <div className="flex">{renderedTodoContainer}</div>;
};

export default TodoContainer;
