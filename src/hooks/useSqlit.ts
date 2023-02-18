import SQLiteApi from "tauri-plugin-sqlite-api";
export const useSqlit = () => {
  let db: any = null;

  const openDB = async () => {
    db = await await SQLiteApi.open("./tools.db");
    console.log("数据库打开成功");
  };

  const closeDB = async () => {
    await db.close();
    console.log("数据库关闭成功");
  };

  const createTable = async (tableName: string, columns: string) => {
    await openDB();
    await db.execute(`
      CREATE TABLE IF NOT EXISTS ${tableName} (
        ${columns}
      );
    `);
    console.log("创建表成功");
    await closeDB();
  };

  const select = async (sql: string) => {
    await openDB();
    const res = await db.select(sql);
    console.log("查询数据成功", res);
    await closeDB();
    return res;
  };

  const add = async (tableName: string, columns: string, values: string) => {
    await openDB();
    await db.execute(`
      INSERT INTO ${tableName} (${columns}) VALUES (${values});
    `);
    console.log("插入数据成功");
    await closeDB();
  };

  const update = async (tableName: string, columns: string, where?: string) => {
    await openDB();
    let sql = "";
    if(where) {
      sql = `UPDATE ${tableName} SET ${columns} WHERE ${where};`
    } else {
      sql = `UPDATE ${tableName} SET ${columns};`
    }
    await db.execute(sql);
    console.log("更新数据成功");
    await closeDB();
  };

  const del = async (tableName: string, values: string) => {
    await openDB();
    await db.execute(`
      DELETE FROM ${tableName} WHERE ${values};
    `);
    console.log("删除数据成功");
    await closeDB();
  };

  return { createTable, select, add, update, del };
};
