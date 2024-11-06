/* -------------------------------------------------------------------------- */
/*                             NUMBER MANIPULATION                            */
/* -------------------------------------------------------------------------- */

function digits_length(num) {
    return math_floor(math_log10(num)) + 1;
}

function digit_at(num, n) {
    const str_n = stringify(num);
    return parse_int(char_at(str_n, n), 10);
}

function num_to_digits_list(num) {
    const len = digits_length(num);
    return map((i) => digit_at(num, i), enum_list(0, len - 1));
}
