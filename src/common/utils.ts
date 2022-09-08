/* eslint-disable no-param-reassign */
function swap<Type>(arr: Type[], i: number, j: number) {
  const temp: Type = arr[i]!
  arr[i] = arr[j]!
  arr[j] = temp!
}
export function randomizeArray<Type>(arr: Type[]): Type[] {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    swap(arr, i, j)
  }
  return arr
}

export function optimizeArrayByHeight<Type extends { height?: number }>(arr: Type[], maxLength: number): Type[] {
  for (let i = 1; i < maxLength; i += 1) {
    let j = i
    while (arr[i - 1]?.height === arr[j]?.height) {
      j += 1
    }
    swap(arr, i, j)
  }
  return arr
}
