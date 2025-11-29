Decimal.precision = 50

BigInt.prototype.toJSON = function () {
    return this.toString()
}

const phi = (1 + 5 ** 0.5) / 2

function fib(n, inf) {
    if (inf)
        return Decimal.pow(phi, n)
            .div(5 ** 0.5)
            .round()
    else return Math.round(phi ** n / 5 ** 0.5)
}

//initializing game variables
let game = {
    version: "1.8.4",

    tickspeed: 100,
    gamespeed: 1,
    seed: Array.from(crypto.getRandomValues(new Int32Array(4))),
    new_generation: true,

    notation: 2,
    hotkeys: true,
    condensed: false,
    ascend_confirm: true,
    challenge_confirm: true,
    exponent_notation: 0,
    high_visibility: false,
    refresh_rate: 20,
    offline_progress: true,
    offline_speed: 1,
    collapse_confirm: true,
    collider_animation: true,
    resource_efficiency: false,
    reduce_flashing: false,
    realtime_production: false,
    antispice_confirm: true,
    expand_confirm: true,
    fancy_realms: true,

    entry_hidden: new Array(23).fill(false),
    compendium_new: false,

    global_spice_boost: new Decimal(1),

    red_spice: new Decimal(5),
    total_red_spice: new Decimal(5),
    red_spice_gen: [
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
    ],
    red_spice_price: [
        new Decimal(5),
        new Decimal(150),
        new Decimal(30000),
        new Decimal(4.5e8),
        new Decimal(6e13),
        new Decimal(9e20),
    ],
    red_spice_bought: [0n, 0n, 0n, 0n, 0n, 0n],
    red_spice_boost: [
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
    ],
    total_red_spice_boost: [
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
    ],

    red_strengthener: 0,
    red_strengthener_price: new Decimal(1000000),

    yellow_spice: new Decimal(5),
    total_yellow_spice: new Decimal(5),
    yellow_spice_gen: [
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
    ],
    yellow_spice_price: [
        new Decimal(5),
        new Decimal(250),
        new Decimal(60000),
        new Decimal(2e9),
        new Decimal(3e14),
        new Decimal(5.5e21),
    ],
    yellow_spice_bought: [0n, 0n, 0n, 0n, 0n, 0n],
    yellow_spice_boost: [
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
    ],
    total_yellow_spice_boost: [
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
    ],

    yellow_strengthener: 0,
    yellow_strengthener_price: new Decimal(3000000),

    green_spice: new Decimal(5),
    total_green_spice: new Decimal(5),
    green_spice_gen: [
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
    ],
    green_spice_price: [
        new Decimal(5),
        new Decimal(350),
        new Decimal(100000),
        new Decimal(7e9),
        new Decimal(1.5e15),
        new Decimal(3e22),
    ],
    green_spice_bought: [0n, 0n, 0n, 0n, 0n, 0n],
    green_spice_boost: [
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
    ],
    total_green_spice_boost: [
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
    ],

    green_strengthener: 0,
    green_strengthener_price: new Decimal(9000000),

    blue_spice: new Decimal(5),
    total_blue_spice: new Decimal(5),
    blue_spice_gen: [
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
    ],
    blue_spice_price: [
        new Decimal(5),
        new Decimal(500),
        new Decimal(250000),
        new Decimal(3e10),
        new Decimal(7.5e15),
        new Decimal(2e23),
    ],
    blue_spice_bought: [0n, 0n, 0n, 0n, 0n, 0n],
    blue_spice_boost: [
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
    ],
    total_blue_spice_boost: [
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
    ],

    blue_strengthener: 0,
    blue_strengthener_price: new Decimal(2.5e7),

    pink_spice: new Decimal(5),
    total_pink_spice: new Decimal(5),
    pink_spice_gen: [
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
    ],
    pink_spice_price: [
        new Decimal(5),
        new Decimal(750),
        new Decimal(500000),
        new Decimal(1e11),
        new Decimal(4e16),
        new Decimal(1e24),
    ],
    pink_spice_bought: [0n, 0n, 0n, 0n, 0n, 0n],
    pink_spice_boost: [
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
    ],
    total_pink_spice_boost: [
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
    ],

    pink_strengthener: 0,
    pink_strengthener_price: new Decimal(8e7),

    total_spice: new Decimal(5),
    collapse_spice: new Decimal(5),
    expand_spice: new Decimal(5),
    total_time_played: 0,

    color_boosts: 0,
    tab: 0,
    subtab: [0, 0, 0, 0, 0, 0],
    statistics_unit: [0, 0, 0, 0],
    statistics_time: 0,
    autosp_toggle: new Array(5).fill(false),
    autocb_toggle: false,

    prestige: 0,
    rainbow_spice: new Decimal(0),
    prestige_bought: new Array(26).fill(0),
    prestige_time_played: 0,

    prestige_amount_history: new Array(10).fill(-1),
    prestige_time_history: new Array(10).fill(-1),
    prestige_real_time_history: new Array(10).fill(-1),
    prestige_stat_history: new Array(10).fill(-1),
    best_prestige_rate: 0,
    passive_prestige: 0,

    crystal_spice: new Decimal(0),
    total_crystal_spice: new Decimal(0),
    crystal_spice_gen: [
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
    ],
    crystal_spice_price: [
        Decimal.pow(2, 56),
        Decimal.pow(2, 62),
        Decimal.pow(2, 68),
        Decimal.pow(2, 84),
        Decimal.pow(2, 100),
        Decimal.pow(2, 124),
    ],
    crystal_spice_bought: [0n, 0n, 0n, 0n, 0n, 0n],
    crystal_spice_boost: [
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
    ],
    total_crystal_spice_boost: [
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
    ],

    crystal_strengthener: 0,
    crystal_strengthener_price: Decimal.pow(2, 76),

    crystal_infusion: 0n,
    crystal_infusion_price: new Decimal(10),
    autoin_toggle: false,

    autopr_toggle: false,
    autopr_mode: 0,
    autopr_goal: [10, new Decimal(1), 30],
    autopr_delta: [5, new Decimal(10)],
    autopr_goal2: [0, new Decimal(1)],

    ascend: 0,
    ansuz: new Decimal(0),
    rune: [new Decimal(0), new Decimal(0), new Decimal(0)],
    rune_power: [new Decimal(0), new Decimal(0), new Decimal(0)],
    total_rune_power: new Decimal(0),
    rune_boost: [new Decimal(1), new Decimal(1), new Decimal(1)],
    distribute_unlocked: false,
    half_distribute_unlocked: false,

    ascend_bought: new Array(35).fill(false),
    autoup_toggle: [false, false],
    autocr_toggle: false,

    autoas_toggle: false,
    autoas_mode: 0,
    autoas_c11: false,
    autoas_goal: [new Decimal(1), 30],
    autoas_delta: new Decimal(5),
    autoas_goal2: new Decimal(1),

    ascend_amount_history: new Array(10).fill(-1),
    ascend_time_history: new Array(10).fill(-1),
    ascend_real_time_history: new Array(10).fill(-1),
    ascend_challenge_history: new Array(10).fill(-1),
    ascend_stat_history: new Array(10).fill(-1),
    best_ascend_rate: 0,
    passive_ascend: 0,

    ascend_time_played: 0,

    ascend_challenge: 0,
    ascend_complete: new Array(6).fill(false),

    arcane_spice: new Decimal(0),
    total_arcane_spice: new Decimal(0),
    arcane_spice_gen: [
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
    ],
    arcane_spice_price: [
        new Decimal(531441),
        Decimal.pow(3, 16),
        Decimal.pow(3, 20),
        Decimal.pow(3, 36),
        Decimal.pow(3, 73),
        Decimal.pow(3, 107),
    ],
    arcane_spice_bought: [0n, 0n, 0n, 0n, 0n, 0n],
    arcane_spice_boost: [
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
    ],
    total_arcane_spice_boost: [
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
    ],
    arcane_unlocked: [true, false, false, false, false, false],
    arcane_max_unlocked: false,

    arcane_strengthener: 0,
    arcane_strengthener_price: Decimal.pow(3, 24),

    arcane_enchantment: 0n,
    free_enchantment: 0n,
    arcane_enchantment_price: new Decimal(25),
    autoen_toggle: false,

    ascend_challenge_timer: 0,

    collapse: 0,
    atomic_spice: new Decimal(0),
    unstable_spice: new Decimal(0),
    total_unstable_spice: new Decimal(0),
    decayed_spice: new Decimal(0),
    decay_time: 0,
    unstable_boost: new Decimal(1),

    halflife: 1800,
    atomic_efficiency: 0.6,
    atomic_portion: 1,
    atomic_timing: 1,
    atomic_timer: 0,

    collapse_amount_history: new Array(10).fill(-1),
    collapse_time_history: new Array(10).fill(-1),
    collapse_real_time_history: new Array(10).fill(-1),
    collapse_challenge_history: new Array(10).fill(-1),
    collapse_stat_history: new Array(10).fill(-1),
    best_collapse_rate: 0,
    passive_collapse: 0,

    collapse_time_played: 0,

    research_view: 0,
    research_select: 0,
    research_pause: true,
    research_complete: new Array(40).fill(0),
    data: new Array(40).fill(0),
    data_boosts: 0,

    autods_toggle: false,
    autods_portion: 0.5,
    autods_budget: new Decimal(0),

    autoar_toggle: false,

    autoco_toggle: false,
    autoco_mode: 0,
    autoco_goal: [new Decimal(1e50), 120, 10],
    autoco_delta: new Decimal(1e10),
    autoco_goal2: new Decimal(1),

    autosc_toggle: false,

    collapse_challenge: 0,
    collapse_complete: new Array(6).fill(0),
    pending_completions: 0,
    pending_goal: new Decimal(1),

    free_deity: new Decimal(0),
    augment_start: 2097152,
    augment_reached: false,

    collider_tab: 0,
    antispice: [
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        0,
    ],
    spent_atomic_spice: [
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
    ],
    antitotal_spice: [
        undefined,
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
    ],
    total_rainbow_antispice: 0,
    antispice_bought: new Array(10).fill(false),
    antispice_order: new Array(8).fill(0),

    limit_active: false,
    realm_limit: Decimal.pow(10, 4.05e18 + Math.E * 1e15),

    expand: 0,
    realms_visited: [6],
    galactic_shards: new Decimal(0),

    current_realm: 6,
    selected_realm: -1,
    hovered_realm: -1,

    galactic_bought: new Array(20).fill(false),

    expand_amount_history: new Array(10).fill(-1),
    expand_time_history: new Array(10).fill(-1),
    expand_real_time_history: new Array(10).fill(-1),
    expand_stat_history: new Array(10).fill(-1),
    best_expand_rate: 0,

    expand_time_played: 0,

    realm_effects: [0, 0, 0],

    dark_spice: new Decimal(0),
    total_dark_spice: new Decimal(0),
    dark_spice_gen: [
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
    ],
    dark_spice_price: [
        new Decimal(1),
        new Decimal(5),
        new Decimal(34),
        fib(48, true),
        fib(105, true),
        fib(190, true),
    ],
    dark_spice_bought: [0n, 0n, 0n, 0n, 0n, 0n],
    dark_spice_boost: [
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
    ],
    total_dark_spice_boost: [
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
    ],

    dark_strengthener: 0,
    dark_strengthener_price: new Decimal(10946),

    dark_construct: 0n,
    dark_construct_price: new Decimal(20 * (1 + 5 ** 0.5)),
    dark_construct_boost: new Decimal(1),
    autocs_toggle: false,

    dark_conversion: 0,
    dark_conversion_price: new Decimal(1325 * (1 + 5 ** 0.5)),
    dark_efficiency: 0,
    autocv_toggle: false,

    realm_limit_level: 0,
    realm_limit_price: new Decimal(2584),
    dark_gamespeed_level: 0,
    dark_gamespeed_price: new Decimal(13),
    jump_distance_level: 0,
    jump_distance_price: new Decimal(144),

    autors_toggle: false,
    autors_view: false,
    autors_upgrade: false,

    autoap_toggle: false,

    autocc_toggle: false,
    autocc_timer: 48,
    autocc_challenge: 0,
    autocc_wait: 2,
    autocc_cooldown: 48,

    autore_toggle: false,
    autore_mode: 0,
    autore_goal: [new Decimal(1e40), 3600],

    peak_rainbow_gain: new Decimal(0),
    peak_rainbow_boosts: 0,
    peak_rainbow_amount: new Decimal(0),
    peak_rainbow_time: 0,

    peak_ansuz_gain: new Decimal(0),
    peak_ansuz_amount: new Decimal(0),
    peak_ansuz_time: 0,

    peak_atomic_gain: new Decimal(0),
    peak_atomic_amount: new Decimal(0),
    peak_atomic_time: 0,

    peak_galactic_gain: new Decimal(0),
    peak_galactic_amount: new Decimal(0),
    peak_galactic_time: 0,

    real_time_played: [0, 0, 0, 0, 0],
}

let random_seed = Array.from(game.seed)

function random_int() {
    let result = (random_seed[0] + random_seed[3]) | 0
    let t = random_seed[1] << 9

    random_seed[2] ^= random_seed[0]
    random_seed[3] ^= random_seed[1]
    random_seed[1] ^= random_seed[2]
    random_seed[0] ^= random_seed[3]

    random_seed[2] ^= t

    random_seed[3] = (random_seed[3] << 11) | (random_seed[3] >> 21)

    return result
}

function random_float() {
    let a = -(1 << 31) + 0.5
    let b = 2 ** -32
    return (random_int() + a) * b
}

const rs_scale = [1, 0.344, 0.114, 0.0342, 0.00629, 2.95e-5, 1.66e-8]
const rn_scale = [0.202, 0.188, 0.174, 0.16, 0.145, 0.131]
const rc_scale = [0.233, 0.206, 0.18, 0.153, 0.127, 0.101]

let key = {
    digit: [-1, -1, -1, -1, -1, -1],
    shift: -1,
    escape: -1,
    enter: -1,

    s: -1,
    m: -1,
    b: -1,
    p: -1,
    i: -1,
    a: -1,
    d: -1,
    n: -1,
    c: -1,
    x: -1,
    y: -1,
    r: -1,
    e: -1,
    k: -1,
    v: -1,
}

function format_small(num, not) {
    if (not === undefined) not = game.notation

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
        return output.replaceAll(")", "</span>")
    } else if (not === 17) {
        return format_cancer3(num, "number")
    } else if (not === 18) {
        return format_cancer4(num)
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
            (not === 21 && num >= 1e9) ||
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
            if (Math.log10(num) < 10) return "e" + Math.log10(num).toFixed(6)
            else if (Math.log10(num) < 100)
                return "e" + Math.log10(num).toFixed(5)
            else return "e" + Math.log10(num).toFixed(4)
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
        } else if (not === 19) {
            return "[" + generate_string(num, false, 6) + "]"
        } else if (not === 20 && num >= 1e9) {
            let mantissa = num / 10 ** Math.floor(Math.log10(num))
            if (Math.log10(num) < 100)
                return mantissa.toFixed(6) + "e" + Math.floor(Math.log10(num))
            else return mantissa.toFixed(5) + "e" + Math.floor(Math.log10(num))
        } else {
            return format_num(num, 0)
        }
    }
}

