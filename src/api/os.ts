import { sendMessage } from '../ws/websocket';

export interface ExecCommandOptions {
    stdIn?: string;
    background?: boolean;
}

export interface CommandOutput {
    pid: Number;
    stdOut: string;
    stdErr: string;
    exitCode: Number;

}

export interface Envar {
    value: string;
}

export interface OpenDialogOptions {
    multiSelections?: boolean;
    filters?: Filter[];
}

export interface SaveDialogOptions {
    forceOverwrite?: boolean;
    filters?: Filter[];
}

export interface Filter {
    name: string;
    extensions: string[];
}

export interface DialogResponse {
    selectedEntry?: string;
    success?: boolean;
    error?: string;
}

export interface TrayOptions {
    icon?: string;
    menu?: TrayMenuItem[];
}

interface TrayMenuItem {
    id?: string;
    text: string;
    isDisabled?: boolean;
    isChecked?: boolean;
}

export enum Icon {
    WARNING = 'WARNING',
    ERROR = 'ERROR',
    INFO = 'INFO',
    QUESTION = 'QUESTION'
};

export enum MessageBoxChoice {
    OK = 'OK',
    OK_CANCEL = 'OK_CANCEL',
    YES_NO = 'YES_NO',
    YES_NO_CANCEL = 'YES_NO_CANCEL',
    RETRY_CANCEL = 'RETRY_CANCEL',
    ABORT_RETRY_IGNORE = 'ABORT_RETRY_IGNORE'
};

export interface MessageBoxResult {
    yesButtonClicked: boolean;
}

export function execCommand(command: string, options?: ExecCommandOptions): Promise<CommandOutput> {
    return sendMessage('os.execCommand', { command, ...options });
};

export function getEnv(key: string): Promise<Envar> {
    return sendMessage('os.getEnv', { key });
};

export function showOpenDialog(title?: string, options?: OpenDialogOptions): Promise<DialogResponse> {
    return sendMessage('os.showOpenDialog', { title, ...options });
};

export function showFolderDialog(title?: string): Promise<any> {
    return sendMessage('os.showFolderDialog', { title });
};

export function showSaveDialog(title?: string, options?: SaveDialogOptions): Promise<DialogResponse> {
    return sendMessage('os.showSaveDialog', { title, ...options });
};

export function showNotification(title: string, content: string, icon?: Icon): Promise<any> {
    return sendMessage('os.showNotification', { title, content, icon });
};

export function showMessageBox(title: string, content: string, 
                choice?: MessageBoxChoice, icon?: Icon): Promise<MessageBoxResult> {
    return sendMessage('os.showMessageBox', { title, content, choice, icon });
};

export function setTray(options: TrayOptions): Promise<any> {
    return sendMessage('os.setTray', options);
};

export function open(url: string): Promise<any> {
    return sendMessage('os.open', { url });
};

export function getPath(name: string): Promise<any> {
    return sendMessage('os.getPath', { name });
};
