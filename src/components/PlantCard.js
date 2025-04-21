import React from "react";

function PlantCard({plant, onUpdatePlant}) {
  const { id, name, image, price, soldOut } = plant;

  const handleToggleSoldOut = () => {
    const updatedSoldOut = !soldOut;
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ soldOut: updatedSoldOut }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => {
        onUpdatePlant(updatedPlant);
      });
  };
  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{"plant name"}</h4>
      <p>Price: {price}</p>
      {soldOut? (
        <button onClick={handleToggleSoldOut} className="primary">In Stock</button>
      ) : (
        <button onClick={handleToggleSoldOut}> Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