function format_inum(num, not) {
    switch (game.exponent_notation) {
        case 0:
            return format_inf(num, not, 0)
        case 1:
            return format_inf(num, not, 2)
        case 2:
            return format_inf(num, not, 3)
        case 3:
            return format_inf(num, not, 4)
    }
}

function format_idec(num, not) {
    switch (game.exponent_notation) {
        case 0:
            return format_infdec(num, not, 0)
        case 1:
            return format_infdec(num, not, 2)
        case 2:
            return format_infdec(num, not, 3)
        case 3:
            return format_infdec(num, not, 4)
    }
}

//setting up spice collider animations
let collider = {
    time: 0,
    enabled: false,
    particles: 5,
    type: 0,
}

class particle {
    static particles = []

    constructor() {
        this.x = 0
        this.y = 0
        this.type = 0
        this.speed = 0
        this.speed_init = 0
        this.dir = 0
        this.delta = 0
        this.height

        particle.particles.push(this)
    }
}

class large_particle {
    static particles = []

    constructor() {
        this.x = 0
        this.dir = 0

        large_particle.particles.push(this)
    }
}

new large_particle()
new large_particle()
for (let i = 0; i < 30; i++) {
    new particle()
}

let meme_condition = false
if (new Date().getMonth() === 3 && new Date().getDate() === 1) {
    meme_condition = true
}

let spice_text = ["spice", "Spice", "SPICE"]

if (meme_condition) {
    spice_text = ["salt", "Salt", "SALT"]

    document.getElementById("red_spice_text").innerHTML = "red salt"
    document.getElementById("red_gen_name_s").innerHTML =
        "Red Salt Strengthener"
    document.getElementById("yellow_spice_text").innerHTML = "yellow salt"
    document.getElementById("yellow_gen_name_s").innerHTML =
        "Yellow Salt Strengthener"
    document.getElementById("green_spice_text").innerHTML = "green salt"
    document.getElementById("green_gen_name_s").innerHTML =
        "Green Salt Strengthener"
    document.getElementById("blue_spice_text").innerHTML = "blue salt"
    document.getElementById("blue_gen_name_s").innerHTML =
        "Blue Salt Strengthener"
    document.getElementById("pink_spice_text").innerHTML = "pink salt"
    document.getElementById("pink_gen_name_s").innerHTML =
        "Pink Salt Strengthener"

    document.getElementById("rainbow_spice_text").innerHTML = "rainbow salt"
    document.getElementById("rainbow_spice_text2").innerHTML = "rainbow salt"
    document.getElementById("rainbow_spice_text3").innerHTML = "rainbow salt"
    document.getElementById("crystal_spice_text").innerHTML =
        "crystallized salt"
    document.getElementById("crystal_gen_name_s").innerHTML =
        "Crystallized Salt Strengthener"

    document.getElementById("prestige_spice_text").innerHTML =
        "Auto-Prestige Goal (Rainbow Salt):"
    document.getElementById("prestige_spice_delta_text").innerHTML =
        "Auto-Prestige Delta (Rainbow Salt):"

    document.getElementById("ascend_info").innerHTML =
        "Your Ansuz runes can be converted into any of the three rune types below" +
        "<br>Each one makes rune power of its own variety, boosting salt production of its respective type(s)" +
        "<br>Ansuz runes can also be spent on other things than conversion"

    document.getElementById("ascend_challenge_info").innerHTML =
        "Entering an Ascension Challenge will reset your current Ascension" +
        "<br>You must Ascend with the required amount of rainbow salt to complete the Challenge" +
        "<br><br>Ascension automation and rainbow salt multipliers are disabled in Ascension Challenges"

    document.getElementById("arcane_unlock").innerHTML =
        "Complete Challenge 1 to unlock arcane salt!"
    document.getElementById("arcane_spice_text").innerHTML = "arcane salt"
    document.getElementById("arcane_gen_name_s").innerHTML =
        "Arcane Salt Strengthener"

    document.getElementById("collapse_info2").innerHTML =
        "Atomic salt gains are based on total salt produced" +
        '<span id="research_unlock"><br>Collapse 5 times to unlock Research</span>'

    document.getElementById("atomic_spice_text").innerHTML = "atomic salt"
    document.getElementById("atomic_spice_text2").innerHTML = "atomic salt"
    document.getElementById("collider_title").innerHTML = "The Salt Collider"

    document.getElementById("collapse_spice_text").innerHTML =
        "Auto-Collapse Goal (Atomic Salt):"
    document.getElementById("collapse_spice_delta_text").innerHTML =
        "Auto-Collapse Delta (Atomic Salt):"

    document.getElementById("collider_tab1").innerHTML = "UNSTABLE SALT"
    document.getElementById("collider_tab2").innerHTML = "BASIC ANTISALT"
    document.getElementById("collider_tab3").innerHTML = "RED ANTISALT"
    document.getElementById("collider_tab4").innerHTML = "YELLOW ANTISALT"
    document.getElementById("collider_tab5").innerHTML = "GREEN ANTISALT"
    document.getElementById("collider_tab6").innerHTML = "BLUE ANTISALT"
    document.getElementById("collider_tab7").innerHTML = "PINK ANTISALT"
    document.getElementById("collider_tab8").innerHTML = "RAINBOW ANTISALT"
    document.getElementById("unstable_spice_text").innerHTML = "unstable salt"
    document.getElementById("decayed_spice_text").innerHTML = "decayed salt"
    document.getElementById("basic_antispice_text").innerHTML = "basic antisalt"
    document.getElementById("red_antispice_text").innerHTML = "red antisalt"
    document.getElementById("yellow_antispice_text").innerHTML =
        "yellow antisalt"
    document.getElementById("green_antispice_text").innerHTML = "green antisalt"
    document.getElementById("blue_antispice_text").innerHTML = "blue antisalt"
    document.getElementById("pink_antispice_text").innerHTML = "pink antisalt"
    document.getElementById("rainbow_antispice_text").innerHTML =
        "rainbow antisalt"
    document.getElementById("antiperks_title").innerHTML = "Antisalt Perks"
    document.getElementById("refund_perks").innerHTML = "Refund Antisalt Perks"

    document.getElementById("expand_req2").innerHTML =
        "Antisalt perk 9 required"

    document.getElementById("dark_spice").innerHTML = "DARK SALT"
    document.getElementById("dark_spice_text").innerHTML = "dark salt"
    document.getElementById("dark_gen_name_s").innerHTML =
        "Dark Salt Strengthener"
    document.getElementById("dark_gen_name_a").innerHTML =
        "Dark Salt Accelerator"

    document.getElementById("spice_idle").innerHTML = "Salt Idle"
    document.title = "Salt Idle"
    document.getElementById("spices").innerHTML = "SALTS"
    document.getElementById("version").innerHTML =
        "Salt Idle v1.8.7<br>Made by Zakuro<br><br>Last updated November 29, 2025"
}

//initialize map
const spice_map = new Map()
const prestige_map = new Map()
const ascension_map = new Map()
const ascension_map2 = new Map()
const ascension_map3 = new Map()
const challenge_map = new Map()
const research_map = new Map()
const research_map2 = new Map()
const antispice_map = new Map()
const galactic_map = new Map()
const realm_map = new Map()
const compendium_map = new Map()

//spice generator class
class spice_gen {
    static generators = []

    color
    id
    base_price
    scaling
    name
    plural

    //generator constructor
    constructor(color, id, base_price, name, plural) {
        this.color = color
        this.id = id
        this.rid = spice_gen.generators.length
        this.base_price = base_price
        this.name = name
        this.plural = plural

        spice_gen.generators.push(this)

        //generator name
        let gen_name = document.createElement("P")
        gen_name.innerHTML =
            this.color.replace(/^\w/, c => c.toUpperCase()) +
            " " +
            spice_text[1] +
            " " +
            this.name.replace(/^\w/, c => c.toUpperCase())
        if (this.color === "crystal")
            gen_name.innerHTML =
                this.color.replace(/^\w/, c => c.toUpperCase()) +
                "lized " +
                spice_text[1] +
                " " +
                this.name.replace(/^\w/, c => c.toUpperCase())
        gen_name.className = "spice_gen_name " + this.color + "_spice"

        //generator info
        let gen_info = document.createElement("P")
        gen_info.innerHTML = "---"
        gen_info.className = "spice_gen_info"

        //generator boost
        let gen_boost = document.createElement("P")
        gen_boost.innerHTML = "---"
        gen_boost.className = "spice_gen_boost"

        //buy one generator
        let gen_buy = document.createElement("BUTTON")
        gen_buy.id = this.color + "_buy" + this.id
        gen_buy.innerHTML =
            'Buy one: </span><span id="' +
            this.color +
            "_cost" +
            this.id +
            '" class="' +
            this.color +
            '_cost">---</span>'
        gen_buy.className = "spice_buy"
        gen_buy.addEventListener("click", () => {
            buy_gen(this.color, this.id)
        })

        //buy until 10 generator
        let gen_until
        if (this.color !== "dark") {
            gen_until = document.createElement("BUTTON")
            gen_until.id = this.color + "_ubuy" + this.id
            gen_until.innerHTML =
                'Buy until 10: </span><span id="' +
                this.color +
                "_ucost" +
                this.id +
                '" class="' +
                this.color +
                '_cost">---</span>'
            if (this.color === "crystal")
                gen_until.innerHTML =
                    'Buy until 5: </span><span id="' +
                    this.color +
                    "_ucost" +
                    this.id +
                    '" class="' +
                    this.color +
                    '_cost">---</span>'
            if (this.color === "arcane")
                gen_until.innerHTML =
                    'Buy until 3: </span><span id="' +
                    this.color +
                    "_ucost" +
                    this.id +
                    '" class="' +
                    this.color +
                    '_cost">---</span>'
            gen_until.className = "spice_buy"
            gen_until.addEventListener("click", () => {
                buy_until10(this.color, this.id)
            })
        }

        //buttons div
        let gen_buttons = document.createElement("DIV")
        gen_buttons.className = "spice_buttons"
        gen_buttons.appendChild(gen_buy)
        if (this.color !== "dark") {
            gen_buttons.appendChild(gen_until)
        }

        //entire generator div
        let gen_block = document.createElement("DIV")
        gen_block.className = "spice_gen"
        gen_block.appendChild(gen_name)
        gen_block.appendChild(gen_info)
        gen_block.appendChild(gen_boost)
        gen_block.appendChild(gen_buttons)

        //attaching generator to spice page
        spice_map.set(this, gen_block)
        if (this.id < 3) {
            document
                .getElementById(this.color + "_panel_left")
                .appendChild(gen_block)
        } else {
            document
                .getElementById(this.color + "_panel_right")
                .appendChild(gen_block)
        }
    }
}

//initializing spice generators
//red
new spice_gen("red", 0, new Decimal(5), "harvester", "harvesters")
new spice_gen("red", 1, new Decimal(150), "machine", "machines")
new spice_gen("red", 2, new Decimal(30000), "factory", "factories")
new spice_gen("red", 3, new Decimal(4.5e8), "corporation", "corporations")
new spice_gen("red", 4, new Decimal(6e13), "planet", "planets")
new spice_gen("red", 5, new Decimal(9e20), "galaxy", "galaxies")
//yellow
new spice_gen("yellow", 0, new Decimal(5), "harvester", "harvesters")
new spice_gen("yellow", 1, new Decimal(250), "machine", "machines")
new spice_gen("yellow", 2, new Decimal(60000), "factory", "factories")
new spice_gen("yellow", 3, new Decimal(2e9), "corporation", "corporations")
new spice_gen("yellow", 4, new Decimal(3e14), "planet", "planets")
new spice_gen("yellow", 5, new Decimal(5.5e21), "galaxy", "galaxies")
//green
new spice_gen("green", 0, new Decimal(5), "harvester", "harvesters")
new spice_gen("green", 1, new Decimal(350), "machine", "machines")
new spice_gen("green", 2, new Decimal(100000), "factory", "factories")
new spice_gen("green", 3, new Decimal(7e9), "corporation", "corporations")
new spice_gen("green", 4, new Decimal(1.5e15), "planet", "planets")
new spice_gen("green", 5, new Decimal(3e22), "galaxy", "galaxies")
//blue
new spice_gen("blue", 0, new Decimal(5), "harvester", "harvesters")
new spice_gen("blue", 1, new Decimal(500), "machine", "machines")
new spice_gen("blue", 2, new Decimal(250000), "factory", "factories")
new spice_gen("blue", 3, new Decimal(3e10), "corporation", "corporations")
new spice_gen("blue", 4, new Decimal(7.5e15), "planet", "planets")
new spice_gen("blue", 5, new Decimal(2e23), "galaxy", "galaxies")
//pink
new spice_gen("pink", 0, new Decimal(5), "harvester", "harvesters")
new spice_gen("pink", 1, new Decimal(750), "machine", "machines")
new spice_gen("pink", 2, new Decimal(500000), "factory", "factories")
new spice_gen("pink", 3, new Decimal(1e11), "corporation", "corporations")
new spice_gen("pink", 4, new Decimal(4e16), "planet", "planets")
new spice_gen("pink", 5, new Decimal(1e24), "galaxy", "galaxies")
//crystal
new spice_gen("crystal", 0, Decimal.pow(2, 56), "furnace", "furnaces")
new spice_gen("crystal", 1, Decimal.pow(2, 62), "refinery", "refineries")
new spice_gen("crystal", 2, Decimal.pow(2, 68), "division", "divisions")
new spice_gen("crystal", 3, Decimal.pow(2, 84), "corporation", "corporations")
new spice_gen("crystal", 4, Decimal.pow(2, 100), "planet", "planets")
new spice_gen("crystal", 5, Decimal.pow(2, 124), "galaxy", "galaxies")
//arcane
new spice_gen("arcane", 0, new Decimal(177147), "glyph", "glyphs")
new spice_gen("arcane", 1, Decimal.pow(3, 15), "spellbook", "spellbooks")
new spice_gen("arcane", 2, Decimal.pow(3, 19), "wizard", "wizards")
new spice_gen("arcane", 3, Decimal.pow(3, 35), "shrine", "shrines")
new spice_gen("arcane", 4, Decimal.pow(3, 72), "cult", "cults")
new spice_gen("arcane", 5, Decimal.pow(3, 106), "deity", "deities")
//dark
new spice_gen("dark", 0, new Decimal(1), "extractor", "extractors")
new spice_gen("dark", 1, new Decimal(5), "replicator", "replicators")
new spice_gen("dark", 2, new Decimal(34), "laboratory", "laboratories")
new spice_gen("dark", 3, fib(48, true), "colony", "colonies")
new spice_gen("dark", 4, fib(105, true), "civilization", "civilizations")
new spice_gen("dark", 5, fib(190, true), "singularity", "singularities")
//done initializing spice generators

