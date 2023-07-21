const imperial_units = [
    [0, "pL", 0],
    [61611520, "minim", 0],
    [3696691200, "dram", 1],
    [29573529600, "ounce", 2],
    [118294118400, "gill", 2],
    [236588236800, "cup", 3],
    [473176473600, "pint", 4],
    [946352947200, "quart", 4],
    [3785411788800, "gallon", 4],
    [17034353049600, "pin", 3],
    [34068706099200, "firkin", 3],
    [68137412198400, "kilderkin", 4],
    [136274824396800, "barrel", 4],
    [204412236595200, "hogshead", 5],
    [272549648793600, "puncheon", 6],
    [408824473190400, "butt", 7],
    [817648946380800, "tun", 7],
]
const adjectives = [
    "minute",
    "tiny",
    "petite",
    "small",
    "modest",
    "medium",
    "adequate",
    "humble",
    "decent",
    "reasonable",
    "generous",
    "fair",
    "large",
    "ample",
    "considerable",
    "broad",
    "strapping",
    "great",
    "grand",
    "impressive",
    "auspicious",
    "superior",
    "giant",
    "spacious",
    "huge",
    "gigantic",
    "tremendous",
    "immense",
    "enormous",
    "colossal",
    "monstrous",
    "gargantuan",
    "vast",
    "cosmic",
    "astronomical",
]
const minims = imperial_units[1]
const max_volume = 8176489463808000
const imperial_ratio = Math.log10(max_volume / minims[0])

const vowels = new Set("aeiouAEIOU")

function find_unit(num) {
    let low = 0
    let high = imperial_units.length
    let guess = 0
    while (high - low > 1) {
        guess = Math.floor((low + high) / 2)
        if (imperial_units[guess][0] > num) {
            high = guess
        } else {
            low = guess
        }
    }

    return low
}

function add_article(str) {
    if (vowels.has(str[0])) {
        return "an " + str
    } else {
        return "a " + str
    }
}

function plural_or_article(num, str) {
    if (num === 1) {
        return add_article(str)
    } else {
        return num + " " + str + "s"
    }
}

function almost(adjective, num_big, big) {
    return "almost " + plural_or_article(num_big, adjective + " " + big[1])
}

function short_of(adjective, num_big, big, num_small, small) {
    return (
        plural_or_article(num_small, small[1]) +
        " short of " +
        plural_or_article(num_big, adjective + " " + big[1])
    )
}

function check_almost(adjective, num, num_big, big_index) {
    let big = imperial_units[big_index]
    if (num + imperial_units[big_index - big[2]][0] >= big[0]) {
        return almost(adjective, num_big + 1, big)
    }
    let small = imperial_units[big_index + 1 - big[2]]
    if (num + small[0] >= big[0]) {
        return short_of(adjective, num_big + 1, big, 1, small)
    }

    return undefined
}

function big_and_small(adjective, num_big, big, num_small, small) {
    let big_str = plural_or_article(num_big, adjective + " " + big[1])
    if (num_small === 0) {
        return big_str
    } else {
        return big_str + " and " + plural_or_article(num_small, small[1])
    }
}

function almost_or_short_of(num, adjective, num_big, big, small) {
    let short = Math.round((num_big * big[0] - num) / small[0])
    if (short === 0) {
        return almost(adjective, num_big, big)
    } else {
        return short_of(adjective, num_big, big, short, small)
    }
}

function format_imperial(num, type) {
    let adjective_index = 0

    if (typeof num === "number") {
        if (num >= max_volume) {
            let log_num = Math.log10(num) - Math.log10(max_volume)
            adjective_index = 1
            while (log_num > imperial_ratio) {
                adjective_index++
                log_num /= imperial_ratio
                log_num--
            }

            num = 10 ** log_num * minims[0]
        }
    } else {
        if (num.cmp(max_volume) >= 0) {
            let log_num = num.log(10) - Math.log10(max_volume)
            adjective_index = 1
            while (log_num > imperial_ratio) {
                adjective_index++
                log_num /= imperial_ratio
                log_num--
            }

            num = 10 ** log_num * minims[0]
        } else {
            num = num.toNumber()
        }
    }

    const adjective = adjectives[adjective_index]

    const volume_index = find_unit(num)
    if (volume_index === 0) {
        if (num < 1000) {
            if (type === "decimal") {
                if (num < 1) {
                    return num.toFixed(3) + "pL"
                } else if (num < 10) {
                    return num.toFixed(2) + "pL"
                } else if (num < 100) {
                    return num.toFixed(1) + "pL"
                } else {
                    return Math.floor(num) + "pL"
                }
            } else {
                return Math.floor(num) + "pL"
            }
        } else if (num < 1000000) {
            num /= 1000
            if (num < 10) {
                return num.toFixed(3) + "nL"
            } else if (num < 100) {
                return num.toFixed(2) + "nL"
            } else {
                return num.toFixed(1) + "nL"
            }
        } else {
            num /= 1000000
            if (num < 10) {
                return num.toFixed(3) + "μL"
            } else if (num < 100) {
                return num.toFixed(2) + "μL"
            } else {
                return num.toFixed(1) + "μL"
            }
        }
    }

    if (
        volume_index <= 3 &&
        num + 9.5 * minims[0] > imperial_units[volume_index + 1][0]
    ) {
        return almost_or_short_of(
            num,
            adjective,
            1,
            imperial_units[volume_index + 1],
            minims
        )
    }

    let big = imperial_units[volume_index]
    let num_big = Math.floor(num / big[0])
    let remainder = num - num_big * big[0]
    if (volume_index === 1) {
        let deci_minims = Math.round((num * 10) / big[0])
        if (deci_minims === 10) {
            return add_article(adjective + " " + big[1])
        }
        let places = 0
        if (deci_minims < 100) places = 1
        return (
            (deci_minims / 10).toFixed(places) +
            " " +
            adjective +
            " " +
            big[1] +
            "s"
        )
    }

    if (volume_index === 2) {
        if (remainder > 50.5 * minims[0]) {
            return almost_or_short_of(num, adjective, num_big + 1, big, minims)
        }
        let num_small = Math.round(remainder / minims[0])
        return big_and_small(adjective, num_big, big, num_small, minims)
    }

    if (volume_index < imperial_units.length - 1) {
        let volume = check_almost(adjective, num, 0, volume_index + 1)
        if (volume !== undefined) {
            return volume
        }
    }
    let near_multiple = check_almost(
        adjective,
        remainder,
        num_big,
        volume_index
    )
    if (near_multiple !== undefined) {
        return near_multiple
    }
    if (remainder < imperial_units[volume_index - big[2]][0]) {
        return plural_or_article(num_big, adjective + " " + big[1])
    }

    let num_best = Math.floor(remainder / imperial_units[volume_index - 1][0])
    let best_index = volume_index - 1
    let best_error = remainder - num_best * imperial_units[volume_index - 1][0]
    for (let i = volume_index - 2; i > 0 && i > volume_index - big[2]; --i) {
        let third = imperial_units[i]
        let num_third = Math.floor(remainder / third[0])
        if (num_third > 9 && i !== 1) {
            break
        }

        let third_error = remainder - num_third * third[0]
        if (third_error < 0.99 * best_error) {
            num_best = num_third
            best_index = i
            best_error = third_error
        }
    }
    return big_and_small(
        adjective,
        num_big,
        big,
        num_best,
        imperial_units[best_index]
    )
}
