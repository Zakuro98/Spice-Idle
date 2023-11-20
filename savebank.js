function format_small(num, not) {
    if (not === undefined) not = 0

    if (typeof num === "bigint") {
        num = Number(num)
    }

    let expn = Math.floor(Math.log10(num))
    if (num / 10 ** expn >= 9.9999995 && expn >= 9 && not !== 0)
        num = 10 ** (expn + 1)

    if (not === 10) {
        return format_num(num, 10)
    } else if (not === 11) {
        return format_num(num, 11)
    } else if (not === 14) {
        return format_num(num, 14)
    } else if (not === 15) {
        let output = format_small(num, random_notation)
        let output2 = output.replaceAll(
            '<span style="text-decoration:overline">',
            "("
        )
        output = output2.replaceAll("</span>", ")")

        output2 = ""
        let index = -1
        for (let i = 0; i < output.length; i++) {
            index = notation_charlist.indexOf(output[i])
            if (index === -1) {
                output2 += output[i]
            } else {
                output2 += random_charlist[index]
            }
        }

        output = output2.replaceAll(
            "(",
            '<span style="text-decoration:overline">'
        )
        return output.replaceAll(")", "</span>")
    } else if (not === 17) {
        return format_cancer3(num, "number")
    } else {
        if ((not === 2 && num >= 1e9) || (not === 12 && num >= 1e36)) {
            let mantissa = num / 10 ** Math.floor(Math.log10(num))
            return mantissa.toFixed(6) + "e" + Math.floor(Math.log10(num))
        } else if ((not === 3 && num >= 1e9) || (not === 13 && num >= 1e36)) {
            let exponent = Math.floor(Math.log10(num) / 3) * 3
            let mantissa = num / 10 ** exponent
            if (mantissa < 10) {
                return mantissa.toFixed(6) + "e" + exponent
            } else if (mantissa < 100) {
                return mantissa.toFixed(5) + "e" + exponent
            } else {
                return mantissa.toFixed(4) + "e" + exponent
            }
        } else if (
            (not === 4 && num >= 1e9) ||
            ((not === 12 || not === 13) && num >= 1e9 && num < 1e36)
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
                "Ce",
            ]

            let order = Math.floor(Math.log10(num) / 3) - 1
            let one_str = ""
            let ten_str = ""
            if (order < 10) {
                one_str = single_array_cond[order]
            } else {
                one_str = one_array_cond[order % 10]
                ten_str = ten_array_cond[Math.floor(order / 10)]
            }

            let lead = num / 10 ** (3 * order + 3)
            let lead_str = ""
            if (lead < 10) {
                lead_str = lead.toFixed(6)
            } else if (lead < 100) {
                lead_str = lead.toFixed(5)
            } else {
                lead_str = lead.toFixed(4)
            }

            return lead_str + " " + one_str + ten_str
        } else if (not === 5 && num >= 1e9) {
            return "e" + Math.log10(num).toFixed(6)
        } else if (not === 6 && num >= 1e9) {
            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            let order = Math.floor(Math.log10(num) / 3) - 1
            let lead = num / 10 ** (3 * order + 3)
            let lead_str = ""
            if (lead < 10) {
                lead_str = lead.toFixed(6)
            } else if (lead < 100) {
                lead_str = lead.toFixed(5)
            } else {
                lead_str = lead.toFixed(4)
            }

            output = lead_str + " "

            if (order <= 26) {
                output += alphabet[order - 1]
            } else {
                let letters = []
                let remainder = 0
                let index = 0
                while (order > 26) {
                    remainder = order % 26
                    if (remainder === 0) index = 25
                    else index = remainder - 1
                    letters.push(alphabet[index])
                    order = (order - remainder) / 26
                    if (remainder === 0) order--
                }
                letters.push(alphabet[order - 1])
                output += letters.reverse().join("")
            }

            return output
        } else if (not === 7 && num >= 1e9) {
            const cancer_alphabet =
                "😠🎂🎄💀🍆🐱🌈💯🍦🎃💋😂🌙⛔🐙💩❓😡🙈👍🌂✌😩❌🪀⚡"
            let order = Math.floor(Math.log10(num) / 3) - 1
            let lead = num / 10 ** (3 * order + 3)
            let lead_str = ""
            if (lead < 10) {
                lead_str = lead.toFixed(6)
            } else if (lead < 100) {
                lead_str = lead.toFixed(5)
            } else {
                lead_str = lead.toFixed(4)
            }

            output = lead_str

            if (order <= 26) {
                output += Array.from(cancer_alphabet)[order - 1]
            } else {
                let emoji = []
                let remainder = 0
                let index = 0
                while (order > 26) {
                    remainder = order % 26
                    if (remainder === 0) index = 25
                    else index = remainder - 1
                    emoji.push(Array.from(cancer_alphabet)[index])
                    order = (order - remainder) / 26
                    if (remainder === 0) order--
                }
                emoji.push(Array.from(cancer_alphabet)[order - 1])
                output += emoji.reverse().join("")
            }

            return output
        } else if (not === 9 && num >= 1e9) {
            let exponent = Math.log(num) / Math.log(1.7976931348622053e308)
            return exponent.toFixed(6) + "∞"
        } else if (not === 16 && num >= 1e9) {
            return format_cancer2(num, 6)
        } else {
            return format_num(num, 0)
        }
    }
}

