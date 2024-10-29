import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Details() {
  const { tipo, id } = useParams();
  const [detalhes, setDetalhes] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/categorias/${tipo}/${id}`)
      .then((res) => res.json())
      .then((data) => setDetalhes(data));
  }, [tipo, id]);

  if (!detalhes) return <p>Carregando...</p>;

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <img src={detalhes.capa || detalhes.profile} alt={detalhes.name} className="w-48 h-48 rounded-full mx-auto" />
      <h1 className="text-3xl font-bold text-center mt-4">{detalhes.name}</h1>
      <p className="text-center mt-2">{detalhes.descricao || "Descrição indisponível"}</p>
    </div>
  );
}
