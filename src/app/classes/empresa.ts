import { Direccion } from "./direccion";
import { Localizacion } from "./localizacion";

export class Empresa {
    static DIR_LOGOS = 'assets/images/logos/';

    private id: number;
    private codigo: string;
    private cif: string;
    private nombre: string;
    private telefono: string;
    private email: string;
    private fax: string;
    private logo: string;
    private tipo: string;
    private activa: boolean;
    private direccion: Direccion;
    private localizaciones: Array < Localizacion > = [];

    public getId(): number {
        return this.id;
    }

    public getCodigo(): string {
        return this.codigo;
    }

    public getCif(): string {
        return this.cif;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getEmail(): string {
        return this.email;
    }

    public getTelefono(): string {
        return this.telefono;
    }

    public getFax(): string {
        return this.fax;
    }

    public getLogo(): string {
        return this.logo;
    }

    public getTipo(): string {
        return this.tipo;
    }

    public getDireccion(): Direccion {
        return this.direccion;
    }

    public isActiva(): boolean {
        return this.activa;
    }

    public getLocalizaciones(): Array < Localizacion > {
        return this.localizaciones;
    }

    public setLocalizaciones(_localizaciones: any) {
        if (_localizaciones !== undefined) {
            _localizaciones.forEach(localizacion => {
                this.localizaciones.push(new Localizacion(localizacion));
            });
        }
    }

    constructor(empresa: any) {
        this.id = empresa.id;
        this.codigo = empresa.codigo;
        this.cif = empresa.cif;
        this.nombre = empresa.nombre;
        this.logo = empresa.logotipo;
        this.email = empresa.email;
        this.telefono = empresa.telefono;
        this.fax = empresa.fax;
        this.tipo = empresa.tipo;
        this.activa = empresa.activa;
        this.direccion = empresa.direccion ? new Direccion(empresa.direccion) : null;
        this.setLocalizaciones(empresa.localizaciones);
    }
}
