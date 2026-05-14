import React, { useState } from "react";

const Explorer = ({ explorer }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  //File
  if (!explorer.isFolder) {
    return <div style={{ marginLeft: 20 }}>{explorer.name}</div>;
  }
  return (
    <div>
      <div style={{ marginLeft: 20, cursor: "pointer" }} onClick={handleClick}>
        {explorer.name}
      </div>
      <div>
        {open && (
          <div style={{ marginLeft: 20 }}>
            {explorer.items?.map((item) => (
              <Explorer explorer={item} key={item.name} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explorer;
