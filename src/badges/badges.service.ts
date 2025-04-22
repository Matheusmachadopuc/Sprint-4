import * as QRCode from 'qrcode';

async generateBadge(userId: string) {
  const user = await this.prisma.user.findUnique({ where: { id: userId } });
  const qrCode = await QRCode.toDataURL(user.id);

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(`badge-${user.id}.pdf`));
  doc.text(`Nome: ${user.name}`);
  doc.text(`Email: ${user.email}`);
  doc.text(`Nível: ${user.level}`);
  doc.image(qrCode, { fit: [100, 100] });
  doc.end();

  return `cracha gerado para o usuário ${user.name}`;
}