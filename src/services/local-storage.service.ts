export class LocalStorageService {
  static get(key: string): string | undefined {
    const data: string | null = localStorage.getItem(key);
    return data ?? undefined;
  }

  static set(key: string, value: unknown) {
    if (!value) return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  static setMany(toSave: Record<string, string>) {
    Object.entries(toSave).forEach(([key, value]) =>
      LocalStorageService.set(key, value),
    );
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }

  static removeMany(...keys: string[]) {
    keys.forEach((key) => LocalStorageService.remove(key));
  }

  static clear() {
    localStorage.clear();
  }
}
