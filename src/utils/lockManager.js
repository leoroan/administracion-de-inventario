import { sequelize } from "../config/db/sequelize.config.js";

export async function initializeLockTable() {
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS system_locks (
      id VARCHAR(50) PRIMARY KEY,
      locked TINYINT(1) NOT NULL DEFAULT 0
    );
  `);

  await sequelize.query(`
    INSERT IGNORE INTO system_locks (id, locked) VALUES ('task_lock', 0);
  `);

  await ensureParametroWithValor();
}

export async function resetLock() {
  await sequelize.query("UPDATE system_locks SET locked = 0 WHERE id = 'task_lock'");
  await sequelize.query(`UPDATE Parametro_Valor SET valor = 'false' WHERE parametro_id = (SELECT parametro_id FROM Parametro WHERE parametro = 'isBusy')`);
}

export async function setLock() {
  await sequelize.query("UPDATE system_locks SET locked = 1 WHERE id = 'task_lock'");
  await sequelize.query(`UPDATE Parametro_Valor SET valor = 'true' WHERE parametro_id = (SELECT parametro_id FROM Parametro WHERE parametro = 'isBusy')`);
}

export async function releaseLock() {
  await sequelize.query("UPDATE system_locks SET locked = 0 WHERE id = 'task_lock'");
  await sequelize.query(`UPDATE Parametro_Valor SET valor = 'false' WHERE parametro_id = (SELECT parametro_id FROM Parametro WHERE parametro = 'isBusy')`);
}

export async function isLocked() {
  const [results] = await sequelize.query("SELECT locked FROM system_locks WHERE id = 'task_lock'");
  return results[0]?.locked === 1;
}


async function ensureParametroWithValor() {
  const transaction = await sequelize.transaction();

  try {
    // Insertar en "Parametro" si no existe
    await sequelize.query(
      `INSERT INTO Parametro (parametro) 
       SELECT :parametro WHERE NOT EXISTS (
         SELECT 1 FROM Parametro WHERE parametro = :parametro
       )`,
      {
        replacements: { parametro: 'isBusy' },
        transaction
      }
    );

    // Insertar en "Parametro_Valor" si no existe, asociándolo al ID del Parametro
    await sequelize.query(
      `INSERT INTO Parametro_Valor (parametro_id, valor) 
      SELECT p.parametro_id, :valor FROM Parametro p 
      WHERE p.parametro = :parametro AND NOT EXISTS (
        SELECT 1 FROM Parametro_Valor pv WHERE pv.parametro_id = p.parametro_id
      )`,
      {
        replacements: { parametro: 'isBusy', valor: 'false' },
        transaction
      }
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}