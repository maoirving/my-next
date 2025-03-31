import Image from 'next/image'
import { oxfordWords } from '@/files/oxford'
import { targetWords } from '@/files/target'

export default function English() {
  const word = 'hello'
  console.log('word:', word)

  const oxfordWordsSet = new Set(oxfordWords)

  const handledTargetWords = Array.from(new Set(targetWords.map(word => word.trim())))

  const differences = handledTargetWords.filter(word => !oxfordWordsSet.has(word))
  console.log('differences:', differences)

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-5 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div>
          <div>
            <label className="font-bold text-pink-500 capitalize mr-2">Oxford:</label>
            <span>
              {oxfordWords.length}(original) - {oxfordWordsSet.size}(handled)
            </span>
          </div>
          <div>
            <label className="font-bold text-blue-400 mr-2 capitalize">Target:</label>
            <span>
              {targetWords.length}(original) - {handledTargetWords.length}(handled)
            </span>
          </div>
          <div>
            <label className="font-bold capitalize text-green-400 mr-2">differences: </label>
            <span className="font-bold"> {differences.length}</span>
          </div>
          <ul>
            {differences.map(word => (
              <li key={word}>{word}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}
