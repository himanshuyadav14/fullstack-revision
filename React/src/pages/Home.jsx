import React, { useState } from "react";
import { Virtuoso } from "react-virtuoso";
import Observer from "../components/IntersectionObserver";

const Home = () => {
  const [showVirtual, setShowVirtual] = useState(true);

  const items = Array.from({ length: 100000 }, (_, i) => i);

  // 🔴 Normal List (bad performance)
  const NormalList = () => {
    return (
      <div
        style={{ height: "400px", overflow: "auto", border: "1px solid black" }}
      >
        {items.map((i) => (
          <div
            key={i}
            style={{
              padding: "10px",
              borderBottom: "1px solid #ccc",
            }}
          >
            Row #{i}
          </div>
        ))}
      </div>
    );
  };

  const VirtualList = () => (
    <Virtuoso
      data={items}
      itemContent={(index, item) => <div>{item}</div>}
      style={{ height: 400, width: "300px", border: "1px solid black" }}
    />
  );

  return (
    <div style={{ padding: "20px" }}>
      {/* <h1>Virtualization Demo</h1>

      <button onClick={() => setShowVirtual(!showVirtual)}>
        Switch to {showVirtual ? "Normal List" : "Virtualized List"}
      </button>

      <div style={{ marginTop: "20px" }}>
        {showVirtual ? <VirtualList /> : <NormalList />}
      </div> */}

      {/* <Observer /> */}
    </div>
  );
};

export default Home;