function goto_page(id) {
    document.getElementById("spices_files").style.display = "none"
    document.getElementById("prestige_files").style.display = "none"
    document.getElementById("ascension_files").style.display = "none"
    document.getElementById("collapse_files").style.display = "none"

    document.getElementById("savebank_spices").className =
        "savebank_tab unlocked"
    document.getElementById("savebank_prestige").className =
        "savebank_tab unlocked"
    document.getElementById("savebank_ascension").className =
        "savebank_tab unlocked"
    document.getElementById("savebank_collapse").className =
        "savebank_tab unlocked"

    switch (id) {
        case 0:
            document.getElementById("spices_files").style.display = "block"
            document.getElementById("savebank_spices").className =
                "savebank_tab selected"
            break
        case 1:
            document.getElementById("prestige_files").style.display = "block"
            document.getElementById("savebank_prestige").className =
                "savebank_tab selected"
            break
        case 2:
            document.getElementById("ascension_files").style.display = "block"
            document.getElementById("savebank_ascension").className =
                "savebank_tab selected"
            break
        case 3:
            document.getElementById("collapse_files").style.display = "block"
            document.getElementById("savebank_collapse").className =
                "savebank_tab selected"
            break
    }
}

function copy_file(file) {
    navigator.clipboard.writeText(btoa(file_map.get(file)))
}

function overwrite_file(file) {
    if (
        confirm(
            "Are you sure? This will permanently overwrite your local save file!"
        )
    ) {
        localStorage.setItem("new_spice_idle_save", file_map.get(file))
    }
}

class save_file {
    static files = []

    layer
    desc
    key
    last

    constructor(layer, desc, key, last) {
        this.layer = layer
        this.desc = desc
        this.key = key
        this.last = last

        save_file.files.push(this)

        //entire save file div
        let panel = document.createElement("DIV")
        if (this.last === 1) panel.className = "savebank_panel_last"
        else if (this.last === 2) panel.className = "savebank_panel_connect"
        else panel.className = "savebank_panel"

        //description
        let info = document.createElement("P")
        info.innerHTML = this.desc
        info.className = "savebank_info"

        //buttons div
        let buttons = document.createElement("DIV")

        //copy to clipboard
        let copy = document.createElement("BUTTON")
        copy.innerHTML = "Copy to Clipboard"
        copy.className = "spice_buy"
        copy.addEventListener("click", () => {
            copy_file(this.key)
        })

        //overwrite localstorage
        let local = document.createElement("BUTTON")
        local.innerHTML = "Overwrite Local Save"
        local.className = "spice_buy"
        local.addEventListener("click", () => {
            overwrite_file(this.key)
        })

        //attaching buttons to buttons div
        buttons.appendChild(copy)
        buttons.appendChild(local)

        //attaching everything to entire save file div
        panel.appendChild(info)
        panel.appendChild(buttons)

        //attaching save file to save files page
        switch (this.layer) {
            case "spices":
                document.getElementById("spices_files").appendChild(panel)
                break
            case "prestige":
                document.getElementById("prestige_files").appendChild(panel)
                break
            case "ascension":
                document.getElementById("ascension_files").appendChild(panel)
                break
            case "collapse":
                document.getElementById("collapse_files").appendChild(panel)
                break
        }
    }
}

