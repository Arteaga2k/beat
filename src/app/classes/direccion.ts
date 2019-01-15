export class Direccion {
    private id: number;
    private tipo_via_id: number;
    private nombre_via: string;
    private numero: string;
    private escalera: string;
    private piso: string;
    private codigo_postal: string;
    private provincia_id: number;
    private municipio_id: number;
    private latitud: number;
    private longitud: number;
    private fecha_alta: Date;
    private observaciones: string;
    private direccion_texto: string;

    public getId(): number {
        return this.id;
    }

    public getTipoVia(): number {
        return this.tipo_via_id;
    }

    public getNombreVia(): string {
        return this.nombre_via;
    }

    public getNumero(): string {
        return this.numero;
    }

    public getEscalera(): string {
        return this.escalera;
    }

    public getPiso(): string {
        return this.piso;
    }

    public getCodigoPostal(): string {
        return this.codigo_postal;
    }

    public getDireccionTexto(): string {
        return this.direccion_texto;
    }

    public getProvinciaId(): number {
        return this.provincia_id;
    }

    public getMunicipioId(): number {
        return this.municipio_id;
    }

    public getLatitud(): number {
        return this.latitud;
    }

    public getLongitud(): number {
        return this.longitud;
    }

    public getFechaAlta(): Date {
        return this.fecha_alta;
    }

    public getObservaciones(): string {
        return this.observaciones;
    }

    constructor(direccion: any) {
        this.id = direccion.id;
        this.tipo_via_id = direccion.tipo_via_id;
        this.nombre_via = direccion.nombre_via;
        this.numero = direccion.numero;
        this.escalera = direccion.escalera;
        this.piso = direccion.piso;
        this.codigo_postal = direccion.codigo_postal;
        this.municipio_id = direccion.municipio_id;
        this.provincia_id = direccion.provincia_id;
        this.latitud = direccion.latitud;
        this.longitud = direccion.longitud;
        this.fecha_alta = direccion.fecha_alta;
        this.observaciones = direccion.observaciones;
        this.direccion_texto = direccion.direccion_texto;
    }
}
