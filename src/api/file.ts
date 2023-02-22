import { useSqlit } from "../hooks/useSqlit";
export const useFileUploadSettings = () => {
  const db = useSqlit();

  const createTable = async () => {
    await db.createTable(
      "upload_file_setting",
      "id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, api TEXT, postName TEXT, jsonUrl TEXT, active INTEGER"
    );
  };

  const select = async (pageCount: number, page: number) => {
    await createTable();
    const res = await db.select("upload_file_setting", pageCount, page);
    return res;
  };

  const add = async (
    name: string,
    api: string,
    postName: string,
    jsonUrl: string,
    active: number
  ) => {
    await createTable();
    await db.add(
      "upload_file_setting",
      "name, api, postName, jsonUrl",
      `'${name}', '${api}', '${postName}', '${jsonUrl}', ${active}`
    );
  };

  const update = async (
    id: number,
    name: string,
    api: string,
    postName: string,
    jsonUrl: string,
    active: number
  ) => {
    const col = `'id=${id}', 'name=${name}', 'api=${api}', 'postName=${postName}', 'jsonUrl=${jsonUrl}', 'active=${active}'`;
    await db.update("upload_file_setting", col);
  };

  const del = async (id: string) => {
    await db.del("upload_file_setting", `id=${id}`);
  };

  const selectActive = async () => {
    await createTable();
    const count = await db.selectCount("upload_file_setting");
    if (count === 0) {
      await add(
        "默认",
        "https://file.cs08.cn/file/uploadUtil",
        "post",
        "data.url",
        1
      );
    }
    const res = await db.select("upload_file_setting", 1, 1, "active=1");
    return res.data[0];
  };

  return { select, selectActive, add, update, del };
};