new save_file(
    "spices",
    "1 color shift done<br>1.619e26 total spice accumulated<br>" +
        format_time_long(1733) +
        " played",
    "shift 1"
)
new save_file(
    "spices",
    "2 color shifts done<br>4.469e53 total spice accumulated<br>" +
        format_time_long(3039) +
        " played",
    "shift 2"
)
new save_file(
    "spices",
    "3 color shifts done<br>1.416e103 total spice accumulated<br>" +
        format_time_long(4201) +
        " played",
    "shift 3"
)
new save_file(
    "spices",
    "4 color shifts done<br>2.358e174 total spice accumulated<br>" +
        format_time_long(5155) +
        " played",
    "shift 4"
)
new save_file(
    "spices",
    "6 color boosts done<br>2.813e256 total spice accumulated<br>" +
        format_time_long(6252) +
        " played",
    "boost 6",
    1
)

new save_file(
    "prestige",
    "1st Prestige completed<br>1.000 μg total rainbow spice<br>1.430e321 total spice accumulated<br>" +
        format_time_long(6801) +
        " played",
    "1st prestige"
)
new save_file(
    "prestige",
    "Pink spice automation unlocked<br>143,637 μg total rainbow spice<br>1.575e3,015 total spice accumulated<br>" +
        format_time_long(11454) +
        " played",
    "pink auto"
)
new save_file(
    "prestige",
    "Crystallized spice unlocked<br>9.345e16 μg total rainbow spice<br>9.649e12,678 total spice accumulated<br>" +
        format_time_long(13972) +
        " played",
    "crystallized"
)
new save_file(
    "prestige",
    "2nd crystal upgrade purchased<br>3.334e24 μg total rainbow spice<br>1.897e20,086 total spice accumulated<br>" +
        format_time_long(28465) +
        " played",
    "crystal 2"
)
new save_file(
    "prestige",
    "4th crystal upgrade purchased<br>3.868e36 μg total rainbow spice<br>3.217e30,085 total spice accumulated<br>" +
        format_time_long(46427) +
        " played",
    "crystal 4"
)
new save_file(
    "prestige",
    "6th crystal upgrade purchased<br>1.466e50 μg total rainbow spice<br>5.836e61,756 total spice accumulated<br>" +
        format_time_long(58555) +
        " played",
    "crystal 6"
)
new save_file(
    "prestige",
    "8th crystal upgrade purchased 3 times<br>8.894e76 μg total rainbow spice<br>7.276e110,206 total spice accumulated<br>" +
        format_time_long(77310) +
        " played",
    "crystal 8"
)
new save_file(
    "prestige",
    "10th crystal upgrade purchased<br>7.156e118 μg total rainbow spice<br>2.660e221,640 total spice accumulated<br>" +
        format_time_long(96265) +
        " played",
    "crystal 10",
    1
)

