import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimesModule } from './animes/animes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anime } from './animes/entities/anime.entity';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'testnest',
    entities: [Anime],
    synchronize: true,
  }),AnimesModule, TagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
