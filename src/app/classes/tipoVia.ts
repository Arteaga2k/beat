export class TipoVia {

    private id: number;
    private codigo: string;
    private nombre: string;

    public getId(): number {
        return this.id;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getCodigo(): string {
        return this.codigo;
    }

    constructor(tipo_via: any) {
        this.id = tipo_via.id;
        this.nombre = tipo_via.nombre;
        this.codigo = tipo_via.codigo;
    }
}
