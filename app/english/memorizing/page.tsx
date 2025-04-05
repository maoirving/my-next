'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'

export default function EnglishMemorizing() {
  const vocabularyName = 'Oxford 5000 C1.txt'
  const [vocabulary, setVocabulary] = useState<string[]>([]) // 单词列表状态
  const [currentIndex, setCurrentIndex] = useState(0) // 当前索引状态
  const current = vocabulary[currentIndex] || ''
  const cambridgeUrl = `https://dictionary.cambridge.org/us/dictionary/english-chinese-simplified/${current}`
  const oxfordUrl = `https://www.oxfordlearnersdictionaries.com/us/definition/english/${current}`

  const prevDisabled = currentIndex <= 0
  const nextDisabled = currentIndex >= vocabulary.length - 1

  const prev = () => {
    if (prevDisabled) return

    setCurrentIndex(currentIndex - 1) // 更新状态触发重新渲染
    goCambridge(currentIndex - 1)
  }

  const next = () => {
    if (nextDisabled) return

    // 修正边界条件
    setCurrentIndex(currentIndex + 1) // 更新状态触发重新渲染
    goCambridge(currentIndex + 1)
  }

  const goCurrent = () => {
    goCambridge(currentIndex)
  }

  const goCambridge = (index: number) => {
    setTimeout(() => {
      window.open(
        `https://dictionary.cambridge.org/us/dictionary/english-chinese-simplified/${vocabulary[index]}`,
        '_blank',
        'width=650,height=1000'
      )
    })
  }

  useEffect(() => {
    fetch(`/api/vocabulary?fileName=${vocabularyName}`, {
      headers: {
        hello: '',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setVocabulary(data.data)
        }
      })
      .catch(() => console.error('加载失败'))
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          prev()
          break
        case 'ArrowRight':
          next()
          break
        case 'Enter':
          goCurrent()
          break
      }
    }

    // 添加事件监听器
    window.addEventListener('keydown', handleKeyDown)

    // 清理事件监听器
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [vocabulary, currentIndex])

  return (
    <div className="px-20 py-10">
      <h1 className="font-bold text-2xl mb-5"> Memorizing words</h1>
      <p className="mb-2">
        <span className="font-bold">Vocabulary:</span>{' '}
        <span className="italic text-pink-500">{vocabularyName}</span>
      </p>
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-1">
          <ul className="max-h-[70vh] overflow-y-auto bg-pink-50 px-3 py-2 rounded-md">
            {vocabulary.map((word, index) => (
              <li key={word}>
                <button
                  type="button"
                  className={clsx('cursor-pointer hover:text-pink-300', {
                    'text-pink-500': index === currentIndex,
                  })}
                  onClick={() => setCurrentIndex(index)}
                >
                  {word}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2">
          <div>
            <span className="font-bold">Current:</span> {current}
          </div>
          <div className="flex gap-5 mt-2">
            <button
              type="button"
              className={clsx('bg-pink-400 px-5 py-1 rounded-md text-white', {
                'cursor-not-allowed opacity-60': prevDisabled,
                'cursor-pointer': !prevDisabled,
              })}
              disabled={prevDisabled}
              onClick={prev}
            >
              prev
            </button>
            <button
              type="button"
              className={clsx('bg-pink-400 px-5 py-1 rounded-md text-white', {
                'cursor-not-allowed opacity-60': nextDisabled,
                'cursor-pointer': !nextDisabled,
              })}
              disabled={nextDisabled}
              onClick={next}
            >
              next
            </button>
          </div>
          <div className="flex gap-5 mt-4">
            <a
              href={cambridgeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:underline"
            >
              Cambridge
            </a>
            <a
              href={oxfordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:underline"
            >
              Oxford
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
