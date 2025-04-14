import { Global, Module, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaService } from './prisma.service';


@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly prismaService: PrismaService) {}

  async onModuleInit() {
    await this.prismaService.onModuleInit();
  }

  async onModuleDestroy() {
    await this.prismaService.onModuleDestroy();
  }
}