//mergesort sah
export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

//quick sort boi parang quick silver
export function getQuickSortAnimations (array) {
  const animations = [];
  if (array.length <= 1) return animations;
  quickSortHelper(array, 0, array.length -1, animations);
  return animations;
}

function quickSortHelper(array, start, end, animations) {
      if (start >= end) {
        return;
    }
    let pivotIdx = partition(array, start, end, animations);
    quickSortHelper(array, start, pivotIdx - 1, animations);
    quickSortHelper(array, pivotIdx + 1, end, animations);
}
function partition(array, start, end, animations) {
    let pivotIdx = start;
    let pivotValue = array[end];
    for (let i = start; i < end;i++) {
      animations.push([i, end]);
      animations.push([i, end]);
      if (array[i] < pivotValue) {
        swap(array, i, pivotIdx);
        animations.push([i, array[i]]);
        animations.push([pivotIdx, array[pivotIdx]]);
        pivotIdx++;
      } else {
        animations.push([-1,-1]);
        animations.push([-1,-1]);
      }
    }
    swap(array, pivotIdx, end);
    animations.push([pivotIdx, end]);
    animations.push([pivotIdx, end]);

    animations.push([pivotIdx, array[pivotIdx]]);
    animations.push([end, array[end]]);
    return pivotIdx;
}

function swap(array, a, b){
  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;

}

//heapsort ano ba yun
function heapify (array, n, i) {
  let largest = i;
  let leftIdx = 2 * i + 1;
  let rightIdx = 2 * i + 2;

  if (leftIdx < n && array[leftIdx] > array[largest]){
    largest = leftIdx;
  }
  if (rightIdx < n && array[rightIdx] > array[largest]){
    largest = rightIdx;
  }

  if (largest != i) {
    [array[i], array[largest]] = [array[largest], array[i]];
    heapify(array, n, largest);
  }
}

export function heapSort(array) {
  let n = array.length;

  for(let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i);
  }
  for(let i = n - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    heapify(array, i, 0)
  }
}