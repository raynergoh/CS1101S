/* -------------------------------------------------------------------------- */
/*                             STRING MANIPULATION                            */
/* -------------------------------------------------------------------------- */

function string_length(str) {
    let len = 0;

    while (char_at(str, len) !== undefined) {
        len = len + 1;
    }

    return len;
}

function string_to_list(str) {
    return map((x) => char_at(str, x), enum_list(0, string_length(str) - 1));
}


function list_to_string(xs) {
	function helper(xs, result) {
		return is_null(xs)
			? result
			: helper(tail(xs), result + head(xs));
	}
	return helper(xs, "");
}


function string_length(s) {
	function helper(pos) {
		return char_at(s, pos) === undefined
			? pos
			: helper(pos + 1);
	}
	return helper(0);
}
