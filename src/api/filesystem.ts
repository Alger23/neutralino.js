import { sendMessage } from '../ws/websocket';

export interface ReadFileResponse {
    data: string;
    success: boolean;
}

export type EntryType = 'FILE' | 'DIRECTORY';

export interface FileOrDirectoryEntry {
    entry: string;
    type: EntryType;
}

export interface FileOrDirectoryEntries {
    entries: Array<FileOrDirectoryEntry>;
}

export interface FileStats {
    size: number;
    isFile: boolean;
    isDirectory: boolean;
}

export function createDirectory(path: string): Promise<any> {
    return sendMessage('filesystem.createDirectory', { path });
};

export function removeDirectory(path: string): Promise<any> {
    return sendMessage('filesystem.removeDirectory', { path });
};

export function writeFile(path: string, data: string): Promise<any> {
    return sendMessage('filesystem.writeFile', { path, data });
};

export function writeBinaryFile(path: string, data: ArrayBuffer): Promise<any> {
    let bytes: Uint8Array = new Uint8Array(data);
    let asciiStr: string = '';
    for(let byte of bytes) {
        asciiStr += String.fromCharCode(byte);
    }
    
    return sendMessage('filesystem.writeBinaryFile', {
        path,
        data: window.btoa(asciiStr)
    });
};

export function readFile(path: string): Promise<ReadFileResponse> {
    return sendMessage('filesystem.readFile', { path });
};

export function readBinaryFile(path: string): Promise<ArrayBuffer> {
    return new Promise((resolve: any, reject: any) => {
        sendMessage('filesystem.readBinaryFile', { path })
        .then((base64Data: string) => {
            let binaryData: string = window.atob(base64Data);
            let len: number = binaryData.length;
            let bytes: Uint8Array = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryData.charCodeAt(i);
            }
            resolve(bytes.buffer);     
        })
        .catch((error: any) => {
            reject(error);
        });
    });
};

export function removeFile(path: string): Promise<any> {
    return sendMessage('filesystem.removeFile', { path });
};

export function readDirectory(path: string): Promise<FileOrDirectoryEntries> {
    return sendMessage('filesystem.readDirectory', { path });
};

export function copyFile(source: string, destination: string): Promise<any> {
    return sendMessage('filesystem.copyFile', { source, destination } );
};

export function moveFile(source: string, destination: string): Promise<any> {
    return sendMessage('filesystem.moveFile', { source, destination });
};

export function getStats(path: string): Promise<FileStats> {
    return sendMessage('filesystem.getStats', { path });
};
