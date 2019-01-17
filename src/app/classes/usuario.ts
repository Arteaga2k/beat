import { Localizacion } from 'src/app/classes/localizacion';
import { Permiso } from './permiso';
import { Moment } from 'moment';
import * as moment from 'moment';
export class Usuario {
    static DIR_FOTOS = 'assets/images/usuarios/';

    private id: number;
    private dni: string;
    private nombre: string;
    private telefono: string;
    private email: string;
    private cargo: string;
    private activo: boolean;
    private fecha_nacimiento: Moment;
    private fecha_registro: Moment;
    private sexo: string;
    private foto: string;
    private permisosNoLocalizables: Array < Permiso > ;
    private localizaciones: Array < Localizacion > ;

    public getId(): number {
        return this.id;
    }

    public getDni(): string {
        return this.dni;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getTelefono(): string {
        return this.telefono;
    }

    public getEmail(): string {
        return this.email;
    }

    public getCargo(): string {
        return this.cargo;
    }

    public getSexo(): string {
        return this.sexo;
    }

    public getFechaNacimiento(): Moment {
        return this.fecha_nacimiento;
    }

    public getFechaRegistro(): Moment {
        return this.fecha_registro;
    }

    public getFoto(): string {
        return this.foto;
    }

    public isActivo(): boolean {
        return this.activo;
    }

    public getPermisosNoLocalizables(): Array < Permiso > {
        return this.permisosNoLocalizables;
    }

    public setPermisosNoLocalizables(permisos: Array < Permiso > ) {
        this.permisosNoLocalizables = permisos;
    }

    public getLocalizaciones(): Array < Localizacion > {
        return this.localizaciones;
    }

    public setLocalizaciones(localizaciones: Array < Localizacion > ) {
        this.localizaciones = localizaciones;
    }

    /**
     * Devuelve la fecha de nacimiento formateada como texto
     * según el formato especificado por parámetro.
     *
     * @param formato: string. Por ejemplo DD/MM/YYYY
     */
    public getFechaNacimientoFormateada(formato: string): string {
        if (this.fecha_nacimiento == null) {
            return '';
        }
        return this.fecha_nacimiento.format(formato);
    }

    /**
     * Devuelve la fecha de registro formateada como texto
     * según el formato especificado por parámetro.
     *
     * @param formato: string. Por ejemplo DD/MM/YYYY
     */
    public getFechaRegistroFormateada(formato: string): string {
        return this.fecha_registro.format(formato);
    }

    constructor(usuario: any) {
        this.id = usuario.id;
        this.dni = usuario.dni;
        this.nombre = usuario.nombre;
        this.cargo = usuario.cargo;
        this.sexo = usuario.sexo;
        this.telefono = usuario.telefono;
        this.email = usuario.email;
        this.activo = usuario.activo;
        this.fecha_registro = moment(usuario.fecha_registro);
        if (
            typeof usuario.fecha_nacimiento !== 'undefined' &&
            usuario.fecha_nacimiento != null
        ) {
            this.fecha_nacimiento = moment(usuario.fecha_nacimiento);
        } else {
            this.fecha_nacimiento = null;
        }
        this.foto = usuario.foto;
        this.permisosNoLocalizables = usuario.permisos_no_localizables;
        this.localizaciones = usuario.localizaciones;
    }
}
