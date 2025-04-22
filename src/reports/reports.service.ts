import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async generatePdf() {
    const users = await this.prisma.user.findMany();
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream('users-report.pdf'));
    doc.text('Relatório de Usuários');
    users.forEach((user) => {
      doc.text(`Nome: ${user.name}, Email: ${user.email}, Nível: ${user.level}`);
    });
    doc.end();
    return 'PDF gerado com sucesso!';
  }

  async generateCsv() {
    const users = await this.prisma.user.findMany();
    const csvWriter = createObjectCsvWriter({
      path: 'users-report.csv',
      header: [
        { id: 'name', title: 'Nome' },
        { id: 'email', title: 'Email' },
        { id: 'level', title: 'Nível' },
      ],
    });
    await csvWriter.writeRecords(users);
    return 'CSV gerado com sucesso!';
  }
}