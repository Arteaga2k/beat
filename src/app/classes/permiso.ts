export class Permiso {
    private nombre: string;
    private codigo: string;
  
    public getNombre(): string{
      return this.nombre;
    }
  
    public getCodigo(): string{
      return this.codigo;
    }
  
    constructor(permiso: any) {
      this.nombre = permiso.nombre;
      this.codigo = permiso.codigo;
    }
  }
  