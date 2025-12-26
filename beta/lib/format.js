const notation_options = [
    0, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 19, 20, 21,
]
const exponent_options = [0, 2, 3, 4]
let random_notation = notation_options[Math.floor(Math.random() * 12)]
let random_exponent = exponent_options[Math.floor(Math.random() * 4)]
const regex =
    /\p{RI}\p{RI}|\p{Emoji}(\p{EMod}|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?(\u{200D}\p{Emoji}(\p{EMod}|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?)*|./gsu
let temp_charlist =
    "0123456789,.abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-∞·:∴∷⁙↑+/^!?%&μ#[]😠🎂🎄💀🍆🐱🌈💯🍦🎃💋😂🌙⛔🐙💩❓😡🙈👍🌂✌😩❌🪀⚡"
const notation_charlist = temp_charlist.match(regex)
let random_charlist = notation_charlist.toSorted(function () {
    return 0.5 - Math.random()
})

function format_randomize() {
    random_notation = notation_options[Math.floor(Math.random() * 14)]
    random_exponent = exponent_options[Math.floor(Math.random() * 4)]
    random_charlist = notation_charlist.toSorted(function () {
        return 0.5 - Math.random()
    })
}

function generate_string(num, dec, digits) {
    if (digits === undefined) digits = 3
    if (typeof num === "number") {
        if (num < 1000000) {
            if (num >= 100) {
                return Math.round(num)
            } else {
                if (dec) {
                    if (num < 1) {
                        return num.toFixed(3)
                    } else if (num < 10) {
                        return num.toFixed(2)
                    } else {
                        return num.toFixed(1)
                    }
                } else {
                    return num
                }
            }
        } else {
            let index = Math.floor(Math.log10(num) / 3 - 1)
            let lead = num / 10 ** (index * 3 + 3)

            if (lead < 10) {
                return (
                    generate_string(index, false) + ", " + lead.toFixed(digits)
                )
            } else if (lead < 100) {
                return (
                    generate_string(index, false) +
                    ", " +
                    lead.toFixed(digits - 1)
                )
            } else {
                return (
                    generate_string(index, false) +
                    ", " +
                    lead.toFixed(digits - 2)
                )
            }
        }
    } else {
        if (num.cmp(1000000) === -1) {
            return generate_string(num.toNumber(), dec, digits)
        } else {
            let index = Math.floor(num.exponent / 3 - 1)
            let lead = num.div(Decimal.pow(10, 3 * index + 3)).toNumber()
            if (lead === Infinity) lead = 1
            if (lead >= 1000) lead = lead / 1000 ** (Math.log10(lead) / 3)

            if (lead < 10) {
                return (
                    generate_string(index, false) + ", " + lead.toFixed(digits)
                )
            } else if (lead < 100) {
                return (
                    generate_string(index, false) +
                    ", " +
                    lead.toFixed(digits - 1)
                )
            } else {
                return (
                    generate_string(index, false) +
                    ", " +
                    lead.toFixed(digits - 2)
                )
            }
        }
    }
}

function format_num(num, not, nospace) {
    let negative = false
    let cutoff = 1000000

    if (not === undefined) not = 0

    if (num < 0) {
        negative = true
        num *= -1
    }

    let expn = Math.floor(Math.log10(num))
    if (num / 10 ** expn >= 9.9995 && expn >= 6 && not !== 0)
        num = 10 ** (expn + 1)

    let output = ""
    if (typeof num === "bigint") {
        output = num.toString()
        if (num >= 1000) {
            let digits = output.length
            if (num < 1e21) {
                for (let i = digits - 3; i > 0; i -= 3) {
                    output = output.substr(0, i) + "," + output.substr(i)
                }
            } else {
                let temp = Number(num)
                output = temp.toString()
            }
        }
    } else {
        output = num.toString()
        if (num >= 1000) {
            let digits = output.length
            if (num < 1e21) {
                for (let i = digits - 3; i > 0; i -= 3) {
                    output = output.substr(0, i) + "," + output.substr(i)
                }
            }
        }
    }

    if (typeof num === "bigint") {
        num = Number(num)
    }

    if (num >= cutoff) {
        switch (not) {
            case 1:
                const single_array = [
                    "",
                    "m",
                    "b",
                    "tr",
                    "quadr",
                    "quint",
                    "sext",
                    "sept",
                    "oct",
                    "non",
                ]
                const one_array = [
                    "",
                    "un",
                    "duo",
                    "tre",
                    "quattuor",
                    "quin",
                    "se",
                    "septe",
                    "octo",
                    "nove",
                ]
                const ten_array = [
                    "",
                    "dec",
                    "vigint",
                    "trigint",
                    "quadragint",
                    "quinquagint",
                    "sexagint",
                    "septuagint",
                    "octagint",
                    "nonagint",
                    "cent",
                ]

                let order = Math.floor(Math.log10(num) / 3) - 1
                let one_str = ""
                let one_mod = ""
                let ten_str = ""
                if (order < 10) {
                    one_str = single_array[order]
                } else {
                    one_str = one_array[order % 10]
                    ten_str = ten_array[Math.floor(order / 10)]

                    const r_order = Math.floor(order / 10)
                    if ((order % 10 === 7 || order % 10 === 9) && r_order !== 9)
                        if (r_order === 2 || r_order === 8) one_mod = "m"
                        else one_mod = "n"
                    if (
                        (order % 10 === 3 || order % 10 === 6) &&
                        ((r_order >= 2 && r_order <= 5) ||
                            r_order === 8 ||
                            r_order === 10)
                    )
                        one_mod = "s"
                    if (order % 10 === 6 && (r_order === 8 || r_order === 10))
                        one_mod = "x"
                }

                let lead = num / 10 ** (3 * order + 3)
                let lead_str = ""
                if (lead < 10) {
                    lead_str = lead.toFixed(3)
                } else if (lead < 100) {
                    lead_str = lead.toFixed(2)
                } else {
                    lead_str = lead.toFixed(1)
                }

                output = lead_str + " " + one_str + one_mod + ten_str + "illion"
                break
            case 2:
                let exponent = Math.floor(Math.log10(num))
                let mantissa = num / 10 ** exponent
                output = mantissa.toFixed(3) + "e" + exponent
                break
            case 3:
                let exponent2 = Math.floor(Math.log10(num) / 3) * 3
                let mantissa2 = num / 10 ** exponent2
                if (mantissa2 < 10) {
                    output = mantissa2.toFixed(3) + "e" + exponent2
                } else if (mantissa2 < 100) {
                    output = mantissa2.toFixed(2) + "e" + exponent2
                } else {
                    output = mantissa2.toFixed(1) + "e" + exponent2
                }
                break
            case 4:
            case 21:
                const single_array_cond = [
                    "",
                    "M",
                    "B",
                    "T",
                    "Qa",
                    "Qn",
                    "Se",
                    "Sp",
                    "Oc",
                    "No",
                ]
                const one_array_cond = [
                    "",
                    "U",
                    "D",
                    "T",
                    "Qa",
                    "Qn",
                    "Se",
                    "Sp",
                    "O",
                    "N",
                ]
                const ten_array_cond = [
                    "",
                    "Dc",
                    "Vg",
                    "Tg",
                    "Qg",
                    "Qi",
                    "Sx",
                    "Sg",
                    "Og",
                    "Ng",
                    "Ce",
                ]

                let order2 = Math.floor(Math.log10(num) / 3) - 1
                let one_str2 = ""
                let ten_str2 = ""
                if (order2 < 10) {
                    one_str2 = single_array_cond[order2]
                } else {
                    one_str2 = one_array_cond[order2 % 10]
                    ten_str2 = ten_array_cond[Math.floor(order2 / 10)]
                }

                let lead2 = num / 10 ** (3 * order2 + 3)
                let lead_str2 = ""
                if (lead2 < 10) {
                    lead_str2 = lead2.toFixed(3)
                } else if (lead2 < 100) {
                    lead_str2 = lead2.toFixed(2)
                } else {
                    lead_str2 = lead2.toFixed(1)
                }

                if (nospace) output = lead_str2 + one_str2 + ten_str2
                else output = lead_str2 + " " + one_str2 + ten_str2
                break
            case 5:
                let exponent3 = Math.log10(num)
                if (exponent3 < 10) output = "e" + exponent3.toFixed(4)
                else if (exponent3 < 100) output = "e" + exponent3.toFixed(3)
                else output = "e" + exponent3.toFixed(2)
                break
            case 6:
                const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                let order3 = Math.floor(Math.log10(num) / 3) - 1
                let lead3 = num / 10 ** (3 * order3 + 3)
                let lead_str3 = ""
                if (lead3 < 10) {
                    lead_str3 = lead3.toFixed(3)
                } else if (lead3 < 100) {
                    lead_str3 = lead3.toFixed(2)
                } else {
                    lead_str3 = lead3.toFixed(1)
                }

                output = lead_str3 + " "

                if (order3 <= 26) {
                    output += alphabet[order3 - 1]
                } else {
                    let letters = []
                    let remainder = 0
                    let index = 0
                    while (order3 > 26) {
                        remainder = order3 % 26
                        if (remainder === 0) index = 25
                        else index = remainder - 1
                        letters.push(alphabet[index])
                        order3 = (order3 - remainder) / 26
                        if (remainder === 0) order3--
                    }
                    letters.push(alphabet[order3 - 1])
                    output += letters.reverse().join("")
                }
                break
            case 7:
                const cancer_alphabet =
                    "😠🎂🎄💀🍆🐱🌈💯🍦🎃💋😂🌙⛔🐙💩❓😡🙈👍🌂✌😩❌🪀⚡"
                let order4 = Math.floor(Math.log10(num) / 3) - 1
                let lead4 = num / 10 ** (3 * order4 + 3)
                let lead_str4 = ""
                if (lead4 < 10) {
                    lead_str4 = lead4.toFixed(3)
                } else if (lead4 < 100) {
                    lead_str4 = lead4.toFixed(2)
                } else {
                    lead_str4 = lead4.toFixed(1)
                }

                output = lead_str4

                if (order4 <= 26) {
                    output += Array.from(cancer_alphabet)[order4 - 1]
                } else {
                    let emoji = []
                    let remainder2 = 0
                    let index2 = 0
                    while (order4 > 26) {
                        remainder2 = order4 % 26
                        if (remainder2 === 0) index2 = 25
                        else index2 = remainder2 - 1
                        emoji.push(Array.from(cancer_alphabet)[index2])
                        order4 = (order4 - remainder2) / 26
                        if (remainder2 === 0) order4--
                    }
                    emoji.push(Array.from(cancer_alphabet)[order4 - 1])
                    output += emoji.reverse().join("")
                }
                break
            case 9:
                let exponent4 = Math.log(num) / Math.log(1.7976931348622053e308)
                output = exponent4.toFixed(3) + "∞"
                break
            case 16:
                output = format_cancer2(num)
                break
            case 20:
                let exponent5 = Math.floor(Math.log10(num))
                let mantissa5 = num / 10 ** exponent5
                if (exponent5 < 100)
                    output = mantissa5.toFixed(3) + "e" + exponent5
                else output = mantissa5.toFixed(2) + "e" + exponent5
                break
        }
    }
    if (not === 10) {
        output = ""

        const fraction_array = [
            "",
            "·",
            ":",
            "∴",
            "∷",
            "⁙",
            "S",
            "S·",
            "S:",
            "S∴",
            "S∷",
            "S⁙",
        ]
        const one_array = [
            "",
            "I",
            "II",
            "III",
            "IV",
            "V",
            "VI",
            "VII",
            "VIII",
            "IX",
        ]
        const ten_array = [
            "",
            "X",
            "XX",
            "XXX",
            "XL",
            "L",
            "LX",
            "LXX",
            "LXXX",
            "XC",
        ]
        const hundred_array = [
            "",
            "C",
            "CC",
            "CCC",
            "CD",
            "D",
            "DC",
            "DCC",
            "DCCC",
            "CM",
        ]
        const thousand_array = [
            "",
            "M",
            "MM",
            "MMM",
            'M<span style="text-decoration:overline">V</span>',
            '<span style="text-decoration:overline">V</span>',
            '<span style="text-decoration:overline">V</span>M',
            '<span style="text-decoration:overline">V</span>MM',
            '<span style="text-decoration:overline">V</span>MMM',
            'M<span style="text-decoration:overline">X</span>',
        ]
        const ten_thousand_array = [
            "",
            '<span style="text-decoration:overline">X</span>',
            '<span style="text-decoration:overline">XX</span>',
            '<span style="text-decoration:overline">XXX</span>',
            '<span style="text-decoration:overline">XL</span>',
            '<span style="text-decoration:overline">L</span>',
            '<span style="text-decoration:overline">LX</span>',
            '<span style="text-decoration:overline">LXX</span>',
            '<span style="text-decoration:overline">LXXX</span>',
            '<span style="text-decoration:overline">XC</span>',
        ]
        const hundred_thousand_array = [
            "",
            '<span style="text-decoration:overline">C</span>',
            '<span style="text-decoration:overline">CC</span>',
            '<span style="text-decoration:overline">CCC</span>',
            '<span style="text-decoration:overline">CD</span>',
            '<span style="text-decoration:overline">D</span>',
            '<span style="text-decoration:overline">DC</span>',
            '<span style="text-decoration:overline">DCC</span>',
            '<span style="text-decoration:overline">DCCC</span>',
            '<span style="text-decoration:overline">CM</span>',
        ]
        const million_array = [
            "",
            '<span style="text-decoration:overline">M</span>',
            '<span style="text-decoration:overline">MM</span>',
            '<span style="text-decoration:overline">MMM</span>',
        ]

        if (num >= 1000000) {
            output += million_array[Math.floor(num / 1000000) % 10]
        }
        if (num >= 100000) {
            output += hundred_thousand_array[Math.floor(num / 100000) % 10]
        }
        if (num >= 10000) {
            output += ten_thousand_array[Math.floor(num / 10000) % 10]
        }
        if (num >= 1000) {
            output += thousand_array[Math.floor(num / 1000) % 10]
        }
        if (num >= 100) {
            output += hundred_array[Math.floor(num / 100) % 10]
        }
        if (num >= 10) {
            output += ten_array[Math.floor(num / 10) % 10]
        }
        output += one_array[num % 10]

        if (num >= 4000000) {
            output = ""

            let exponent = Math.floor(Math.log10(num))
            let mantissa = num / 10 ** exponent

            output += one_array[Math.floor(mantissa)]
            output += fraction_array[Math.floor(mantissa * 12) % 12]

            output += "↑"
            output += format_num(exponent, not)
        }

        if (output === "") output = "0"
    }
    if (not === 11) {
        const char_array =
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/"
        output = ""

        let exponent = Math.floor(Math.log(num) / Math.log(64))

        if (num >= 64 ** Math.log10(cutoff)) {
            output =
                char_array[Math.floor(num / 64 ** exponent)] +
                "." +
                char_array[Math.floor(num / 64 ** (exponent - 1)) % 64] +
                char_array[Math.floor(num / 64 ** (exponent - 2)) % 64] +
                char_array[Math.floor(num / 64 ** (exponent - 3)) % 64] +
                "^"
            if (exponent >= 64) output += char_array[Math.floor(exponent / 64)]
            output += char_array[exponent % 64]
        } else {
            for (let i = exponent; i >= 0; i--) {
                output += char_array[Math.floor(num / 64 ** i) % 64]
            }
        }

        if (output === "") output = "0"
    }
    if (not === 14) {
        output = format_imperial(num, "number")
    }
    if (not === 15) {
        output = format_num(num, random_notation)
        let output2 = output.replaceAll(
            '<span style="text-decoration:overline">',
            "("
        )
        let output3 = output2.replaceAll("</span>", ")").match(regex)

        output2 = ""
        let index = -1
        for (let i = 0; i < output3.length; i++) {
            index = notation_charlist.indexOf(output3[i])
            if (index === -1) {
                output2 += output3[i]
            } else {
                output2 += random_charlist[index]
            }
        }

        output = output2.replaceAll(
            "(",
            '<span style="text-decoration:overline">'
        )
        output2 = output.replaceAll(")", "</span>")
        output = output2
    }
    if ((not === 12 || not === 13) && num < 1e36 && num >= cutoff) {
        const single_array_cond = [
            "",
            "M",
            "B",
            "T",
            "Qa",
            "Qn",
            "Se",
            "Sp",
            "Oc",
            "No",
        ]
        const one_array_cond = [
            "",
            "U",
            "D",
            "T",
            "Qa",
            "Qn",
            "Se",
            "Sp",
            "O",
            "N",
        ]
        const ten_array_cond = [
            "",
            "Dc",
            "Vg",
            "Tg",
            "Qg",
            "Qi",
            "Sx",
            "Sg",
            "Og",
            "Ng",
            "Ce",
        ]

        let order2 = Math.floor(Math.log10(num) / 3) - 1
        let one_str2 = ""
        let ten_str2 = ""
        if (order2 < 10) {
            one_str2 = single_array_cond[order2]
        } else {
            one_str2 = one_array_cond[order2 % 10]
            ten_str2 = ten_array_cond[Math.floor(order2 / 10)]
        }

        let lead2 = num / 10 ** (3 * order2 + 3)
        let lead_str2 = ""
        if (lead2 < 10) {
            lead_str2 = lead2.toFixed(3)
        } else if (lead2 < 100) {
            lead_str2 = lead2.toFixed(2)
        } else {
            lead_str2 = lead2.toFixed(1)
        }

        output = lead_str2 + " " + one_str2 + ten_str2
    } else if (num >= cutoff) {
        if (not === 12) {
            let exponent = Math.floor(Math.log10(num))
            let mantissa = num / 10 ** exponent
            output = mantissa.toFixed(3) + "e" + exponent
        } else if (not === 13) {
            let exponent2 = Math.floor(Math.log10(num) / 3) * 3
            let mantissa2 = num / 10 ** exponent2
            if (mantissa2 < 10) {
                output = mantissa2.toFixed(3) + "e" + exponent2
            } else if (mantissa2 < 100) {
                output = mantissa2.toFixed(2) + "e" + exponent2
            } else {
                output = mantissa2.toFixed(1) + "e" + exponent2
            }
        }
    }
    if (not === 19) {
        output = "[" + generate_string(num, false) + "]"
    }
    if (not === 22) {
        const dozenal = [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "X",
            "Ԑ",
        ]
        let order5 = Math.floor(Math.log(num) / Math.log(12))
        if (num === 0) {
            output = "0"
        } else if (order5 < 6) {
            output = ""
            for (let i = order5; i >= 0; i--) {
                output += dozenal[Math.floor(num / 12 ** i) % 12]
                if (i === 3) output += ","
            }
        } else {
            output =
                dozenal[Math.floor(num / 12 ** order5) % 12] +
                "." +
                dozenal[Math.floor(num / 12 ** (order5 - 1)) % 12] +
                dozenal[Math.floor(num / 12 ** (order5 - 2)) % 12] +
                dozenal[Math.floor(num / 12 ** (order5 - 3)) % 12] +
                "e" +
                format_num(order5, not, nospace)
        }
    }
    if (num >= 1.7976931348622053e308 && not !== 9) {
        output = "Infinity"
    }
    if (negative) {
        output = "-" + output
    }
    if (not === 17) {
        output = format_cancer3(num, "number")
    }
    if (not === 18) {
        output = format_cancer4(num)
    }
    if (not === 8) {
        output = "???"
    }
    return output
}

function format_inf(num, not, enot) {
    let negative = false
    let cutoff = 1000000

    if (not === undefined) not = 0

    if (num.cmp(0) === -1) {
        negative = true
        num = num.mul(-1)
    }

    let expn = Math.floor(num.log(10))
    if (
        num.div(Decimal.pow(10, expn)).cmp(9.9995) >= 0 &&
        expn >= 6 &&
        not !== 0
    )
        num = Decimal.pow(10, expn + 1)

    let output = ""
    if (num.cmp(1e21) === -1) {
        let temp_num = num.toNumber()
        output = Math.floor(temp_num).toString()
        if (temp_num >= 1000) {
            let digits = output.length
            for (let i = digits - 3; i > 0; i -= 3) {
                output = output.substr(0, i) + "," + output.substr(i)
            }
        }
    } else {
        let exponent = Math.floor(num.exponent)
        let mantissa = num.mantissa
        output = mantissa.toFixed(16) + "e+" + format_num(new Decimal(exponent))
    }
    if (num.cmp(cutoff) === 1 || num.cmp(cutoff) === 0) {
        switch (not) {
            case 1:
                const single_array = [
                    "",
                    "m",
                    "b",
                    "tr",
                    "quadr",
                    "quint",
                    "sext",
                    "sept",
                    "oct",
                    "non",
                ]
                const one_array = [
                    "",
                    "un",
                    "duo",
                    "tre",
                    "quattuor",
                    "quin",
                    "se",
                    "septe",
                    "octo",
                    "nove",
                ]
                const ten_array = [
                    "",
                    "dec",
                    "vigint",
                    "trigint",
                    "quadragint",
                    "quinquagint",
                    "sexagint",
                    "septuagint",
                    "octagint",
                    "nonagint",
                ]
                const hundred_array = [
                    "",
                    "cent",
                    "ducent",
                    "trecent",
                    "quadringent",
                    "quingent",
                    "sescent",
                    "septingent",
                    "octingent",
                    "nongent",
                ]
                const separator_array = [
                    "",
                    "milli",
                    "micri",
                    "nani",
                    "pici",
                    "femti",
                    "atti",
                    "zepti",
                    "yocti",
                    "ronti",
                    "quecti",
                ]

                let order = Math.floor(num.exponent / 3) - 1

                let lead = num
                    .div(new Decimal(10).pow(3 * order + 3))
                    .toNumber()
                if (lead === Infinity) lead = 1
                if (lead >= 1000) lead = lead / 1000 ** (Math.log10(lead) / 3)
                let lead_str = ""
                if (lead < 10) {
                    lead_str = lead.toFixed(3)
                } else if (lead < 100) {
                    lead_str = lead.toFixed(2)
                } else {
                    lead_str = lead.toFixed(1)
                }

                let one_str = ""
                let one_mod = ""
                let ten_str = ""
                let hundred_str = ""
                if (order < 10) {
                    one_str = single_array[order]
                } else {
                    one_str = one_array[order % 10]
                    ten_str = ten_array[Math.floor(order / 10) % 10]
                    hundred_str = hundred_array[Math.floor(order / 100) % 10]

                    const r_order = Math.floor(order / 10)
                    if (
                        (order % 10 === 7 || order % 10 === 9) &&
                        r_order % 10 !== 9 &&
                        r_order !== 90
                    ) {
                        if (
                            r_order % 10 === 2 ||
                            r_order % 10 === 8 ||
                            r_order === 80
                        )
                            one_mod = "m"
                        else one_mod = "n"
                    }
                    if (
                        (order % 10 === 3 || order % 10 === 6) &&
                        ((r_order >= 2 && r_order <= 5) ||
                            r_order % 10 === 8 ||
                            r_order === 0 ||
                            r_order === 10 ||
                            r_order === 30 ||
                            r_order === 40 ||
                            r_order === 50 ||
                            r_order === 80)
                    )
                        one_mod = "s"
                    if (
                        order % 10 === 6 &&
                        (r_order % 10 === 8 ||
                            r_order === 0 ||
                            r_order === 10 ||
                            r_order === 80)
                    )
                        one_mod = "x"
                    if (r_order % 100 === 0) {
                        if (
                            (order % 10 >= 1 && order % 10 <= 3) ||
                            order % 10 === 5
                        )
                            one_mod += "t"
                        if (order % 10 === 6) one_mod += "xt"
                        if (order % 10 === 8) one_str = "oct"
                    }

                    if (
                        Math.floor(order / 100) % 10 !== 0 &&
                        Math.floor(order / 10) % 10 >= 1
                    ) {
                        if (Math.floor(order / 10) % 10 <= 2) {
                            ten_str += "i"
                        } else {
                            ten_str += "a"
                        }
                    }
                }
                output = one_str + one_mod + ten_str + hundred_str

                let orders = Math.floor(Math.log10(order) / 3)
                for (let i = 1; i <= orders; i++) {
                    let ordern = Math.floor(order / 1000 ** i) % 1000
                    one_str = ""
                    one_mod = ""
                    ten_str = ""
                    hundred_str = ""
                    let separator_str = ""
                    if (ordern > 1) {
                        one_str = one_array[ordern % 10]
                        ten_str = ten_array[Math.floor(ordern / 10) % 10]
                        hundred_str =
                            hundred_array[Math.floor(ordern / 100) % 10]

                        const r_ordern = Math.floor(ordern / 10)
                        if (
                            (ordern % 10 === 7 || ordern % 10 === 9) &&
                            r_ordern % 10 !== 9 &&
                            r_ordern !== 90
                        ) {
                            if (
                                r_ordern % 10 === 2 ||
                                r_ordern % 10 === 8 ||
                                r_ordern === 80
                            )
                                one_mod = "m"
                            else one_mod = "n"
                        }
                        if (
                            (ordern % 10 === 3 || ordern % 10 === 6) &&
                            ((r_ordern >= 2 && r_ordern <= 5) ||
                                r_ordern % 10 === 8 ||
                                r_ordern === 10 ||
                                r_ordern === 30 ||
                                r_ordern === 40 ||
                                r_ordern === 50 ||
                                r_ordern === 80)
                        )
                            one_mod = "s"
                        if (
                            ordern % 10 === 6 &&
                            (r_ordern % 10 === 8 ||
                                r_ordern === 10 ||
                                r_ordern === 80)
                        )
                            one_mod = "x"

                        if (Math.floor(ordern / 10) % 10 >= 1) {
                            if (Math.floor(ordern / 10) % 10 <= 2) {
                                ten_str += "i"
                            } else {
                                ten_str += "a"
                            }
                        }

                        if (hundred_str !== "") {
                            hundred_str += "i"
                        }
                    }

                    if (ordern !== 0) {
                        separator_str = separator_array[i]
                        if (
                            order -
                                Math.floor(order / 1000 ** i) * 1000 ** i ===
                            0
                        )
                            separator_str += "n"
                    }

                    output =
                        one_str +
                        one_mod +
                        ten_str +
                        hundred_str +
                        separator_str +
                        output
                }

                output = lead_str + " " + output + "illion"
                break
            case 2:
                let exponent = Math.floor(num.exponent)
                let mantissa = num.mantissa
                output =
                    mantissa.toFixed(3) + "e" + format_num(exponent, enot, true)
                break
            case 3:
                let exponent2 = Math.floor(num.exponent / 3) * 3
                let mantissa2 = num
                    .div(new Decimal(10).pow(exponent2))
                    .toNumber()
                if (mantissa2 === Infinity) mantissa2 = 1
                if (mantissa2 >= 1000)
                    mantissa2 = mantissa2 / 1000 ** (Math.log10(mantissa2) / 3)
                if (mantissa2 < 10) {
                    output =
                        mantissa2.toFixed(3) +
                        "e" +
                        format_num(exponent2, enot, true)
                } else if (mantissa2 < 100) {
                    output =
                        mantissa2.toFixed(2) +
                        "e" +
                        format_num(exponent2, enot, true)
                } else {
                    output =
                        mantissa2.toFixed(1) +
                        "e" +
                        format_num(exponent2, enot, true)
                }
                break
            case 4:
                const single_array_cond = [
                    "",
                    "M",
                    "B",
                    "T",
                    "Qa",
                    "Qn",
                    "Se",
                    "Sp",
                    "Oc",
                    "No",
                ]
                const one_array_cond = [
                    "",
                    "U",
                    "D",
                    "T",
                    "Qa",
                    "Qn",
                    "Se",
                    "Sp",
                    "O",
                    "N",
                ]
                const ten_array_cond = [
                    "",
                    "Dc",
                    "Vg",
                    "Tg",
                    "Qg",
                    "Qi",
                    "Sx",
                    "Sg",
                    "Og",
                    "Ng",
                ]
                const hundred_array_cond = [
                    "",
                    "Ce",
                    "Du",
                    "Tc",
                    "Qd",
                    "Qe",
                    "Sc",
                    "St",
                    "Oe",
                    "Ne",
                ]
                const separator_array_cond = [
                    "",
                    "MI",
                    "MC",
                    "NA",
                    "PC",
                    "FM",
                    "AT",
                    "ZP",
                    "YC",
                    "RN",
                    "QU",
                ]

                let order2 = Math.floor(num.exponent / 3) - 1

                let lead2 = num
                    .div(new Decimal(10).pow(3 * order2 + 3))
                    .toNumber()
                if (lead2 === Infinity) lead2 = 1
                if (lead2 >= 1000)
                    lead2 = lead2 / 1000 ** (Math.log10(lead2) / 3)
                let lead_str2 = ""
                if (lead2 < 10) {
                    lead_str2 = lead2.toFixed(3)
                } else if (lead2 < 100) {
                    lead_str2 = lead2.toFixed(2)
                } else {
                    lead_str2 = lead2.toFixed(1)
                }

                let one_str2 = ""
                let ten_str2 = ""
                let hundred_str2 = ""
                if (order2 < 10) {
                    one_str2 = single_array_cond[order2]
                } else {
                    one_str2 = one_array_cond[order2 % 10]
                    ten_str2 = ten_array_cond[Math.floor(order2 / 10) % 10]
                    hundred_str2 =
                        hundred_array_cond[Math.floor(order2 / 100) % 10]
                }
                output = one_str2 + ten_str2 + hundred_str2

                let order2s = Math.floor(Math.log10(order2) / 3)
                for (let i = 1; i <= order2s; i++) {
                    let order2n = Math.floor(order2 / 1000 ** i) % 1000
                    one_str2 = ""
                    ten_str2 = ""
                    hundred_str2 = ""
                    let separator_str2 = ""

                    if (order2n > 1) {
                        one_str2 = one_array_cond[order2n % 10]
                        ten_str2 = ten_array_cond[Math.floor(order2n / 10) % 10]
                        hundred_str2 =
                            hundred_array_cond[Math.floor(order2n / 100) % 10]
                    }
                    if (order2n !== 0) {
                        separator_str2 = separator_array_cond[i]
                        if (order2 % 1000 ** i !== 0) separator_str2 += "-"
                    }

                    output =
                        one_str2 +
                        ten_str2 +
                        hundred_str2 +
                        separator_str2 +
                        output
                }

                output = lead_str2 + " " + output
                break
            case 5:
                let exponent3 = num.log10()
                if (exponent3 < 10) output = "e" + exponent3.toFixed(4)
                else if (exponent3 < 100) output = "e" + exponent3.toFixed(3)
                else if (exponent3 < 1000) output = "e" + exponent3.toFixed(2)
                else if (exponent3 < 10000) output = "e" + exponent3.toFixed(1)
                else output = "e" + Math.floor(exponent3)

                if (enot === 0 || exponent3 < cutoff) {
                    let decimal = (exponent3 - Math.floor(exponent3)).toFixed(4)
                    if (exponent3 >= 10)
                        decimal = (exponent3 - Math.floor(exponent3)).toFixed(3)
                    if (exponent3 >= 100)
                        decimal = (exponent3 - Math.floor(exponent3)).toFixed(2)
                    if (exponent3 >= 1000)
                        decimal = (exponent3 - Math.floor(exponent3)).toFixed(1)
                    if (exponent3 < 10000) {
                        output =
                            "e" +
                            format_num(Math.floor(exponent3), 0) +
                            decimal.substr(1)
                    } else {
                        output = "e" + format_num(Math.floor(exponent3), 0)
                    }
                } else {
                    output = "e" + format_num(exponent3, enot, true)
                }
                break
            case 6:
                const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                let order3 = Math.floor(num.exponent / 3) - 1
                let lead3 = num
                    .div(new Decimal(10).pow(3 * order3 + 3))
                    .toNumber()
                if (lead3 === Infinity) lead3 = 1
                if (lead3 >= 1000)
                    lead3 = lead3 / 1000 ** (Math.log10(lead3) / 3)
                let lead_str3 = ""
                if (lead3 < 10) {
                    lead_str3 = lead3.toFixed(3)
                } else if (lead3 < 100) {
                    lead_str3 = lead3.toFixed(2)
                } else {
                    lead_str3 = lead3.toFixed(1)
                }

                output = lead_str3 + " "

                if (order3 <= 26) {
                    output += alphabet[order3 - 1]
                } else {
                    let letters = []
                    let remainder = 0
                    let index = 0
                    while (order3 > 26) {
                        remainder = order3 % 26
                        if (remainder === 0) index = 25
                        else index = remainder - 1
                        letters.push(alphabet[index])
                        order3 = (order3 - remainder) / 26
                        if (remainder === 0) order3--
                    }
                    letters.push(alphabet[order3 - 1])
                    output += letters.reverse().join("")
                }
                break
            case 7:
                const cancer_alphabet =
                    "😠🎂🎄💀🍆🐱🌈💯🍦🎃💋😂🌙⛔🐙💩❓😡🙈👍🌂✌😩❌🪀⚡"
                let order4 = Math.floor(num.exponent / 3) - 1
                let lead4 = num
                    .div(new Decimal(10).pow(3 * order4 + 3))
                    .toNumber()
                if (lead4 === Infinity) lead4 = 1
                if (lead4 >= 1000)
                    lead4 = lead4 / 1000 ** (Math.log10(lead4) / 3)
                let lead_str4 = ""
                if (lead4 < 10) {
                    lead_str4 = lead4.toFixed(3)
                } else if (lead4 < 100) {
                    lead_str4 = lead4.toFixed(2)
                } else {
                    lead_str4 = lead4.toFixed(1)
                }

                output = lead_str4

                if (order4 <= 26) {
                    output += Array.from(cancer_alphabet)[order4 - 1]
                } else {
                    let emoji = []
                    let remainder2 = 0
                    let index2 = 0
                    while (order4 > 26) {
                        remainder2 = order4 % 26
                        if (remainder2 === 0) index2 = 25
                        else index2 = remainder2 - 1
                        emoji.push(Array.from(cancer_alphabet)[index2])
                        order4 = (order4 - remainder2) / 26
                        if (remainder2 === 0) order4--
                    }
                    emoji.push(Array.from(cancer_alphabet)[order4 - 1])
                    output += emoji.reverse().join("")
                }
                break
            case 9:
                let exponent4 = num.log(1.7976931348622053e308)
                output = exponent4.toFixed(3) + "∞"

                if (enot === 0 || exponent4 < cutoff) {
                    let decimal = (exponent4 - Math.floor(exponent4)).toFixed(3)
                    output =
                        format_num(Math.floor(exponent4), 0) +
                        decimal.substr(1) +
                        "∞"
                } else {
                    output = format_num(exponent4, enot, true) + "∞"
                }
                break
            case 16:
                output = format_cancer2(num)
                break
            case 20:
                let exponent5 = Math.floor(num.exponent)
                let mantissa5 = num.mantissa
                if (exponent5 < 100)
                    output =
                        mantissa5.toFixed(3) +
                        "e" +
                        format_num(exponent5, enot, true)
                else if (exponent5 < 1000)
                    output =
                        mantissa5.toFixed(2) +
                        "e" +
                        format_num(exponent5, enot, true)
                else if (exponent5 < 10000)
                    output =
                        mantissa5.toFixed(1) +
                        "e" +
                        format_num(exponent5, enot, true)
                else if (exponent5 < 100000)
                    output =
                        Math.floor(mantissa5) +
                        "e" +
                        format_num(exponent5, enot, true)
                else output = "e" + format_num(exponent5, enot, true)
                break
            case 21:
                const single_array_trunc = [
                    "",
                    "M",
                    "B",
                    "T",
                    "Qa",
                    "Qn",
                    "Se",
                    "Sp",
                    "Oc",
                    "No",
                ]
                const one_array_trunc = [
                    "",
                    "U",
                    "D",
                    "T",
                    "Qa",
                    "Qn",
                    "Se",
                    "Sp",
                    "O",
                    "N",
                ]
                const ten_array_trunc = [
                    "",
                    "Dc",
                    "Vg",
                    "Tg",
                    "Qg",
                    "Qi",
                    "Sx",
                    "Sg",
                    "Og",
                    "Ng",
                ]
                const hundred_array_trunc = [
                    "",
                    "Ce",
                    "Du",
                    "Tc",
                    "Qd",
                    "Qe",
                    "Sc",
                    "St",
                    "Oe",
                    "Ne",
                ]
                const separator_array_trunc = [
                    "",
                    "MI",
                    "MC",
                    "NA",
                    "PC",
                    "FM",
                    "AT",
                    "ZP",
                    "YC",
                    "RN",
                    "QU",
                ]

                let order5 = Math.floor(num.exponent / 3) - 1

                let lead5 = num
                    .div(new Decimal(10).pow(3 * order5 + 3))
                    .toNumber()
                if (lead5 === Infinity) lead5 = 1
                if (lead5 >= 1000)
                    lead5 = lead5 / 1000 ** (Math.log10(lead5) / 3)
                output = ""
                if (lead5 < 10) {
                    output = lead5.toFixed(3)
                } else if (lead5 < 100) {
                    output = lead5.toFixed(2)
                } else {
                    output = lead5.toFixed(1)
                }

                output += " "

                if (order5 < 10) {
                    output += single_array_trunc[order5 % 10]
                } else {
                    let items = 0
                    let segment = 0
                    let segments = [""]
                    for (let i = Math.floor(Math.log10(order5)); i >= 0; i--) {
                        items++
                        if (items > 4) break
                        switch (i % 3) {
                            case 0:
                                segments[segment] =
                                    one_array_trunc[
                                        Math.floor(order5 / 10 ** i) % 10
                                    ] + segments[segment]
                                break
                            case 1:
                                segments[segment] =
                                    ten_array_trunc[
                                        Math.floor(order5 / 10 ** i) % 10
                                    ] + segments[segment]
                                break
                            case 2:
                                if (segments[segment] !== "") {
                                    segment++
                                    segments.push(
                                        hundred_array_trunc[
                                            Math.floor(order5 / 10 ** i) % 10
                                        ]
                                    )
                                } else {
                                    segments[segment] =
                                        hundred_array_trunc[
                                            Math.floor(order5 / 10 ** i) % 10
                                        ]
                                }
                                break
                        }
                    }
                    for (let i = 0; i < segments.length; i++) {
                        if (segments[i] !== "") {
                            if (i >= 1) output += "-"
                            output +=
                                segments[i] +
                                separator_array_trunc[
                                    Math.floor(Math.log10(order5) / 3) - i
                                ]
                        }
                    }
                }
                break
        }
    }
    if (not === 10) {
        output = ""

        const fraction_array = [
            "",
            "·",
            ":",
            "∴",
            "∷",
            "⁙",
            "S",
            "S·",
            "S:",
            "S∴",
            "S∷",
            "S⁙",
        ]
        const one_array = [
            "",
            "I",
            "II",
            "III",
            "IV",
            "V",
            "VI",
            "VII",
            "VIII",
            "IX",
        ]
        const ten_array = [
            "",
            "X",
            "XX",
            "XXX",
            "XL",
            "L",
            "LX",
            "LXX",
            "LXXX",
            "XC",
        ]
        const hundred_array = [
            "",
            "C",
            "CC",
            "CCC",
            "CD",
            "D",
            "DC",
            "DCC",
            "DCCC",
            "CM",
        ]
        const thousand_array = [
            "",
            "M",
            "MM",
            "MMM",
            'M<span style="text-decoration:overline">V</span>',
            '<span style="text-decoration:overline">V</span>',
            '<span style="text-decoration:overline">V</span>M',
            '<span style="text-decoration:overline">V</span>MM',
            '<span style="text-decoration:overline">V</span>MMM',
            'M<span style="text-decoration:overline">X</span>',
        ]
        const ten_thousand_array = [
            "",
            '<span style="text-decoration:overline">X</span>',
            '<span style="text-decoration:overline">XX</span>',
            '<span style="text-decoration:overline">XXX</span>',
            '<span style="text-decoration:overline">XL</span>',
            '<span style="text-decoration:overline">L</span>',
            '<span style="text-decoration:overline">LX</span>',
            '<span style="text-decoration:overline">LXX</span>',
            '<span style="text-decoration:overline">LXXX</span>',
            '<span style="text-decoration:overline">XC</span>',
        ]
        const hundred_thousand_array = [
            "",
            '<span style="text-decoration:overline">C</span>',
            '<span style="text-decoration:overline">CC</span>',
            '<span style="text-decoration:overline">CCC</span>',
            '<span style="text-decoration:overline">CD</span>',
            '<span style="text-decoration:overline">D</span>',
            '<span style="text-decoration:overline">DC</span>',
            '<span style="text-decoration:overline">DCC</span>',
            '<span style="text-decoration:overline">DCCC</span>',
            '<span style="text-decoration:overline">CM</span>',
        ]
        const million_array = [
            "",
            '<span style="text-decoration:overline">M</span>',
            '<span style="text-decoration:overline">MM</span>',
            '<span style="text-decoration:overline">MMM</span>',
        ]

        if (num.cmp(4000000) === 1 || num.cmp(4000000) === 0) {
            output = ""

            let exponent = num.exponent
            let mantissa = num.mantissa

            output += one_array[Math.floor(mantissa)]
            output += fraction_array[Math.floor(mantissa * 12) % 12]

            output += "↑"
            output += format_num(exponent, not)
        } else {
            let num2 = num.toNumber()

            if (num2 >= 1000000) {
                output += million_array[Math.floor(num2 / 1000000) % 10]
            }
            if (num2 >= 100000) {
                output += hundred_thousand_array[Math.floor(num2 / 100000) % 10]
            }
            if (num2 >= 10000) {
                output += ten_thousand_array[Math.floor(num2 / 10000) % 10]
            }
            if (num2 >= 1000) {
                output += thousand_array[Math.floor(num2 / 1000) % 10]
            }
            if (num2 >= 100) {
                output += hundred_array[Math.floor(num2 / 100) % 10]
            }
            if (num2 >= 10) {
                output += ten_array[Math.floor(num2 / 10) % 10]
            }
            output += one_array[num2 % 10]
        }

        if (output === "") output = "0"
    }
    if (not === 11) {
        const char_array =
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/"
        output = ""

        let exponent = Math.floor(num.log(64))

        if (num.cmp(Decimal.pow(64, Math.log10(cutoff))) >= 0) {
            output =
                char_array[
                    Math.floor(
                        num.div(new Decimal(64).pow(exponent)).toNumber()
                    )
                ] +
                "." +
                char_array[
                    Math.floor(
                        num.div(new Decimal(64).pow(exponent - 1)).toNumber()
                    ) % 64
                ] +
                char_array[
                    Math.floor(
                        num.div(new Decimal(64).pow(exponent - 2)).toNumber()
                    ) % 64
                ] +
                char_array[
                    Math.floor(
                        num.div(new Decimal(64).pow(exponent - 3)).toNumber()
                    ) % 64
                ] +
                "^"
            output += format_num(exponent, 11)
        } else {
            let num2 = num.toNumber()
            for (let i = exponent; i >= 0; i--) {
                output += char_array[Math.floor(num2 / 64 ** i) % 64]
            }
        }

        if (output === "") output = "0"
    }
    if (not === 14) {
        output = format_imperial(num, "number")
    }
    if (not === 15) {
        output = format_inf(num, random_notation, random_exponent)
        let output2 = output.replaceAll(
            '<span style="text-decoration:overline">',
            "("
        )
        let output3 = output2.replaceAll("</span>", ")").match(regex)

        output2 = ""
        let index = -1
        for (let i = 0; i < output3.length; i++) {
            index = notation_charlist.indexOf(output3[i])
            if (index === -1) {
                output2 += output3[i]
            } else {
                output2 += random_charlist[index]
            }
        }

        output = output2.replaceAll(
            "(",
            '<span style="text-decoration:overline">'
        )
        output2 = output.replaceAll(")", "</span>")
        output = output2
    }
    if (
        (not === 12 || not === 13) &&
        num.cmp(10 ** 36) === -1 &&
        num.cmp(cutoff) >= 0
    ) {
        const single_array_cond = [
            "",
            "M",
            "B",
            "T",
            "Qa",
            "Qn",
            "Se",
            "Sp",
            "Oc",
            "No",
        ]
        const one_array_cond = [
            "",
            "U",
            "D",
            "T",
            "Qa",
            "Qn",
            "Se",
            "Sp",
            "O",
            "N",
        ]
        const ten_array_cond = [
            "",
            "Dc",
            "Vg",
            "Tg",
            "Qg",
            "Qi",
            "Sx",
            "Sg",
            "Og",
            "Ng",
        ]
        const hundred_array_cond = [
            "",
            "Ce",
            "Du",
            "Tc",
            "Qd",
            "Qe",
            "Sc",
            "St",
            "Oe",
            "Ne",
        ]

        let order2 = Math.floor(num.exponent / 3) - 1
        let one_str2 = ""
        let ten_str2 = ""
        let hundred_str2 = ""
        if (order2 < 10) {
            one_str2 = single_array_cond[order2]
        } else {
            one_str2 = one_array_cond[order2 % 10]
            ten_str2 = ten_array_cond[Math.floor(order2 / 10) % 10]
            hundred_str2 = hundred_array_cond[Math.floor(order2 / 100) % 10]
        }

        let lead2 = num.div(new Decimal(10).pow(3 * order2 + 3)).toNumber()
        let lead_str2 = ""
        if (lead2 < 10) {
            lead_str2 = lead2.toFixed(3)
        } else if (lead2 < 100) {
            lead_str2 = lead2.toFixed(2)
        } else {
            lead_str2 = lead2.toFixed(1)
        }

        output = lead_str2 + " " + one_str2 + ten_str2 + hundred_str2
    } else if (num.cmp(cutoff) >= 0) {
        if (not === 12) {
            let exponent = Math.floor(num.exponent)
            let mantissa = num.mantissa
            output =
                mantissa.toFixed(3) + "e" + format_num(exponent, enot, true)
        } else if (not === 13) {
            let exponent2 = Math.floor(num.exponent / 3) * 3
            let mantissa2 = num.div(new Decimal(10).pow(exponent2)).toNumber()
            if (mantissa2 === Infinity) mantissa2 = 1
            if (mantissa2 >= 1000)
                mantissa2 = mantissa2 / 1000 ** (Math.log10(mantissa2) / 3)
            if (mantissa2 < 10) {
                output =
                    mantissa2.toFixed(3) +
                    "e" +
                    format_num(exponent2, enot, true)
            } else if (mantissa2 < 100) {
                output =
                    mantissa2.toFixed(2) +
                    "e" +
                    format_num(exponent2, enot, true)
            } else {
                output =
                    mantissa2.toFixed(1) +
                    "e" +
                    format_num(exponent2, enot, true)
            }
        }
    }
    if (not === 19) {
        output = "[" + generate_string(num, false) + "]"
    }
    if (not === 22) {
        const dozenal = [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "X",
            "Ԑ",
        ]
        if (num.cmp(12 ** 6) === -1) {
            output = format_num(num.toNumber(), not)
        } else {
            let order6 = Math.floor(num.log(12))
            output =
                dozenal[
                    Math.floor(num.div(Decimal.pow(12, order6)).toNumber()) % 12
                ] +
                "." +
                dozenal[
                    Math.floor(
                        num.div(Decimal.pow(12, order6 - 1)).toNumber()
                    ) % 12
                ] +
                dozenal[
                    Math.floor(
                        num.div(Decimal.pow(12, order6 - 2)).toNumber()
                    ) % 12
                ] +
                dozenal[
                    Math.floor(
                        num.div(Decimal.pow(12, order6 - 3)).toNumber()
                    ) % 12
                ] +
                "e" +
                format_num(order6, not)
        }
    }
    if (num.cmp(Decimal.pow(10, 1.7976931348622053e308)) >= 0 && not !== 9) {
        output = "Infinity"
    }
    if (negative) {
        output = "-" + output
    }
    if (not === 17) {
        output = format_cancer3(num, "number")
    }
    if (not === 18) {
        output = format_cancer4(num)
    }
    if (not === 8) {
        output = "???"
    }
    return output
}

function format_dec(num, not) {
    if (not === undefined) not = 0

    let expn = Math.floor(Math.log10(num))
    if (num / 10 ** expn >= 9.9995 && expn >= 6) num = 10 ** (expn + 1)

    if (not === 8) {
        return "???"
    } else if (not === 10) {
        if (num >= 100) {
            return format_num(Math.round(num), not)
        } else {
            const fraction_array = [
                "",
                "·",
                ":",
                "∴",
                "∷",
                "⁙",
                "S",
                "S·",
                "S:",
                "S∴",
                "S∷",
                "S⁙",
            ]
            let output = format_num(Math.floor(num), not)
            if (Math.floor(num) === 0) {
                if (Math.floor(num * 12) === 0) output = "0"
                else output = ""
            }
            output += fraction_array[Math.floor(num * 12) % 12]

            return output
        }
    } else if (not === 11) {
        if (num >= 64 ** 2) {
            return format_num(Math.round(num), not)
        } else {
            const char_array =
                "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/"
            output = ""

            let exponent = Math.floor(Math.log(num) / Math.log(64))

            for (let i = exponent; i >= 0; i--) {
                output += char_array[Math.floor(num / 64 ** i) % 64]
            }

            if (output === "") output = "0"
            output += "."

            output += char_array[Math.floor(num * 64) % 64]

            if (num < 64) {
                output += char_array[Math.floor(num * 64 ** 2) % 64]
            }
            if (num < 1) {
                output += char_array[Math.floor(num * 64 ** 3) % 64]
            }

            return output
        }
    } else if (not === 14) {
        return format_imperial(num, "decimal")
    } else if (not === 15) {
        let output = format_dec(num, random_notation)
        let output2 = output.replaceAll(
            '<span style="text-decoration:overline">',
            "("
        )
        let output3 = output2.replaceAll("</span>", ")").match(regex)

        output2 = ""
        let index = -1
        for (let i = 0; i < output3.length; i++) {
            index = notation_charlist.indexOf(output3[i])
            if (index === -1) {
                output2 += output3[i]
            } else {
                output2 += random_charlist[index]
            }
        }

        output = output2.replaceAll(
            "(",
            '<span style="text-decoration:overline">'
        )
        output2 = output.replaceAll(")", "</span>")
        return output2
    } else if (not === 17) {
        return format_cancer3(num, "decimal")
    } else if (not === 18) {
        return format_cancer4(num)
    } else if (not === 19) {
        return "[" + generate_string(num, true) + "]"
    } else if (not === 22) {
        const dozenal = [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "X",
            "Ԑ",
        ]
        if (num >= 144) {
            return format_num(Math.round(num), not)
        } else if (num >= 12) {
            return (
                format_num(Math.floor(num), not) +
                "." +
                dozenal[Math.floor(num * 12) % 12]
            )
        } else if (num >= 1) {
            return (
                format_num(Math.floor(num), not) +
                "." +
                dozenal[Math.floor(num * 12) % 12] +
                dozenal[Math.floor(num * 144) % 12]
            )
        } else {
            return (
                format_num(Math.floor(num), not) +
                "." +
                dozenal[Math.floor(num * 12) % 12] +
                dozenal[Math.floor(num * 144) % 12] +
                dozenal[Math.floor(num * 1728) % 12]
            )
        }
    } else {
        if (num >= 100) {
            return format_num(Math.round(num), not)
        } else if (num >= 10) {
            return num.toFixed(1)
        } else if (num >= 1) {
            return num.toFixed(2)
        } else {
            return num.toFixed(3)
        }
    }
}

function format_infdec(num, not, enot) {
    if (not === undefined) not = 0

    let expn = Math.floor(num.log(10))
    if (num.div(Decimal.pow(10, expn)).cmp(9.9995) >= 0 && expn >= 6)
        num = Decimal.pow(10, expn + 1)

    if (num.cmp(1.7976931348622053 * 10 ** 308) === -1) {
        return format_dec(num.toNumber(), not)
    } else {
        return format_inf(num, not, enot)
    }
}

function format_time(input, not, precise) {
    if (not === undefined) not = 2
    let true_not = not
    if (not === 15) not = random_notation
    if (not === 14) not = 2

    var time = input
    if (time < 0) time = 0
    let output = undefined
    if (time < 1) {
        if (precise) {
            if (time < 1e-9) {
                let exponent = Math.floor(Math.log10(time))
                output =
                    (time / 10 ** exponent).toFixed(3) + "e" + exponent + "s"
            } else if (time < 1e-6) {
                output = format_dec(time * 1e9, not) + "ns"
            } else if (time < 0.001) {
                output = format_dec(time * 1000000, not) + "μs"
            } else {
                output = format_dec(time * 1000, not) + "ms"
            }
        } else {
            output = format_dec(time, not) + "s"
        }
    } else if (time < 60) {
        output = format_dec(time, not) + "s"
    } else if (time < 3600) {
        let colon = ":"
        if (time % 60 < 10 && not !== 10 && not !== 11)
            colon = ":" + format_small(0, not)
        output =
            format_num(Math.floor(time / 60), not) +
            colon +
            format_num(Math.floor(time) % 60, not)
    } else if (time < 360000) {
        let colon1 = ":"
        let colon2 = ":"
        if (Math.floor(time / 60) % 60 < 10 && not !== 10 && not !== 11)
            colon1 = ":" + format_small(0, not)
        if (time % 60 < 10 && not !== 10 && not !== 11)
            colon2 = ":" + format_small(0, not)
        output =
            format_num(Math.floor(time / 3600), not) +
            colon1 +
            format_num(Math.floor(time / 60) % 60, not) +
            colon2 +
            format_num(Math.floor(time) % 60, not)
    } else if (time < 31536000) {
        output = format_dec(time / 86400, not) + "d"
    } else {
        output = format_dec(time / 31536000, not) + "yr"
    }

    if (true_not === 15) {
        let output2 = output.replaceAll(
            '<span style="text-decoration:overline">',
            "("
        )
        let output3 = output2.replaceAll("</span>", ")").match(regex)

        output2 = ""
        let index = -1
        for (let i = 0; i < output3.length; i++) {
            index = notation_charlist.indexOf(output3[i])
            if (index === -1) {
                output2 += output3[i]
            } else {
                output2 += random_charlist[index]
            }
        }

        output = output2.replaceAll(
            "(",
            '<span style="text-decoration:overline">'
        )
        output2 = output.replaceAll(")", "</span>")
        output = output2
    }

    if (not === 17) output = format_time_cancer(time, precise)
    if (not === 8) output = "???"
    return output
}

function format_time_long(input, not, speed, precise) {
    if (not === undefined) not = 2
    if (speed === undefined) speed = 1

    var time = input
    if (time < 0) time = 0
    let output = undefined
    if (time < 1 && speed < 480) {
        if (precise) {
            if (time < 1e-9) {
                let exponent = Math.floor(Math.log10(time))
                output =
                    (time / 10 ** exponent).toFixed(3) +
                    "e" +
                    exponent +
                    " seconds"
            } else if (time < 1e-6) {
                output = format_dec(time * 1e9, not) + " nanoseconds"
            } else if (time < 0.001) {
                output = format_dec(time * 1000000, not) + " microseconds"
            } else {
                output = format_dec(time * 1000, not) + " milliseconds"
            }
        } else {
            output = format_dec(time, not) + " seconds"
        }
    } else if (time < 60 && speed < 480) {
        output = format_dec(time, not) + " seconds"
    } else if (time < 3600 && speed < 14400) {
        if (Math.floor(time) % 60 !== 0 && speed < 480)
            output =
                format_num(Math.floor(time / 60), not) +
                " minutes, " +
                format_num(Math.floor(time) % 60, not) +
                " seconds"
        else output = format_num(Math.floor(time / 60), not) + " minutes"
    } else if (time < 86400 && speed < 345600) {
        output = format_num(Math.floor(time / 3600), not) + " hours"
        if (Math.floor(time / 60) % 60 !== 0 && speed < 14400)
            output +=
                ", " + format_num(Math.floor(time / 60) % 60, not) + " minutes"
        if (Math.floor(time) % 60 !== 0 && speed < 480)
            output += ", " + format_num(Math.floor(time) % 60, not) + " seconds"
    } else if (time < 31536000 && speed < 126144000) {
        output = format_num(Math.floor(time / 86400), not) + " days"
        if (Math.floor(time / 3600) % 24 !== 0 && speed < 345600)
            output +=
                ", " + format_num(Math.floor(time / 3600) % 24, not) + " hours"
        if (Math.floor(time / 60) % 60 !== 0 && speed < 14400)
            output +=
                ", " + format_num(Math.floor(time / 60) % 60, not) + " minutes"
        if (Math.floor(time) % 60 !== 0 && speed < 480)
            output += ", " + format_num(Math.floor(time) % 60, not) + " seconds"
    } else {
        if (speed >= 126144000)
            output = format_num(Math.floor(time / 31536000), not) + " years"
        else output = format_small(Math.floor(time / 31536000)) + " years"
        if (Math.floor(time / 86400) % 365 !== 0 && speed < 126144000)
            output +=
                ", " + format_num(Math.floor(time / 86400) % 365, not) + " days"
        if (Math.floor(time / 3600) % 24 !== 0 && speed < 345600)
            output +=
                ", " + format_num(Math.floor(time / 3600) % 24, not) + " hours"
        if (Math.floor(time / 60) % 60 !== 0 && speed < 14400)
            output +=
                ", " + format_num(Math.floor(time / 60) % 60, not) + " minutes"
        if (Math.floor(time) % 60 !== 0 && speed < 480)
            output += ", " + format_num(Math.floor(time) % 60, not) + " seconds"
    }

    if (not === 8) output = "???"
    return output
}
