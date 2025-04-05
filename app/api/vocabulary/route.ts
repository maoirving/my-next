import { readTxtToArray } from '@/utils'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const fileName = searchParams.get('fileName')
  if (!fileName) {
    return NextResponse.json(
      { success: false, error: 'Vocabulary query should be passed' },
      { status: 500 }
    )
  }

  try {
    const vocabulary = await readTxtToArray(fileName)
    return NextResponse.json({ success: true, data: vocabulary, fileName: fileName })
  } catch (error) {
    return NextResponse.json({ success: false, error: '读取文件失败' }, { status: 500 })
  }
}
