import { readFile } from 'fs/promises'
import path from 'path'

export const readTxtToArray = async (
  fileName: string,
  folder = '5000(optimized)'
): Promise<string[]> => {
  try {
    const folders = ['vocabularies']
    if (folder) {
      folders.push(folder)
    }
    const fullPath = path.join(process.cwd(), ...folders, fileName)
    const fileContent = await readFile(fullPath, 'utf-8')
    const lines = fileContent.split('\n').filter(line => line.trim() !== '')
    return lines
  } catch (error) {
    console.error('读取文件出错:', error)
    return []
  }
}
