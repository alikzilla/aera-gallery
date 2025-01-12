declare module '@2gis/mapgl' {
  export interface MapOptions {
    center: [number, number];
    zoom: number;
    key: string;
  }

  export interface Map {
    destroy(): void;
  }

  export function load(): Promise<{
    Map: new (containerId: string, options: MapOptions) => Map;
  }>;
}