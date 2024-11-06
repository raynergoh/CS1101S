/* -------------------------------------------------------------------------- */
/*                              LIST MANIPULATION                             */
/* -------------------------------------------------------------------------- */

function take(xs, n) {
    return n === 0 ? null : pair(head(xs), take(tail(xs), n - 1));
}

function drop(xs, n) {
    return n === 0 ? xs : drop(tail(xs), n - 1);
}

function permutations(xs) {
    if (is_null(xs)) {
        return list(null);
    } else {
        return accumulate(
            append,
            null,
            map((x) => {
                const perm_without_x = permutations(remove(x, xs));
                return map((p) => pair(x, p), perm_without_x);
            }, xs)
        );
    }
}

function combinations(xs, r) {
    if ((r !== 0 && is_null(xs)) || r < 0) {
        return null;
    } else if (r === 0) {
        return list(null);
    } else {
        const no_choose = combinations(tail(xs), r);
        const yes_choose = combinations(tail(xs), r - 1);
        const yes_item = map((x) => pair(head(xs), x), yes_choose);
        return append(no_choose, yes_item);
    }
}

function list_to_array(L) {
    const A = [];
    let i = 0;
    for (let p = L; !is_null(p); p = tail(p)) {
        A[i] = head(p);
        i = i + 1;
    }
    return A;
}

function list_to_array_recursive(L) {
    if (!is_list(L)) {
        return L;
    } else {
        const A = [];
        let i = 0;
        for (let p = L; !is_null(p); p = tail(p)) {
            A[i] = list_to_array_recursive(head(p));
            i = i + 1;
        }
        return A;
    }
}

function flatten_list(lst){
    return accumulate((x,y)=>append(x,y),null,lst);
}

function remove_duplicates(lst) {
    return is_null(lst)
    ? null
    : pair(head(lst),
    remove_duplicates(
    filter(x => !equal(x, head(lst)), tail(lst))));
}

/* -------------------------------------------------------------------------- */
/*                                LIST SORTING                                */
/* -------------------------------------------------------------------------- */

// ----
// Selection Sort
function smallest(xs) {
    return accumulate((x, y) => (x < y ? x : y), head(xs), tail(xs));
}

function selection_sort(xs) {
    if (is_null(xs)) {
        return xs;
    } else {
        const x = smallest(xs);
        return pair(x, selection_sort(remove(x, xs)));
    }
}
// ----

// ----
// Insertion Sort
function insert(x, xs) {
    return is_null(xs)
        ? list(x)
        : x <= head(xs)
        ? pair(x, xs)
        : pair(head(xs), insert(x, tail(xs)));
}

function insertion_sort(xs) {
    return is_null(xs) ? xs : insert(head(xs), insertion_sort(tail(xs)));
}
// ----

// ----
// Merge Sort
function middle(n) {
    return math_floor(n / 2);
}

function merge(xs, ys) {
    if (is_null(xs)) {
        return ys;
    } else if (is_null(ys)) {
        return xs;
    } else {
        const x = head(xs);
        const y = head(ys);
        return x < y
            ? pair(x, merge(tail(xs), ys))
            : pair(y, merge(xs, tail(ys)));
    }
}

function merge_sort(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else {
        const mid = middle(length(xs));
        return merge(merge_sort(take(xs, mid)), merge_sort(drop(xs, mid)));
    }
}
// ----

// ----
// Quick Sort
function partition(xs, p) {
    return pair(
        filter((x) => x <= p, xs),
        filter((x) => x > p, xs)
    );
}

function quick_sort(xs) {
    if (is_null(xs)) {
        return list();
    } else if (is_null(tail(xs))) {
        return xs;
    } else {
        const p = head(xs);

        const partitions = partition(tail(xs), p);
        const small_part = head(partitions);
        const big_part = tail(partitions);

        return append(quicksort(small_part), pair(p, quicksort(big_part)));
    }
}

//----
//Bubblesort
function bubblesort_array(A) {
    const len = array_length(A);
    for (let i = len - 1; i >= 1; i = i - 1) {
    for (let j = 0; j < i; j = j + 1) {
    if (A[j] > A[j + 1]) {
    const temp = A[j];
    A[j] = A[j + 1];
    A[j + 1] = temp;
    }
    }
    }
    }


//----


/* -------------------------------------------------------------------------- */
/*                                    TREES                                   */
/* -------------------------------------------------------------------------- */
function accumulate_tree(f,op,initial, tree){
    return accumulate((x,ys)=> is_list(x)
                        ? op(accumulate_tree(f,op,initial,x),ys): op(f(x),ys),initial, tree);
}

function map_tree(f,tree){
    return map((x)=> is_list(x)? (map_tree(f,x)): f(x),tree);
}

function tree_sum(tree) {
    return accumulate_tree(x => x, (x, y) => x + y, 0 , tree);
}

function count_data_items(tree) {
    return accumulate_tree(x => 1, (x, y) => x + y, 0 , tree);
}

function flatten(tree) {
    return accumulate_tree(x => list(x), append, null , tree);
}

/* -------------------------------------------------------------------------- */
/*                        DESTRUCTIVE LIST MANIPULATION                       */
/* -------------------------------------------------------------------------- */

function d_append(xs, ys) {
    if (is_null(xs)) {
        return ys;
    } else {
        set_tail(xs, d_append(tail(xs), ys));
        return xs;
    }
}

function d_filter(pred, xs) {
    if (is_null(xs)) {
        return null;
    } else {
        if (pred(head(xs))) {
            set_tail(xs, d_filter(pred, tail(xs)));
            return xs;
        } else {
            return d_filter(pred, tail(xs));
        }
    }
}

function d_map(fun, xs) {
    if (!is_null(xs)) {
        set_head(xs, fun(head(xs)));
        d_map(fun, tail(xs));
    }
}

/* -------------------------------------------------------------------------- */
/*                          LIST DESTRUCTIVE SORTING                          */
/* -------------------------------------------------------------------------- */

// Merge Sort
function d_split_list(xs) {
    const len = length(xs);
    const mid_point = len % 2 === 0 ? len / 2 - 1 : math_floor(len / 2);

    let mid_pair = xs;
    for (let i = 0; i < mid_point; i = i + 1) {
        mid_pair = tail(mid_pair);
    }

    const rest_of_xs = tail(mid_pair);
    set_tail(mid_pair, null);
    return pair(xs, rest_of_xs);
}

function d_merge(xs, ys) {
    if (is_null(xs)) {
        return ys;
    } else if (is_null(ys)) {
        return xs;
    } else {
        const x = head(xs);
        const y = head(ys);

        if (x < y) {
            set_tail(xs, d_merge(tail(xs), ys));
            return xs;
        } else {
            set_tail(ys, d_merge(xs, tail(ys)));
            return ys;
        }
    }
}

function d_merge_sort(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else {
        const xs_split = d_split_list(xs);
        const part_a = head(xs_split);
        const part_b = tail(xs_split);

        return d_merge(d_merge_sort(part_a), d_merge_sort(part_b));
    }
}
// ----
