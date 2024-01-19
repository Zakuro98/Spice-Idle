Decimal.precision = 50

BigInt.prototype.toJSON = function () {
    return this.toString()
}

//initializing game variables
let game = {
    version: "1.7.2",

    tickspeed: 100,
    gamespeed: 1,

    notation: 2,
    hotkeys: true,
    condensed: false,
    ascend_confirm: true,
    challenge_confirm: true,
    exponent_notation: 0,
    high_visibility: false,
    refresh_rate: 20,
    offline_progress: true,
    collapse_confirm: true,
    collider_animation: true,
    resource_efficiency: false,
    reduce_flashing: false,
    antispice_confirm: true,
    catchup_rate: 30,

    entry_hidden: new Array(23).fill(false),
    compendium_new: false,

    global_spice_boost: new Decimal(1),

    red_spice: new Decimal(5),
    highest_red_spice: new Decimal(5),
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
    highest_yellow_spice: new Decimal(5),
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
    highest_green_spice: new Decimal(5),
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
    highest_blue_spice: new Decimal(5),
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
    highest_pink_spice: new Decimal(5),
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
    total_time_played: 0,

    color_boosts: 0,
    tab: 0,
    subtab: [0, 0, 0, 0, 0],
    statistics_unit: [0, 0, 0],
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

    crystal_spice: new Decimal(0),
    highest_crystal_spice: new Decimal(0),
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
    autoas_goal: [new Decimal(1), 30],
    autoas_delta: new Decimal(5),
    autoas_goal2: new Decimal(1),

    ascend_amount_history: new Array(10).fill(-1),
    ascend_time_history: new Array(10).fill(-1),
    ascend_real_time_history: new Array(10).fill(-1),
    ascend_challenge_history: new Array(10).fill(-1),
    ascend_stat_history: new Array(10).fill(-1),

    ascend_time_played: 0,

    ascend_challenge: 0,
    ascend_complete: new Array(6).fill(false),

    arcane_spice: new Decimal(0),
    highest_arcane_spice: new Decimal(0),
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
    realm_limit: new Decimal("1.7193341424918277e+4052718281828459045"),
    red_limit: [
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
    ],
    yellow_limit: [
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
    ],
    green_limit: [
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
    ],
    blue_limit: [
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
    ],
    pink_limit: [
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
    ],
    crystal_limit: [
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
    ],
    arcane_limit: [
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
    ],

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

    real_time_played: [0, 0, 0, 0],
}

