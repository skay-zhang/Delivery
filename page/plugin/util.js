import os from 'os';

export const sys = {
    getType() {
        let type = os.type();
        console.log(type)
        if (type === 'Darwin') return 'macos';
        else if (type === 'Windows_NT') return 'windows';
        else if (type === 'Linux') return 'linux';
        return 'other'
    }
}