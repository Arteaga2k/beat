import { Permiso } from './permiso';
import { Direccion } from './direccion';
export class Localizacion {

    static IMAGEN_GENERICA = 'almacen.jpg';

    public id: number;
    private empresa_id: number;
    private nombre: string;
    private email: string;
    private tipo: string;
    private telefono: string;
    private direccion: Direccion;
    public permisos: Array<Permiso>;
    private imagen: string;
    private color: string;

    public getId(): number {
        return this.id;
    }

    public getEmpresaId(): number {
        return this.empresa_id;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getEmail(): string {
        return this.email;
    }

    public getTipo(): string {
        return this.tipo;
    }

    public getTelefono(): string {
        return this.telefono;
    }

    public getDireccion(): Direccion {
        return this.direccion;
    }

    public getPermisos(): Array < Permiso > {
        return this.permisos;
    }

    public setPermisos(permisos: any) {
        if (permisos !== undefined) {
            permisos.forEach(permiso => {
                this.permisos.push(new Permiso(permiso));
            });
        }
    }

    public getImagen(): string {
        if (typeof this.imagen === 'undefined' ||
            this.imagen == null ||
            this.imagen.length === 0
        ) {
            return Localizacion.IMAGEN_GENERICA;
        }
        return this.imagen;
    }

    public getColor(): string {
        return this.color;
    }

    constructor(localizacion: any) {
        this.permisos = [];
        this.id = localizacion.id;
        this.empresa_id = localizacion.empresa_id;
        this.nombre = localizacion.nombre;
        this.email = localizacion.email;
        this.tipo = localizacion.tipo;
        this.telefono = localizacion.telefono;
        this.imagen = localizacion.imagen;
        this.direccion = new Direccion(localizacion.direccion);
        this.color = localizacion.color.toLowerCase();
        this.setPermisos(localizacion.permisos);
    }
}
