import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((data) => {
        const updatedPlants = data.map((plant) => ({
          ...plant,
          soldOut: plant.soldOut || false,
        }));
        setPlants(updatedPlants);
      });
  }, []);

  const handleAddPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  const handleUpdatePlant = (updatedPlant) => {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === updatedPlant.id ? updatedPlant : plant
      )
    );
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm}  onSearchChange={setSearchTerm}/>
      <PlantList plants={filteredPlants} onUpdatePlant={handleUpdatePlant} />
    </main>
  );
}

export default PlantPage;
