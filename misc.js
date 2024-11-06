/* -------------------------------------------------------------------------- */
/*                                    MISC                                    */
/* -------------------------------------------------------------------------- */

function return_helper(returns, f, base) {
    const filtered_returns = filter(f, returns);
    return is_null(filtered_returns) ? base : head(filtered_returns);
}

function match_op(op) {
    return op === "+"
        ? (x, y) => x + y
        : op === "-"
        ? (x, y) => x - y
        : op === "*"
        ? (x, y) => x * y
        : (x, y) => x / y;
}

/* -------------------------------------------------------------------------- */
/*                                 MEMOIZATION                                */
/* -------------------------------------------------------------------------- */

const mem = [];

function read(n, k) {
    return mem[n] === undefined ? undefined : mem[n][k];
}
function write(n, k, value) {
    if (mem[n] === undefined) {
        mem[n] = [];
    }
    mem[n][k] = value;
}
