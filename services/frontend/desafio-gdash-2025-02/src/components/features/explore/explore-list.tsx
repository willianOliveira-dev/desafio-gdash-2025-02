import { useState } from 'react';
import { api } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { apiErrorSchema } from '@/http/schemas/api-error.schema';
import type { ExplorePagination } from '@/interfaces/http/models/explore-pagination.interface';
import { ExploreItem } from './explore-item';
import { Button } from '@/components/ui/button';
import { ExploreItemSkeleton } from './explore-item-skeleton';

export function ExploreList() {
    const SKELETON_ITEMS = Array.from({ length: 20 });
    const [name, setName] = useState<string>('');
    const [status, setStatus] = useState<'alive' | 'dead' | 'unknown' | ''>('');
    const [gender, setGender] = useState<
        'female' | 'male' | 'genderless' | 'unknown' | ''
    >('');
    const [page, setPage] = useState<number>(1);

    const { data, isLoading } = useQuery({
        queryKey: ['explore', name, status, gender, page],
        queryFn: async () => {
            try {
                const params = new URLSearchParams();
                if (page) params.append('page', String(page));
                if (name) params.append('name', name);
                if (status) params.append('status', status);
                if (gender) params.append('gender', gender);

                const res = await api<ExplorePagination>(
                    `explore/character?${params.toString()}`
                );
                return res.data;
            } catch (error) {
                const parsed = apiErrorSchema.safeParse(error);
                if (parsed.success) {
                    toast.error(parsed.data.message, { richColors: true });
                }
                toast.error('Erro ao buscar dados do Rick e Morty.', {
                    richColors: true,
                });
            }
        },
    });

    if (data?.info === null) return null;

    return (
        <div className="space-y-4">
            <div className="flex flex-col xl:flex-row gap-2">
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded p-2 flex-1"
                />
                <div className="space-x-2.5">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as any)}
                        className="border rounded p-2"
                    >
                        <option value="">Status</option>
                        <option value="alive">Alive</option>
                        <option value="dead">Dead</option>
                        <option value="unknown">Unknown</option>
                    </select>

                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value as any)}
                        className="border rounded p-2"
                    >
                        <option value="">Gênero</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="genderless">Genderless</option>
                        <option value="unknown">Unknown</option>
                    </select>
                </div>
            </div>

            {isLoading ? (
                <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {SKELETON_ITEMS.map((_, index) => (
                        <ExploreItemSkeleton key={index} />
                    ))}
                </ul>
            ) : data && !Array.isArray(data) && data.results.length > 0 ? (
                <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {data.results.map((char) => (
                        <ExploreItem char={char} />
                    ))}
                </ul>
            ) : (
                <p>Nenhum personagem encontrado.</p>
            )}

            {data && !Array.isArray(data) && data.info ? (
                <div className="flex items-center justify-center w-full  pt-2 border-t">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setPage((prev) => prev - 1)}
                            disabled={!data.info.prev}
                        >
                            Anterior
                        </Button>

                        <p className="text-xs">
                            Página {page} de {data.info.pages}
                        </p>

                        <Button
                            variant="outline"
                            onClick={() => setPage((prev) => prev + 1)}
                            disabled={!data.info.next}
                        >
                            Próxima
                        </Button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
