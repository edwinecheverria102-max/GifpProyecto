import { useLuzTrafico } from "../Hooks/useLuzTrafico";

export const LuzTraficohook = () => {
    const { contador, porcentaje, LuzAmarilla, LuzRoja, LuzVerde } = useLuzTrafico()

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
            <div className="flex flex-col items-center space-y-8">

                <h1 className="text-white text-2xl">
                    semaforo con useEfect
                </h1>
                <h2 className="text-white text-xl">
                    contador {contador}
                </h2>

                <div className="w-64 bg-gray-700 rounded-full h2">
                    <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-linear"
                        style={{ width: `${porcentaje * 100}%` }}
                    >

                    </div>
                </div>

                <div className={`w-32 h-32 
                    ${LuzRoja} 
                    rounded-full`}
                ></div>

                <div className={`w-32 h-32 
                    ${LuzAmarilla} 
                    rounded-full`}
                ></div>

                <div className={`w-32 h-32 
                    ${LuzVerde} 
                    rounded-full`}
                ></div>


            </div>
        </div>
    );
};