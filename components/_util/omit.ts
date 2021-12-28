// 删除数组不想要的选项
export default function omit<T extends object, K extends keyof T>(
  obj: T,
  fields: K[],
): Omit<T, K> {
  const clone = { ...obj };

  if (Array.isArray(fields)) {
    fields.forEach(key => {
      delete clone[key];
    });
  }

  return clone;
}