import multer from 'multer';
import CustomError from '../error/customError.js';
import { tmpdir } from 'os';
import path from 'path';

const ALLOWED_MIME_TYPES = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
  'application/vnd.ms-excel', // .xls
];

const isAllowedFileType = (originalname) => {
  const allowedExtensions = ['.xlsx', '.dat'];
  const ext = originalname.slice(originalname.lastIndexOf('.')).toLowerCase();
  return allowedExtensions.includes(ext);
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Almacenamiento condicional
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Guardamos todos los archivos .dat en /tmp
    if (file.originalname.toLowerCase().endsWith('.dat')) {
      cb(null, tmpdir()); // Carpeta temporal del sistema
    } else {
      cb(new Error('Solo se guardan archivos .dat en disco'), null);
    }
  },
  filename: (req, file, cb) => {
    // Nombre único para evitar colisiones
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const storageEngine = {
  _handleFile(req, file, cb) {
    if (file.originalname.toLowerCase().endsWith('.dat')) {
      storage._handleFile(req, file, cb);
    } else {
      multer.memoryStorage()._handleFile(req, file, cb);
    }
  },
  _removeFile(req, file, cb) {
    // Opcional: lógica para eliminar archivos temporales si lo necesitas
    if (file?.path) {
      require('fs').unlink(file.path, cb);
    } else {
      cb();
    }
  }
};

const fileFilter = (req, file, cb) => {
  if (isAllowedFileType(file.originalname)) {
    cb(null, true);
  } else {
    cb(CustomError.create(400, 'Formato de archivo no permitido', { code: 'INVALID_FILE_FORMAT' }));
  }
};

const baseUpload = multer({
  storage: storageEngine,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter
});

const upload = {
  single: (fieldName) => {
    const middleware = baseUpload.single(fieldName);

    return (req, res, next) => {
      middleware(req, res, (err) => {
        if (!err) return next();
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(CustomError.create(400, 'El archivo excede el tamaño máximo permitido', { code: 'FILE_TOO_LARGE' }));
        }

        if (err instanceof CustomError) {
          return next(err);
        }

        return next(CustomError.create(500, 'Error al procesar el archivo', { code: 'UPLOAD_FAILURE', originalError: err }));
      });
    };
  },

  // Nuevo método para recibir múltiples archivos
  array: (fieldName, maxCount) => {
    const middleware = baseUpload.array(fieldName, maxCount);

    return (req, res, next) => {
      middleware(req, res, (err) => {
        if (!err) return next();

        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(CustomError.create(400, 'Un archivo excede el tamaño máximo permitido', { code: 'FILE_TOO_LARGE' }));
        }

        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          return next(CustomError.create(400, 'Campo de archivo inesperado', { code: 'UNEXPECTED_FILE_FIELD' }));
        }

        if (err instanceof CustomError) {
          return next(err);
        }

        return next(CustomError.create(500, 'Error al procesar los archivos', { code: 'UPLOAD_FAILURE', originalError: err }));
      });
    };
  },
};

export default upload;