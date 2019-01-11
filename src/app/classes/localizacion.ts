import { Permiso } from './permiso';

export class Localizacion {

    private id: number;
    private nombre: string;
    private tipo: string;
    private direccion: string;
    private permisos: Array<Permiso>;
    private imagen: string;
    private color: string;

    public getId(): number {
        return this.id;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getTipo(): string {
        return this.tipo;
    }

    public getDireccion(): string {
        return this.direccion;
    }

    public getPermisos(): Array<Permiso> {
        return this.permisos;
    }

    public setPermisos(permisos: any) {
        permisos.forEach(permiso => {
            this.permisos.push(new Permiso(permiso));
        });
    }

    public getImagen(): string {
        return this.imagen;
    }

    public getColor(): string {
        return this.color;
    }

    constructor(localizacion: any) {
        this.permisos = [];
        this.id = localizacion.id;
        this.nombre = localizacion.nombre;
        this.tipo = localizacion.tipo;
        this.direccion = localizacion.direccion;
        this.setPermisos(localizacion.permisos);
        this.imagen = localizacion.imagen;
        this.color = localizacion.color;
    }
}
