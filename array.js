/* -------------------------------------------------------------------------- */
/*                             ARRAY MANIPULATION                             */
/* -------------------------------------------------------------------------- */

function append_array(A, v) {
    A[array_length(A)] = v;
}

function append_array_copy(A, B) {
    A = copy_array(A);
    for (let i = 0; i < array_length(B); i = i + 1) {
        append(A, B[i]);
    }
    return A;
}

function combine_array(A,B){
    let lenA = array_length(A);
    let lenB = array_length(B);
    
    for(let i = lenA; i<lenA+lenB; i=i+1){
        A[i] = B[i-lenA];
    }
    return A;
}

function in_array(array,element){
    let true_or_false = false;
    const len = array_length(array);
    for(let i = 0; i<len; i=i+1){
        if(array[i] === element ){
            true_or_false = true;
        }
    }
    return true_or_false;
}


function swap(A, i, j) {
    const temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}

function reverse_array(A) {
    const len = array_length(A);
    const half_len = math_floor(len / 2);
    for (let i = 0; i < half_len; i = i + 1) {
        swap(A, i, len - 1 - i);
    }
    return A;
}

function slice_array(A, i, j) {
    const new_A = [];

    for (let x = i; x <= j; x = x + 1) {
        new_A[x - i] = A[x];
    }

    return new_A;
}

function copy_array(A) {
    const len = array_length(A);
    const B = [];
    for (let i = 0; i < len; i = i + 1) {
        B[i] = A[i];
    }
    return B;
}

function linear_search(A, v) {
    const len = array_length(A);
    let i = 0;
    while (i < len && A[i] !== v) {
        i = i + 1;
    }
    return i < len;
}

