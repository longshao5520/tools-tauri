import Database from "../tauri-plugin-sql";

export const useSqlit = () => {
  let db: any = null;

  const openDB = async () => {
    db = await Database.load("sqlite:tools.db");
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

  const selectCount = async (tableName: string) => {
    await openDB();
    const data = await db.select(`Select count(*) as total From ${tableName}`);
    console.log("查询数据成功", data);
    await closeDB();
    return data[0].total;
  };

  const selectAll = async (tableName: string, where?: string) => {
    await openDB();
    const data = await db.select(
      `Select * From ${tableName}  ${where ? "WHERE " + where : ""}`
    );
    console.log("查询数据成功", data);
    await closeDB();
    return data;
  };

  const select = async (
    tableName: string,
    pageCount?: number,
    page?: number,
    where?: string
  ) => {
    await openDB();
    const data = await db.select(
      `Select * From ${tableName} ${
        where ? "WHERE " + where : ""
      } Limit ${pageCount} Offset ${((page || 1) - 1) * (pageCount || 10)}`
    );
    console.log("查询数据成功", data);
    await closeDB();
    return {
      data,
      total: await selectCount(tableName),
    };
  };

  const add = async (tableName: string, columns: string, values: string) => {
    await openDB();
    await db.execute(`
      INSERT INTO ${tableName} (${columns}) VALUES (${values});
    `);
    console.log("插入数据成功");
    await closeDB();
  };

  const update = async (tableName: string, columns: string, where: string) => {
    await openDB();
    const sql = `UPDATE ${tableName} SET ${columns} WHERE ${where};`;
    console.log(sql);
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

  return { createTable, select, selectCount, selectAll, add, update, del };
};
