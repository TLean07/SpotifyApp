import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function CategoryCard({ category, tipo }) {
  return (
    <Link to={`/${tipo}/${category._id}`} className="bg-blue-500 p-4 rounded-lg">
      <img src={category.capa || category.profile} alt={category.name} className="w-full h-32 object-cover rounded" />
      <h2 className="mt-2 text-lg font-bold">{category.name}</h2>
    </Link>
  );
}

CategoryCard.propTypes = {
  category: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    capa: PropTypes.string,
    profile: PropTypes.string,
    name: PropTypes.string.isRequired,
  }).isRequired,
  tipo: PropTypes.string.isRequired,
};
