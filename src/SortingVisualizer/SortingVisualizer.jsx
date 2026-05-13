import React from "react";
import '../App.css';
import './SortingVisualizer.css';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms';
const ANIMATION_SPEED_MS = 0.5;
const NUMBER_OF_ARRAY_BARS = 550;
const PRIMARY_COLOR = '#aa3bff';
const SECONDARY_COLOR = 'red';
export class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 600));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = sortingAlgorithms.getMergeSortAnimations(this.state.array);
        for(let i=0; i<animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }
    quickSort() {
    const auxiliaryArray = this.state.array.slice();
    const animations =
        sortingAlgorithms.getQuickSortAnimations(auxiliaryArray);

    for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const groupPos = i % 4;

        if (groupPos === 0 || groupPos === 1) {

        const [barOneIdx, barTwoIdx] = animations[i];

        if (barOneIdx === -1 || barTwoIdx === -1) continue;

        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        const color =
            groupPos === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

        setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);

        } else {

        const [barIdx, newHeight] = animations[i];

        if (barIdx === -1) continue;

        const barStyle = arrayBars[barIdx].style;

        setTimeout(() => {
            barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
        }
    }
    }

    heapSort() {
    const animations = sortingAlgorithms.getHeapSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const groupPos = i % 4;  
        
        if (groupPos === 0 || groupPos === 1) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = groupPos === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        
        setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
        } else {
        const [barIdx, newHeight] = animations[i];
        const barStyle = arrayBars[barIdx].style;
        setTimeout(() => {
            barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
        }
    }
    }



    bubbleSort() {
        const animations = sortingAlgorithms.getBubbleSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const groupPos = i % 4;  
        
        if (groupPos === 0 || groupPos === 1) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = groupPos === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        
        setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
        } else {
        const [barIdx, newHeight] = animations[i];
        if (barIdx === -1) continue;
        const barStyle = arrayBars[barIdx].style;
        setTimeout(() => {
            barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
        }
    }
    }
    selectionSort() {
        const array = this.state.array.slice();
        console.log("Unsorted array:", array);
        sortingAlgorithms.selectionSort(array);
        console.log("Sorted array:", array);  
        this.setState({array});
    }
    radixSort() {
        const array = this.state.array.slice();
        console.log("Unsorted array:", array);
        sortingAlgorithms.radixSort(array);
        console.log("Sorted array:", array);  
        this.setState({array});
    }
    insertionSort() {
        const array = this.state.array.slice();
        console.log("Unsorted array:", array);
        sortingAlgorithms.insertionSort(array);
        console.log("Sorted array:", array);  
        this.setState({array});
    }


     render() {
         const {array} = this.state;

         return (
             <div className="parent">
                 <div className="div1">
                     <button onClick={() => this.resetArray()}>Generate New Array</button>
                     <button onClick={() => this.mergeSort()}>Merge Sort</button>
                     <button onClick={() => this.quickSort()}>Quick Sort</button>
                     <button onClick={() => this.heapSort()}>Heap Sort</button>
                     <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                     <button onClick={() => this.selectionSort()}>Selection Sort</button>
                     <button onClick={() => this.radixSort()}>Radix Sort</button>
                     <button onClick={() => this.insertionSort()}>Insertion Sort</button>
                 </div>
                 <div className="div2">
                     {/* Future sliders */}
                 </div>
                 <div className="div3 array-container">
                     {array.map((value, idx) => (
                         <div className="array-bar" 
                         key={idx}
                         style={{
                         height: `${value}px`,
                         backgroundColor: PRIMARY_COLOR,
                         }}></div>
                     ))}
                 </div>
             </div>
         );
     }

}
//galing stackoverflow lmao
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;