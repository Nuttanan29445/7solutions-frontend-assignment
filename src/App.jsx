import { useState, useRef } from "react";
import MockData from "./data/data.json";
import TodoContainer from "./components/TodoContainer";
import ButtonList from "./components/ButtonList";

//funtion for get type of data (Fruit/Vegetable or more).
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
  const timeoutRef = useRef({});

  //funtion for add data to TodoContainer(Right column) when click to data button and remove it when it passes 5 sec.
  const addToTodo = (data) => {
    const updateData = datas.filter((item) => item.name !== data.name);
    setDatas(updateData);
    setStackData([...stackData, data]);

    timeoutRef.current[data.name] = setTimeout(() => {
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

  //funtion for remove Todo data add send data back to Button list(Left column) when click to data button.
  const removeFromTodo = (data) => {
    clearTimeout(timeoutRef.current[data.name]);
    const updateData = stackData.filter(
      (stackData) => stackData.name !== data.name
    );
    setStackData(updateData);
    setDatas([...datas, data]);
  };

  //function for remove data when click on TodoContainer(Right column).
  const removeStackData = () => {
    const updataData = stackData.filter((data, index) => {
      if (index != stackData.length - 1) {
        return true;
      } else {
        clearTimeout(timeoutRef.current[data.name]);
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