//prestige upgrade class
class prestige_upgrade {
    static upgrades = []

    desc
    price
    max

    //upgrade constructor
    constructor(desc, price, max) {
        this.desc = desc
        this.id = prestige_upgrade.upgrades.length
        this.price = price
        this.max = max
        this.unbought = 0

        prestige_upgrade.upgrades.push(this)

        //prestige upgrade button
        let button = document.createElement("BUTTON")
        button.innerHTML =
            '<span id="pr_desc' +
            this.id +
            '">' +
            this.desc +
            '</span><br><span id="pr_cost' +
            this.id +
            '" class="bold">---</span>'
        button.className = "prestige_upgrade p_locked"
        button.addEventListener("click", () => {
            buy_prestige_upgrade(this.id)
        })

        //attaching upgrade to prestige upgrades page
        prestige_map.set(this, button)
        if (this.id <= 12)
            document
                .getElementById("prestige_upgrade_block")
                .appendChild(button)
        else
            document.getElementById("crystal_upgrade_block").appendChild(button)
    }
}

//initializing prestige upgrades
//[0]
new prestige_upgrade(
    "Unlocks automation for red " + spice_text[0],
    new Decimal(1),
    5
)
//[1]
new prestige_upgrade(
    "Times Prestiged stat boosts all " +
        spice_text[0] +
        " production<br>(Currently: 5x)",
    new Decimal(1),
    1
)
//[2]
new prestige_upgrade(
    "Increase boost from strengtheners/shifts<br>(2.00x -> 2.20x)",
    new Decimal(2),
    15
)
//[3]
new prestige_upgrade("Boost from buying 10 is squared", new Decimal(4), 4)
//[4]
new prestige_upgrade("You start with 1 color shift", new Decimal(8), 4)
//[5]
new prestige_upgrade(
    "Strengtheners boost the next color more<br>(1.05x -> 1.20x)",
    new Decimal(16),
    5
)
//[6]
new prestige_upgrade(
    "All " +
        spice_text[0] +
        " production is boosted by unspent rainbow " +
        spice_text[0] +
        "<br>(Currently: 1.00x)",
    new Decimal(256),
    1
)
//[7]
new prestige_upgrade(
    "Unlocks automation for color boosts",
    new Decimal(4096),
    1
)
//[8]
new prestige_upgrade(
    "All " +
        spice_text[0] +
        "s boost the previous color based on that " +
        spice_text[0] +
        "'s total amount",
    new Decimal(32768),
    1
)
//[9]
new prestige_upgrade(
    "Reduce the strengthener price scaling<br>(10x -> 8x)",
    new Decimal(2).pow(20),
    4
)
//[10]
new prestige_upgrade(
    "Harvesters produce galaxies of the previous color",
    new Decimal(2).pow(24),
    1
)
//[11]
new prestige_upgrade(
    "Red " + spice_text[0] + " boosts every other color by its total amount",
    new Decimal(2).pow(32),
    1
)
//[12]
new prestige_upgrade(
    "Unlocks crystallized " + spice_text[0],
    new Decimal(2).pow(56),
    1
)
//[13]
new prestige_upgrade(
    "Unlocks automation for crystal infusions",
    new Decimal(2).pow(63),
    1
)
//[14]
new prestige_upgrade(
    "Crystallized " +
        spice_text[0] +
        " boosts pink " +
        spice_text[0] +
        " by its total amount",
    new Decimal(2).pow(81),
    1
)
//[15]
new prestige_upgrade("Unlocks Prestige automation", new Decimal(2).pow(100), 1)
//[16]
new prestige_upgrade(
    "Crystallized " +
        spice_text[0] +
        " also boosts other colors by its total amount",
    new Decimal(2).pow(120),
    1
)
//[17]
new prestige_upgrade(
    "Crystallized " +
        spice_text[0] +
        " production is boosted based on your color boosts<br>(Currently: 1.00x)",
    new Decimal(2).pow(141),
    1
)
//[18]
new prestige_upgrade(
    "Increase boost from strengtheners/boosts<br>(5.00x -> 6.00x)",
    new Decimal(2).pow(165),
    1
)
//[19]
new prestige_upgrade(
    "Crystal infusions also boost crystallized " +
        spice_text[0] +
        " production 1.08x",
    new Decimal(2).pow(186),
    1
)
//[20]
new prestige_upgrade(
    "You get 12 free crystal infusions",
    new Decimal(2).pow(214),
    12
)
//[21]
new prestige_upgrade(
    "Crystallized " +
        spice_text[0] +
        " production is boosted by unspent rainbow " +
        spice_text[0] +
        "<br>(Currently: 1.00x)",
    new Decimal(2).pow(300),
    1
)
//[22]
new prestige_upgrade(
    "Color boosts don't reset progress",
    new Decimal(2).pow(390),
    1
)
//[23]
new prestige_upgrade(
    "Crystallized " +
        spice_text[0] +
        " furnace multipliers are raised to the 1.25 power",
    new Decimal(2).pow(480),
    1
)
//[24]
new prestige_upgrade(
    "Crystallized " + spice_text[0] + " furnaces produce pink galaxies",
    new Decimal(2).pow(720),
    1
)
//[25]
new prestige_upgrade("Unlocks Ascension", new Decimal(2).pow(1024), 1)
//done initializing prestige upgrades

//ascension upgrade class
class ascension_upgrade {
    static upgrades = []

    desc
    price
    req
    req2
    x
    y

    //upgrade constructor
    constructor(desc, price, req, req2, x, y, challenge) {
        this.desc = desc
        this.id = ascension_upgrade.upgrades.length
        this.price = price
        this.req = req
        this.req2 = req2
        this.x = x
        this.y = y
        this.challenge = challenge
        this.unbought = 0

        ascension_upgrade.upgrades.push(this)

        //ascension upgrade button
        let button = document.createElement("BUTTON")
        button.innerHTML =
            '<span id="as_desc' +
            this.id +
            '">' +
            this.desc +
            '</span><br><span id="as_cost' +
            this.id +
            '" class="bold">---</span>'
        button.className = "ascension_upgrade a_locked"
        if (challenge !== 0) button.className = "ascension_upgrade ac_locked"
        button.style.left = "calc(50% - 8.5em + " + x + ")"
        button.style.top = "calc(2.5em + " + y + ")"
        button.addEventListener("click", () => {
            buy_ascension_upgrade(this.id)
        })

        //attaching upgrade to ascension upgrades page
        ascension_map.set(this, button)
        document.getElementById("ascension_upgrade_screen").appendChild(button)

        //lines behind ascension upgrades
        if (req !== undefined) {
            let line = document.createElement("DIV")
            let rx = parseFloat(ascension_upgrade.upgrades[req].x) * 0.9
            let ry = parseFloat(ascension_upgrade.upgrades[req].y) * 0.9
            let tx = parseFloat(x) * 0.9
            let ty = parseFloat(y) * 0.9
            let length = ((rx - tx) ** 2 + (ry - ty) ** 2) ** 0.5
            let cx = (rx + tx) / 2 - length / 2
            let cy = (ry + ty) / 2

            line.className = "ascension_line"
            if (challenge !== 0) line.className = "ascension_line2"
            if (ascension_upgrade.upgrades[req].challenge !== 0)
                line.className = "ascension_line2"

            line.style.left = "calc(50% + " + cx + "em)"
            line.style.top = "calc(5.5em + " + cy + "em)"
            line.style.width = length + "em"
            line.style.transform =
                "rotate(" +
                Math.atan2(ry - ty, rx - tx) * (180 / Math.PI) +
                "deg)"

            ascension_map2.set(this, line)
            document
                .getElementById("ascension_upgrade_screen")
                .appendChild(line)
        }

        if (req2 !== undefined) {
            let line = document.createElement("DIV")
            let rx = parseFloat(ascension_upgrade.upgrades[req2].x) * 0.9
            let ry = parseFloat(ascension_upgrade.upgrades[req2].y) * 0.9
            let tx = parseFloat(x) * 0.9
            let ty = parseFloat(y) * 0.9
            let length = ((rx - tx) ** 2 + (ry - ty) ** 2) ** 0.5
            let cx = (rx + tx) / 2 - length / 2
            let cy = (ry + ty) / 2

            line.className = "ascension_line"
            if (challenge !== 0) line.className = "ascension_line2"
            if (ascension_upgrade.upgrades[req].challenge !== 0)
                line.className = "ascension_line2"

            line.style.left = "calc(50% + " + cx + "em)"
            line.style.top = "calc(5.5em + " + cy + "em)"
            line.style.width = length + "em"
            line.style.transform =
                "rotate(" +
                Math.atan2(ry - ty, rx - tx) * (180 / Math.PI) +
                "deg)"

            ascension_map3.set(this, line)
            document
                .getElementById("ascension_upgrade_screen")
                .appendChild(line)
        }
    }
}

//initializing ascension upgrades
//[0]
new ascension_upgrade(
    "The boost from red " + spice_text[0] + " amount is 2x stronger",
    new Decimal(1),
    undefined,
    undefined,
    "0em",
    "0em",
    0
)
//[1]
new ascension_upgrade(
    "The boost from Times Prestiged stat is stronger",
    new Decimal(3),
    0,
    undefined,
    "0em",
    "12em",
    0
)
//[2]
new ascension_upgrade(
    "Increase boost from strengtheners/boosts<br>(2.00x -> 4.00x)",
    new Decimal(6),
    1,
    undefined,
    "0em",
    "24em",
    0
)
//[3]
new ascension_upgrade(
    "Quality of life Prestige upgrades are not reset by Ascension",
    new Decimal(10),
    2,
    undefined,
    "0em",
    "36em",
    0
)
//[4]
new ascension_upgrade(
    "Crystallized " + spice_text[0] + " generator multipliers are stronger",
    new Decimal(21),
    3,
    undefined,
    "10em",
    "48em",
    0
)
//[5]
new ascension_upgrade(
    "The free crystal infusions upgrade is uncapped",
    new Decimal(78),
    4,
    undefined,
    "10em",
    "60em",
    0
)
//[6]
new ascension_upgrade(
    "Crystal infusions boost crystallized " +
        spice_text[0] +
        " production 1.12x",
    new Decimal(210),
    5,
    undefined,
    "10em",
    "72em",
    0
)
//[7]
new ascension_upgrade(
    "Crystal infusions are 25% stronger",
    new Decimal(1378),
    6,
    undefined,
    "20em",
    "84em",
    0
)
//[8]
new ascension_upgrade(
    "Unlocks automation for Prestige upgrades",
    new Decimal(15),
    3,
    undefined,
    "-10em",
    "48em",
    0
)
//[9]
new ascension_upgrade(
    "Unlocks more options for Prestige automation",
    new Decimal(28),
    8,
    undefined,
    "-10em",
    "60em",
    0
)
//[10]
new ascension_upgrade(
    "Unlocks automation for crystallized " + spice_text[0],
    new Decimal(45),
    9,
    undefined,
    "-10em",
    "72em",
    0
)
//[11]
new ascension_upgrade(
    "Strengtheners are 2x stronger",
    new Decimal(666),
    10,
    undefined,
    "-20em",
    "84em",
    0
)
//[12]
new ascension_upgrade(
    "Unlocks automation for Ascension",
    new Decimal(3240),
    6,
    10,
    "0em",
    "84em",
    0
)
//[13]
new ascension_upgrade(
    "Pink " +
        spice_text[0] +
        " boosts crystallized " +
        spice_text[0] +
        " by its total amount",
    new Decimal(14878),
    12,
    undefined,
    "0em",
    "96em",
    0
)
//[14]
new ascension_upgrade(
    "Increase boost from strengtheners/boosts<br>(4.00x -> 6.00x)",
    new Decimal(56280),
    13,
    undefined,
    "0em",
    "108em",
    0
)
//[15]
new ascension_upgrade(
    "Times Ascended stat boosts rainbow " +
        spice_text[0] +
        " gains<br>(Currently: 1.00x)",
    new Decimal(127260),
    14,
    undefined,
    "0em",
    "120em",
    0
)
//[16]
new ascension_upgrade(
    "Unlocks Challenge 1",
    new Decimal(733866),
    15,
    undefined,
    "0em",
    "132em",
    1
)
//[17]
new ascension_upgrade(
    "Unlocks automation for arcane enchantments",
    new Decimal(6601161),
    16,
    undefined,
    "-10em",
    "144em",
    0
)
//[18]
new ascension_upgrade(
    "Red " +
        spice_text[0] +
        " boosts crystallized " +
        spice_text[0] +
        " by its total amount",
    new Decimal(9.007199321849856e15),
    17,
    undefined,
    "-10em",
    "156em",
    0
)
//[19]
new ascension_upgrade(
    "Arcane " +
        spice_text[0] +
        " is boosted based on unused Ansuz runes<br>(Currently: 1.00x)",
    new Decimal(2.0858168697697163e64),
    18,
    undefined,
    "-10em",
    "168em",
    0
)
//[20]
new ascension_upgrade(
    "Unlocks Challenge 2",
    new Decimal(1.3358218289289167e21),
    18,
    undefined,
    "-30em",
    "156em",
    2
)
//[21]
new ascension_upgrade(
    "You gain 1x more Times Prestiged stat<br>(based on color boosts)",
    new Decimal(55616627886),
    16,
    undefined,
    "10em",
    "144em",
    0
)
//[22]
new ascension_upgrade(
    "Arcane " +
        spice_text[0] +
        " boosts crystallized " +
        spice_text[0] +
        " by its total amount",
    new Decimal(4.137798775129687e30),
    21,
    undefined,
    "10em",
    "156em",
    0
)
//[23]
new ascension_upgrade(
    "Times Prestiged stat is no longer reset by Ascension",
    new Decimal(8.265338067592353e39),
    22,
    undefined,
    "10em",
    "168em",
    0
)
//[24]
new ascension_upgrade(
    "Unlocks Challenge 3",
    new Decimal(2.1468841175406798e48),
    22,
    undefined,
    "30em",
    "156em",
    3
)
//[25]
new ascension_upgrade(
    "You gain 10% of your pending rainbow " + spice_text[0] + " every second",
    new Decimal(9.080499396228733e80),
    19,
    23,
    "0em",
    "180em",
    0
)
//[26]
new ascension_upgrade(
    "Boosts from rune power are 50% stronger",
    new Decimal(3.9793885882016265e98),
    25,
    undefined,
    "0em",
    "192em",
    0
)
//[27]
new ascension_upgrade(
    "Unlocks Challenge 4",
    new Decimal(6.445853992274074e132),
    26,
    undefined,
    "-10em",
    "204em",
    4
)
//[28]
new ascension_upgrade(
    "Unlocks Challenge 5",
    new Decimal(3.8710489717794272e256),
    26,
    undefined,
    "10em",
    "204em",
    5
)
//[29]
new ascension_upgrade(
    "Arcane enchantments also boost arcane " +
        spice_text[0] +
        " production 1.08x",
    new Decimal(1.7353473718952628e180),
    27,
    undefined,
    "-20em",
    "216em",
    0
)
//[30]
new ascension_upgrade(
    "Red " +
        spice_text[0] +
        " boosts arcane " +
        spice_text[0] +
        " by its total amount",
    Decimal.pow(10, 385).mul(4.3167666593814529),
    28,
    undefined,
    "20em",
    "216em",
    0
)
//[31]
new ascension_upgrade(
    "Arcane " + spice_text[0] + " boosts itself by its total amount",
    Decimal.pow(10, 501).mul(7.5039392714382114),
    27,
    28,
    "0em",
    "216em",
    0
)
//[32]
new ascension_upgrade(
    "Arcane " +
        spice_text[0] +
        " glyphs produce crystallized " +
        spice_text[0] +
        " galaxies",
    Decimal.pow(10, 727).mul(4.4308334327402763),
    31,
    undefined,
    "0em",
    "228em",
    0
)
//[33]
new ascension_upgrade(
    "Boosts from rune power are now 3x stronger",
    Decimal.pow(10, 987).mul(2.424227028858335),
    32,
    undefined,
    "0em",
    "240em",
    0
)
//[34]
new ascension_upgrade(
    "Unlocks Challenge 6",
    Decimal.pow(10, 1233).mul(1.0443888814131805),
    33,
    undefined,
    "0em",
    "252em",
    6
)
//done initializing ascension upgrades

