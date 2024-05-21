import { useState } from "react";
import MockData from "./data/data.json";
import TodoContainer from "./components/TodoContainer";
import ButtonList from "./components/ButtonList";

function getTypeData(datas) {
  const set = new Set();
  datas.forEach((data) => {
    set.add(data.type);
  });
  return Array.from(set);
}

function App() {
  const [datas, setDatas] = useState(MockData);
  const [stackData, setStackData] = useState([]);

  const addToTodo = (data) => {
    const updateData = datas.filter((fruit) => fruit.name !== data.name);
    setDatas(updateData);
    setStackData([...stackData, data]);

    setTimeout(() => {
      setStackData((prevStackData) => {
        if (prevStackData.includes(data)) {
          const newStackData = prevStackData.filter(
            (item) => item.name !== data.name
          );
          setDatas((prevDatas) => [...prevDatas, data]);
          return newStackData;
        }
        return prevStackData;
      });
    }, 5000);
  };

  const removeFromTodo = (data) => {
    const updateData = stackData.filter(
      (stackData) => stackData.name !== data.name
    );
    setStackData(updateData);

    setDatas([...datas, data]);
  };

  const removeStackData = () => {
    const updataData = stackData.filter((data, index) => {
      if (index != stackData.length - 1) {
        return true;
      } else {
        setDatas([...datas, data]);
      }
    });
    setStackData(updataData);
  };

  return (
    <div className="flex justify-center py-3">
      <ButtonList datas={datas} addToTodo={addToTodo} />
      <TodoContainer
        stackData={stackData}
        types={getTypeData(MockData)}
        removeFromTodo={removeFromTodo}
        removeStackData={removeStackData}
      />
    </div>
  );
}

export default App;
