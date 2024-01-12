import oracledb from "oracledb";

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.fetchAsString = [oracledb.CLOB];
oracledb.autoCommit = true;

oracledb.initOracleClient();

class Connection {
  static #instance;

  /**
   * @returns {Promise<oracledb.Connection>}
   */
  static async getInstance() {
    if (!Connection.instance) {
      Connection.#instance = await this.#connection();
    }
    return Connection.#instance;
  }

  static async #connection() {
    try {
      console.log("Opening connection...");
      const con = await oracledb.getConnection({
        user: process.env.USER,
        password: process.env.PASSWORD,
        connectString: process.env.CONNECT_STRING,
      });

      process.on("exit", async (code) => {
        console.log(`Closing connection...`);
        await con.close();
      });

      return con;
    } catch (error) {
      console.error(error);
    }
  }
}

export default await Connection.getInstance();
