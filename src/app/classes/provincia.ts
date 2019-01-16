export class Provincia {

    private id: number;
    private nombre: string;
    private huso_horario: string;
    private comunidad: string;

    public getId(): number {
        return this.id;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getComunidad(): string {
        return this.comunidad;
    }

    public getHusoHorario(): string {
        return this.huso_horario;
    }

    constructor(provincia: any) {
        this.id = provincia.id;
        this.nombre = provincia.nombre;
        this.huso_horario = provincia.huso_horario;
        this.comunidad = provincia.comunidad;
    }
}
