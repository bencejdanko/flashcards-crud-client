enum Signal {
    INIT = "INIT",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
}

interface Change {
    offset: number;
    change: [number, string];
}

interface Buffer {
    signal: Signal;
    value: string | Change[];
}

export type { Buffer, Change };
export { Signal}