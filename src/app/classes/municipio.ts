export class Municipio {

    private id: number;
    private nombre: string;
    private codigos_postales: string;

    public getId(): number {
        return this.id;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getCodigosPostales(): string {
        return this.codigos_postales;
    }

    constructor(municipio: any) {
        this.id = municipio.id;
        this.nombre = municipio.nombre;
        this.codigos_postales = municipio.codigos_postales;
    }
}
