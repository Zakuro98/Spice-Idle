function format_num(num, not, nospace) {
    let negative = false
    let cutoff = 1000000

    if (not === undefined) not = 0

    if (num < 0) {
        negative = true
        num *= -1
    }

    let expn = Math.floor(Math.log10(num))
    if (num / 10 ** expn >= 9.9995) num = 10 ** (expn + 1)

    let output = ""
    if (typeof num === "bigint") {
        output = num.toString()
        if (num >= 1000) {
            let digits = output.length
            if (num < 10 ** 21) {
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
            if (num < 10 ** 21) {
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
                output = "e" + exponent3.toFixed(3)
                break
            case 6:
                const alphabet = [
                    "A",
                    "B",
                    "C",
                    "D",
                    "E",
                    "F",
                    "G",
                    "H",
                    "I",
                    "J",
                    "K",
                    "L",
                    "M",
                    "N",
                    "O",
                    "P",
                    "Q",
                    "R",
                    "S",
                    "T",
                    "U",
                    "V",
                    "W",
                    "X",
                    "Y",
                    "Z",
                    "A",
                ]
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
                order3 -= 1
                if (order3 === 0) {
                    output += "A"
                } else if (order3 > 0) {
                    let index = 0
                    for (
                        let i = Math.floor(Math.log(order3) / Math.log(26));
                        i >= 0;
                        i--
                    ) {
                        index = (Math.floor(order3 / 26 ** i) - 1) % 26
                        if (i === 0) index += 1
                        output += alphabet[index]
                    }
                }
                break
            case 7:
                const cancer_alphabet = [
                    "😠",
                    "🎂",
                    "🎄",
                    "💀",
                    "🍆",
                    "🐱",
                    "🌈",
                    "💯",
                    "🍦",
                    "🎃",
                    "💋",
                    "😂",
                    "🌙",
                    "⛔",
                    "🐙",
                    "💩",
                    "❓",
                    "☢",
                    "🙈",
                    "👍",
                    "☂",
                    "✌",
                    "⚠",
                    "❌",
                    "😋",
                    "⚡",
                    "😠",
                ]
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
                order4 -= 1
                if (order4 === 0) {
                    output += "😠"
                } else if (order4 > 0) {
                    let index2 = 0
                    for (
                        let i = Math.floor(Math.log(order4) / Math.log(26));
                        i >= 0;
                        i--
                    ) {
                        index2 = (Math.floor(order4 / 26 ** i) - 1) % 26
                        if (i === 0) index2 += 1
                        output += cancer_alphabet[index2]
                    }
                }
                break
            case 9:
                let exponent4 =
                    Math.log(num) / Math.log(1.7976931348622053 * 10 ** 308)
                output = exponent4.toFixed(3) + "∞"
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
        const char_array = [
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
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z",
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "o",
            "p",
            "q",
            "r",
            "s",
            "t",
            "u",
            "v",
            "w",
            "x",
            "y",
            "z",
            "+",
            "/",
        ]
        output = ""

        let exponent = Math.floor(Math.log(num) / Math.log(64))

        if (num >= cutoff) {
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
    if ((not === 12 || not === 13) && num < 10 ** 36 && num >= cutoff) {
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
    if (num >= 1.7976931348622053 * 10 ** 308 && not !== 9) {
        output = "∞"
    }
    if (negative) {
        output = "-" + output
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
    if (num.div(Decimal.pow(10, expn)).cmp(9.9995) >= 0)
        num = Decimal.pow(10, expn + 1)

    let output = ""
    if (num.cmp(10 ** 21) === -1) {
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

                let order = Math.floor(num.exponent / 3) - 1
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
                    )
                        if (
                            r_order % 10 === 2 ||
                            r_order % 10 === 8 ||
                            r_order === 80
                        )
                            one_mod = "m"
                        else one_mod = "n"
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
                    if (r_order === 0) one_mod += "t"

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
                let unit_str = one_str + one_mod + ten_str + hundred_str
                let thousand_str = ""
                let million_str = ""
                let billion_str = ""
                let trillion_str = ""
                let quadrillion_str = ""

                if (order >= 1000) {
                    let orderk = Math.floor(order / 1000) % 1000
                    one_str = ""
                    one_mod = ""
                    ten_str = ""
                    hundred_str = ""
                    if (orderk > 1) {
                        one_str = one_array[orderk % 10]
                        ten_str = ten_array[Math.floor(orderk / 10) % 10]
                        hundred_str =
                            hundred_array[Math.floor(orderk / 100) % 10]

                        const r_orderk = Math.floor(orderk / 10)
                        if (
                            (orderk % 10 === 7 || orderk % 10 === 9) &&
                            r_orderk % 10 !== 9 &&
                            r_orderk !== 90
                        )
                            if (
                                r_orderk % 10 === 2 ||
                                r_orderk % 10 === 8 ||
                                r_orderk === 80
                            )
                                one_mod = "m"
                            else one_mod = "n"
                        if (
                            (orderk % 10 === 3 || orderk % 10 === 6) &&
                            ((r_orderk >= 2 && r_orderk <= 5) ||
                                r_orderk % 10 === 8 ||
                                r_orderk === 10 ||
                                r_orderk === 30 ||
                                r_orderk === 40 ||
                                r_orderk === 50 ||
                                r_orderk === 80)
                        )
                            one_mod = "s"
                        if (
                            orderk % 10 === 6 &&
                            (r_orderk % 10 === 8 ||
                                r_orderk === 10 ||
                                r_orderk === 80)
                        )
                            one_mod = "x"

                        if (
                            Math.floor(orderk / 100) % 10 !== 0 &&
                            Math.floor(orderk / 10) % 10 >= 1
                        ) {
                            if (Math.floor(orderk / 10) % 10 <= 2) {
                                ten_str += "i"
                            } else {
                                ten_str += "a"
                            }
                        }
                    }

                    if (orderk !== 0) {
                        thousand_str =
                            one_str + one_mod + ten_str + hundred_str + "milli"
                        if (unit_str === "") thousand_str += "n"
                    }
                }

                if (order >= 1000000) {
                    let orderm = Math.floor(order / 1000000)
                    one_str = ""
                    one_mod = ""
                    ten_str = ""
                    hundred_str = ""
                    if (orderm > 1) {
                        one_str = one_array[orderm % 10]
                        ten_str = ten_array[Math.floor(orderm / 10) % 10]
                        hundred_str =
                            hundred_array[Math.floor(orderm / 100) % 10]

                        const r_orderm = Math.floor(orderm / 10)
                        if (
                            (orderm % 10 === 7 || orderm % 10 === 9) &&
                            r_orderm % 10 !== 9 &&
                            r_orderm !== 90
                        )
                            if (
                                r_orderm % 10 === 2 ||
                                r_orderm % 10 === 8 ||
                                r_orderm === 80
                            )
                                one_mod = "m"
                            else one_mod = "n"
                        if (
                            (orderm % 10 === 3 || orderm % 10 === 6) &&
                            ((r_orderm >= 2 && r_orderm <= 5) ||
                                r_orderm % 10 === 8 ||
                                r_orderm === 10 ||
                                r_orderm === 30 ||
                                r_orderm === 40 ||
                                r_orderm === 50 ||
                                r_orderm === 80)
                        )
                            one_mod = "s"
                        if (
                            orderm % 10 === 6 &&
                            (r_orderm % 10 === 8 ||
                                r_orderm === 10 ||
                                r_orderm === 80)
                        )
                            one_mod = "x"

                        if (
                            Math.floor(orderm / 100) % 10 !== 0 &&
                            Math.floor(orderm / 10) % 10 >= 1
                        ) {
                            if (Math.floor(orderm / 10) % 10 <= 2) {
                                ten_str += "i"
                            } else {
                                ten_str += "a"
                            }
                        }
                    }

                    if (orderm !== 0) {
                        million_str =
                            one_str + one_mod + ten_str + hundred_str + "micri"
                        if (unit_str === "" && thousand_str === "")
                            million_str += "n"
                    }
                }

                if (order >= 1000000000) {
                    let orderb = Math.floor(order / 1000000000)
                    one_str = ""
                    one_mod = ""
                    ten_str = ""
                    hundred_str = ""
                    if (orderb > 1) {
                        one_str = one_array[orderb % 10]
                        ten_str = ten_array[Math.floor(orderb / 10) % 10]
                        hundred_str =
                            hundred_array[Math.floor(orderb / 100) % 10]

                        const r_orderb = Math.floor(orderb / 10)
                        if (
                            (orderb % 10 === 7 || orderb % 10 === 9) &&
                            r_orderb % 10 !== 9 &&
                            r_orderb !== 90
                        )
                            if (
                                r_orderb % 10 === 2 ||
                                r_orderb % 10 === 8 ||
                                r_orderb === 80
                            )
                                one_mod = "m"
                            else one_mod = "n"
                        if (
                            (orderb % 10 === 3 || orderb % 10 === 6) &&
                            ((r_orderb >= 2 && r_orderb <= 5) ||
                                r_orderb % 10 === 8 ||
                                r_orderb === 10 ||
                                r_orderb === 30 ||
                                r_orderb === 40 ||
                                r_orderb === 50 ||
                                r_orderb === 80)
                        )
                            one_mod = "s"
                        if (
                            orderb % 10 === 6 &&
                            (r_orderb % 10 === 8 ||
                                r_orderb === 10 ||
                                r_orderb === 80)
                        )
                            one_mod = "x"

                        if (
                            Math.floor(orderb / 100) % 10 !== 0 &&
                            Math.floor(orderb / 10) % 10 >= 1
                        ) {
                            if (Math.floor(orderb / 10) % 10 <= 2) {
                                ten_str += "i"
                            } else {
                                ten_str += "a"
                            }
                        }
                    }

                    if (orderb !== 0) {
                        billion_str =
                            one_str + one_mod + ten_str + hundred_str + "nani"
                        if (
                            unit_str === "" &&
                            thousand_str === "" &&
                            million_str === ""
                        )
                            billion_str += "n"
                    }
                }

                if (order >= 10 ** 12) {
                    let ordert = Math.floor(order / 10 ** 12)
                    one_str = ""
                    one_mod = ""
                    ten_str = ""
                    hundred_str = ""
                    if (ordert > 1) {
                        one_str = one_array[ordert % 10]
                        ten_str = ten_array[Math.floor(ordert / 10) % 10]
                        hundred_str =
                            hundred_array[Math.floor(ordert / 100) % 10]

                        const r_ordert = Math.floor(ordert / 10)
                        if (
                            (ordert % 10 === 7 || ordert % 10 === 9) &&
                            r_ordert % 10 !== 9 &&
                            r_ordert !== 90
                        )
                            if (
                                r_ordert % 10 === 2 ||
                                r_ordert % 10 === 8 ||
                                r_ordert === 80
                            )
                                one_mod = "m"
                            else one_mod = "n"
                        if (
                            (ordert % 10 === 3 || ordert % 10 === 6) &&
                            ((r_ordert >= 2 && r_ordert <= 5) ||
                                r_ordert % 10 === 8 ||
                                r_ordert === 10 ||
                                r_ordert === 30 ||
                                r_ordert === 40 ||
                                r_ordert === 50 ||
                                r_ordert === 80)
                        )
                            one_mod = "s"
                        if (
                            ordert % 10 === 6 &&
                            (r_ordert % 10 === 8 ||
                                r_ordert === 10 ||
                                r_ordert === 80)
                        )
                            one_mod = "x"

                        if (
                            Math.floor(ordert / 100) % 10 !== 0 &&
                            Math.floor(ordert / 10) % 10 >= 1
                        ) {
                            if (Math.floor(ordert / 10) % 10 <= 2) {
                                ten_str += "i"
                            } else {
                                ten_str += "a"
                            }
                        }
                    }

                    if (ordert !== 0) {
                        trillion_str =
                            one_str + one_mod + ten_str + hundred_str + "pici"
                        if (
                            unit_str === "" &&
                            thousand_str === "" &&
                            million_str === "" &&
                            billion_str === ""
                        )
                            trillion_str += "n"
                    }
                }

                if (order >= 10 ** 15) {
                    let orderqa = Math.floor(order / 10 ** 15)
                    one_str = ""
                    one_mod = ""
                    ten_str = ""
                    hundred_str = ""
                    if (orderqa > 1) {
                        one_str = one_array[orderqa % 10]
                        ten_str = ten_array[Math.floor(orderqa / 10) % 10]
                        hundred_str =
                            hundred_array[Math.floor(orderqa / 100) % 10]

                        const r_orderqa = Math.floor(orderqa / 10)
                        if (
                            (orderqa % 10 === 7 || orderqa % 10 === 9) &&
                            r_orderqa % 10 !== 9 &&
                            r_orderqa !== 90
                        )
                            if (
                                r_orderqa % 10 === 2 ||
                                r_orderqa % 10 === 8 ||
                                r_orderqa === 80
                            )
                                one_mod = "m"
                            else one_mod = "n"
                        if (
                            (orderqa % 10 === 3 || orderqa % 10 === 6) &&
                            ((r_orderqa >= 2 && r_orderqa <= 5) ||
                                r_orderqa % 10 === 8 ||
                                r_orderqa === 10 ||
                                r_orderqa === 30 ||
                                r_orderqa === 40 ||
                                r_orderqa === 50 ||
                                r_orderqa === 80)
                        )
                            one_mod = "s"
                        if (
                            orderqa % 10 === 6 &&
                            (r_orderqa % 10 === 8 ||
                                r_orderqa === 10 ||
                                r_orderqa === 80)
                        )
                            one_mod = "x"

                        if (
                            Math.floor(orderqa / 100) % 10 !== 0 &&
                            Math.floor(orderqa / 10) % 10 >= 1
                        ) {
                            if (Math.floor(orderqa / 10) % 10 <= 2) {
                                ten_str += "i"
                            } else {
                                ten_str += "a"
                            }
                        }
                    }

                    if (orderqa !== 0) {
                        quadrillion_str =
                            one_str + one_mod + ten_str + hundred_str + "femti"
                        if (
                            unit_str === "" &&
                            thousand_str === "" &&
                            million_str === "" &&
                            billion_str === "" &&
                            trillion_str === ""
                        )
                            quadrillion_str += "n"
                    }
                }

                let lead = num
                    .div(new Decimal(10).pow(3 * order + 3))
                    .toNumber()
                let lead_str = ""
                if (lead < 10) {
                    lead_str = lead.toFixed(3)
                } else if (lead < 100) {
                    lead_str = lead.toFixed(2)
                } else {
                    lead_str = lead.toFixed(1)
                }

                output =
                    lead_str +
                    " " +
                    quadrillion_str +
                    trillion_str +
                    billion_str +
                    million_str +
                    thousand_str +
                    unit_str +
                    "illion"
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

                let order2 = Math.floor(num.exponent / 3) - 1
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
                let unit_str2 = one_str2 + ten_str2 + hundred_str2
                let thousand_str2 = ""
                let million_str2 = ""
                let billion_str2 = ""
                let trillion_str2 = ""
                let quadrillion_str2 = ""

                if (order2 >= 1000) {
                    let order2k = Math.floor(order2 / 1000) % 1000
                    one_str2 = ""
                    ten_str2 = ""
                    hundred_str2 = ""

                    if (order2k > 1) {
                        one_str2 = one_array_cond[order2k % 10]
                        ten_str2 = ten_array_cond[Math.floor(order2k / 10) % 10]
                        hundred_str2 =
                            hundred_array_cond[Math.floor(order2k / 100) % 10]
                    }
                    if (order2k !== 0) {
                        thousand_str2 =
                            one_str2 + ten_str2 + hundred_str2 + "MI"
                        if (unit_str2 !== "") thousand_str2 += "-"
                    }
                }

                if (order2 >= 1000000) {
                    let order2m = Math.floor(order2 / 1000000)
                    one_str2 = ""
                    ten_str2 = ""
                    hundred_str2 = ""

                    if (order2m > 1) {
                        one_str2 = one_array_cond[order2m % 10]
                        ten_str2 = ten_array_cond[Math.floor(order2m / 10) % 10]
                        hundred_str2 =
                            hundred_array_cond[Math.floor(order2m / 100) % 10]
                    }
                    million_str2 = one_str2 + ten_str2 + hundred_str2 + "MC"
                    if (unit_str2 !== "" || thousand_str2 !== "")
                        million_str2 += "-"
                }

                if (order2 >= 1000000000) {
                    let order2b = Math.floor(order2 / 1000000000)
                    one_str2 = ""
                    ten_str2 = ""
                    hundred_str2 = ""

                    if (order2b > 1) {
                        one_str2 = one_array_cond[order2b % 10]
                        ten_str2 = ten_array_cond[Math.floor(order2b / 10) % 10]
                        hundred_str2 =
                            hundred_array_cond[Math.floor(order2b / 100) % 10]
                    }
                    billion_str2 = one_str2 + ten_str2 + hundred_str2 + "NA"
                    if (
                        unit_str2 !== "" ||
                        thousand_str2 !== "" ||
                        million_str2 !== ""
                    )
                        billion_str2 += "-"
                }

                if (order2 >= 10 ** 12) {
                    let order2t = Math.floor(order2 / 10 ** 12)
                    one_str2 = ""
                    ten_str2 = ""
                    hundred_str2 = ""

                    if (order2t > 1) {
                        one_str2 = one_array_cond[order2t % 10]
                        ten_str2 = ten_array_cond[Math.floor(order2t / 10) % 10]
                        hundred_str2 =
                            hundred_array_cond[Math.floor(order2t / 100) % 10]
                    }
                    trillion_str2 = one_str2 + ten_str2 + hundred_str2 + "PC"
                    if (
                        unit_str2 !== "" ||
                        thousand_str2 !== "" ||
                        million_str2 !== "" ||
                        billion_str2 !== ""
                    )
                        trillion_str2 += "-"
                }

                if (order2 >= 10 ** 15) {
                    let order2qa = Math.floor(order2 / 10 ** 15)
                    one_str2 = ""
                    ten_str2 = ""
                    hundred_str2 = ""

                    if (order2qa > 1) {
                        one_str2 = one_array_cond[order2qa % 10]
                        ten_str2 =
                            ten_array_cond[Math.floor(order2qa / 10) % 10]
                        hundred_str2 =
                            hundred_array_cond[Math.floor(order2qa / 100) % 10]
                    }
                    quadrillion_str2 = one_str2 + ten_str2 + hundred_str2 + "FM"
                    if (
                        unit_str2 !== "" ||
                        thousand_str2 !== "" ||
                        million_str2 !== "" ||
                        billion_str2 !== "" ||
                        trillion_str2 !== ""
                    )
                        quadrillion_str2 += "-"
                }

                let lead2 = num
                    .div(new Decimal(10).pow(3 * order2 + 3))
                    .toNumber()
                let lead_str2 = ""
                if (lead2 < 10) {
                    lead_str2 = lead2.toFixed(3)
                } else if (lead2 < 100) {
                    lead_str2 = lead2.toFixed(2)
                } else {
                    lead_str2 = lead2.toFixed(1)
                }

                output =
                    lead_str2 +
                    " " +
                    quadrillion_str2 +
                    trillion_str2 +
                    billion_str2 +
                    million_str2 +
                    thousand_str2 +
                    unit_str2
                break
            case 5:
                let exponent3 = num.log10()
                output = "e" + exponent3.toFixed(3)

                if (enot === 0 || exponent3 < cutoff) {
                    let decimal = (exponent3 - Math.floor(exponent3)).toFixed(3)
                    output =
                        "e" +
                        format_num(Math.floor(exponent3), 0) +
                        decimal.substr(1)
                } else {
                    output = "e" + format_num(exponent3, enot, true)
                }
                break
            case 6:
                const alphabet = [
                    "A",
                    "B",
                    "C",
                    "D",
                    "E",
                    "F",
                    "G",
                    "H",
                    "I",
                    "J",
                    "K",
                    "L",
                    "M",
                    "N",
                    "O",
                    "P",
                    "Q",
                    "R",
                    "S",
                    "T",
                    "U",
                    "V",
                    "W",
                    "X",
                    "Y",
                    "Z",
                    "A",
                ]
                let order3 = Math.floor(num.exponent / 3) - 1
                let lead3 = num
                    .div(new Decimal(10).pow(3 * order3 + 3))
                    .toNumber()
                let lead_str3 = ""
                if (lead3 < 10) {
                    lead_str3 = lead3.toFixed(3)
                } else if (lead3 < 100) {
                    lead_str3 = lead3.toFixed(2)
                } else {
                    lead_str3 = lead3.toFixed(1)
                }

                output = lead_str3 + " "
                order3 -= 1
                if (order3 === 0) {
                    output += "A"
                } else if (order3 > 0) {
                    let index = 0
                    for (
                        let i = Math.floor(Math.log(order3) / Math.log(26));
                        i >= 0;
                        i--
                    ) {
                        index = (Math.floor(order3 / 26 ** i) - 1) % 26
                        if (i === 0) index += 1
                        output += alphabet[index]
                    }
                }
                break
            case 7:
                const cancer_alphabet = [
                    "😠",
                    "🎂",
                    "🎄",
                    "💀",
                    "🍆",
                    "🐱",
                    "🌈",
                    "💯",
                    "🍦",
                    "🎃",
                    "💋",
                    "😂",
                    "🌙",
                    "⛔",
                    "🐙",
                    "💩",
                    "❓",
                    "☢",
                    "🙈",
                    "👍",
                    "☂",
                    "✌",
                    "⚠",
                    "❌",
                    "😋",
                    "⚡",
                    "😠",
                ]
                let order4 = Math.floor(num.exponent / 3) - 1
                let lead4 = num
                    .div(new Decimal(10).pow(3 * order4 + 3))
                    .toNumber()
                let lead_str4 = ""
                if (lead4 < 10) {
                    lead_str4 = lead4.toFixed(3)
                } else if (lead4 < 100) {
                    lead_str4 = lead4.toFixed(2)
                } else {
                    lead_str4 = lead4.toFixed(1)
                }

                output = lead_str4
                order4 -= 1
                if (order4 === 0) {
                    output += "😠"
                } else if (order4 > 0) {
                    let index2 = 0
                    for (
                        let i = Math.floor(Math.log(order4) / Math.log(26));
                        i >= 0;
                        i--
                    ) {
                        index2 = (Math.floor(order4 / 26 ** i) - 1) % 26
                        if (i === 0) index2 += 1
                        output += cancer_alphabet[index2]
                    }
                }
                break
            case 9:
                let exponent4 = num.log(1.7976931348622053 * 10 ** 308)
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
        const char_array = [
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
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z",
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "o",
            "p",
            "q",
            "r",
            "s",
            "t",
            "u",
            "v",
            "w",
            "x",
            "y",
            "z",
            "+",
            "/",
        ]
        output = ""

        let exponent = Math.floor(num.log(64))

        if (num.cmp(cutoff) === 1 || num.cmp(cutoff) === 0) {
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
            let exponent2 = Math.floor(Math.log(exponent) / Math.log(64))
            for (let i = exponent2; i >= 0; i--) {
                output += char_array[Math.floor(exponent / 64 ** i) % 64]
            }
        } else {
            let num2 = num.toNumber()
            for (let i = exponent; i >= 0; i--) {
                output += char_array[Math.floor(num2 / 64 ** i) % 64]
            }
        }

        if (output === "") output = "0"
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
    if (negative) {
        output = "-" + output
    }
    if (not === 8) {
        output = "???"
    }
    return output
}

function format_dec(num, not) {
    if (not === undefined) not = 0

    let expn = Math.floor(Math.log10(num))
    if (num / 10 ** expn >= 9.9995) num = 10 ** (expn + 1)

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
            const char_array = [
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
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K",
                "L",
                "M",
                "N",
                "O",
                "P",
                "Q",
                "R",
                "S",
                "T",
                "U",
                "V",
                "W",
                "X",
                "Y",
                "Z",
                "a",
                "b",
                "c",
                "d",
                "e",
                "f",
                "g",
                "h",
                "i",
                "j",
                "k",
                "l",
                "m",
                "n",
                "o",
                "p",
                "q",
                "r",
                "s",
                "t",
                "u",
                "v",
                "w",
                "x",
                "y",
                "z",
                "+",
                "/",
            ]
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
    if (num.div(Decimal.pow(10, expn)).cmp(9.9995) >= 0)
        num = Decimal.pow(10, expn + 1)

    if (num.cmp(1.7976931348622053 * 10 ** 308) === -1) {
        return format_dec(num.toNumber(), not)
    } else {
        return format_inf(num, not, enot)
    }
}

function format_time(input, not, precise) {
    if (not === undefined) not = 0

    var time = input
    let output = undefined
    if (time < 1) {
        if (precise) {
            if (time < 10 ** -6) {
                output = format_dec(time * 10 ** 9, 0) + "ns"
            } else if (time < 0.001) {
                output = format_dec(time * 1000000, 0) + "μs"
            } else {
                output = format_dec(time * 1000, 0) + "ms"
            }
        } else {
            output = time.toFixed(3) + "s"
        }
    } else if (time < 10) {
        output = time.toFixed(2) + "s"
    } else if (time < 60) {
        output = time.toFixed(1) + "s"
    } else if (time < 3600) {
        let colon = ":"
        if (time % 60 < 10) colon = ":0"
        output = Math.floor(time / 60) + colon + (Math.floor(time) % 60)
    } else if (time < 360000) {
        let colon1 = ":"
        let colon2 = ":"
        if (Math.floor(time / 60) % 60 < 10) colon1 = ":0"
        if (time % 60 < 10) colon2 = ":0"
        output =
            Math.floor(time / 3600) +
            colon1 +
            (Math.floor(time / 60) % 60) +
            colon2 +
            (Math.floor(time) % 60)
    } else if (time < 31536000) {
        output = format_dec(time / 86400, 0) + "d"
    } else {
        output = format_dec(time / 31536000, game.notation) + "yr"
    }

    if (not === 8) output = "???"
    return output
}

function format_time_long(input, not, precise) {
    if (not === undefined) not = 0

    var time = input
    let output = undefined
    if (time < 1) {
        if (precise) {
            if (time < 10 ** -6) {
                output = format_dec(time * 10 ** 9, 0) + " nanoseconds"
            } else if (time < 0.001) {
                output = format_dec(time * 1000000, 0) + " microseconds"
            } else {
                output = format_dec(time * 1000, 0) + " milliseconds"
            }
        } else {
            output = time.toFixed(3) + " seconds"
        }
    } else if (time < 10) {
        output = time.toFixed(2) + " seconds"
    } else if (time < 60) {
        output = time.toFixed(1) + " seconds"
    } else if (time < 3600) {
        if (Math.floor(time) % 60 !== 0)
            output =
                Math.floor(time / 60) +
                " minutes, " +
                (Math.floor(time) % 60) +
                " seconds"
        else output = Math.floor(time / 60) + " minutes"
    } else if (time < 86400) {
        output = Math.floor(time / 3600) + " hours"
        if (Math.floor(time / 60) % 60 !== 0)
            output += ", " + (Math.floor(time / 60) % 60) + " minutes"
        if (Math.floor(time) % 60 !== 0)
            output += ", " + (Math.floor(time) % 60) + " seconds"
    } else if (time < 31536000) {
        output = Math.floor(time / 86400) + " days"
        if (Math.floor(time / 3600) % 24 !== 0)
            output += ", " + (Math.floor(time / 3600) % 24) + " hours"
        if (Math.floor(time / 60) % 60 !== 0)
            output += ", " + (Math.floor(time / 60) % 60) + " minutes"
        if (Math.floor(time) % 60 !== 0)
            output += ", " + (Math.floor(time) % 60) + " seconds"
    } else if (time < 315360000) {
        output = Math.floor(time / 31536000) + " years"
        if (Math.floor(time / 86400) % 365 !== 0)
            output += ", " + (Math.floor(time / 86400) % 365) + " days"
        if (Math.floor(time / 3600) % 24 !== 0)
            output += ", " + (Math.floor(time / 3600) % 24) + " hours"
        if (Math.floor(time / 60) % 60 !== 0)
            output += ", " + (Math.floor(time / 60) % 60) + " minutes"
    } else if (time < 3153600000) {
        output = Math.floor(time / 31536000) + " years"
        if (Math.floor(time / 86400) % 365 !== 0)
            output += ", " + (Math.floor(time / 86400) % 365) + " days"
        if (Math.floor(time / 3600) % 24 !== 0)
            output += ", " + (Math.floor(time / 3600) % 24) + " hours"
    } else if (time < 315360000000) {
        output = format_num(Math.floor(time / 31536000), 0) + " years"
        if (Math.floor(time / 86400) % 365 !== 0)
            output += ", " + (Math.floor(time / 86400) % 365) + " days"
    } else {
        output =
            format_num(Math.floor(time / 31536000), game.notation) + " years"
    }

    if (not === 8) output = "???"
    return output
}