let key = {
    digit: [false, false, false, false, false, false],
    shift: false,

    s: false,
    m: false,
    b: false,
    p: false,
    i: false,
    a: false,
    n: false,
    c: false,
    x: false,
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
        } else if (not === 19) {
            return "[" + generate_string(num, false, 6) + "]"
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
            " Spice " +
            this.name.replace(/^\w/, c => c.toUpperCase())
        if (this.color === "crystal")
            gen_name.innerHTML =
                this.color.replace(/^\w/, c => c.toUpperCase()) +
                "lized Spice " +
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
        let gen_until = document.createElement("BUTTON")
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

        //buttons div
        let gen_buttons = document.createElement("DIV")
        gen_buttons.className = "spice_buttons"
        gen_buttons.appendChild(gen_buy)
        gen_buttons.appendChild(gen_until)

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
new spice_gen("arcane", 0, new Decimal(531441), "glyph", "glyphs")
new spice_gen("arcane", 1, Decimal.pow(3, 16), "spellbook", "spellbooks")
new spice_gen("arcane", 2, Decimal.pow(3, 20), "wizard", "wizards")
new spice_gen("arcane", 3, Decimal.pow(3, 36), "shrine", "shrines")
new spice_gen("arcane", 4, Decimal.pow(3, 73), "cult", "cults")
new spice_gen("arcane", 5, Decimal.pow(3, 107), "deity", "deities")
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
new prestige_upgrade("Unlocks automation for red spice", new Decimal(1), 5)
//[1]
new prestige_upgrade(
    "Times Prestiged stat boosts all spice production<br>(Currently: 5x)",
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
    "All spice production is boosted by unspent rainbow spice<br>(Currently: 1.00x)",
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
    "All spices boost the previous color based on that spice's amount",
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
    "Red spice boosts every other color by its amount",
    new Decimal(2).pow(32),
    1
)
//[12]
new prestige_upgrade("Unlocks crystallized spice", new Decimal(2).pow(56), 1)
//[13]
new prestige_upgrade(
    "Unlocks automation for crystal infusions",
    new Decimal(2).pow(63),
    1
)
//[14]
new prestige_upgrade(
    "Crystallized spice boosts pink spice by its amount",
    new Decimal(2).pow(81),
    1
)
//[15]
new prestige_upgrade("Unlocks prestige automation", new Decimal(2).pow(100), 1)
//[16]
new prestige_upgrade(
    "Crystallized spice also boosts other colors by its amount",
    new Decimal(2).pow(120),
    1
)
//[17]
new prestige_upgrade(
    "Crystallized spice production is boosted based on your color boosts<br>(Currently: 1.00x)",
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
    "Crystal infusions also boost crystallized spice production 1.08x",
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
    "Crystallized spice production is boosted by unspent rainbow spice<br>(Currently: 1.00x)",
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
    "Crystallized spice furnace multipliers are raised to the 1.25 power",
    new Decimal(2).pow(480),
    1
)
//[24]
new prestige_upgrade(
    "Crystallized spice furnaces produce pink galaxies",
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
    "The boost from red spice amount is 2x stronger",
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
    "Crystallized spice generator multipliers are stronger",
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
    "Crystal infusions boost crystallized spice production 1.12x",
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
    "Unlocks automation for crystallized spice",
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
    "Pink spice boosts crystallized spice by its amount",
    new Decimal(29646),
    12,
    undefined,
    "0em",
    "96em",
    0
)
//[14]
new ascension_upgrade(
    "Increase boost from strengtheners/boosts<br>(4.00x -> 6.00x)",
    new Decimal(169071),
    13,
    undefined,
    "0em",
    "108em",
    0
)
//[15]
new ascension_upgrade(
    "Times Ascended stat boosts rainbow spice gains<br>(Currently: 1.00x)",
    new Decimal(508536),
    14,
    undefined,
    "0em",
    "120em",
    0
)
//[16]
new ascension_upgrade(
    "Unlocks Challenge 1",
    new Decimal(7336365),
    15,
    undefined,
    "0em",
    "132em",
    1
)
//[17]
new ascension_upgrade(
    "Unlocks automation for arcane enchantments",
    new Decimal(66027286),
    16,
    undefined,
    "-10em",
    "144em",
    0
)
//[18]
new ascension_upgrade(
    "Red spice boosts crystallized spice by its amount",
    new Decimal(9.007199321849856e15),
    17,
    undefined,
    "-10em",
    "156em",
    0
)
//[19]
new ascension_upgrade(
    "Arcane spice is boosted based on unused Ansuz runes<br>(Currently: 1.00x)",
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
    "Arcane spice boosts crystallized spice by its amount",
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
    "You gain 10% of your pending rainbow spice every second",
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
    "Arcane enchantments also boost arcane spice production 1.08x",
    new Decimal(1.7353473718952628e180),
    27,
    undefined,
    "-20em",
    "216em",
    0
)
//[30]
new ascension_upgrade(
    "Red spice boosts arcane spice by its amount",
    Decimal.pow(10, 385).mul(4.3167666593814529),
    28,
    undefined,
    "20em",
    "216em",
    0
)
//[31]
new ascension_upgrade(
    "Arcane spice boosts itself by its amount",
    Decimal.pow(10, 501).mul(7.5039392714382114),
    27,
    28,
    "0em",
    "216em",
    0
)
//[32]
new ascension_upgrade(
    "Arcane spice glyphs produce crystallized spice galaxies",
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
            " μg rainbow spice</span>"
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
    "Crystal infusions cannot be purchased<br>Reward: Unlock arcane spice",
    Decimal.pow(10, 500),
    16
)
//challenge 2
new ascension_challenge(
    "Crystallized & arcane spice production is disabled<br>Reward: Crystallized spice multipliers are even stronger",
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
    "Normal/crystallized spice production stops after 1 second,<br>arcane enchantments do nothing except refresh production<br>Reward: Boosts from rune power are now 2x stronger",
    Decimal.pow(10, 19850),
    28
)
//challenge 6
new ascension_challenge(
    "All spice production boosts from Prestige and Ascension upgrades<br>are disabled, and rune power production is disabled<br>Reward: Unlock Collapse",
    Decimal.pow(10, 6360),
    34
)
//done initializing ascension challenges

//collapse research class
class research {
    static researches = []

    desc
    req
    repeat
    special
    data
    unit
    factor
    factor2

    //research constructor
    constructor(desc, req, repeat, special, data, unit, factor, factor2) {
        this.desc = desc
        this.id = research.researches.length
        this.req = req
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
    "The half-life of unstable spice becomes 33% shorter<br>Current unstable spice half-life: 10 minutes",
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
    false,
    false,
    1000
)
//[2] #3
new research(
    "Unstable spice decay now also boosts crystallized spice production",
    0,
    false,
    false,
    6000
)
//[3] #4
new research(
    "The rune power production exponent is increased by 0.100<br>Current rune power production exponent: 2.00",
    2,
    true,
    false,
    10000,
    5000,
    1.75,
    2.5
)
//[4] #5
new research("Unlocks automation for Ascension upgrades", 2, false, false, 4000)
//[5] #6
new research(
    "Atomic spice gains are additionally boosted by total rune power produced<br>Current boost: 1.00x",
    3,
    false,
    true,
    20000
)
//[6] #7
new research(
    "Unlocks the Distributor, which automates rune distribution",
    5,
    false,
    false,
    8000
)
//[7] #8
new research(
    "Atomic spice conversion is 10% more efficient<br>Current atomic spice efficiency: 60%",
    5,
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
    false,
    false,
    16000
)
//[9] #10
new research(
    "Ascension Challenges are automatically completed when they are unlocked",
    7,
    false,
    false,
    50000
)
//[10] #11
new research(
    "Unstable spice decay now also boosts arcane spice production",
    7,
    false,
    false,
    100000
)
//[11] #12
new research("Unlocks automation for arcane spice", 9, false, false, 32000)
//[12] #13
new research(
    "Ansuz rune gains from Ascension are boosted by Times Collapsed statistic<br>Current boost: 1.00x",
    9,
    false,
    true,
    200000
)
//[13] #14
new research(
    "You get 1 free arcane enchantment for every 10 arcane enchantments you have",
    10,
    false,
    true,
    400000
)
//[14] #15
new research(
    "Boosts from rune power are now 5x stronger",
    12,
    false,
    false,
    900000
)
//[15] #16
new research(
    "You get 10 free arcane enchantments for every arcane strengthener you have",
    13,
    false,
    true,
    2000000
)
//[16] #17
new research(
    "Unstable spice boosts are 20% stronger when unstable spice is completely decayed",
    13,
    false,
    false,
    5000000
)
//[17] #18
new research("Unlocks automation for Collapse", 16, false, false, 15000000)
//[18] #19
new research(
    "Times Prestiged and Times Ascended statistics are no longer reset by Collapse",
    17,
    false,
    false,
    60000000
)
//[19] #20
new research(
    "Unspent atomic spice makes the unstable spice decay boost stronger<br>The boost is currently 0.00% stronger",
    18,
    false,
    true,
    3e8
)
//[20] #21
new research("Unlocks Challenge 7", 19, false, false, 1.8e9)
//[21] #22
new research("Unlocks antispice", -701, false, false, 9e9)
//[22] #23
new research("Unlocks Challenge 8", -702, false, false, 3.6e10)
//[23] #24
new research("Unlocks red antispice", -801, false, false, 1.08e11)
//[24] #25
new research(
    "You gain 46,656x more atomic spice for every Collapse challenge completion<br>Current boost: 1.00x",
    -703,
    false,
    true,
    2.25e12
)
//[25] #26
new research("Unlocks Challenge 9", -803, false, false, 8e13)
//[26] #27
new research("Unlocks yellow antispice", -901, false, false, 5e14)
//[27] #28
new research(
    "You get 50 free arcane enchantments for every Collapse (up to 50% of your bought arcane enchantments)",
    -805,
    false,
    true,
    8.5e17
)
//[28] #29
new research("Unlocks Challenge 10", -904, false, false, 2.5e19)
//[29] #30
new research("Unlocks green antispice", -1001, false, false, 1e20)
//[30] #31
new research("Unlocks Spice Collider automation", -30, false, false, 1.25e24)
//[31] #32
new research(
    "Collapse Challenges can be completed in bulk",
    -907,
    false,
    false,
    8e25
)
//[32] #33
new research("Unlocks Challenge 11", -1005, false, false, 1e27)
//[33] #34
new research("Unlocks blue antispice", -1101, false, false, 2.8e28)
//[34] #35
new research(
    "You gain 50% more rainbow spice after color augments begin",
    -1009,
    false,
    false,
    7.2e35
)
//[35] #36
new research("Unlocks Challenge 12", -1106, false, false, 1.72e39)
//[36] #37
new research("Unlocks pink antispice", -1201, false, false, 4.21e40)
//[37] #38
new research(
    "Boosts from rune power are now 5x stronger",
    -1111,
    false,
    false,
    Math.floor(((1 + 5 ** 0.5) / 2) * 1e47)
)
//[38] #39
new research(
    "You gain 1x more Times Ascended stat on Ascension,<br>and you gain 1x more Times Collapsed stat on Collapse<br>(Based on Collapse challenge completions)",
    -1204,
    false,
    true,
    Math.floor(Math.PI * 1e49)
)
//[40] #40
new research(
    "Unlocks rainbow antispice",
    -1208,
    false,
    false,
    Math.floor(Math.E * 1e58)
)
//done initializing collapse researches

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
            " atomic spice</span><br>Completions: 0"
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
    "Challenges 1, 3, 4, & 5 simultaneously<br>Reward: Normal spice multipliers are 2.5% stronger<br>Next research unlock in 1 completion",
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
    "Unstable spice decay gives no boost, it instead produces sixth generators<br>Reward: Unstable spice decay now also produces arcane spice deities<br>Next research unlock in 1 completion",
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
    "Same as Challenge 6, but all research boosts are disabled, and red, yellow, green, & blue spice production is disabled<br>Reward: You gain data 2x faster while researching<br>Next research unlock in 1 completion",
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
new antispice_perk("You gain 10% more rainbow spice from Prestige", 0)
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
new antispice_perk("ALL spice production multipliers are 1% stronger", 0)
//[7]
new antispice_perk(
    "The game speed multiplier is 25% stronger outside of Challenge 9",
    0
)
//[8]
new antispice_perk("Unlocks Expansion", 12)
//done initializing antispice perks

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

let entry_unlocked = new Array(20).fill(false)

function entry_unlock(id) {
    entry_unlocked[id] = true
    game.compendium_new = true
    document.getElementById("compendium").className = "tab notice"
}

//initializing compendium entries
new compendium(
    "THE SPICE UNIVERSE",
    "Spices are a fundamental substance that govern almost everything that goes on in your universe. " +
        "They are the first commodity of any civilization, and become the most integral part of their economies." +
        "<br><br>Spice deposits can be found on just about any planet, on the surface or underground. " +
        "They can be gathered with a Harvester, a very basic tool that even primitive civilizations can make." +
        "<br><br>Spices can be found everywhere in this universe, and you've set it upon yourself to exploit them to conquer the universe with your spice empire.",
    "compendium_default"
)
new compendium(
    "RED SPICE",
    "The spice native to your homeworld has a very red hue, giving it its name. " +
        "Red spice is quite common in the universe, and most spice empires will start their journey with it." +
        "<br><br>When subject to enough pressure, red spice can emit a significant amount of heat, making it useful for a variety of industrial and culinary applications." +
        "<br><br>Red spice has the ordinary spicy flavor that you would expect from a spice, and as such it is an obvious choice for many dishes.",
    "red_spice"
)
new compendium(
    "YELLOW SPICE",
    "After a breakthrough, your empire discovered not only yellow spice, but also that more spice colors are probable to exist. " +
        "While these spice colors are unsurprisingly far less ubiquitous than red spice, it seems large spice empires have already been utilizing them before you." +
        "<br><br>Yellow spice has an exceptional capacity for absorbing and retaining energy, making it useful as both an energy source and an efficient method of energy storage. " +
        "Due to these properties, natural yellow spice is often found already full of energy." +
        "<br><br>Yellow spice has a distinctive sour, almost citrusy flavor, and is now often used in sour candies and other similar foods in that niche.",
    "yellow_spice",
    0
)
new compendium(
    "GREEN SPICE",
    "Green spice has an incredibly nutrient-rich composition, allowing it to perform very well as a fertilizer. " +
        "For this reason, it is now the dominant resource for your empire's agricultural practices." +
        "<br><br>However, this nutrient-rich composition gives it a considerable earthy flavor, so it is rarely seen used as an actual spice.",
    "green_spice",
    1
)
new compendium(
    "BLUE SPICE",
    "Blue spice's structure causes it to favor endothermic reactions. Because of this, it has an exceptional ability to cool things. " +
        "This has a variety of applications such as refrigeration, or as a coolant for mechanical or electrical systems." +
        "<br><br>Similarly, it has a cool and refreshing flavor, finding its way as an ingredient in many cold beverages.",
    "blue_spice",
    2
)
new compendium(
    "PINK SPICE",
    "Pink spice has a surprising amount of structural integrity. " +
        "It loves to stick together, and as such it makes for a very good adhesive. " +
        "It is also useful as an ingredient in building materials to make them more durable." +
        "<br><br>The flavor of pink spice is sweet and intensely fruity, making it a highly sought after ingredient for many confections and candies." +
        "<br><br>These two properties together make pink spice the most valuable spice you've discovered by far, and it easily becomes the defining commodity in the economies of all spice empires that get their hands on it.",
    "pink_spice",
    3
)
new compendium(
    "COLOR SHIFTS",
    "Your empire has found a device that - when fed a large amount of spices - returns a lot of energy and data, leading your researchers to discover a new 'color' of spice. " +
        'This event has been dubbed a "Color Shift", and your researchers predict that subsequent Color Shifts may reveal even more colors.',
    "compendium_default",
    0
)
new compendium(
    "COLOR BOOSTS",
    "The data from your last Color Shift led you to the discovery of pink spice, but it also seems to suggest that there are no more natural spices to discover. " +
        "Following this realization, your empire has decided to instead focus the gathered energy on empowering the production of the five spice colors you already have in your inventory. " +
        'This new, different usage of the Color Shift device is instead called a "Color Boost".',
    "compendium_default",
    4
)
new compendium(
    "PRESTIGE",
    "Each Color Boost gathers more and more energy, and with enough of it, spice fusion is possible. " +
        "All five of your spice colors can be fused together, although without even more energy an efficient fusion isn't possible. " +
        "As such, most of your spices will be lost in the process, but what survives will be in the form of a new spice: rainbow spice." +
        '<br><br>This spice fusion event is known as "Prestige".',
    "rainbow_spice",
    5
)
new compendium(
    "RAINBOW SPICE",
    "The first type of spice produced unnaturally, rainbow spice exists as the fusion of the five natural spice colors into one spice. " +
        "This amalgamation causes rainbow spice to be very highly reactive, even in small quantities." +
        "<br><br>The flavor of rainbow spice is unknown, as consuming enough rainbow spice to get any sense of flavor from it would be almost instantly lethal." +
        "<br><br>However, the explosive abilities of rainbow spice are not to be underestimated, and they have many applications if used in a controlled manner. " +
        "The study of rainbow spice is sure to unveil many powerful tools for your empire.",
    "rainbow_spice",
    6
)
new compendium(
    "CRYSTALLIZED SPICE",
    "Crystallized spice is created by placing pink spice into a blast furnace, and heating it up until it melts. " +
        "After removing it from the furnace, it will cool and crystallize into a solid form. " +
        "The explosive properties of rainbow spice are integral to the operation of this furnace." +
        "<br><br>This new solid form of pink spice enhances its cohesiveness even further, making crystallized spice a nearly indestructible material. " +
        "This will be incredibly useful for just about anything your empire could build.",
    "crystal_spice",
    7
)
new compendium(
    "CRYSTAL INFUSIONS",
    "The device behind Color Shifts and Color Boosts can be modified to create a new device. " +
        "This device can instead be fed with crystallized spice, and produces a much more substantial boost to the production of the ordinary spice colors. " +
        'This third iteration of the Color Shift idea is called a "Crystal Infusion".',
    "crystal_spice",
    8
)
new compendium(
    "ASCENSION",
    "Your empire is now starting to rival even the largest spice empires, and your studies have led to the discovery of the ways of Ascension. " +
        "You can now Ascend your empire to the next plane of being. " +
        "All will be left behind, but in the process, mysterious cosmic runes manifest into existence.",
    "runes",
    9
)
new compendium(
    "RUNES",
    "The raw runes conjured into being by Ascension are all of the same composition, and they all bear the same glyph: the Ansuz rune. " +
        "These Ansuz runes have no inherent abilities. " +
        "Their purpose lies instead in serving as a vessel for transmutation into other rune types. " +
        "These other runes continuously radiate energies of different kinds, which will greatly empower your empire moving forward." +
        "<br><br>The material these runes are constructed out of remains a mystery, but studying them may unlock some very strong abilities for your spice empire.",
    "runes",
    10
)
new compendium(
    "ARCANE SPICE",
    "The material the cosmic runes are made of has finally been identified. " +
        'It is an entirely new type of spice your researchers are calling "arcane spice". ' +
        "You've also found a way to use the powers of the runes to channel it into being in spice form." +
        "<br><br>Arcane spice's influence over the spacetime continuum seems to transcend the very laws of physics themselves - almost like magic - and this ability is still not well understood." +
        "<br><br>Arcane spice has an unexpectedly strong bitter flavor, but this does not stop it from finding its niche in your culinary industry.",
    "arcane_spice",
    11
)
new compendium(
    "ARCANE ENCHANTMENTS",
    "Rehashing the same idea as Crystal Infusions, a similar device can be created that utilizes arcane spice's abilities to enhance the efficiency of your crystallized spice production by an enormous amount. " +
        'This higher, more specialized variant of the Crystal Infusion has been dubbed an "Arcane Enchantment".',
    "arcane_spice",
    12
)
new compendium(
    "COLOR AUGMENTS",
    "Your empire has finally surpassed all other spice empires, and you should be proud of this accomplishment. " +
        "But, you now find trouble gathering enough spices for Color Boosts, when you didn't before. " +
        "Perhaps you're missing something...",
    "rainbow_spice",
    13
)
new compendium(
    "COLLAPSE",
    "Your researchers have been on the issue for awhile, and they've found that you have just enough resources to Collapse the universe. " +
        'By dismantling the entire universe, a new entity known as "atomic spice" can be extracted. ' +
        "The universe is then reassembled.",
    "atomic_spice",
    14
)
new compendium(
    "ATOMIC SPICE",
    "The discovery of atomic spice may just be the key to the continued growth of your spice empire. " +
        "Atomic spice is the smallest, indivisible and most fundamental unit of spice. " +
        "All spice types are ultimately made of atomic spice, arranged into different structures and formations." +
        "<br><br>The study and mastery of atomic spice manipulation may pave the way to some interesting new means of progression.",
    "atomic_spice",
    15
)
new compendium(
    "THE SPICE COLLIDER",
    "Following the discovery of atomic spice, your scientists invented an enormous contraption: the Spice Collider. " +
        "It accelerates individual units of atomic spice to incredible speeds before letting them collide, for the purpose of researching whatever may result from this event. " +
        "The Spice Collider will allow you to gain further insights into atomic spice and the nature of all spices, and potentially even create new spices.",
    "atomic_spice",
    16
)
new compendium(
    "UNSTABLE SPICE",
    '"Unstable spice" is the first new spice that was created in the Spice Collider. ' +
        'It is highly radioactive and does not want to stay in this form, thus it decays over time into its lower energy form, known as "decayed spice".' +
        "<br><br>Unstable spice was initially thought of as a failure of the Spice Collider. " +
        "However, your scientists soon noticed that the transformation from unstable spice into decayed spice releases an incredible amount of energy. " +
        "This has many applications for potential weaponry, or in the energy industry. " +
        "It may even be yet another source of power for your spice empire's growth.",
    "unstable_spice",
    17
)
new compendium(
    "ANTISPICE",
    'The second discovery brought by the Spice Collider: smashing units of atomic spice together sometimes creates the "opposite" of atomic spice, which is now considered as the basic form of "antispice". ' +
        'Additionally, your researchers theorize that colliding ordinary spice types with basic antispice may create the "opposite" of those spice types.' +
        "<br><br>Rather than negating the properties of their ordinary counterparts, the antispice variants of a spice may instead amplify their abilities, and may even cause entirely new abilities to manifest. " +
        "The efficiency of harvest of that spice type might also be greatly increased.",
    "pure_antispice",
    18
)
new compendium(
    "REALMS",
    "After your empire seemingly somehow exhausted all resources in the universe, the discovery of Realms followed almost immediately. " +
        "What you once thought was the whole universe was really just a single Realm in the incomprehensibly even more vast universe. " +
        'The new theory is that each Realm is a separate, self-contained "bubble" in the universe, and that most civilizations inside them consider their Realm to be all there is.',
    "rainbow_antispice",
    19
)
//done initializing compendium entries