//ascension challenge class
class ascension_challenge {
    static challenges = []

    desc
    goal
    unlock

    //upgrade constructor
    constructor(desc, goal, unlock) {
        this.desc = desc
        this.id = ascension_challenge.challenges.length
        this.goal = goal
        this.unlock = unlock

        ascension_challenge.challenges.push(this)

        //entire challenge panel
        let panel = document.createElement("DIV")
        panel.className = "a_challenge_panel"

        //all text div
        let text = document.createElement("DIV")
        text.className = "a_challenge_block"

        //challenge header
        let header = document.createElement("P")
        header.innerHTML = "Challenge " + format_small(this.id + 1)
        header.className = "a_challenge_header"

        //challenge desc
        let info = document.createElement("P")
        info.innerHTML =
            this.desc +
            "<br>Goal: <span class='rainbow_spice'>" +
            format_idec(this.goal, game.notation) +
            " μg rainbow " +
            spice_text[0] +
            "</span>"
        info.className = "a_challenge_text"

        //attaching text to text div
        text.appendChild(header)
        text.appendChild(info)

        //challenge button
        let button = document.createElement("BUTTON")
        button.innerHTML = "Enter Challenge"
        button.className = "a_challenge_button incomplete"
        button.addEventListener("click", () => {
            pre_enter_ascension_challenge(this.id + 1)
        })

        //attaching stuff to challenge panel
        panel.appendChild(text)
        panel.appendChild(button)

        //attaching challenge to ascension challenges page
        challenge_map.set(this, panel)
        document.getElementById("challenges_page").appendChild(panel)
    }
}

//initializing ascension challenges
//challenge 1
new ascension_challenge(
    "Crystal infusions cannot be purchased<br>Reward: Unlock arcane " +
        spice_text[0],
    Decimal.pow(10, 450),
    16
)
//challenge 2
new ascension_challenge(
    "Crystallized & arcane " +
        spice_text[0] +
        " production is disabled<br>Reward: Crystallized " +
        spice_text[0] +
        " multipliers are even stronger",
    Decimal.pow(10, 800),
    20
)
//challenge 3
new ascension_challenge(
    "Color boost requirements scale 10x harder<br>Reward: Strengtheners are 3x stronger, infusions are 20% stronger,<br>and strengthener price scaling 3x -> 2x",
    Decimal.pow(10, 800),
    24
)
//challenge 4
new ascension_challenge(
    "4th, 5th, and 6th generators don't produce anything<br>Reward: 4th generators are 3% stronger, 5th generators are 6%<br>stronger, and 6th generators are 10% stronger",
    Decimal.pow(10, 6200),
    27
)
//challenge 5
new ascension_challenge(
    "Normal/crystallized " +
        spice_text[0] +
        " production stops after 1 second,<br>arcane enchantments do nothing except refresh production<br>Reward: Boosts from rune power are now 2x stronger",
    Decimal.pow(10, 19850),
    28
)
//challenge 6
new ascension_challenge(
    "All " +
        spice_text[0] +
        " production boosts from Prestige and Ascension upgrades<br>are disabled, and rune power production is disabled<br>Reward: Unlock Collapse",
    Decimal.pow(10, 6360),
    34
)
//done initializing ascension challenges

//collapse research class
class research {
    static researches = []

    desc
    req
    req2
    repeat
    special
    data
    unit
    factor
    factor2

    //research constructor
    constructor(desc, req, req2, repeat, special, data, unit, factor, factor2) {
        this.desc = desc
        this.id = research.researches.length
        this.req = req
        this.req2 = req2
        this.repeat = repeat
        this.special = special
        this.data = data
        this.unit = unit
        this.factor = factor
        this.factor2 = factor2

        research.researches.push(this)

        //available research button
        let button = document.createElement("BUTTON")
        button.innerHTML = this.id + 1
        button.className = "research_button"
        button.addEventListener("click", () => {
            research_view(this.id + 1)
        })

        //attaching research to available researches list
        research_map.set(this, button)
        document.getElementById("research_available").appendChild(button)

        //completed research button
        button = document.createElement("BUTTON")
        button.innerHTML = this.id + 1
        button.className = "research_button r_completed"
        button.addEventListener("click", () => {
            research_view(this.id + 1)
        })

        //attaching research to completed researches list
        research_map2.set(this, button)
        document.getElementById("research_completed").appendChild(button)
    }
}

//initializing collapse researches
//[0] #1
new research(
    "The half-life of unstable " +
        spice_text[0] +
        " becomes 33% shorter<br>Current unstable " +
        spice_text[0] +
        " half-life: 10 minutes",
    undefined,
    undefined,
    true,
    false,
    2000,
    1500,
    1.5,
    2
)
//[1] #2
new research(
    "Quality of life Ascension upgrades are no longer reset by Collapse",
    undefined,
    undefined,
    false,
    false,
    1000
)
//[2] #3
new research(
    "Unstable " +
        spice_text[0] +
        " decay now also boosts crystallized " +
        spice_text[0] +
        " production",
    0,
    undefined,
    false,
    false,
    6000
)
//[3] #4
new research(
    "The rune power production exponent is increased by 0.100<br>Current rune power production exponent: 2.00",
    2,
    undefined,
    true,
    false,
    10000,
    5000,
    1.75,
    2.5
)
//[4] #5
new research(
    "Unlocks automation for Ascension upgrades",
    2,
    undefined,
    false,
    false,
    4000
)
//[5] #6
new research(
    "Atomic " +
        spice_text[0] +
        " gains are additionally boosted by total rune power produced<br>Current boost: 1.00x",
    3,
    undefined,
    false,
    true,
    20000
)
//[6] #7
new research(
    "Unlocks the Distributor, which automates rune distribution",
    5,
    undefined,
    false,
    false,
    8000
)
//[7] #8
new research(
    "Atomic " +
        spice_text[0] +
        " conversion is 10% more efficient<br>Current atomic " +
        spice_text[0] +
        " efficiency: 60%",
    5,
    undefined,
    true,
    false,
    30000,
    5000,
    3,
    5
)
//[8] #9
new research(
    "Unlocks a delta option for RUNES mode of Ascension automation",
    6,
    undefined,
    false,
    false,
    16000
)
//[9] #10
new research(
    "Ascension Challenges are automatically completed when they are unlocked",
    7,
    undefined,
    false,
    false,
    50000
)
//[10] #11
new research(
    "Unstable " +
        spice_text[0] +
        " decay now also boosts arcane " +
        spice_text[0] +
        " production",
    7,
    undefined,
    false,
    false,
    100000
)
//[11] #12
new research(
    "Unlocks automation for arcane " + spice_text[0],
    9,
    undefined,
    false,
    false,
    32000
)
//[12] #13
new research(
    "Ansuz rune gains from Ascension are boosted by Times Collapsed statistic<br>Current boost: 1.00x",
    9,
    7,
    false,
    true,
    200000
)
//[13] #14
new research(
    "You get 1 free arcane enchantment for every 10 arcane enchantments you have",
    10,
    undefined,
    false,
    true,
    400000
)
//[14] #15
new research(
    "Boosts from rune power are now 5x stronger",
    12,
    undefined,
    false,
    false,
    900000
)
//[15] #16
new research(
    "You get 10 free arcane enchantments for every arcane strengthener you have",
    13,
    undefined,
    false,
    true,
    2000000
)
//[16] #17
new research(
    "Unstable " +
        spice_text[0] +
        " boosts are 20% stronger when unstable " +
        spice_text[0] +
        " is completely decayed",
    13,
    undefined,
    false,
    false,
    5000000
)
//[17] #18
new research(
    "Unlocks automation for Collapse",
    16,
    undefined,
    false,
    false,
    15000000
)
//[18] #19
new research(
    "Times Prestiged and Times Ascended statistics are no longer reset by Collapse",
    17,
    16,
    false,
    false,
    60000000
)
//[19] #20
new research(
    "Unspent atomic " +
        spice_text[0] +
        " makes the unstable " +
        spice_text[0] +
        " decay boost stronger<br>The boost is currently 0.00% stronger",
    18,
    16,
    false,
    true,
    3e8
)
//[20] #21
new research("Unlocks Challenge 7", 19, undefined, false, false, 1.8e9)
//[21] #22
new research("Unlocks anti" + spice_text[0], -701, 19, false, false, 9e9)
//[22] #23
new research("Unlocks Challenge 8", -702, 20, false, false, 3.6e10)
//[23] #24
new research(
    "Unlocks red anti" + spice_text[0],
    -801,
    20,
    false,
    false,
    1.08e11
)
//[24] #25
new research(
    "You gain 46,656x more atomic " +
        spice_text[0] +
        " for every Collapse challenge completion<br>Current boost: 1.00x",
    -703,
    21,
    false,
    true,
    2.25e12
)
//[25] #26
new research("Unlocks Challenge 9", -803, 22, false, false, 8e13)
//[26] #27
new research(
    "Unlocks yellow anti" + spice_text[0],
    -901,
    22,
    false,
    false,
    5e14
)
//[27] #28
new research(
    "You get 100 free arcane enchantments for every Collapse (up to 50% of your bought arcane enchantments)",
    -805,
    23,
    false,
    true,
    8.5e17
)
//[28] #29
new research("Unlocks Challenge 10", -904, 25, false, false, 2.5e19)
//[29] #30
new research(
    "Unlocks green anti" + spice_text[0],
    -1001,
    25,
    false,
    false,
    1e20
)
//[30] #31
new research(
    "Unlocks " + spice_text[1] + " Collider automation",
    -30,
    26,
    false,
    false,
    1.25e24
)
//[31] #32
new research(
    "Collapse Challenges can be completed in bulk",
    -907,
    26,
    false,
    false,
    8e25
)
//[32] #33
new research("Unlocks Challenge 11", -1005, 28, false, false, 1e27)
//[33] #34
new research(
    "Unlocks blue anti" + spice_text[0],
    -1101,
    28,
    false,
    false,
    2.8e28
)
//[34] #35
new research(
    "You gain 50% more rainbow " +
        spice_text[0] +
        " after color augments begin",
    -1009,
    29,
    false,
    false,
    7.2e35
)
//[35] #36
new research("Unlocks Challenge 12", -1106, 32, false, false, 1.72e39)
//[36] #37
new research(
    "Unlocks pink anti" + spice_text[0],
    -1201,
    32,
    false,
    false,
    4.21e40
)
//[37] #38
new research(
    "Boosts from rune power are now 5x stronger",
    -1111,
    33,
    false,
    false,
    Math.floor(((1 + 5 ** 0.5) / 2) * 1e47)
)
//[38] #39
new research(
    "You gain 1x more Times Ascended stat on Ascension,<br>and you gain 1x more Times Collapsed stat on Collapse<br>(Based on Collapse challenge completions)",
    -1204,
    36,
    false,
    true,
    Math.floor(Math.PI * 1e49)
)
//[39] #40
new research(
    "Unlocks rainbow anti" + spice_text[0],
    -1208,
    38,
    false,
    false,
    Math.floor(Math.E * 1e58)
)
//done initializing collapse researches

//returning research requirements
function research_goal(id) {
    let goal = 0
    if (game.research_complete[id] === 0) {
        goal = research.researches[id].data
    } else if (game.research_complete[id] < 4) {
        goal =
            Math.ceil(
                (research.researches[id].data *
                    research.researches[id].factor **
                        game.research_complete[id]) /
                    research.researches[id].unit
            ) * research.researches[id].unit
    } else {
        goal =
            Math.ceil(
                (research.researches[id].data *
                    research.researches[id].factor ** 3 *
                    research.researches[id].factor2 **
                        (game.research_complete[id] - 3)) /
                    research.researches[id].unit
            ) * research.researches[id].unit

        if (id === 7 && game.research_complete[id] >= 7) {
            goal =
                Math.ceil(
                    (research.researches[id].data *
                        research.researches[id].factor ** 3 *
                        research.researches[id].factor2 **
                            (4 +
                                ((game.research_complete[id] - 6) *
                                    (game.research_complete[id] - 5)) /
                                    2)) /
                        research.researches[id].unit
                ) * research.researches[id].unit
        }

        if (id === 0 && game.research_complete[id] >= 21) {
            goal =
                Math.ceil(
                    (research.researches[id].data *
                        research.researches[id].factor ** 3 *
                        research.researches[id].factor2 **
                            (game.research_complete[id] * 3 - 41)) /
                        research.researches[id].unit
                ) * research.researches[id].unit
        }
        if (id === 0 && game.research_complete[id] >= 30) {
            goal =
                Math.ceil(
                    (research.researches[id].data *
                        research.researches[id].factor ** 3 *
                        research.researches[id].factor2 **
                            (game.research_complete[id] * 9 - 215)) /
                        research.researches[id].unit
                ) * research.researches[id].unit
        }
        if (id === 3 && game.research_complete[id] >= 15) {
            goal =
                Math.ceil(
                    (research.researches[id].data *
                        research.researches[id].factor ** 3 *
                        research.researches[id].factor2 **
                            (game.research_complete[id] * 3 - 29)) /
                        research.researches[id].unit
                ) * research.researches[id].unit
        }
        if (id === 3 && game.research_complete[id] >= 55) {
            goal =
                Math.ceil(
                    (research.researches[id].data *
                        research.researches[id].factor ** 3 *
                        research.researches[id].factor2 **
                            (game.research_complete[id] * 7.5 - 272)) /
                        research.researches[id].unit
                ) * research.researches[id].unit
        }
    }

    return goal
}

