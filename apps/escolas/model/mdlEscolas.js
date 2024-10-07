const db = require("../../../database/databaseconfig");

const GetAllEscolas = async () => {
  return (
    await db.query(
      "SELECT * " + "FROM escolas WHERE deleted = false ORDER BY nome ASC"
    )
  ).rows;
};

const GetEscolaByID = async (escolaIDPar) => {
  return (
    await db.query(
      "SELECT * " +
        "FROM escolas WHERE escolaid = $1 and deleted = false ORDER BY nome ASC",
      [escolaIDPar]
    )
  ).rows;
};

const InsertEscolas = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO escolas " + "VALUES (default, $1, $2, $3, $4)",
        [
          registroPar.codigo,
          registroPar.nome,
          registroPar.dataAbertura,
          registroPar.ativo,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlEscolas|InsertEscolas] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const UpdateEscolas = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE escolas SET " +
          "codigo = $2, " +
          "nome = $3, " +
          "dataAbertura = $4, " +
          "ativo = $5, " +
          "deleted = $6 " +          
          "WHERE escolaid = $1",
        [
            registroPar.escolaid  ,
            registroPar.codigo   ,
            registroPar.nome,
            registroPar.dataAbertura,
            registroPar.ativo    ,
            registroPar.deleted  ,          
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlEscolas|UpdateEscolas] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const DeleteEscolas = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
    
  try {
    linhasAfetadas = (
    await db.query(
      "UPDATE escolas SET " + "deleted = true " + "WHERE escolaid = $1",
      [registroPar.escolaid]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlEscolas|DeleteEscolas] " + error.detail;
  linhasAfetadas = -1;
}

return { msg, linhasAfetadas };
};

module.exports = {
  GetAllEscolas,
  GetEscolaByID,
  InsertEscolas,
  UpdateEscolas,
  DeleteEscolas,
};
