import { sendMessage } from '../ws/websocket';

export function getMemoryInfo(): Promise<MemoryInfo> {
    return sendMessage('computer.getMemoryInfo');
};

export interface MemoryInfo {
    total: number;
    available: number
}