//collapse challenge class
class collapse_challenge {
    static challenges = []

    desc
    unlock
    superscaling
    goal
    delta
    scaling

    //upgrade constructor
    constructor(desc, unlock, superscaling, goal, delta, scaling) {
        this.desc = desc
        this.id = collapse_challenge.challenges.length
        this.unlock = unlock
        this.superscaling = superscaling
        this.goal = goal
        this.delta = delta
        this.scaling = scaling

        collapse_challenge.challenges.push(this)

        //entire challenge panel
        let panel = document.createElement("DIV")
        panel.className = "co_challenge_panel"

        //all text div
        let text = document.createElement("DIV")
        text.className = "co_challenge_block"

        //challenge header
        let header = document.createElement("P")
        header.innerHTML = "Challenge " + format_small(this.id + 7)
        header.className = "co_challenge_header"

        //challenge desc
        let info = document.createElement("P")
        info.innerHTML =
            "<span class='small_text'>" +
            this.desc +
            "<br></span><br>Goal: <span class='atomic_spice'>+" +
            format_idec(this.goal, game.notation) +
            " atomic " +
            spice_text[0] +
            "</span><br>Completions: 0"
        info.className = "co_challenge_text"

        //attaching text to text div
        text.appendChild(header)
        text.appendChild(info)

        //challenge button
        let button = document.createElement("BUTTON")
        button.innerHTML = "Enter Challenge"
        button.className = "co_challenge_button outside"
        button.addEventListener("click", () => {
            pre_enter_collapse_challenge(this.id + 7)
        })

        //attaching stuff to challenge panel
        panel.appendChild(text)
        panel.appendChild(button)

        //attaching challenge to ascension challenges page
        challenge_map.set(this, panel)
        document.getElementById("challenges_page2").appendChild(panel)
    }
}

//initializing collapse challenges
//challenge 7
new collapse_challenge(
    "Challenges 1, 3, 4, & 5 simultaneously<br>Reward: Normal " +
        spice_text[0] +
        " multipliers are 2.5% stronger<br>Next research unlock in 1 completion",
    20,
    36,
    Decimal.pow(10, 29),
    [
        Decimal.pow(10, 19),
        Decimal.pow(10, 29),
        Decimal.pow(10, 43),
        Decimal.pow(10, 57),
        Decimal.pow(10, 88),
    ],
    [5, 8, -13, 18]
)
//challenge 8
new collapse_challenge(
    "Unstable " +
        spice_text[0] +
        " decay gives no boost, it instead produces sixth generators<br>Reward: Unstable " +
        spice_text[0] +
        " decay now also produces arcane " +
        spice_text[0] +
        " deities<br>Next research unlock in 1 completion",
    22,
    31,
    Decimal.pow(10, 25),
    [
        Decimal.pow(10, 37),
        Decimal.pow(10, 61),
        Decimal.pow(10, 107),
        Decimal.pow(10, 154),
        Decimal.pow(10, 188),
        Decimal.pow(10, 222),
        Decimal.pow(10, 384),
    ],
    [3, 6, -10, 14, 18, 25]
)
//challenge 9
new collapse_challenge(
    "The game runs 100,000x slower, reach the goal in 500 microseconds or less<br>Reward: The game runs 2x faster<br>Next research unlock in 1 completion",
    25,
    26,
    Decimal.pow(10, 115),
    [
        Decimal.pow(10, 95),
        Decimal.pow(10, 125),
        Decimal.pow(10, 175),
        Decimal.pow(10, 215),
        Decimal.pow(10, 375),
        Decimal.pow(10, 555),
    ],
    [4, -7, 10, 14, 20]
)
//challenge 10
new collapse_challenge(
    "Color augment scaling is much stronger, and color augments begin at 4 color boosts<br>Ascension upgrade prices are also reduced<br>Reward: Color augments begin at 4,194,304 color boosts<br>Next research unlock in 1 completion",
    28,
    22,
    Decimal.pow(10, 1150),
    [
        Decimal.pow(10, 275),
        Decimal.pow(10, 425),
        Decimal.pow(10, 550),
        Decimal.pow(10, 625),
        Decimal.pow(10, 750),
    ],
    [-5, -9, 12, 15]
)
//challenge 11
new collapse_challenge(
    "Ascension is disabled, but Challenge 6 is not required to Collapse<br>Reward: You gain 1% of your pending Ansuz runes every second<br>Next research unlock in 1 completion",
    32,
    18,
    Decimal.pow(10, 1750),
    [Decimal.pow(10, 250), Decimal.pow(10, 300), Decimal.pow(10, 400)],
    [6, 11]
)
//challenge 12
new collapse_challenge(
    "Same as Challenge 6, but all research boosts are disabled, and red, yellow, green, & blue " +
        spice_text[0] +
        " production is disabled<br>Reward: You gain data 2x faster while researching<br>Next research unlock in 1 completion",
    35,
    7,
    Decimal.pow(10, 580),
    [
        Decimal.pow(10, 240),
        Decimal.pow(10, 180),
        Decimal.pow(10, 150),
        Decimal.pow(10, 130),
        Decimal.pow(10, 120),
        Decimal.pow(10, 60),
    ],
    [-2, -3, -4, -5, -7]
)
//done initializing collapse challenges

//collapse challenge scaling handling
function get_collapse_goal(challenge, pending) {
    let c = collapse_challenge.challenges[challenge]
    let completions = game.collapse_complete[challenge] + pending
    let temp_goal = c.goal.mul(c.delta[0].pow(completions))

    if (c.scaling !== undefined) {
        let step_count = c.scaling.length
        let extra = new Array(step_count).fill(1)

        let superstep = c.goal.mul(c.delta[0].pow(Math.abs(c.scaling[0]) - 1))
        let superdelta = c.delta[0]

        let step = c.goal
        for (let i = 0; i < step_count; i++) {
            if (c.scaling[i] < 0) extra[i] = 0
            if (i === 0)
                step = step.mul(c.delta[i].pow(Math.abs(c.scaling[i]) - 1))
            else
                step = step.mul(
                    c.delta[i].pow(
                        Math.abs(c.scaling[i]) -
                            Math.abs(c.scaling[i - 1]) +
                            extra[i - 1]
                    )
                )
            if (completions >= Math.abs(c.scaling[i]))
                temp_goal = step.mul(
                    c.delta[i + 1].pow(
                        completions - Math.abs(c.scaling[i]) + extra[i] + 1
                    )
                )

            superstep = step.mul(
                c.delta[i + 1].pow(
                    c.superscaling - Math.abs(c.scaling[i]) + extra[i]
                )
            )
            superdelta = c.delta[i + 1]
        }

        if (completions >= c.superscaling) {
            temp_goal = superstep.mul(
                superdelta.pow(
                    ((completions - c.superscaling + 2) *
                        (completions - c.superscaling + 3)) /
                        2 -
                        1
                )
            )

            if (challenge === 0 && completions >= 55) {
                let scale_point = superstep.mul(
                    superdelta.pow(
                        ((57 - c.superscaling) * (58 - c.superscaling)) / 2 - 1
                    )
                )
                temp_goal = temp_goal.div(scale_point).pow(2).mul(scale_point)
            }
            if (challenge === 4 && completions >= 23) {
                let scale_point = superstep.mul(
                    superdelta.pow(
                        ((25 - c.superscaling) * (26 - c.superscaling)) / 2 - 1
                    )
                )
                temp_goal = temp_goal.div(scale_point).pow(2).mul(scale_point)
            }
            if (challenge === 5 && completions >= 11) {
                let scale_point = superstep.mul(
                    superdelta.pow(
                        ((13 - c.superscaling) * (14 - c.superscaling)) / 2 - 1
                    )
                )
                temp_goal = temp_goal.div(scale_point).pow(2).mul(scale_point)

                if (completions >= 22) {
                    let scale_point2 = superstep
                        .mul(
                            superdelta.pow(
                                ((24 - c.superscaling) *
                                    (25 - c.superscaling)) /
                                    2 -
                                    1
                            )
                        )
                        .div(scale_point)
                        .pow(2)
                        .mul(scale_point)
                    temp_goal = temp_goal
                        .div(scale_point2)
                        .pow(2)
                        .mul(scale_point2)

                    if (completions >= 35) {
                        let scale_point3 = superstep
                            .mul(
                                superdelta.pow(
                                    ((37 - c.superscaling) *
                                        (38 - c.superscaling)) /
                                        2 -
                                        1
                                )
                            )
                            .div(scale_point)
                            .pow(2)
                            .mul(scale_point)
                            .div(scale_point2)
                            .pow(2)
                            .mul(scale_point2)
                        temp_goal = temp_goal
                            .div(scale_point3)
                            .pow(2)
                            .mul(scale_point3)
                    }
                }
            }
            if (challenge >= 1 && challenge <= 4) {
                if (temp_goal.cmp(Decimal.pow(10, 80000)) >= 0) {
                    temp_goal = temp_goal
                        .div(Decimal.pow(10, 80000))
                        .pow(0.5)
                        .mul(Decimal.pow(10, 80000))
                }
            }
        }
    }

    return temp_goal
}

//factorial
let f = []
function factorial(n) {
    if (n == 0 || n == 1) return 1
    if (f[n] > 0) return f[n]
    return (f[n] = factorial(n - 1) * n)
}

//antispice boost scaling
function get_antispice_amount(type, raw) {
    let antispice_amount = new Decimal(0)
    if (raw) {
        switch (type) {
            case "pure":
                antispice_amount = game.antispice[0]
                if (antispice_amount.cmp(Decimal.pow(10, 316)) >= 0)
                    antispice_amount = antispice_amount.pow(1.8545)
                else if (antispice_amount.cmp(Decimal.pow(10, 240)) >= 0)
                    antispice_amount = Decimal.pow(
                        10,
                        (antispice_amount.log(10) - 240) ** 1.35 + 240
                    )
                break
            case "red":
                antispice_amount = game.antispice[1]
                if (antispice_amount.cmp(Decimal.pow(10, 269)) >= 0)
                    antispice_amount = antispice_amount.pow(2.2205)
                else if (antispice_amount.cmp(Decimal.pow(10, 182)) >= 0)
                    antispice_amount = Decimal.pow(
                        10,
                        (antispice_amount.log(10) - 182) ** 1.35 + 182
                    )
                break
            case "yellow":
                antispice_amount = game.antispice[2]
                if (antispice_amount.cmp(Decimal.pow(10, 173)) >= 0)
                    antispice_amount = antispice_amount.pow(2.292)
                else if (antispice_amount.cmp(Decimal.pow(10, 120)) >= 0)
                    antispice_amount = Decimal.pow(
                        10,
                        (antispice_amount.log(10) - 120) ** 1.35 * 1.3 + 120
                    )
                break
            case "green":
                antispice_amount = game.antispice[3]
                if (antispice_amount.cmp(Decimal.pow(10, 112)) >= 0)
                    antispice_amount = antispice_amount.pow(2.3083)
                else if (antispice_amount.cmp(Decimal.pow(10, 79)) >= 0)
                    antispice_amount = Decimal.pow(
                        10,
                        (antispice_amount.log(10) - 79) ** 1.35 * 1.6 + 79
                    )
                break
            case "blue":
                antispice_amount = game.antispice[4]
                if (antispice_amount.cmp(Decimal.pow(10, 63)) >= 0)
                    antispice_amount = antispice_amount.pow(2.4037)
                else if (antispice_amount.cmp(Decimal.pow(10, 43)) >= 0)
                    antispice_amount = Decimal.pow(
                        10,
                        (antispice_amount.log(10) - 43) ** 1.35 * 1.9 + 43
                    )
                break
            case "pink":
                antispice_amount = game.antispice[5]
                if (antispice_amount.cmp(Decimal.pow(10, 24)) >= 0)
                    antispice_amount = antispice_amount.pow(2.5498)
                else if (antispice_amount.cmp(50) >= 0)
                    antispice_amount = Decimal.pow(
                        10,
                        (antispice_amount.log(10) - Math.log10(50)) ** 1.35 *
                            0.9 +
                            Math.log10(50)
                    )
                break
            case "crystal":
                antispice_amount = game.antispice[5]
                if (antispice_amount.cmp(Decimal.pow(10, 24)) >= 0)
                    antispice_amount = antispice_amount.pow(3.927)
                else if (antispice_amount.cmp(50) >= 0)
                    antispice_amount = Decimal.pow(
                        10,
                        (antispice_amount.log(10) - Math.log10(50)) ** 1.35 *
                            1.4 +
                            Math.log10(50)
                    )
                break
        }
    } else {
        switch (type) {
            case "pure":
                antispice_amount = game.antispice[0]
                if (antispice_amount.cmp(Decimal.pow(10, 53)) >= 0)
                    antispice_amount = antispice_amount
                        .div(Decimal.pow(10, 53))
                        .pow(0.5)
                        .mul(Decimal.pow(10, 53))
                if (antispice_amount.cmp(Decimal.pow(10, 78)) >= 0)
                    antispice_amount = antispice_amount
                        .div(Decimal.pow(10, 78))
                        .pow(0.5)
                        .mul(Decimal.pow(10, 78))
                if (antispice_amount.cmp(Decimal.pow(10, 113)) >= 0)
                    antispice_amount = antispice_amount
                        .div(Decimal.pow(10, 113))
                        .pow(0.85)
                        .mul(Decimal.pow(10, 113))
                break
            case "red":
                antispice_amount = game.antispice[1]
                if (antispice_amount.cmp(Decimal.pow(10, 39)) >= 0)
                    antispice_amount = antispice_amount
                        .div(Decimal.pow(10, 39))
                        .pow(0.5)
                        .mul(Decimal.pow(10, 39))
                if (antispice_amount.cmp(Decimal.pow(10, 60)) >= 0)
                    antispice_amount = antispice_amount
                        .div(Decimal.pow(10, 60))
                        .pow(0.5)
                        .mul(Decimal.pow(10, 60))
                if (antispice_amount.cmp(Decimal.pow(10, 86)) >= 0)
                    antispice_amount = antispice_amount
                        .div(Decimal.pow(10, 86))
                        .pow(0.85)
                        .mul(Decimal.pow(10, 86))
                break
            case "yellow":
                antispice_amount = game.antispice[2]
                if (antispice_amount.cmp(Decimal.pow(10, 24)) >= 0)
                    antispice_amount = antispice_amount
                        .div(Decimal.pow(10, 24))
                        .pow(0.5)
                        .mul(Decimal.pow(10, 24))
                if (antispice_amount.cmp(Decimal.pow(10, 38)) >= 0)
                    antispice_amount = antispice_amount
                        .div(Decimal.pow(10, 38))
                        .pow(0.5)
                        .mul(Decimal.pow(10, 38))
                if (antispice_amount.cmp(Decimal.pow(10, 55)) >= 0)
                    antispice_amount = antispice_amount
                        .div(Decimal.pow(10, 55))
                        .pow(0.85)
                        .mul(Decimal.pow(10, 55))
                break
            case "green":
                antispice_amount = game.antispice[3]
                if (antispice_amount.cmp(Decimal.pow(10, 12)) >= 0)
                    antispice_amount = antispice_amount
                        .div(Decimal.pow(10, 12))
                        .pow(0.5)
                        .mul(Decimal.pow(10, 12))
                if (antispice_amount.cmp(Decimal.pow(10, 22)) >= 0)
                    antispice_amount = antispice_amount
                        .div(Decimal.pow(10, 22))
                        .pow(0.5)
                        .mul(Decimal.pow(10, 22))
                if (antispice_amount.cmp(Decimal.pow(10, 34)) >= 0)
                    antispice_amount = antispice_amount
                        .div(Decimal.pow(10, 34))
                        .pow(0.85)
                        .mul(Decimal.pow(10, 34))
                break
            case "blue":
                antispice_amount = game.antispice[4]
                if (antispice_amount.cmp(200) >= 0)
                    antispice_amount = antispice_amount
                        .div(200)
                        .pow(0.5)
                        .mul(200)
                if (antispice_amount.cmp(Decimal.pow(10, 23)) >= 0)
                    antispice_amount = antispice_amount
                        .div(Decimal.pow(10, 23))
                        .pow(0.5)
                        .mul(Decimal.pow(10, 23))
                break
            case "pink":
                antispice_amount = game.antispice[5]
                if (antispice_amount.cmp(Decimal.pow(10, 17)) >= 0)
                    antispice_amount = antispice_amount
                        .div(Decimal.pow(10, 17))
                        .pow(0.5)
                        .mul(Decimal.pow(10, 17))
                if (antispice_amount.cmp(Decimal.pow(10, 24)) >= 0)
                    antispice_amount = antispice_amount
                        .div(Decimal.pow(10, 24))
                        .pow(0.5)
                        .mul(Decimal.pow(10, 24))
                break
        }
    }

    return antispice_amount
}

