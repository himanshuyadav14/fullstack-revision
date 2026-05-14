import React, { useEffect, useRef } from "react";

const styles = {
  card: {
    height: "40px",
    width: "100px",
    border: "1px solid black",
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "lightgray",
    color: "black",
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: "1.5",
    borderRadius: "5px",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
    marginTop: "10px",
  },
};

const cards = [
  { id: 1, text: "This is first card" },
  { id: 2, text: "This is second card" },
  { id: 3, text: "This is third card" },
  { id: 4, text: "This is fourth card" },
  { id: 5, text: "This is fifth card" },
  { id: 6, text: "This is sixth card" },
  { id: 7, text: "This is seventh card" },
  { id: 8, text: "This is eighth card" },
  { id: 9, text: "This is ninth card" },
  { id: 10, text: "This is tenth card" },
  { id: 11, text: "This is eleventh card" },
  { id: 12, text: "This is twelfth card" },
  { id: 13, text: "This is thirteenth card" },
  { id: 14, text: "This is fourteenth card" },
  { id: 15, text: "This is fifteenth card" },
  { id: 16, text: "This is sixteenth card" },
  { id: 17, text: "This is seventeenth card" },
  { id: 18, text: "This is eighteenth card" },
  { id: 19, text: "This is nineteenth card" },
  { id: 20, text: "This is twentieth card" },
];

const Observer = () => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("Visible:", entry.target.innerText);
          }
        });
      },
      {
        // root: null,s
        threshold: 0.5,
      },
    );

    itemsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  console.log(itemsRef.current);
  return (
    <div
      ref={containerRef}
      //   style={{ height: "400px", overflow: "auto", border: "1px solid black" }}
    >
      {cards.map((card, index) => (
        <div
          key={card.id}
          ref={(el) => (itemsRef.current[index] = el)}
          style={styles.card}
        >
          {card.text}
        </div>
      ))}
    </div>
  );
};

export default Observer;
