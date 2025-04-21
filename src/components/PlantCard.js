import React, {useState} from "react";

function PlantCard({ plant, onUpdatePlant }) {
const { id, name, image, price, soldOut } = plant;
  const [isInStock, setIsInStock] = useState(!soldOut);

  const handleStockToggle = () => {
    const newStockStatus = !isInStock;
    setIsInStock(newStockStatus);
    
  
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "Application/Json" },
      body: JSON.stringify({ soldOut: newStockStatus }),
    })
      .then(r => r.json())
      .then(updatedPlant => onUpdatePlant(updatedPlant));
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      <button 
        className={isInStock ? "primary" : ""}
        onClick={handleStockToggle}
      >
        {isInStock ? "In Stock" : "Out of Stock"}
      </button>
    </li>
  );
}

export default PlantCard;