//antispice perk class
class antispice_perk {
    static perks = []

    desc
    price

    //upgrade constructor
    constructor(desc, price) {
        this.desc = desc
        this.id = antispice_perk.perks.length
        this.price = price

        antispice_perk.perks.push(this)

        //antispice perk button
        let button = document.createElement("BUTTON")
        button.innerHTML =
            '<span id="ap_desc' +
            this.id +
            '">' +
            this.desc +
            '</span><br><span id="ap_cost' +
            this.id +
            '" class="bold">---</span>'
        button.className = "antispice_perk ap_unlocked"
        button.addEventListener("click", () => {
            buy_antispice_perk(this.id)
        })

        //attaching upgrade to antispice perks page
        antispice_map.set(this, button)
        document.getElementById("antispice_perk_block").appendChild(button)
    }
}

//initializing antispice perks
//[0]
new antispice_perk("Repeatable researches are 15% stronger", 0)
//[1]
new antispice_perk("Challenge 7-12 rewards are 5% stronger", 0)
//[2]
new antispice_perk(
    "You gain 10% more rainbow " + spice_text[0] + " from Prestige",
    0
)
//[3]
new antispice_perk("You gain 12.5% more Ansuz runes from Ascension", 0)
//[4]
new antispice_perk("Color boosts and strengtheners are 17.5% stronger", 0)
//[5]
new antispice_perk(
    "Crystal infusions and arcane enchantments are 6% stronger",
    0
)
//[6]
new antispice_perk(
    "ALL " + spice_text[0] + " production multipliers are 1% stronger",
    0
)
//[7]
new antispice_perk(
    "The game speed multiplier is 25% stronger outside of Challenge 9",
    0
)
//[8]
new antispice_perk("Unlocks Expansion", 12)
//[9]
new antispice_perk(
    "Dark " +
        spice_text[0] +
        " replicators are boosted based on unspent rainbow anti" +
        spice_text[0],
    16
)
//done initializing antispice perks

function randn_bm() {
    let u = 0,
        v = 0
    while (u === 0) u = random_float() //Converting [0,1) to (0,1)
    while (v === 0) v = random_float()
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
    num = num / 10.0 + 0.5 // Translate to 0 -> 1
    if (num > 1 || num < 0) return random_float() // resample between 0 and 1
    return num
}

const min_scaling = new Array()
min_scaling.push([
    [0, -80],
    [0.2, -15],
    [0.35, -2],
    [0.5, 0],
    [0.9, 10],
    [0.98, 20],
    [1, 20],
])
min_scaling.push([
    [0, -80],
    [0.2, -15],
    [0.35, -1],
    [0.5, 0],
    [0.9, 5],
    [0.98, 15],
    [1, 15],
])
min_scaling.push([
    [0, -40],
    [0.2, 0],
    [0.9, 0],
    [0.98, 10],
    [1, 10],
])

const max_scaling = new Array()
max_scaling.push([
    [0, -40],
    [0.2, 0],
    [0.35, 4],
    [0.5, 15],
    [0.9, 50],
    [0.98, 80],
    [1, 80],
])
max_scaling.push([
    [0, -40],
    [0.2, 0],
    [0.35, 2],
    [0.5, 10],
    [0.9, 40],
    [0.98, 65],
    [1, 65],
])
max_scaling.push([
    [0, -20],
    [0.2, 0],
    [0.5, 0],
    [0.9, 30],
    [0.98, 50],
    [1, 50],
])

function realm_randomize(type, distance) {
    let min_index = 0
    while (distance > min_scaling[type][min_index + 1][0]) {
        min_index++
    }
    let max_index = 0
    while (distance > max_scaling[type][max_index + 1][0]) {
        max_index++
    }

    let min_domain =
        min_scaling[type][min_index + 1][0] - min_scaling[type][min_index][0]
    let min_range =
        min_scaling[type][min_index + 1][1] - min_scaling[type][min_index][1]
    let min_slope = min_range / min_domain
    let min_value =
        min_slope * (distance - min_scaling[type][min_index][0]) +
        min_scaling[type][min_index][1]

    let max_domain =
        max_scaling[type][max_index + 1][0] - max_scaling[type][max_index][0]
    let max_range =
        max_scaling[type][max_index + 1][1] - max_scaling[type][max_index][1]
    let max_slope = max_range / max_domain
    let max_value =
        max_slope * (distance - max_scaling[type][max_index][0]) +
        max_scaling[type][max_index][1]

    return min_value + (max_value - min_value) * randn_bm()
}

function realm_range(type, distance, end) {
    let min_index = 0
    while (distance > min_scaling[type][min_index + 1][0]) {
        min_index++
    }
    let max_index = 0
    while (distance > max_scaling[type][max_index + 1][0]) {
        max_index++
    }

    let min_domain =
        min_scaling[type][min_index + 1][0] - min_scaling[type][min_index][0]
    let min_range =
        min_scaling[type][min_index + 1][1] - min_scaling[type][min_index][1]
    let min_slope = min_range / min_domain
    let min_value =
        min_slope * (distance - min_scaling[type][min_index][0]) +
        min_scaling[type][min_index][1]

    let max_domain =
        max_scaling[type][max_index + 1][0] - max_scaling[type][max_index][0]
    let max_range =
        max_scaling[type][max_index + 1][1] - max_scaling[type][max_index][1]
    let max_slope = max_range / max_domain
    let max_value =
        max_slope * (distance - max_scaling[type][max_index][0]) +
        max_scaling[type][max_index][1]

    if (end === 1) {
        return max_value
    } else if (end === 0) {
        return min_value
    }
}

class realm {
    static realms = []

    //realm constructor
    constructor(x, y, normal, special, reset, size, col1, col2, angle) {
        this.id = realm.realms.length
        this.x = x
        this.y = y
        this.normal = normal
        this.special = special
        this.reset = reset
        this.size = size
        this.col1 = col1
        this.col2 = col2
        this.angle = angle
        this.name = ""

        realm.realms.push(this)

        let realm_element = document.createElement("DIV")
        realm_element.className = "realm"
        if (this.id === game.current_realm)
            realm_element.className = "realm current_realm"
        realm_element.style.width = 2.5 * this.size + "em"
        realm_element.style.height = 2.5 * this.size + "em"
        realm_element.style.left = 1020 + 0.6 * this.x - 1.25 * this.size + "em"
        realm_element.style.top = 1020 + 0.6 * this.y - 1.25 * this.size + "em"
        realm_element.style.backgroundImage =
            "linear-gradient(" +
            this.angle +
            "deg, " +
            this.col1 +
            ", " +
            this.col2 +
            ")"

        realm_element.addEventListener("mouseover", () => {
            game.hovered_realm = this.id
        })
        realm_element.addEventListener("mouseout", () => {
            game.hovered_realm = -1
        })
        realm_element.addEventListener("click", () => {
            if (game.selected_realm === this.id) {
                game.selected_realm = -1
                document.getElementById("exploration_selected").style.display =
                    "none"
            } else {
                if (
                    ((this.x - realm.realms[game.current_realm].x) ** 2 +
                        (this.y - realm.realms[game.current_realm].y) ** 2) **
                        0.5 <
                        40 + 10 * game.jump_distance_level &&
                    (this.x ** 2 + this.y ** 2) ** 0.5 > 160 &&
                    this.id >= 6
                ) {
                    game.selected_realm = this.id
                    document.getElementById(
                        "exploration_selected"
                    ).style.display = "block"
                    document.getElementById(
                        "exploration_selected"
                    ).style.width = 3.75 * this.size + "em"
                    document.getElementById(
                        "exploration_selected"
                    ).style.height = 3.75 * this.size + "em"
                    document.getElementById("exploration_selected").style.left =
                        1020 + 0.6 * this.x - 1.875 * this.size + "em"
                    document.getElementById("exploration_selected").style.top =
                        1020 + 0.6 * this.y - 1.875 * this.size + "em"
                    if (this.id === game.current_realm)
                        document.getElementById(
                            "exploration_selected"
                        ).className = "current_realm"
                    else
                        document.getElementById(
                            "exploration_selected"
                        ).className = ""
                }
            }
        })

        document.getElementById("exploration_map").appendChild(realm_element)
    }
}

