import { Cloud } from 'lucide-react';

export function LoginPresentation() {
    return (
        <aside className="hidden relative md:flex items-center justify-center size-full bg-linear-to-br from-primary-500 via-cyan-500  to-emerald-500 p-5">
            <div className="w-full max-w-md space-y-4 z-10">
                <div className="flex flex-col items-center justify-center gap-6">
                    <div className="bg-white/20 p-4 rounded-xl">
                        <Cloud className="size-10 text-white shrink-0" />
                    </div>
                    <div className="space-y-6 text-center">
                        <h1 className="text-3xl lg:text-5xl font-bold text-white">
                            GDASH Weather
                        </h1>
                        <p className="text-sm lg:text-base text-white">
                            Monitoramento climático inteligente com insights
                            baseados em IA para decisões mais assertivas.
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-around text-center text-white gap-2 text-xl lg:text-3xl">
                    <div className="space-y-1.5">
                        <p className="font-semibold">24 h</p>
                        <p className="text-sm">Monitoramento</p>
                    </div>
                    <div className="space-y-1.5">
                        <p className="font-semibold">7d</p>
                        <p className="text-sm">Histórico</p>
                    </div>
                    <div className="space-y-1.5">
                        <p className="font-semibold">IA</p>
                        <p className="text-sm">Insigths</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
