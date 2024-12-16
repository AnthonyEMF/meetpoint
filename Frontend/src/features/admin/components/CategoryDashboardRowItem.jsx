import { Link } from "react-router-dom";

export const CategoryDashboardRowItem = ({ categories = [] }) => {
  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div key={category.id}>
          <Link
            className="p-4 bg-gray-100 rounded shadow flex justify-between items-center hover:bg-gray-200"
            to={`/administration/categories-list/edit/${category.id}`} // Redireccionar a editar la categoría
          >
            <div>
              <p className="font-medium text-gray-700">{category.name}</p>
              <p className="text-sm text-gray-500">{category.description}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
