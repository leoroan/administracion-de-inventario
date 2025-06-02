import multer from 'multer';
import CustomError from '../error/customError.js';

// Tipos de archivo permitidos
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Tamaño máximo permitido (ej: 2 MB)
const MAX_FILE_SIZE = 2 * 1024 * 1024;

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(CustomError.create(400, 'Formato de imagen no permitido', {code: 'INVALID_IMAGE_FORMAT'}));
  }
};

const baseUpload = multer({ storage, limits: { fileSize: MAX_FILE_SIZE }, fileFilter });

const upload = {
  single: (fieldName) => {
    const middleware = baseUpload.single(fieldName);

    return (req, res, next) => {
      middleware(req, res, (err) => {
        if (!err) return next();
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(CustomError.create(400, 'La imagen excede el tamaño máximo permitido', {code: 'IMAGE_TOO_LARGE'}));
        }

        if (err instanceof CustomError) {
          return next(err);
        }

        return next(CustomError.create(500, 'Error al procesar la imagen', {code: 'UPLOAD_FAILURE', originalError: err}));
      });
    };
  },
};

export default upload;
