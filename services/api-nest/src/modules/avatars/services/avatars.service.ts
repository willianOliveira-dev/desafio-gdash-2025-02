import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { Env } from 'src/env.validation';
import * as path from 'node:path';

@Injectable()
export class AvatarsService {
    constructor(private readonly config: ConfigService<Env>) {
        cloudinary.config({
            cloud_name: this.config.get('CLOUDINARY_CLOUD_NAME'),
            api_key: this.config.get('CLOUDINARY_API_KEY'),
            api_secret: this.config.get('CLOUDINARY_API_SECRET'),
        });
    }

    async uploadImage(
        file: Express.Multer.File,
        userId: string
    ): Promise<string> {
        if (!file || !file.buffer) {
            throw new HttpException(
                'Arquivo não enviado.',
                HttpStatus.BAD_REQUEST
            );
        }
        const MAX_SIZE: number = 10 * 1024 * 1024;

        if (file.size > MAX_SIZE) {
            throw new HttpException(
                'O tamanho do arquivo deve ser menor ou igual a 10MB.',
                HttpStatus.BAD_REQUEST
            );
        }

        const allowed: [string, string, string] = ['jpg', 'png', 'jpeg'];

        if (
            !allowed.includes(
                path.extname(file.originalname).toLocaleLowerCase().substring(1)
            )
        ) {
            throw new HttpException(
                'Somente arquivos JPG/PNG são permitidos.',
                HttpStatus.BAD_REQUEST
            );
        }
        try {
            const url = (await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        tags: [userId],
                        resource_type: 'image',
                        use_filename: true,
                        unique_filename: true,
                        overwrite: true,
                        public_id: `avatars/${userId}`,
                    },
                    (err, result) => {
                        if (err || !result) {
                            return reject(
                                new HttpException(
                                    'Erro ao enviar imagem.',
                                    HttpStatus.INTERNAL_SERVER_ERROR
                                )
                            );
                        }
                        return resolve(result.secure_url);
                    }
                );

                uploadStream.end(file.buffer);
            })) as string;

            return url;
        } catch (error) {
            throw new HttpException(
                'Erro ao enviar imagem.',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
