import { solution, BinarySearchTree } from "../app";

// Linear search function
function linearSearch(arr: number[], target: number): boolean {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return true;
        }
    }
    return false;
}

// Shuffle array function
function shuffle(array: number[]): number[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

describe("Performance Tests", () => {
    const size = 10_000_000; // 100 million elements
    const searchTarget = Math.floor(Math.random() * size) + 1; // 1부터 size까지 중 랜덤

    it(`Linear Search Performance Test (O(n))`, () => {
        console.log(`\n=== Linear Search Test ===`);
        console.log(`Dataset size: ${size.toLocaleString()} elements`);
        console.log(`Searching for: ${searchTarget.toLocaleString()}`);

        // Generate sequential numbers 1 to size, then shuffle
        const numbers: number[] = [];
        for (let i = 1; i <= size; i++) {
            numbers.push(i);
        }
        const shuffledNumbers = shuffle(numbers);

        // Test linear search
        const start = performance.now();
        const found = linearSearch(shuffledNumbers, searchTarget);
        const end = performance.now();
        const time = end - start;

        console.log(`Time: ${time.toFixed(2)}ms`);
        console.log(`=========================\n`);

        expect(found).toBe(true); // Should always find it
    }, 60000); // 1 minute timeout

    it(`BST Search Performance Test (O(log n))`, () => {
        console.log(`\n=== BST Search Test ===`);
        console.log(`Dataset size: ${size.toLocaleString()} elements`);
        console.log(`Searching for: ${searchTarget.toLocaleString()}`);

        // Generate sequential numbers 1 to size, then shuffle and insert into BST
        const numbers: number[] = [];
        for (let i = 1; i <= size; i++) {
            numbers.push(i);
        }
        const shuffledNumbers = shuffle(numbers);

        const bst = new BinarySearchTree();
        for (const num of shuffledNumbers) {
            bst.insert(num);
        }

        // Test BST search
        const start = performance.now();
        const found = bst.search(searchTarget);
        const end = performance.now();
        const time = end - start;

        console.log(`Time: ${time.toFixed(4)}ms`);
        console.log(`=====================\n`);

        expect(found).toBe(true); // Should always find it
    }, 60000); // 1 minute timeout
});