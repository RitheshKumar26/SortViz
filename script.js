// DOM Elements
        const visualization = document.getElementById('visualization');
        const arraySizeInput = document.getElementById('arraySize');
        const arraySizeValue = document.getElementById('arraySizeValue');
        const speedInput = document.getElementById('speed');
        const algorithmSelect = document.getElementById('algorithm');
        const generateArrayBtn = document.getElementById('generateArray');
        const startSortBtn = document.getElementById('startSort');
        const playIcon = document.getElementById('playIcon');
        const pauseIcon = document.getElementById('pauseIcon');
        const comparisonsEl = document.getElementById('comparisons');
        const swapsEl = document.getElementById('swaps');
        const timeEl = document.getElementById('time');
        const algorithmInfo = document.getElementById('algorithmInfo');
        const algorithmName = document.getElementById('algorithmName');
        const algorithmExplanation = document.getElementById('algorithmExplanation');
        const complexityInfo = document.getElementById('complexityInfo');
        const pseudocode = document.getElementById('pseudocode');
        const complexityBtn = document.getElementById('complexityBtn');
        const pseudocodeBtn = document.getElementById('pseudocodeBtn');
        const helpBtn = document.getElementById('helpBtn');
        const helpModal = document.getElementById('helpModal');
        const closeHelpModal = document.getElementById('closeHelpModal');
        const gotItBtn = document.getElementById('gotItBtn');

        // State
        let array = [];
        let isSorting = false;
        let sortingPaused = false;
        let sortingCompleted = false;
        let comparisons = 0;
        let swaps = 0;
        let startTime = 0;
        let currentAlgorithm = 'bubble';
        
        // Algorithm information
        const algorithmData = {
            bubble: {
                name: "Bubble Sort",
                info: "Compares adjacent elements and swaps them if in wrong order.",
                explanation: `<p>Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.</p>
                <p class="mt-2">The algorithm gets its name from the way smaller elements "bubble" to the top of the list. While it's simple to understand and implement, it's not efficient for large datasets with its average and worst-case time complexity of O(n²).</p>`,
                complexity: {
                    time: "O(n²)",
                    space: "O(1)",
                    details: {
                        best: "O(n) - When array is already sorted",
                        average: "O(n²) - For random data",
                        worst: "O(n²) - When array is reverse sorted"
                    }
                },
                pseudocode: `procedure bubbleSort(A : list of sortable items)
    n := length(A)
    repeat
        swapped := false
        for i := 1 to n-1 inclusive do
            if A[i-1] > A[i] then
                swap(A[i-1], A[i])
                swapped := true
            end if
        end for
        n := n - 1
    until not swapped
end procedure`
            },
            selection: {
                name: "Selection Sort",
                info: "Repeatedly selects the smallest element from unsorted portion.",
                explanation: `<p>Selection Sort divides the input list into two parts: a sorted sublist and an unsorted sublist. It repeatedly selects the smallest (or largest) element from the unsorted sublist and moves it to the end of the sorted sublist.</p>
                <p class="mt-2">This algorithm maintains two subarrays in a given array: the subarray which is already sorted and the remaining subarray which is unsorted. In every iteration, the minimum element from the unsorted subarray is picked and moved to the sorted subarray.</p>
                <p class="mt-2">Selection sort has a time complexity of O(n²) in all cases, making it inefficient on large lists. However, it performs better than bubble sort in most cases.</p>`,
                complexity: {
                    time: "O(n²)",
                    space: "O(1)",
                    details: {
                        best: "O(n²) - Same as worst case",
                        average: "O(n²) - For random data",
                        worst: "O(n²) - Same as best case"
                    }
                },
                pseudocode: `procedure selectionSort(A : list of sortable items)
    n := length(A)
    for i from 0 to n-2 do
        minIndex := i
        for j from i+1 to n-1 do
            if A[j] < A[minIndex] then
                minIndex := j
            end if
        end for
        if minIndex != i then
            swap(A[i], A[minIndex])
        end if
    end for
end procedure`
            },
            insertion: {
                name: "Insertion Sort",
                info: "Builds the final sorted array one item at a time.",
                explanation: `<p>Insertion Sort builds the final sorted array one item at a time by repeatedly taking the next item and inserting it into the correct position in the already-sorted portion.</p>
                <p class="mt-2">It's much like how we sort playing cards in our hands. The array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed at the correct position in the sorted part.</p>
                <p class="mt-2">Insertion sort is efficient for small data values and is more efficient in practice than other simple quadratic algorithms like bubble sort and selection sort.</p>`,
                complexity: {
                    time: "O(n²)",
                    space: "O(1)",
                    details: {
                        best: "O(n) - When array is already sorted",
                        average: "O(n²) - For random data",
                        worst: "O(n²) - When array is reverse sorted"
                    }
                },
                pseudocode: `procedure insertionSort(A : list of sortable items)
    n := length(A)
    for i from 1 to n-1 do
        key := A[i]
        j := i - 1
        while j >= 0 and A[j] > key do
            A[j+1] := A[j]
            j := j - 1
        end while
        A[j+1] := key
    end for
end procedure`
            },
            merge: {
                name: "Merge Sort",
                info: "Divides array into halves, sorts them, then merges.",
                explanation: `<p>Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, sorts them recursively, and then merges the sorted halves.</p>
                <p class="mt-2">The key operation of merge sort is the merging of two sorted arrays into a single sorted array. This is done by repeatedly comparing the smallest elements of each subarray and moving the smaller one to the result array.</p>
                <p class="mt-2">Merge sort has a time complexity of O(n log n) in all cases, making it much more efficient than the simpler quadratic algorithms for large datasets. However, it requires O(n) additional space.</p>`,
                complexity: {
                    time: "O(n log n)",
                    space: "O(n)",
                    details: {
                        best: "O(n log n) - Same as worst case",
                        average: "O(n log n) - For random data",
                        worst: "O(n log n) - Same as best case"
                    }
                },
                pseudocode: `procedure mergeSort(A : list of sortable items)
    if length(A) <= 1 then
        return A
    end if
    
    mid := length(A) / 2
    left := mergeSort(A[0..mid-1])
    right := mergeSort(A[mid..length(A)-1])
    return merge(left, right)
end procedure

procedure merge(left, right)
    result := []
    while length(left) > 0 and length(right) > 0 do
        if first(left) <= first(right) then
            append first(left) to result
            left := rest(left)
        else
            append first(right) to result
            right := rest(right)
        end if
    end while
    
    while length(left) > 0 do
        append first(left) to result
        left := rest(left)
    end while
    
    while length(right) > 0 do
        append first(right) to result
        right := rest(right)
    end while
    
    return result
end procedure`
            },
            quick: {
                name: "Quick Sort",
                info: "Selects a pivot and partitions the array around it.",
                explanation: `<p>Quick Sort is a divide-and-conquer algorithm that selects a 'pivot' element from the array and partitions the other elements into two subarrays according to whether they are less than or greater than the pivot.</p>
                <p class="mt-2">The subarrays are then sorted recursively. The key process is the partition() function, which rearranges the array so that all elements smaller than the pivot come before it and all greater elements come after.</p>
                <p class="mt-2">Quick sort has an average time complexity of O(n log n), but a worst-case of O(n²) (though this can be mostly avoided with a good pivot selection strategy). It's often faster in practice than other O(n log n) algorithms.</p>`,
                complexity: {
                    time: "O(n log n) avg, O(n²) worst",
                    space: "O(log n)",
                    details: {
                        best: "O(n log n) - Good pivot selection",
                        average: "O(n log n) - For random data",
                        worst: "O(n²) - Poor pivot selection"
                    }
                },
                pseudocode: `procedure quickSort(A : list of sortable items, low, high)
    if low < high then
        p := partition(A, low, high)
        quickSort(A, low, p - 1)
        quickSort(A, p + 1, high)
    end if
end procedure

procedure partition(A, low, high)
    pivot := A[high]
    i := low - 1
    
    for j from low to high-1 do
        if A[j] < pivot then
            i := i + 1
            swap(A[i], A[j])
        end if
    end for
    
    swap(A[i + 1], A[high])
    return i + 1
end procedure`
            }
        };

        // Initialize
        function init() {
            updateArraySize();
            generateNewArray();
            updateAlgorithmInfo();
            setupEventListeners();
        }

        // Event Listeners
        function setupEventListeners() {
            arraySizeInput.addEventListener('input', updateArraySize);
            generateArrayBtn.addEventListener('click', generateNewArray);
            startSortBtn.addEventListener('click', toggleSorting);
            algorithmSelect.addEventListener('change', updateAlgorithmInfo);
            
            // Help modal
            helpBtn.addEventListener('click', () => helpModal.classList.remove('hidden'));
            closeHelpModal.addEventListener('click', () => helpModal.classList.add('hidden'));
            gotItBtn.addEventListener('click', () => helpModal.classList.add('hidden'));
            
            // Algorithm details tabs
            complexityBtn.addEventListener('click', () => {
                complexityInfo.classList.remove('hidden');
                pseudocode.classList.add('hidden');
                complexityBtn.classList.add('bg-gray-600');
                pseudocodeBtn.classList.remove('bg-gray-600');
            });
            
            pseudocodeBtn.addEventListener('click', () => {
                pseudocode.classList.remove('hidden');
                complexityInfo.classList.add('hidden');
                pseudocodeBtn.classList.add('bg-gray-600');
                complexityBtn.classList.remove('bg-gray-600');
            });
        }

        // Update array size display
        function updateArraySize() {
            arraySizeValue.textContent = arraySizeInput.value;
            if (!isSorting) {
                generateNewArray();
            }
        }

        // Update algorithm info
        function updateAlgorithmInfo() {
            currentAlgorithm = algorithmSelect.value;
            const algo = algorithmData[currentAlgorithm];
            
            algorithmName.textContent = algo.name;
            algorithmExplanation.innerHTML = algo.explanation;
            
            algorithmInfo.innerHTML = `
                <p><span class="font-semibold">${algo.name}:</span> ${algo.info}</p>
                <div class="flex justify-between mt-2">
                    <span><span class="font-semibold">Time:</span> ${algo.complexity.time}</span>
                    <span><span class="font-semibold">Space:</span> ${algo.complexity.space}</span>
                </div>
            `;
            
            // Update complexity info
            complexityInfo.innerHTML = `
                <h4 class="font-medium mb-2">Complexity Analysis</h4>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <h5 class="font-medium text-blue-400">Time Complexity</h5>
                        <ul class="mt-1 space-y-1">
                            <li>Best: ${algo.complexity.details.best}</li>
                            <li>Average: ${algo.complexity.details.average}</li>
                            <li>Worst: ${algo.complexity.details.worst}</li>
                        </ul>
                    </div>
                    <div>
                        <h5 class="font-medium text-purple-400">Space Complexity</h5>
                        <ul class="mt-1 space-y-1">
                            <li>${algo.complexity.space}</li>
                        </ul>
                    </div>
                </div>
            `;
            
            // Update pseudocode
            pseudocode.innerHTML = `<pre>${algo.pseudocode}</pre>`;
            
            // Reset tabs
            complexityInfo.classList.remove('hidden');
            pseudocode.classList.add('hidden');
            complexityBtn.classList.add('bg-gray-600');
            pseudocodeBtn.classList.remove('bg-gray-600');
        }

        // Generate new array
        function generateNewArray() {
            if (isSorting) return;
            
            const size = parseInt(arraySizeInput.value);
            array = [];
            visualization.innerHTML = '';
            
            for (let i = 0; i < size; i++) {
                const value = Math.floor(Math.random() * 90) + 10; // Values between 10-100
                array.push(value);
                
                const box = document.createElement('div');
                box.className = 'number-box number-box-default';
                box.style.height = `${value * 2}px`;
                box.style.width = `40px`;
                box.textContent = value;
                box.dataset.value = value;
                visualization.appendChild(box);
            }
            
            resetCounters();
            sortingCompleted = false;
            startSortBtn.disabled = false;
            startSortBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
            startSortBtn.classList.add('bg-purple-600', 'hover:bg-purple-700');
            startSortBtn.innerHTML = '<i id="playIcon" class="fas fa-play mr-2"></i><span>Sort</span>';
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
        }

        // Reset counters
        function resetCounters() {
            comparisons = 0;
            swaps = 0;
            comparisonsEl.textContent = `0`;
            swapsEl.textContent = `0`;
            timeEl.textContent = `0ms`;
        }

        // Toggle sorting
        function toggleSorting() {
            if (sortingCompleted) {
                generateNewArray();
                return;
            }
            
            if (isSorting) {
                if (sortingPaused) {
                    resumeSorting();
                } else {
                    pauseSorting();
                }
            } else {
                startSorting();
            }
        }

        // Start sorting
        function startSorting() {
            if (isSorting) return;
            
            isSorting = true;
            sortingPaused = false;
            startSortBtn.classList.remove('bg-purple-600', 'hover:bg-purple-700');
            startSortBtn.classList.add('bg-yellow-600', 'hover:bg-yellow-700');
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
            
            const algorithm = algorithmSelect.value;
            resetCounters();
            startTime = performance.now();
            
            switch (algorithm) {
                case 'bubble':
                    bubbleSort();
                    break;
                case 'selection':
                    selectionSort();
                    break;
                case 'insertion':
                    insertionSort();
                    break;
                case 'merge':
                    mergeSort();
                    break;
                case 'quick':
                    quickSort();
                    break;
            }
        }

        // Pause sorting
        function pauseSorting() {
            sortingPaused = true;
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
        }

        // Resume sorting
        function resumeSorting() {
            sortingPaused = false;
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
        }

        // Finish sorting
        function finishSorting() {
            isSorting = false;
            sortingPaused = false;
            sortingCompleted = true;
            
            const endTime = performance.now();
            timeEl.textContent = `${Math.round(endTime - startTime)}ms`;
            
            startSortBtn.classList.remove('bg-yellow-600', 'hover:bg-yellow-700');
            startSortBtn.classList.add('bg-green-600', 'hover:bg-green-700');
            startSortBtn.innerHTML = '<i class="fas fa-redo mr-2"></i> New Array';
            
            // Mark all boxes as sorted
            const boxes = visualization.querySelectorAll('.number-box');
            boxes.forEach(box => {
                box.classList.remove('number-box-active', 'number-box-compare', 'number-box-pivot');
                box.classList.add('number-box-sorted');
            });
        }

        // Get boxes
        function getBoxes() {
            return visualization.querySelectorAll('.number-box');
        }

        // Swap boxes
        async function swapBoxes(i, j) {
            const boxes = getBoxes();
            const box1 = boxes[i];
            const box2 = boxes[j];
            
            // Highlight the boxes being swapped
            box1.classList.add('number-box-active');
            box2.classList.add('number-box-active');
            
            await sleep(speedInput.value);
            
            // Swap in the DOM
            const tempHeight = box1.style.height;
            const tempText = box1.textContent;
            
            box1.style.height = box2.style.height;
            box1.textContent = box2.textContent;
            box1.dataset.value = box2.dataset.value;
            
            box2.style.height = tempHeight;
            box2.textContent = tempText;
            box2.dataset.value = tempText;
            
            // Remove highlights
            box1.classList.remove('number-box-active');
            box2.classList.remove('number-box-active');
            
            // Update swap count
            swaps++;
            swapsEl.textContent = swaps;
        }

        // Compare boxes (visualization only)
        async function compareBoxes(i, j) {
            if (sortingPaused) {
                while (sortingPaused) {
                    await sleep(100);
                }
            }
            
            const boxes = getBoxes();
            boxes[i].classList.add('number-box-compare');
            boxes[j].classList.add('number-box-compare');
            
            await sleep(speedInput.value);
            
            boxes[i].classList.remove('number-box-compare');
            boxes[j].classList.remove('number-box-compare');
            
            // Update comparison count
            comparisons++;
            comparisonsEl.textContent = comparisons;
        }

        // Mark box as active
        async function markActive(i) {
            const boxes = getBoxes();
            boxes[i].classList.add('number-box-active');
            
            await sleep(speedInput.value / 2);
            
            boxes[i].classList.remove('number-box-active');
        }

        // Mark box as pivot (for quick sort)
        async function markPivot(i) {
            const boxes = getBoxes();
            boxes[i].classList.add('number-box-pivot');
            
            await sleep(speedInput.value / 2);
        }

        // Unmark box as pivot
        async function unmarkPivot(i) {
            const boxes = getBoxes();
            boxes[i].classList.remove('number-box-pivot');
            
            await sleep(speedInput.value / 2);
        }

        // Mark box as sorted
        function markSorted(i) {
            const boxes = getBoxes();
            boxes[i].classList.remove('number-box-default', 'number-box-active', 'number-box-compare', 'number-box-pivot');
            boxes[i].classList.add('number-box-sorted');
        }

        // Sleep function
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        // Sorting Algorithms

        // Bubble Sort
        async function bubbleSort() {
            const boxes = getBoxes();
            const len = array.length;
            
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < len - i - 1; j++) {
                    await compareBoxes(j, j + 1);
                    
                    const box1 = parseInt(boxes[j].dataset.value);
                    const box2 = parseInt(boxes[j + 1].dataset.value);
                    
                    if (box1 > box2) {
                        await swapBoxes(j, j + 1);
                    }
                }
                markSorted(len - i - 1);
            }
            
            finishSorting();
        }

        // Selection Sort
        async function selectionSort() {
            const boxes = getBoxes();
            const len = array.length;
            
            for (let i = 0; i < len - 1; i++) {
                let minIndex = i;
                await markActive(minIndex);
                
                for (let j = i + 1; j < len; j++) {
                    await compareBoxes(minIndex, j);
                    
                    const boxMin = parseInt(boxes[minIndex].dataset.value);
                    const boxJ = parseInt(boxes[j].dataset.value);
                    
                    if (boxJ < boxMin) {
                        minIndex = j;
                        await markActive(minIndex);
                    }
                }
                
                if (minIndex !== i) {
                    await swapBoxes(i, minIndex);
                }
                
                markSorted(i);
            }
            
            markSorted(len - 1);
            finishSorting();
        }

        // Insertion Sort
        async function insertionSort() {
            const boxes = getBoxes();
            const len = array.length;
            
            markSorted(0);
            
            for (let i = 1; i < len; i++) {
                let j = i;
                
                while (j > 0) {
                    await compareBoxes(j - 1, j);
                    
                    const boxJ = parseInt(boxes[j].dataset.value);
                    const boxJMinus1 = parseInt(boxes[j - 1].dataset.value);
                    
                    if (boxJ < boxJMinus1) {
                        await swapBoxes(j - 1, j);
                        j--;
                    } else {
                        break;
                    }
                }
                
                if (j === i) {
                    await markActive(j);
                }
                
                for (let k = 0; k <= i; k++) {
                    markSorted(k);
                }
            }
            
            finishSorting();
        }

        // Merge Sort
        async function mergeSort() {
            await mergeSortHelper(0, array.length - 1);
            finishSorting();
        }

        async function mergeSortHelper(l, r) {
            if (l >= r) return;
            
            const m = Math.floor((l + r) / 2);
            await mergeSortHelper(l, m);
            await mergeSortHelper(m + 1, r);
            await merge(l, m, r);
        }

        async function merge(l, m, r) {
            const boxes = getBoxes();
            const n1 = m - l + 1;
            const n2 = r - m;
            
            // Create temp arrays
            const L = [];
            const R = [];
            
            // Copy data to temp arrays
            for (let i = 0; i < n1; i++) {
                L.push(parseInt(boxes[l + i].dataset.value));
            }
            for (let j = 0; j < n2; j++) {
                R.push(parseInt(boxes[m + 1 + j].dataset.value));
            }
            
            // Merge the temp arrays back
            let i = 0, j = 0, k = l;
            
            while (i < n1 && j < n2) {
                await compareBoxes(l + i, m + 1 + j);
                
                if (L[i] <= R[j]) {
                    await setBoxValue(k, L[i]);
                    i++;
                } else {
                    await setBoxValue(k, R[j]);
                    j++;
                }
                k++;
            }
            
            // Copy remaining elements of L[]
            while (i < n1) {
                await setBoxValue(k, L[i]);
                i++;
                k++;
            }
            
            // Copy remaining elements of R[]
            while (j < n2) {
                await setBoxValue(k, R[j]);
                j++;
                k++;
            }
        }

        async function setBoxValue(index, value) {
            const boxes = getBoxes();
            const box = boxes[index];
            
            box.textContent = value;
            box.dataset.value = value;
            box.style.height = `${value * 2}px`;
            
            await sleep(speedInput.value / 2);
        }

        // Quick Sort
        async function quickSort() {
            await quickSortHelper(0, array.length - 1);
            
            // Mark all as sorted at the end
            const boxes = getBoxes();
            for (let i = 0; i < boxes.length; i++) {
                markSorted(i);
            }
            
            finishSorting();
        }

        async function quickSortHelper(low, high) {
            if (low < high) {
                const pi = await partition(low, high);
                
                await quickSortHelper(low, pi - 1);
                await quickSortHelper(pi + 1, high);
            }
        }

        async function partition(low, high) {
            const boxes = getBoxes();
            const pivot = parseInt(boxes[high].dataset.value);
            let i = low - 1;
            
            await markPivot(high);
            
            for (let j = low; j < high; j++) {
                await compareBoxes(j, high);
                
                if (parseInt(boxes[j].dataset.value) < pivot) {
                    i++;
                    if (i !== j) {
                        await swapBoxes(i, j);
                    }
                }
            }
            
            await swapBoxes(i + 1, high);
            await unmarkPivot(high);
            return i + 1;
        }

        // Initialize the app
        init();