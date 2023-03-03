import { useSqlit } from "../hooks/useSqlit";

export const useSystemSetting = () => {
  const db = useSqlit();

  const createTable = async () => {
    await db.createTable(
      "system_setting",
      "id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, key TEXT, value TEXT, type TEXT, description TEXT, is_delete INTEGER DEFAULT 0"
    );
  };

  const select = async (type: string, key?: string) => {
    await createTable();
    const where = key
      ? `type='${type}' AND key='${key}' AND is_delete=0`
      : `type='${type}' AND is_delete=0`;
    console.log("where", where);

    const res = await db.selectAll("system_setting", where);
    console.log("res", res);

    return res;
  };

  const add = async (
    name: string,
    key: string,
    value: string | boolean | number,
    type: string,
    description: string
  ) => {
    await createTable();
    await db.add(
      "system_setting",
      "name, key, value, type, description",
      `'${name}', '${key}', '${value}', '${type}', '${description}'`
    );
  };

  const update = async (key: string, value: string | boolean | number) => {
    await createTable();
    await db.update("system_setting", `value='${value}'`, `key='${key}'`);
  };

  return { createTable, select, add, update };
};