//generating the realm layout
function generate_realms() {
    let start_time = Date.now()

    let turn = random_float() / 4 + 0.25
    let dir = (-1) ** Math.floor(random_float() * 2)
    let spin = random_float() * 2 * Math.PI

    console.log("turn: " + turn * dir + "\nspin: " + spin)

    let order = [0, 1, 2, 3, 4]
    let c = 5
    while (c > 0) {
        let r = Math.floor(random_float() * c)
        c--
        ;[order[c], order[r]] = [order[r], order[c]]
    }

    new realm(0, 0, 0, 0, 0, 3, "#000000", "#000000", 0)

    let min_distance = 16
    let radius = 1600

    for (let i = 0; i < 5; i++) {
        if (i === 0) {
            new realm(
                radius *
                    Math.cos(
                        1 / (turn * dir) + order[i] * 0.4 * Math.PI + spin
                    ),
                radius *
                    Math.sin(
                        1 / (turn * dir) + order[i] * 0.4 * Math.PI + spin
                    ),
                -99,
                -99,
                -90,
                1.5,
                "hsl(" +
                    random_float() * 360 +
                    ", 100%, " +
                    (random_float() ** 3 * 60 + 40) +
                    "%)",
                "hsl(" +
                    random_float() * 360 +
                    ", 100%, " +
                    (random_float() ** 3 * 60 + 40) +
                    "%)",
                random_float() * 180
            )
        } else {
            new realm(
                radius *
                    Math.cos(
                        1 / (turn * dir) + order[i] * 0.4 * Math.PI + spin
                    ),
                radius *
                    Math.sin(
                        1 / (turn * dir) + order[i] * 0.4 * Math.PI + spin
                    ),
                -60,
                -60,
                -30,
                1.5,
                "hsl(" +
                    random_float() * 360 +
                    ", 100%, " +
                    (random_float() ** 3 * 60 + 40) +
                    "%)",
                "hsl(" +
                    random_float() * 360 +
                    ", 100%, " +
                    (random_float() ** 3 * 60 + 40) +
                    "%)",
                random_float() * 180
            )
        }
    }

    let distance = new Array()

    let chosen = undefined

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 98; j++) {
            distance.push(j * 0.01 + 0.02)
        }
        if (game.new_generation) {
            if (i === 0) {
                for (let j = 0; j < 699; j++) {
                    let rand = random_float()
                    distance.push(
                        ((2 * rand - rand ** 2) /
                            (1 + 2 * rand - 2 * rand ** 2)) *
                            0.98 +
                            0.02
                    )
                }
            } else {
                for (let j = 0; j < 701; j++) {
                    let rand = random_float()
                    distance.push(
                        ((2 * rand - rand ** 2) /
                            (1 + 2 * rand - 2 * rand ** 2)) *
                            0.98 +
                            0.02
                    )
                }
            }
        } else {
            if (i === 0) {
                for (let j = 0; j < 600; j++) {
                    distance.push(random_float() ** 0.8 * 0.98 + 0.02)
                }
            } else {
                for (let j = 0; j < 601; j++) {
                    distance.push(random_float() ** 0.8 * 0.98 + 0.02)
                }
            }
        }
        distance.sort(function (a, b) {
            return a - b
        })
        if (i === 0) {
            distance.splice(0, 0, 0.65)
        }

        let fail_count = 0

        while (distance.length > 0) {
            if (game.new_generation && fail_count > 1000) break
            if (!game.new_generation && fail_count > 200) break

            let width = 1.25 - 1.25 * distance[0]
            if (distance[0] < 0.2) width = 1
            let shift =
                random_float() * width * 0.4 * Math.PI - width * 0.2 * Math.PI
            if (
                game.new_generation &&
                distance[0] === 0.65 &&
                realm.realms.length <= 6
            )
                shift = 0

            let x =
                radius *
                distance[0] *
                Math.cos(
                    distance[0] / (turn * dir) +
                        i * 0.4 * Math.PI +
                        spin +
                        shift
                )
            let y =
                radius *
                distance[0] *
                Math.sin(
                    distance[0] / (turn * dir) +
                        i * 0.4 * Math.PI +
                        spin +
                        shift
                )

            let status = "checking"
            let tries = 0
            while (status === "checking") {
                let fail = false
                if (tries < 1000) {
                    for (const r of realm.realms) {
                        if (
                            ((r.x - x) ** 2 + (r.y - y) ** 2) ** 0.5 <
                            min_distance
                        ) {
                            shift =
                                random_float() * width * 0.4 * Math.PI -
                                width * 0.2 * Math.PI
                            if (
                                game.new_generation &&
                                distance[0] === 0.65 &&
                                realm.realms.length <= 6
                            )
                                shift = 0
                            x =
                                radius *
                                distance[0] *
                                Math.cos(
                                    distance[0] / (turn * dir) +
                                        i * 0.4 * Math.PI +
                                        spin +
                                        shift
                                )
                            y =
                                radius *
                                distance[0] *
                                Math.sin(
                                    distance[0] / (turn * dir) +
                                        i * 0.4 * Math.PI +
                                        spin +
                                        shift
                                )
                            tries++
                            fail = true
                            break
                        }
                    }
                } else {
                    fail = true
                    fail_count++
                    status = "failed"
                }

                if (!fail) {
                    status = "passed"
                }
            }

            if (status === "passed") {
                if (
                    distance[0] === 0.65 &&
                    ((realm.realms.length <= 6 && game.new_generation) ||
                        (i === 0 && !game.new_generation))
                ) {
                    new realm(
                        x,
                        y,
                        0,
                        0,
                        0,
                        1,
                        "hsl(" +
                            random_float() * 360 +
                            ", 100%, " +
                            (random_float() ** 3 * 60 + 40) +
                            "%)",
                        "hsl(" +
                            random_float() * 360 +
                            ", 100%, " +
                            (random_float() ** 3 * 60 + 40) +
                            "%)",
                        random_float() * 180
                    )
                    if (game.new_generation) {
                        let direction = Math.atan2(y, x) + Math.PI
                        let normal_stat = realm_randomize(0, 0.375)
                        let special_stat = realm_randomize(1, 0.375)
                        let reset_stat = realm_randomize(2, 0.375)
                        let normal_quality =
                            0.5 +
                            (normal_stat - realm_range(0, 0.375, 0)) /
                                (realm_range(0, 0.375, 1) -
                                    realm_range(0, 0.375, 0))
                        let special_quality =
                            0.5 +
                            (special_stat - realm_range(1, 0.375, 0)) /
                                (realm_range(1, 0.375, 1) -
                                    realm_range(1, 0.375, 0))
                        let size =
                            0.5 +
                            1 /
                                (1 +
                                    Math.exp(
                                        -4.5 *
                                            (normal_quality +
                                                special_quality -
                                                2)
                                    ))
                        new realm(
                            x + 39.9 * Math.cos(direction),
                            y + 39.9 * Math.sin(direction),
                            normal_stat,
                            special_stat,
                            reset_stat,
                            size,
                            "hsl(" +
                                random_float() * 360 +
                                ", 100%, " +
                                (random_float() ** 3 * 60 + 40) +
                                "%)",
                            "hsl(" +
                                random_float() * 360 +
                                ", 100%, " +
                                (random_float() ** 3 * 60 + 40) +
                                "%)",
                            random_float() * 180
                        )
                    }
                } else {
                    let normal_stat = realm_randomize(0, 1 - distance[0])
                    let special_stat = realm_randomize(1, 1 - distance[0])
                    let reset_stat = realm_randomize(2, 1 - distance[0])
                    let normal_quality =
                        0.5 +
                        (normal_stat - realm_range(0, 1 - distance[0], 0)) /
                            (realm_range(0, 1 - distance[0], 1) -
                                realm_range(0, 1 - distance[0], 0))
                    let special_quality =
                        0.5 +
                        (special_stat - realm_range(1, 1 - distance[0], 0)) /
                            (realm_range(1, 1 - distance[0], 1) -
                                realm_range(1, 1 - distance[0], 0))
                    let reset_quality =
                        0.5 +
                        (reset_stat - realm_range(2, 1 - distance[0], 0)) /
                            (realm_range(2, 1 - distance[0], 1) -
                                realm_range(2, 1 - distance[0], 0))
                    let size =
                        0.5 +
                        1 /
                            (1 +
                                Math.exp(
                                    -3 *
                                        (normal_quality +
                                            special_quality +
                                            reset_quality -
                                            3)
                                ))
                    if (
                        realm_range(2, 1 - distance[0], 1) -
                            realm_range(2, 1 - distance[0], 0) ===
                        0
                    )
                        size =
                            0.5 +
                            1 /
                                (1 +
                                    Math.exp(
                                        -4.5 *
                                            (normal_quality +
                                                special_quality -
                                                2)
                                    ))
                    if (
                        i === order[0] &&
                        distance[0] === 0.11 &&
                        chosen === undefined
                    ) {
                        chosen = new realm(
                            x,
                            y,
                            normal_stat,
                            special_stat,
                            reset_stat,
                            0.5 + 1 / (1 + Math.exp(-2.043)),
                            "hsl(" +
                                random_float() * 360 +
                                ", 100%, " +
                                (random_float() ** 3 * 60 + 40) +
                                "%)",
                            "hsl(" +
                                random_float() * 360 +
                                ", 100%, " +
                                (random_float() ** 3 * 60 + 40) +
                                "%)",
                            random_float() * 180
                        )
                    } else {
                        new realm(
                            x,
                            y,
                            normal_stat,
                            special_stat,
                            reset_stat,
                            size,
                            "hsl(" +
                                random_float() * 360 +
                                ", 100%, " +
                                (random_float() ** 3 * 60 + 40) +
                                "%)",
                            "hsl(" +
                                random_float() * 360 +
                                ", 100%, " +
                                (random_float() ** 3 * 60 + 40) +
                                "%)",
                            random_float() * 180
                        )
                    }
                }
            } else if (status === "failed") {
                let new_distance = random_float() * 0.8 + 0.2
                let k = 1
                while (distance[k] < new_distance) {
                    k++
                }
                distance.splice(k, 0, new_distance)
            }

            distance.shift()
        }

        console.log(
            "arm " +
                (i + 1) +
                ": realm placement failed " +
                fail_count +
                " times"
        )
    }

    chosen.normal =
        (realm_range(0, 0.89, 1) - realm_range(0, 0.89, 0)) * 0.727 +
        realm_range(0, 0.89, 0)
    chosen.special =
        (realm_range(1, 0.89, 1) - realm_range(1, 0.89, 0)) * 0.727 +
        realm_range(1, 0.89, 0)
    chosen.reset =
        (realm_range(2, 0.89, 1) - realm_range(2, 0.89, 0)) * 0.727 +
        realm_range(2, 0.89, 0)

    let mobile = Number(
        getComputedStyle(document.body).getPropertyValue("--mobile")
    )

    document.getElementsByTagName("main")[0].style.display = "block"
    document.getElementById("expansion_page").style.display = "block"

    let total_length = document.getElementById("exploration_map").scrollWidth

    document.getElementById("exploration_view").style.zoom =
        (document.getElementById("exploration_screen").offsetWidth * 100) /
            2560 +
        "%"
    if (mobile)
        document.getElementById("exploration_view").style.zoom =
            (document.getElementById("exploration_screen").offsetWidth *
                100 *
                29376) /
                (2560 * 0.43 * total_length) +
            "%"

    let screen_width = document.getElementById("exploration_view").clientWidth
    let screen_height = document.getElementById("exploration_view").clientHeight
    let unit = total_length / 3400

    if (mobile) {
        document.getElementById("exploration_view").scrollLeft =
            -realm.realms[game.current_realm].y * unit +
            total_length / 2 -
            screen_width / 2
        document.getElementById("exploration_view").scrollTop =
            realm.realms[game.current_realm].x * unit +
            total_length / 2 -
            screen_height / 2
    } else {
        document.getElementById("exploration_view").scrollLeft =
            realm.realms[game.current_realm].x * unit +
            total_length / 2 -
            screen_width / 2
        document.getElementById("exploration_view").scrollTop =
            realm.realms[game.current_realm].y * unit +
            total_length / 2 -
            screen_height / 2
    }

    document.getElementsByTagName("main")[0].style.display = "none"
    if (game.tab !== 4 || game.subtab[5] !== 0)
        document.getElementById("expansion_page").style.display = "none"

    let ctx = document.getElementById("exploration_selected").getContext("2d")
    ctx.clearRect(0, 0, 256, 256)
    ctx.strokeStyle = "white"
    ctx.lineWidth = 10
    for (let i = 0; i < 4; i++) {
        ctx.beginPath()
        ctx.arc(
            128,
            128,
            120,
            (-0.2 + i * 0.5) * Math.PI,
            (0.2 + i * 0.5) * Math.PI
        )
        ctx.stroke()
    }

    if (game.selected_realm !== -1) {
        document.getElementById("exploration_selected").style.display = "block"
        document.getElementById("exploration_selected").style.width =
            3.5 * realm.realms[game.selected_realm].size + "em"
        document.getElementById("exploration_selected").style.height =
            3.5 * realm.realms[game.selected_realm].size + "em"
        document.getElementById("exploration_selected").style.left =
            1020 +
            0.6 * realm.realms[game.selected_realm].x -
            1.75 * realm.realms[game.selected_realm].size +
            "em"
        document.getElementById("exploration_selected").style.top =
            1020 +
            0.6 * realm.realms[game.selected_realm].y -
            1.75 * realm.realms[game.selected_realm].size +
            "em"
        if (game.selected_realm === game.current_realm)
            document.getElementById("exploration_selected").className =
                "current_realm"
        else document.getElementById("exploration_selected").className = ""
    } else {
        document.getElementById("exploration_selected").style.display = "none"
    }

    console.log("naming realms...")

    realm.realms[0].name = "The Void"
    realm.realms[1].name = "Eos"
    realm.realms[2].name = "Aetherus"
    realm.realms[3].name = "Atrophyx"
    realm.realms[4].name = "Syntheon"
    realm.realms[5].name = "Termina"
    let gen = new MarkovGenerator()
    gen.init(training_list)
    let duplicate_count = 0

    let k = 200
    if (game.new_generation) k = 228
    let clusters = new Array(k)
    for (let i = 0; i < k; i++) {
        clusters[i] = new Array()
    }
    let seeds = new Array()
    let temp_seeds = new Array()
    if (game.new_generation) {
        for (let i = 0; i < 3995; i++) {
            temp_seeds.push(realm.realms[i + 6])
        }
    } else {
        for (let i = 0; i < 3495; i++) {
            temp_seeds.push(realm.realms[i + 6])
        }
    }
    for (let i = 0; i < k; i++) {
        let s = Math.floor(random_float() * temp_seeds.length)
        seeds.push(temp_seeds[s])
        temp_seeds.splice(s, 1)
    }
    for (const r of realm.realms) {
        if (r.id >= 6) {
            let s = 0
            for (let i = 1; i < k; i++) {
                if (
                    (r.x - seeds[i].x) ** 2 + (r.y - seeds[i].y) ** 2 <
                    (r.x - seeds[s].x) ** 2 + (r.y - seeds[s].y) ** 2
                )
                    s = i
            }
            clusters[s].push(r)
        }
    }
    let centers = new Array(k)
    for (let i = 0; i < k; i++) {
        let avg_x = 0
        let avg_y = 0
        for (const r of clusters[i]) {
            avg_x += r.x
            avg_y += r.y
        }
        centers[i] = [avg_x / clusters[i].length, avg_y / clusters[i].length]
    }
    clusters = new Array(k)
    for (let i = 0; i < k; i++) {
        clusters[i] = new Array()
    }
    for (const r of realm.realms) {
        if (r.id >= 6) {
            let s = 0
            for (let i = 1; i < k; i++) {
                if (
                    (r.x - centers[i][0]) ** 2 + (r.y - centers[i][1]) ** 2 <
                    (r.x - centers[s][0]) ** 2 + (r.y - centers[s][1]) ** 2
                )
                    s = i
            }
            clusters[s].push(r)
        }
    }
    let used_names = new Array()
    const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]
    for (let i = 0; i < k; i++) {
        if (clusters[i].length > 1) {
            let n = Math.floor(
                random_float() * random_float() * 4 +
                    random_float() * random_float() * 4 +
                    2
            )
            if (n > 10) n = 10
            if (n > clusters[i].length) n = clusters[i].length
            let closest = new Array()
            for (const r of clusters[i]) {
                if (closest.length === 0) {
                    closest.push(r)
                } else if (closest.length < n) {
                    let l = closest.length
                    if (
                        (r.x - centers[i][0]) ** 2 +
                            (r.y - centers[i][1]) ** 2 <
                        (closest[l - 1].x - centers[i][0]) ** 2 +
                            (closest[l - 1].y - centers[i][1]) ** 2
                    ) {
                        let place = l
                        while (
                            (r.x - centers[i][0]) ** 2 +
                                (r.y - centers[i][1]) ** 2 <
                            (closest[place - 1].x - centers[i][0]) ** 2 +
                                (closest[place - 1].y - centers[i][1]) ** 2
                        ) {
                            place--
                            if (place === 0) break
                        }
                        closest.push(closest[l - 1])
                        for (let j = l - 1; j > place; j--) {
                            closest[j] = closest[j - 1]
                        }
                        closest[place] = r
                    } else {
                        closest.push(r)
                    }
                } else {
                    if (
                        (r.x - centers[i][0]) ** 2 +
                            (r.y - centers[i][1]) ** 2 <
                        (closest[n - 1].x - centers[i][0]) ** 2 +
                            (closest[n - 1].y - centers[i][1]) ** 2
                    ) {
                        let place = n
                        while (
                            (r.x - centers[i][0]) ** 2 +
                                (r.y - centers[i][1]) ** 2 <
                            (closest[place - 1].x - centers[i][0]) ** 2 +
                                (closest[place - 1].y - centers[i][1]) ** 2
                        ) {
                            place--
                            if (place === 0) break
                        }
                        for (let j = n - 1; j > place; j--) {
                            closest[j] = closest[j - 1]
                        }
                        closest[place] = r
                    }
                }
            }
            let name = gen.generate()
            let duplicate = true
            while (duplicate) {
                duplicate = false
                for (let j = 0; j < training_list.length; j++) {
                    if (name === training_list[j]) {
                        duplicate = true
                        break
                    }
                }
                if (!duplicate) {
                    if (
                        new RegExp(
                            JSON.parse(atob(blacklist)).join("|"),
                            "i"
                        ).test(name)
                    ) {
                        duplicate = true
                    }
                }
                if (!duplicate) {
                    for (let j = 0; j < used_names.length; j++) {
                        if (name === used_names[j]) {
                            duplicate = true
                            break
                        }
                    }
                }
                if (duplicate) {
                    duplicate_count++
                    name = gen.generate()
                }
            }
            used_names.push(name)
            if (n === 2) {
                if (closest[0].size / closest[1].size >= 1.1) {
                    closest[0].name = name + " Major"
                    closest[1].name = name + " Minor"
                } else if (closest[0].size / closest[1].size <= 1 / 1.1) {
                    closest[0].name = name + " Minor"
                    closest[1].name = name + " Major"
                } else {
                    closest[0].name = name + " I"
                    closest[1].name = name + " II"
                }
            } else {
                for (let j = 0; j < n; j++) {
                    closest[j].name = name + " " + roman[j]
                }
            }
        }
    }

    console.log("clustering finished")

    for (let i = 1; i < realm.realms.length; i++) {
        if (realm.realms[i].name === "") {
            let name = gen.generate()
            let duplicate = true
            while (duplicate) {
                duplicate = false
                for (let j = 0; j < training_list.length; j++) {
                    if (name === training_list[j]) {
                        duplicate = true
                        break
                    }
                }
                if (!duplicate) {
                    if (
                        new RegExp(
                            JSON.parse(atob(blacklist)).join("|"),
                            "i"
                        ).test(name)
                    ) {
                        duplicate = true
                    }
                }
                if (!duplicate) {
                    for (let j = 0; j < used_names.length; j++) {
                        if (name === used_names[j]) {
                            duplicate = true
                            break
                        }
                    }
                }
                if (duplicate) {
                    duplicate_count++
                    name = gen.generate()
                }
            }
            used_names.push(name)
            if (realm.realms[i].size >= 1.3 && i >= 6) {
                realm.realms[i].name = name + " Prime"
            } else {
                realm.realms[i].name = name
            }
        }
    }

    console.log("name generation failed " + duplicate_count + " times")

    document.getElementById("noise_seed").seed.baseVal = Math.floor(
        random_float() * 1000000
    )

    ctx = document.getElementById("exploration_stars").getContext("2d")
    ctx.clearRect(0, 0, 4096, 4096)
    ctx.fillStyle = "white"
    for (let i = 0; i < 1000; i++) {
        let rx = Math.floor(random_float() * 4096)
        let ry = Math.floor(random_float() * 4096)
        ctx.globalAlpha = random_float() ** 2.5
        ctx.beginPath()
        ctx.moveTo(rx + 2, ry)
        ctx.lineTo(rx, ry + 2)
        ctx.lineTo(rx - 2, ry)
        ctx.lineTo(rx, ry - 2)
        ctx.lineTo(rx + 2, ry)
        ctx.closePath()
        ctx.fill()
    }

    document.getElementById("exploration_bg2").style.backgroundImage =
        "url(" + document.getElementById("exploration_stars").toDataURL() + ")"

    if (game.fancy_realms) {
        document.getElementById("turbulence").style.display = "block"
        document.getElementById("exploration_bg2").style.display = "block"
    } else {
        document.getElementById("turbulence").style.display = "none"
        document.getElementById("exploration_bg2").style.display = "none"
    }

    if (game.realms_visited.length >= 2) {
        for (let i = 1; i < game.realms_visited.length; i++) {
            let current = realm.realms[game.realms_visited[i]]
            let closest = realm.realms[game.realms_visited[0]]
            for (let j = 0; j < i; j++) {
                if (
                    (current.x - realm.realms[game.realms_visited[j]].x) ** 2 +
                        (current.y - realm.realms[game.realms_visited[j]].y) **
                            2 <
                    (current.x - closest.x) ** 2 + (current.y - closest.y) ** 2
                )
                    closest = realm.realms[game.realms_visited[j]]
            }

            let line = document.createElement("DIV")
            let rx = 1020 + 0.6 * current.x
            let ry = 1020 + 0.6 * current.y
            let tx = 1020 + 0.6 * closest.x
            let ty = 1020 + 0.6 * closest.y
            let length = ((rx - tx) ** 2 + (ry - ty) ** 2) ** 0.5 - 7.5
            let cx = (rx + tx) / 2 - length / 2
            let cy = (ry + ty) / 2 - 0.25

            line.className = "realm_line"

            line.style.left = cx + "em"
            line.style.top = cy + "em"
            line.style.width = length + "em"
            line.style.transform =
                "rotate(" +
                Math.atan2(ry - ty, rx - tx) * (180 / Math.PI) +
                "deg)"

            document.getElementById("exploration_map").appendChild(line)
        }
    }

    console.log("took " + (Date.now() - start_time) + " ms")
}

