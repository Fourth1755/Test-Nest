import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimesModule } from './animes/animes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anime } from './animes/entities/anime.entity';
import { TagsModule } from './tags/tags.module';
import { AccountsModule } from './accounts/accounts.module';
import { Account } from './accounts/entities/account.entity';
import { ArtistsModule } from './artists/artists.module';
import { Artist } from './artists/entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'testnest',
    entities: [Anime,Account,Artist],
    synchronize: true,
  }),AnimesModule, TagsModule, AccountsModule, ArtistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
