export class Permiso {
  public nombre: string;
  public codigo: string;
  public localizable: boolean;

  public getNombre(): string {
    return this.nombre;
  }

  public getCodigo(): string {
    return this.codigo;
  }

  public getLocalizable(): boolean {
    return this.localizable;
  }

  constructor(permiso: any) {
    this.nombre = permiso.nombre;
    this.codigo = permiso.codigo;
    this.localizable = permiso.localizable;
  }
}
