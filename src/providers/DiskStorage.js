const fs = require("fs");
const path = require("path");
const slugify = require("slugify");
const uploadConfig = require("../configs/upload");
const AppError = require("../utils/AppError");
class DiskStorage {
  async saveFile(file) {
    const { originalname, buffer, mimetype } = file;

    if (!["image/png", "image/jpg", "image/jpeg"].includes(mimetype)) {
      throw new AppError("Só são permitidos arquivos nos formatos PNG e JPG.");
    }

    if (buffer.byteLength > 1 * 1024 * 1024) {
      throw new AppError("O tamanho do arquivo não pode exceder 1MB.");
    }

    const fileNameParts = path.parse(originalname);
    const fileNameSlug = slugify(fileNameParts.name, { lower: true });
    let fileName = `${fileNameSlug}${fileNameParts.ext}`;
    let filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, fileName);

    let i = 1;
    while (fs.existsSync(filePath)) {
      i++;
      fileName = `${fileNameSlug}-${i}${fileNameParts.ext}`;
      filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, fileName);
    }

    await fs.promises.writeFile(filePath, buffer);

    return fileName;
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);
    try {
      await fs.promises.stat(filePath);
    } catch {
      return false;
    }

    await fs.promises.unlink(filePath);
    return true;
  }
}

module.exports = DiskStorage;
