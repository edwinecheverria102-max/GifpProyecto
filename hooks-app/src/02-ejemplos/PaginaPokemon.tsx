import { useContador } from "../Hooks/useContador";
import { usePokemon } from "../Hooks/usePokemon";

export const PaginaPokemon = () => {
    const { incremento, decremento, contador } = useContador(1)
    const { pokemon, cargando, FormularID } = usePokemon({ ID: contador })

    if (cargando) {
        <div className="bg-gradient flex flex-col items-center">
            <h1 className="text-2xl font-thin text-white">Pokémon</h1>
            <h3 className="text-xl font-bold text-white">cargando</h3>

        </div>
    }

    if (!pokemon) {
        <div className="bg-gradient flex flex-col items-center">
            <h1 className="text-2xl font-thin text-white">Pokémon</h1>
            <h3 className="text-xl font-bold text-white">pokemon no encontrado</h3>

        </div>
    }

    return (
        <div className="bg-gradient flex flex-col items-center">
            <h1 className="text-2xl font-thin text-white">Pokémon</h1>
            <h3 className="text-xl font-bold text-white">#{FormularID} {pokemon?.nombre}</h3>
            <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${contador}.png`}
                alt={pokemon?.nombre}
            />

            <div className="flex gap-2">

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
                    onClick={decremento}
                >
                    Anterior
                </button>

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
                    onClick={incremento}
                >
                    Siguiente
                </button>

            </div>
        </div>
    );
};