new save_file(
    "ascension",
    "1st Ascension completed<br>1 ᚫ in total<br>6.272e790,049 total spice accumulated<br>" +
        format_time_long(101287) +
        " played",
    "1st ascend"
)
new save_file(
    "ascension",
    "Ascension automation unlocked<br>23,237 ᚫ in total<br>3.281e2.392e6 total spice accumulated<br>" + //e2,391,960
        format_time_long(116342) +
        " played",
    "ascend auto"
)
new save_file(
    "ascension",
    "Challenge 1 unlocked<br>1.092e7 ᚫ in total<br>2.308e3.718e6 total spice accumulated<br>" + //e3,717,922
        format_time_long(132404) +
        " played",
    "c1 unlocked",
    2
)
new save_file(
    "ascension",
    "Challenge 1 completed<br>" + format_time_long(132807) + " played",
    "c1 complete"
)
new save_file(
    "ascension",
    "Challenge 2 unlocked<br>2.647e21 ᚫ in total<br>1.869e2.415e7 total spice accumulated<br>" + //e24,147,125
        format_time_long(171906) +
        " played",
    "c2 unlocked",
    2
)
new save_file(
    "ascension",
    "Challenge 2 completed<br>2.664e23 ᚫ in total<br>4.244e2.572e7 total spice accumulated<br>" + //e25,722,459
        format_time_long(177203) +
        " played",
    "c2 complete"
)
new save_file(
    "ascension",
    "Challenge 3 unlocked<br>5.351e48 ᚫ in total<br>2.196e5.914e7 total spice accumulated<br>" + //e59,141,518
        format_time_long(193287) +
        " played",
    "c3 unlocked",
    2
)
new save_file(
    "ascension",
    "Challenge 3 completed<br>4.635e52 ᚫ in total<br>2.165e7.989e7 total spice accumulated<br>" + //e79,886,720
        format_time_long(198867) +
        " played",
    "c3 complete"
)
new save_file(
    "ascension",
    "Passive rainbow spice generation unlocked<br>1.405e81 ᚫ in total<br>2.262e1.275e8 total spice accumulated<br>" + //e127,539,045
        format_time_long(204749) +
        " played",
    "passive rainbow"
)
new save_file(
    "ascension",
    "Challenge 4 unlocked<br>6.212e132 ᚫ in total<br>1.860e2.921e8 total spice accumulated<br>" + //e292,130,877
        format_time_long(224585) +
        " played",
    "c4 unlocked",
    2
)
new save_file(
    "ascension",
    "Challenge 4 completed<br>1.356e141 ᚫ in total<br>3.043e3.509e8 total spice accumulated<br>" + //e350,911,541
        format_time_long(235253) +
        " played",
    "c4 complete"
)
new save_file(
    "ascension",
    "Challenge 5 unlocked<br>1.954e257 ᚫ in total<br>7.698e7.463e8 total spice accumulated<br>" + //e746,312,410
        format_time_long(241831) +
        " played",
    "c5 unlocked",
    2
)
new save_file(
    "ascension",
    "Challenge 5 completed<br>2.221e270 ᚫ in total<br>1.784e8.512e8 total spice accumulated<br>" + //e851,188,079
        format_time_long(256161) +
        " played",
    "c5 complete"
)
new save_file(
    "ascension",
    "Challenge 6 unlocked<br>2.164e1,236 ᚫ in total<br>6.796e4.644e9 total spice accumulated<br>" + //e4,644,170,084
        format_time_long(266187) +
        " played",
    "c6 unlocked",
    1
)

