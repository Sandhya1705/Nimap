import React from "react";

function Cast({ actor }) {
  const img_base_path = "https://image.tmdb.org/t/p/w500";
  return (
    <div className="w-full bg-blue-green text-prussian-blue font-mono text-center">
      <img src={`${img_base_path}${actor.profile_path}`} className="w-full" />
      <p className="font-bold">{actor.name}</p>
      <p>{actor.character}</p>
    </div>
  );
}

export default Cast;
