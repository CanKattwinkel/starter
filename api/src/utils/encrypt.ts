import {compare, hash} from 'bcrypt';

export function hashIt(input: string, rounds: number = 12): Promise<string> {
    return hash(input, rounds);
}


export function compareIt(input: string, salt: string): Promise<boolean> {
    return compare(input, salt);
}