new save_file(
    "collapse",
    "1st Collapse completed<br>2,157 total atomic spice<br>3.130e4.679e9 total spice accumulated<br>" + //e4,679,156,777
        format_time_long(278475) +
        " played",
    "1st collapse"
)
new save_file(
    "collapse",
    "Research unlocked<br>17,077 total atomic spice<br>1.987e5.404e9 total spice accumulated<br>" + //e5,404,432,485
        format_time_long(307944) +
        " played",
    "research"
)
new save_file(
    "collapse",
    "Research #6 completed<br>1.144e6 total atomic spice<br>5.226e7.827e9 total spice accumulated<br>" + //e7,826,722,926
        format_time_long(339837) +
        " played",
    "r6 complete"
)
new save_file(
    "collapse",
    "Research #12 completed<br>8.630e8 total atomic spice<br>6.031e9.828e9 total spice accumulated<br>" + //e9,827,581,640
        format_time_long(368627) +
        " played",
    "r12 complete"
)
new save_file(
    "collapse",
    "Research #15 completed<br>9.982e32 total atomic spice<br>3.130e3.519e10 total spice accumulated<br>" + //e35,192,894,235
        format_time_long(453217) +
        " played",
    "r15 complete"
)
new save_file(
    "collapse",
    "Collapse automation unlocked<br>Research #18 completed<br>1.612e79 total atomic spice<br>9.229e9.275e10 total spice accumulated<br>" + //e92,751,522,667
        format_time_long(509166) +
        " played",
    "r18 complete"
)
new save_file(
    "collapse",
    "Challenge 7 unlocked<br>8.525e190 total atomic spice<br>3.172e2.801e11 total spice accumulated<br>" + //e280,113,226,553
        format_time_long(550101) +
        " played",
    "c7 unlocked",
    2
)
new save_file(
    "collapse",
    "1st completion of Challenge 7<br>" + format_time_long(550705) + " played",
    "c7x1 complete"
)
new save_file(
    "collapse",
    "Challenge 8 unlocked<br>1.976e337 total atomic spice<br>5.888e6.739e11 total spice accumulated<br>" + //e673,925,687,614
        format_time_long(561322) +
        " played",
    "c8 unlocked",
    2
)
new save_file(
    "collapse",
    "1st completion of Challenge 8<br>" + format_time_long(561901) + " played",
    "c8x1 complete"
)
new save_file(
    "collapse",
    "Challenge 9 unlocked<br>2.125e716 total atomic spice<br>4.388e1.999e12 total spice accumulated<br>" + //e1,998,900,372,123
        format_time_long(571231) +
        " played",
    "c9 unlocked",
    2
)
new save_file(
    "collapse",
    "1st completion of Challenge 9<br>" +
        format_time_long(571244, 2, 2) +
        " played (game time)<br>" +
        format_time_long(571305) +
        " played (real time)",
    "c9x1 complete"
)
new save_file(
    "collapse",
    "Challenge 10 unlocked<br>1.071e1,649 total atomic spice<br>5.054e9.709e12 total spice accumulated<br>" + //e9,709,246,567,683
        format_time_long(719422, 2, 16) +
        " played (game time)<br>" +
        format_time_long(591610) +
        " played (real time)",
    "c10 unlocked",
    2
)
new save_file(
    "collapse",
    "1st completion of Challenge 10<br>" +
        format_time_long(730587, 2, 16) +
        " played (game time)<br>" +
        format_time_long(592308) +
        " played (real time)",
    "c10x1 complete"
)
new save_file(
    "collapse",
    "Challenge 11 unlocked<br>1.689e4,597 total atomic spice<br>5.054e1.600e14 total spice accumulated<br>" + //e160,015,745,179,367
        format_time_long(34106835, 2, 23040) +
        " played (game time)<br>" +
        format_time_long(608231) +
        " played (real time)",
    "c11 unlocked",
    2
)
new save_file(
    "collapse",
    "1st completion of Challenge 11<br>" +
        format_time_long(34466213, 2, 23040) +
        " played (game time)<br>" +
        format_time_long(608247) +
        " played (real time)",
    "c11x1 complete"
)
new save_file(
    "collapse",
    "Challenge 12 unlocked<br>7.476e12,207 total atomic spice<br>9.038e1.483e15 total spice accumulated<br>" + //e1,483,086,618,677,596
        format_time_long(36856576565, 2, 11612160) +
        " played (game time)<br>" +
        format_time_long(625445) +
        " played (real time)",
    "c12 unlocked",
    2
)
new save_file(
    "collapse",
    "1st completion of Challenge 12<br>9.282e12,701 total atomic spice<br>9.038e1.645e15 total spice accumulated<br>" + //e1,645,152,345,732,208
        format_time_long(39480169289, 2, 11612160) +
        " played (game time)<br>" +
        format_time_long(625751) +
        " played (real time)",
    "c12x1 complete"
)
new save_file(
    "collapse",
    "Research #39 completed<br>2.574e21,565 total atomic spice<br>9.038e1.133e16 total spice accumulated<br>" + //e11,330,110,205,423,380
        format_time_long(1.399182258655952e21, 2, 2.04875958583296e17) +
        " played (game time)<br>" +
        format_time_long(639849) +
        " played (real time)",
    "r39 complete"
)
new save_file(
    "collapse",
    "Rainbow antispice unlocked<br>2.512e34,189 total atomic spice<br>9.038e8.852e16 total spice accumulated<br>" + //e88,518,017,145,209,230
        format_time_long(8.780087367354678e28, 2, 1.985434885546366e25) +
        " played (game time)<br>" +
        format_time_long(685000) +
        " played (real time)",
    "rainbow antispice"
)
new save_file(
    "collapse",
    "End of Collapse<br>2.512e34,189 total atomic spice<br>9.038e4.057e18 total spice accumulated<br>" + //e4,056,950,918,224,931,000
        format_time_long(1.2972000844807418e46, 2, 2.905746276052123e41) +
        " played (game time)<br>" +
        format_time_long(815522) +
        " played (real time)",
    "endgame",
    1
)
