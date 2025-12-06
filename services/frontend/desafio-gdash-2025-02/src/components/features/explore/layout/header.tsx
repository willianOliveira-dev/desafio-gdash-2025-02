export function Header() {
    return (
        <header className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-1.5">
                <h1 className="text-3xl font-semibold leading-none">
                    Explorar
                </h1>
                <p className="flex items-center gap-0.5 text-sm text-text-muted">
                    Explore a RickyAndMorty - demonstração de integração com API
                    paginada
                </p>
            </div>
        </header>
    );
}
