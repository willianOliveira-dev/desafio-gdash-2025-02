import { Download, FileText, Loader, MapPin } from 'lucide-react';
import { Button } from '../../../ui/button';
import { toast } from 'sonner';
import { apiErrorSchema } from '@/http/schemas/api-error.schema';
import { useState } from 'react';
import { settings } from '@/config/settings';

export function Header() {
    const [downloadingCSVfile, setDownloadingCSVfile] =
        useState<boolean>(false);
    const [downloadingXLSXfile, setDownloadingXLSXfile] =
        useState<boolean>(false);

    const handleDownloadCSV = async () => {
        setDownloadingCSVfile(true);
        try {
            const res = await fetch(
                settings.VITE_API_URL + '/weather/export.csv'
            );
            const blob = await res.blob();

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');

            a.href = url;
            a.download = `weather.csv`;
            document.body.appendChild(a);
            a.click();
            a.remove();

            window.URL.revokeObjectURL(url);

            toast.success('Arquivo CSV instalado com sucesso!');
        } catch (error) {
            const parsed = apiErrorSchema.safeParse(error);
            if (parsed.success) {
                toast.error(parsed.data.message, {
                    richColors: true,
                });
                return;
            }
            toast.error('Erro ao baixar arquivo CSV.', {
                richColors: true,
            });
        } finally {
            setDownloadingCSVfile(false);
        }
    };
    const handleDownloadXLSX = async () => {
        setDownloadingXLSXfile(true);
        try {
            const res = await fetch(
                settings.VITE_API_URL + '/weather/export.xlsx'
            );
            const blob = await res.blob();

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');

            a.href = url;
            a.download = `weather.xlsx`;
            document.body.appendChild(a);
            a.click();
            a.remove();

            window.URL.revokeObjectURL(url);

            toast.success('Arquivo XLSX instalado com sucesso!');
        } catch (error) {
            const parsed = apiErrorSchema.safeParse(error);
            if (parsed.success) {
                toast.error(parsed.data.message, {
                    richColors: true,
                });
                return;
            }
            toast.error('Erro ao baixar arquivo CSV.', {
                richColors: true,
            });
        } finally {
            setDownloadingXLSXfile(false);
        }
    };

    return (
        <header className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-1.5">
                <h1 className="text-3xl font-semibold leading-none">
                    Dashboard
                </h1>
                <p className="flex items-center gap-0.5 text-sm text-text-muted">
                    <MapPin className="size-3" />
                    Rio de Janeiro
                </p>
            </div>
            <div className="flex flex-col gap-2 md:flex-row">
                <Button
                    onClick={handleDownloadCSV}
                    className="hover:text-white hover:bg-orange-400"
                    variant={'outline'}
                >
                    <Download className="size-5" />
                    {downloadingCSVfile ? (
                        <Loader className="animate-spin" />
                    ) : (
                        'CSV'
                    )}
                </Button>
                <Button
                    onClick={handleDownloadXLSX}
                    className="hover:text-white hover:bg-orange-400"
                    variant={'outline'}
                >
                    <FileText className="size-5" />
                    {downloadingXLSXfile ? (
                        <Loader className="animate-spin" />
                    ) : (
                        'XLSX'
                    )}
                </Button>
            </div>
        </header>
    );
}
