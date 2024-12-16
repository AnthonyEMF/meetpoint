import { EventList } from "../components";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";

export const MainPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  // Manejar selección de categoría
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    <div className="container mx-auto flex flex-1 mt-6">
      <Sidebar onCategorySelect={handleCategorySelect} />
      <EventList selectedCategory={selectedCategory} />
    </div>
  );
};
