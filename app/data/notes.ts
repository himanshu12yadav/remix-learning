import fs from 'fs/promises';

export async function getStoredNotes(){
    const rawFileContent = await fs.readFile('Notes.json',{encoding:'utf-8'});
    const data = JSON.parse(rawFileContent);
    return data.notes ?? [];
}
//@ts-ignore
export function storeNotes(notes:any){
    return fs.writeFile('Notes.json',JSON.stringify({notes:notes || []}));
}
