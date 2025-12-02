import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class QueryParamApiExternal {
    // page
    @IsOptional()
    @IsInt({ message: 'A página deve ser um valor inteiro.' })
    @Type(() => Number)
    page?: number;

    // name
    @IsOptional()
    @IsString({ message: 'O nome deve ser um texto.' })
    @Transform((params) => String(params.value).toLocaleLowerCase().trim())
    name?: string;

    // status
    @IsOptional()
    @IsString()
    @Transform((params) => String(params.value).toLocaleLowerCase().trim())
    @IsIn(["alive", "dead", "unknown"], { message: "O status deve ser apenas alive, dead ou unknown." })
    status?: 'alive' | 'dead' | 'unknown';

    // gender
    @IsOptional()
    @IsString()
    @Transform((params) => String(params.value).toLocaleLowerCase().trim())
    @IsIn(["female", "male", "genderless", "unknown"], { message: "O gênero deve ser apenas female, male, genderless ou unknown." })
    gender?: 'female' | 'male' | 'genderless' | 'unknown';
}