//galactic upgrade class
class galactic_upgrade {
    static upgrades = []

    desc
    price

    //upgrade constructor
    constructor(desc, price) {
        this.desc = desc
        this.id = galactic_upgrade.upgrades.length
        this.price = price

        galactic_upgrade.upgrades.push(this)

        //galactic upgrade button
        let button = document.createElement("BUTTON")
        button.innerHTML =
            '<span id="ex_desc' +
            this.id +
            '" class="galactic_span">' +
            this.desc +
            '</span><br><span id="ex_cost' +
            this.id +
            '" class="bold galactic_span">---</span>'
        button.className = "galactic_upgrade ex_locked"
        button.addEventListener("click", () => {
            buy_galactic_upgrade(this.id)
        })

        //attaching upgrade to galactic upgrades page
        galactic_map.set(this, button)
        document.getElementById("galactic_upgrade_block").appendChild(button)
    }
}

//initializing galactic upgrades
//[0]
new galactic_upgrade(
    "Dark " +
        spice_text[0] +
        " boosts dark " +
        spice_text[0] +
        " extractors by its total amount",
    new Decimal(1)
)
//[1]
new galactic_upgrade(
    "Unlocks automation for dark constructs and dark conversions",
    new Decimal(2)
)
//[2]
new galactic_upgrade(
    "The free crystal infusions upgrade now scales more",
    new Decimal(3)
)
//[3]
new galactic_upgrade(
    "Researches are no longer gated behind Collapse Challenges, and some are now cheaper",
    new Decimal(8)
)
//[4]
new galactic_upgrade(
    "Dark conversions now also boost research speed 3x",
    new Decimal(21)
)
//[5]
new galactic_upgrade(
    "Quality of life researches are no longer reset by Expansion",
    new Decimal(55)
)
//[6]
new galactic_upgrade(
    "Unlocks more options for Ascension & Collapse automation",
    new Decimal(144)
)
//[7]
new galactic_upgrade(
    "Rainbow anti" +
        spice_text[0] +
        " is now uncapped, and a new anti" +
        spice_text[0] +
        " perk is unlocked",
    new Decimal(610)
)
//[8]
new galactic_upgrade("Unlocks automation for research", fib(19, true))
//[9]
new galactic_upgrade(
    "You automatically gain your best Prestiges, Ascensions, and Collapses/min in real time",
    fib(24, true)
)
//[10]
new galactic_upgrade(
    "The boost from Times Prestiged stat is even stronger",
    fib(31, true)
)
//[11]
new galactic_upgrade(
    "Dark " +
        spice_text[0] +
        " boosts arcane " +
        spice_text[0] +
        " production by its total amount",
    fib(42, true)
)
//[12]
new galactic_upgrade(
    "Unlocks automation for anti" + spice_text[0] + " perks",
    fib(56, true)
)
//[13]
new galactic_upgrade(
    "Times Expanded stat boosts atomic " +
        spice_text[0] +
        " gains, even in Collapse Challenges<br>(Currently: 1.00x)",
    fib(73, true)
)
//[14]
new galactic_upgrade(
    "The boost from Times Ascended stat is stronger",
    fib(93, true)
)
//[15]
new galactic_upgrade(
    "Unlocks automation for Collapse Challenges",
    fib(115, true)
)
//[16]
new galactic_upgrade(
    "The unstable " + spice_text[0] + " decay boost is stronger",
    fib(139, true)
)
//[17]
new galactic_upgrade(
    "Challenge 7's reward instead applies after the realm limit, by a reduced amount",
    fib(164, true)
)
//[18]
new galactic_upgrade("Unlocks automation for revisiting realms", fib(190, true))
//[19]
new galactic_upgrade(
    "Dark " +
        spice_text[0] +
        " generators are boosted based on the previous generator's amount",
    fib(217, true)
)
//done initializing galactic upgrades

//compendium entry setup
function entry_toggle(entry, state) {
    let element = compendium_map.get(entry)

    let body = element.querySelector(".compendium_body")
    let title = element.querySelector(".compendium_title")

    if (state === undefined) {
        if (game.entry_hidden[entry.id]) {
            game.entry_hidden[entry.id] = false
            body.style.display = "block"
            title.className = "compendium_title " + entry.class_name
        } else {
            game.entry_hidden[entry.id] = true
            body.style.display = "none"
            title.className =
                "compendium_title " + entry.class_name + " compendium_hidden"
        }
    } else {
        if (state) {
            body.style.display = "none"
            title.className =
                "compendium_title " + entry.class_name + " compendium_hidden"
        } else {
            body.style.display = "block"
            title.className = "compendium_title " + entry.class_name
        }
    }
}

class compendium {
    static entries = []

    name
    text
    class_name
    unlock

    //entry constructor
    constructor(name, text, class_name, unlock) {
        this.name = name
        this.text = text
        this.class_name = class_name
        this.unlock = unlock
        this.id = compendium.entries.length

        compendium.entries.push(this)

        //entry name
        let title = document.createElement("P")
        title.innerHTML = this.name
        title.className = "compendium_title " + this.class_name
        title.addEventListener("click", () => {
            entry_toggle(this)
        })

        //entry text
        let body = document.createElement("P")
        body.innerHTML = this.text
        body.className = "compendium_body"

        //attaching all text to the div
        let entry = document.createElement("DIV")
        entry.className = "compendium_entry"
        entry.appendChild(title)
        entry.appendChild(body)

        //attaching entry to the compendium page
        compendium_map.set(this, entry)
        document.getElementById("compendium_page").appendChild(entry)
    }
}

let entry_unlocked = new Array(14).fill(false)

function entry_unlock(id) {
    entry_unlocked[id] = true
    game.compendium_new = true
    document.getElementById("compendium").className = "tab notice"
    
    // Announce new compendium entry to screen readers with specific entry name
    if (typeof announceToScreenReader === 'function' && compendium.entries && compendium.entries[id]) {
        const entryName = compendium.entries[id].name || 'Unknown'
        announceToScreenReader('New discovery: ' + entryName + '. Check the Compendium tab for details.')
    }
}

//initializing compendium entries
new compendium(
    "RED " + spice_text[2],
    "- the most common natural " +
        spice_text[0] +
        "<br>- emits heat when subject to enough pressure<br>- has a spicy flavor",
    "red_spice"
)
new compendium(
    "YELLOW " + spice_text[2],
    "- capable of absorbing and retaining energy<br>- often found in an energized state already<br>- has a sour, citrus-like flavor",
    "yellow_spice",
    0
)
new compendium(
    "GREEN " + spice_text[2],
    "- an effective fertilizer due to its nutrient-rich composition<br>- has an earthy flavor",
    "green_spice",
    1
)
new compendium(
    "BLUE " + spice_text[2],
    "- its inherent structure enables efficient heat absorption<br>- thus a very good coolant<br>- has a cool and refreshing flavor",
    "blue_spice",
    2
)
new compendium(
    "PINK " + spice_text[2],
    "- the most valuable natural " +
        spice_text[0] +
        "<br>- exhibits remarkable structural integrity<br>- has a strong tendency to adhere to itself<br>- has a sweet and intensely fruity flavor",
    "pink_spice",
    3
)
new compendium(
    "RAINBOW " + spice_text[2],
    "- created by the fusion of all natural " +
        spice_text[0] +
        "s<br>- explosively reactive, even in small quantities<br>- flavor unknown due to its lethal properties",
    "rainbow_spice",
    4
)
new compendium(
    "CRYSTALLIZED " + spice_text[2],
    "- produced by smelting pink " +
        spice_text[0] +
        " into a solid form<br>- a nearly indestructible material<br>- the smelting process utilizes rainbow " +
        spice_text[0] +
        " as a fuel source",
    "crystal_spice",
    5
)
new compendium(
    "RUNES",
    "- can be found in higher dimensional space<br>- appear to manifest in one of four varieties<br>- radiate powerful energy that can be channeled into specific " +
        spice_text[0] +
        "s",
    "runes",
    6
)
new compendium(
    "ARCANE " + spice_text[2],
    "- the material runes are made of<br>- has magic-like influence over the spacetime continuum<br>- has an unexpectedly strong bitter flavor",
    "arcane_spice",
    7
)
new compendium(
    "ATOMIC " + spice_text[2],
    "- the smallest, indivisible and most fundamental unit of " +
        spice_text[0] +
        "<br>- all " +
        spice_text[0] +
        "s are made up of atomic " +
        spice_text[0],
    "atomic_spice",
    8
)
new compendium(
    "UNSTABLE " + spice_text[2],
    "- created by colliding atomic " +
        spice_text[0] +
        ' together<br>- highly radioactive and undergoes decay into a lower energy state known as "decayed ' +
        spice_text[0] +
        '"<br>- the decay process releases tremendous energy',
    "unstable_spice",
    9
)
new compendium(
    "ANTI" + spice_text[2],
    "- each " +
        spice_text[0] +
        ' has an opposite form, referred to as its "anti' +
        spice_text[0] +
        '"<br>- the most fundamental anti' +
        spice_text[0] +
        " is the inverse counterpart of atomic " +
        spice_text[0] +
        "<br>- other anti" +
        spice_text[0] +
        "s can be synthesized by bombarding their ordinary form with basic anti" +
        spice_text[0] +
        "<br>- anti" +
        spice_text[0] +
        "s exhibit significantly amplified properties compared to their original forms",
    "pure_antispice",
    10
)
new compendium(
    "REALMS",
    '- the largest known structures in the universe<br>- each Realm exists as a separate, self-contained "bubble" encompassing countless galaxies<br>- travelling between Realms requires immense energy',
    "rainbow_antispice",
    11
)
new compendium(
    "GALACTIC SHARDS",
    "- remnants of the cosmos left behind by your past journeys<br>- full of cosmic essence, enabling advanced study of and power over the workings of the universe<br>- they seem incomplete, as if they could be combined to form something",
    "galactic_shards",
    12
)
new compendium(
    "DARK " + spice_text[2],
    "- predominantly found within black holes<br>- exhibits rapidly increasing gravitational pull as its mass accumulates<br>- can only be extracted by warping the gravitational field to draw it out<br>- has a vague raspberry-like flavor when consumed in safe amounts",
    "dark_spice",
    13
)
//done initializing compendium entries
