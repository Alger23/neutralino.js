import { sendMessage } from '../ws/websocket';

export interface StorageSettDataResponse {
    success?: boolean;
    error?: string;
}
  
export interface StorageGetDataResponse {
    data?: string;
    success?: boolean;
    error?: string;
}

export function setData(key: string, data: string): Promise<StorageSettDataResponse> {
    return sendMessage('storage.setData', { key, data });

};

export function getData(key: string): Promise<StorageGetDataResponse> {
    return sendMessage('storage.getData', { key });
};