function binary_search(A, v) {
    let low = 0;
    let high = array_length(A) - 1;

    while (low <= high) {
        const mid = math_floor((low + high) / 2);
        if (v === A[mid]) {
            break;
        } else if (v < A[mid]) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return low <= high;
}

function array_to_list(A) {
    const len = array_length(A);
    let L = null;
    for (let i = len - 1; i >= 0; i = i - 1) {
        L = pair(A[i], L);
    }
    return L;
}

function accumulate_array(op, init, A) {
    let k = 0;
    let result = op(init, A[k]);
    let len = array_length(A);
    while (k< len-1){
        result = op(result, A[k+1]);
        k = k+1;
    }
    return result;
}

function filter_array(pred, A) {
    let k = 0;
    let new_k = 0;
    let new_array = [];
    let len = array_length(A);
    
    while (k< len){
        if (pred(A[k])){
            new_array[new_k] = A[k];
            new_k = new_k+1;
        }
        k = k+1;
    }
    return new_array;
}

function transpose(M) {
    const trans_rows = array_length(M[0]);
    const trans_col = array_length(M);
    let new_M = [];
    
    for(let r = 0; r< trans_rows; r=r +1){
        new_M[r] = [];
        for(let c = 0; c< trans_col; c= c+1){
            new_M[r][c] = M[c][r];
        }
    }
    return new_M;
}

// Converts recursively for every nested arrays
function array_to_list_recursive(A) {
    if (!is_array(A)) {
        return A;
    } else {
        const len = array_length(A);
        let L = null;
        for (let i = len - 1; i >= 0; i = i - 1) {
            L = pair(array_to_list_recursive(A[i]), L);
        }
        return L;
    }
}

function flatten_array(array){
    
    function helper(array, result){
        const len = array_length(array);
        
        for(let i = 0; i< len; i=i+1){
            if(is_array(array[i])){
                helper(array[i], result);
            }
            else{
                append_array(result,array[i]);
            }
        }
        return result;
    }
    return helper(array, []);
}

function get_index(A,element){
    function helper(A, element, counter){
        if(A[counter] === element){
            return counter;
        }
        else{
            return helper(A, element, counter+1);
        }
    }
    return helper(A,element,0);
}
//needs get index
function pop(A, element){
    const index = get_index(A, element);
    let result = [];
    for(let i = 0; i< index; i=i+1){
        result[i] = A[i];
    }
    for (let j= index; j< array_length(A)-1; j=j+1){
        result[j] = A[j+1];
    }
    return result;
}

function pop_index(A, index){
    let result = [];
    for(let i = 0; i< index; i=i+1){
        result[i] = A[i];
    }
    for (let j= index; j< array_length(A)-1; j=j+1){
        result[j] = A[j+1];
    }
    return result;
}


// Sorts the array of numbers in ascending order.
function sort_ascending(A) {
    const len = array_length(A);
    for (let i = 1; i < len; i = i + 1) {
        const x = A[i];
        let j = i - 1;
        while (j >= 0 && A[j] > x) {
            A[j + 1] = A[j];
            j = j - 1;
        }
        A[j + 1] = x;
    }
    return A;
}

function sort_array_with_f(A, f) {
    const len = array_length(A);
    for (let i = 1; i < len; i = i + 1) {
        const x = A[i];
        let j = i - 1;
        while (j >= 0 && f(A[j], x)) {
            A[j + 1] = A[j];
            j = j - 1;
        }
        A[j + 1] = x;
    }
}

function digits_to_string(digits) {
    const len = array_length(digits);
    let str = "";
    for (let i = 0; i < len; i = i + 1) {
        str = str + stringify(digits[i]);
    }
    return str;
}
// const D = [8, 3, 9, 2, 8, 1];
// digits_to_string(D);  // returns "839281"

/* -------------------------------------------------------------------------- */
/*                                ARRAY SORTING                               */
/* -------------------------------------------------------------------------- */

// ----
// Selection Sort
function find_min_pos(A, low, high) {
    let min_pos = low;
    for (let j = low + 1; j <= high; j = j + 1) {
        if (A[j] < A[min_pos]) {
            min_pos = j;
        }
    }
    return min_pos;
}

function selection_sort(A) {
    const len = array_length(A);

    for (let i = 0; i < len - 1; i = i + 1) {
        let min_pos = find_min_pos(A, i, len - 1);
        swap(A, i, min_pos);
    }
}
// ----

// ----
// Insertion Sort
function insertion_sort(A) {
    const len = array_length(A);

    for (let i = 1; i < len; i = i + 1) {
        let j = i - 1;
        while (j >= 0 && A[j] > A[j + 1]) {
            swap(A, j, j + 1);
            j = j - 1;
        }
    }
}
// ----

// ----
// This alternative method replaces
// the swaps by shifting elements right.
function insertion_sort2(A) {
    const len = array_length(A);

    for (let i = 1; i < len; i = i + 1) {
        const x = A[i];
        let j = i - 1;
        while (j >= 0 && A[j] > x) {
            A[j + 1] = A[j]; // shift right
            j = j - 1;
        }
        A[j + 1] = x;
    }
}
// ----

// ----
// Merge Sort
function merge(A, low, mid, high) {
    const B = [];
    let left = low;
    let right = mid + 1;
    let Bidx = 0;

    while (left <= mid && right <= high) {
        if (A[left] <= A[right]) {
            B[Bidx] = A[left];
            left = left + 1;
        } else {
            B[Bidx] = A[right];
            right = right + 1;
        }
        Bidx = Bidx + 1;
    }

    while (left <= mid) {
        B[Bidx] = A[left];
        Bidx = Bidx + 1;
        left = left + 1;
    }
    while (right <= high) {
        B[Bidx] = A[right];
        Bidx = Bidx + 1;
        right = right + 1;
    }

    for (let k = 0; k < high - low + 1; k = k + 1) {
        A[low + k] = B[k];
    }
}

function merge_sort_helper(A, low, high) {
    if (low < high) {
        const mid = math_floor((low + high) / 2);
        merge_sort_helper(A, low, mid);
        merge_sort_helper(A, mid + 1, high);
        merge(A, low, mid, high);
    }
}

function merge_sort(A) {
    merge_sort_helper(A, 0, array_length(A) - 1);
}
// ----

// ----
// Quick Sort
function partition(A, p) {
    const a = [];
    const b = [];

    for (let i = 0; i < array_length(A); i = i + 1) {
        const x = A[i];

        if (x < p) {
            append(a, x);
        } else {
            append(b, x);
        }
    }

    return pair(a, b);
}

function quick_sort_helper(A) {
    const len = array_length(A);
    if (len < 2) {
        return A;
    } else {
        const p = A[0];
        const rest = slice_array(A, 1, len - 1);

        const partitions = partition(rest, p);
        const small_part = head(partitions);
        const big_part = tail(partitions);

        const sorted_big_part = quick_sort_helper(big_part);
        append(sorted_big_part, p);

        return append_array_copy(
            quick_sort_helper(small_part),
            sorted_big_part
        );
    }
}

function quick_sort(A) {
    const res = quick_sort_helper(A);

    for (let i = 0; i < array_length(A); i = i + 1) {
        A[i] = res[i];
    }
}
// ----



// Requires: 1) array_to_list_recursive 2) list_to_array_recursive 3) flatten_list_once
// Flattens for just the first depth of elements
function flatten_array_once(A) {
    const A_xs = array_to_list_recursive(A);
    const A_xs_flattened = flatten_list_once(A_xs);
    return list_to_array_recursive(A_xs_flattened);
}

// Requires: 1) array_to_list_recursive 2) list_to_array_recursive 3) flatten_list_recursive
// Flattens recursively for every nested arrays
function flatten_array_recursive(A) {
    const A_xs = array_to_list_recursive(A);
    const A_xs_flattened = flatten_list_recursive(A_xs);
    return list_to_array_recursive(A_xs_flattened);
}
