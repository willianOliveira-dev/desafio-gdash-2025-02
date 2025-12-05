import { format as format$ } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { DateFormatProps } from '@/interfaces/helpers/date-format.interface';

export function dateFormat({ date, format }: DateFormatProps) {
    return format$(date, format, { locale: ptBR });
}
