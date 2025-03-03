import * as websocket from '../ws/websocket';

export function dispatch(extensionId: string, event: string, data?: any): Promise<any> {
    return new Promise(async (resolve: any, reject: any) => {
        let stats = await Neutralino.extensions.getStats();
        if(!stats.loaded.includes(extensionId)) {
            reject({
                code: 'NE_EX_EXTNOTL',
                message: `${extensionId} is not loaded`
            });
        }
        else if(stats.connected.includes(extensionId)) {
            try {
                let result = await websocket.sendMessage('extensions.dispatch', {extensionId, event, data});
                resolve(result);
            }
            catch(err: any) {
                reject(err);
            }
        }
        else {
            // loaded but not connected yet.
            websocket.sendWhenExtReady(extensionId, {
                method: 'extensions.dispatch',
                data: {extensionId, event, data}, resolve, reject
            });
        }
    });
};

export function broadcast(event: string, data?: any): Promise<any> {
    return websocket.sendMessage('extensions.broadcast', {event, data});
};

export function getStats(): Promise<any> {
    return websocket.sendMessage('extensions.getStats');
};
