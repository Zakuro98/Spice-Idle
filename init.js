Decimal.precision = 50

BigInt.prototype.toJSON = function () {
    return this.toString()
}

//initializing game variables
let game = {
    version: "1.6.2",

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
    collapse_confirm: true,
    collider_animation: true,
    resource_efficiency: false,
    reduce_flashing: false,

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
        new Decimal(4.5 * 10 ** 8),
        new Decimal(6 * 10 ** 13),
        new Decimal(9 * 10 ** 20),
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
        new Decimal(2 * 10 ** 9),
        new Decimal(3 * 10 ** 14),
        new Decimal(5.5 * 10 ** 21),
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
        new Decimal(7 * 10 ** 9),
        new Decimal(1.5 * 10 ** 15),
        new Decimal(3 * 10 ** 22),
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
        new Decimal(3 * 10 ** 10),
        new Decimal(7.5 * 10 ** 15),
        new Decimal(2 * 10 ** 23),
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
    blue_strengthener_price: new Decimal(2.5 * 10 ** 7),

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
        new Decimal(10 ** 11),
        new Decimal(4 * 10 ** 16),
        new Decimal(10 ** 22),
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
    pink_strengthener_price: new Decimal(8 * 10 ** 7),

    total_spice: new Decimal(5),
    collapse_spice: new Decimal(5),
    total_time_played: 0,

    color_boosts: 0,
    tab: 0,
    subtab: [0, 0, 0, 0, 0],
    autosp_toggle: new Array(5).fill(false),
    autocb_toggle: false,

    prestige: 0,
    rainbow_spice: new Decimal(0),
    prestige_bought: new Array(26).fill(0),
    prestige_time_played: 0,

    prestige_amount_history: new Array(10).fill(-1),
    prestige_time_history: new Array(10).fill(-1),

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
    ansuz: 0,
    rune: new Array(3).fill(0),
    rune_power: new Array(3).fill(0),
    total_rune_power: 0,
    rune_boost: [new Decimal(1), new Decimal(1), new Decimal(1)],
    distribute_unlocked: false,
    half_distribute_unlocked: false,

    ascend_bought: new Array(35).fill(false),
    autoup_toggle: false,
    autocr_toggle: false,

    autoas_toggle: false,
    autoas_mode: 0,
    autoas_goal: [1, 30],

    ascend_amount_history: new Array(10).fill(-1),
    ascend_time_history: new Array(10).fill(-1),

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
        20000,
        100000,
        600000,
        3.5 * 10 ** 7,
        3 * 10 ** 9,
        4 * 10 ** 11,
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
    arcane_strengthener_price: 5000000,

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
    unstable_boost: new Decimal(1),

    halflife: 300,
    atomic_efficiency: 0.6,
    atomic_portion: 1,

    collapse_amount_history: new Array(10).fill(-1),
    collapse_time_history: new Array(10).fill(-1),

    collapse_time_played: 0,

    research_view: 0,
    research_select: 0,
    research_pause: true,
    research_complete: new Array(38).fill(0),
    data: new Array(38).fill(0),
    data_boosts: 0,

    autods_toggle: false,
    autods_portion: [0.5, 0, 0, 0, 0],
    autods_budget: [0, 0, 0],

    autoco_toggle: false,
    autoco_mode: 0,
    autoco_goal: [new Decimal(10 ** 50), 120],
    autoco_stop: [new Decimal(10 ** 25), 60],

    autosc_toggle: false,

    collapse_challenge: 0,
    collapse_complete: new Array(6).fill(0),
    pending_completions: 0,
    pending_goal: new Decimal(1),

    free_deity: new Decimal(0),
    augment_start: 2000000,

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
    realm_limit: new Decimal("3.3383819898588070e+154271828182845904"),
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

    peak_ansuz_gain: 0,
    peak_ansuz_amount: 0,
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

function format_small(num) {
    if (typeof num === "bigint") {
        num = Number(num)
    }

    let expn = Math.floor(Math.log10(num))
    if (num / 10 ** expn >= 9.9995 && expn >= 9) num = 10 ** (expn + 1)

    if (game.notation === 10) {
        return format_num(num, 10)
    } else if (game.notation === 11) {
        return format_num(num, 11)
    } else {
        if (
            (game.notation === 2 && num >= 10 ** 9) ||
            (game.notation === 12 && num >= 10 ** 36)
        ) {
            let mantissa = num / 10 ** Math.floor(Math.log10(num))
            return mantissa.toFixed(6) + "e" + Math.floor(Math.log10(num))
        } else if (
            (game.notation === 3 && num >= 10 ** 9) ||
            (game.notation === 13 && num >= 10 ** 36)
        ) {
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
            (game.notation === 4 && num >= 10 ** 9) ||
            ((game.notation === 12 || game.notation === 13) &&
                num >= 10 ** 9 &&
                num < 10 ** 36)
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
        } else if (game.notation === 5 && num >= 10 ** 9) {
            return "e" + Math.log10(num).toFixed(6)
        } else if (game.notation === 6 && num >= 10 ** 9) {
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
            order -= 1
            if (order === 0) {
                output += "A"
            } else if (order > 0) {
                let index = 0
                for (
                    let i = Math.floor(Math.log(order) / Math.log(26));
                    i >= 0;
                    i--
                ) {
                    index = (Math.floor(order / 26 ** i) - 1) % 26
                    if (i === 0) index += 1
                    output += alphabet[index]
                }
            }

            return output
        } else if (game.notation === 7 && num >= 10 ** 9) {
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
            order -= 1
            if (order === 0) {
                output += "A"
            } else if (order > 0) {
                let index = 0
                for (
                    let i = Math.floor(Math.log(order) / Math.log(26));
                    i >= 0;
                    i--
                ) {
                    index = (Math.floor(order / 26 ** i) - 1) % 26
                    if (i === 0) index += 1
                    output += cancer_alphabet[index]
                }
            }

            return output
        } else if (game.notation === 9 && num >= 10 ** 9) {
            let exponent =
                Math.log(num) / Math.log(1.7976931348622053 * 10 ** 308)
            return exponent.toFixed(6) + "∞"
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
new spice_gen("red", 3, new Decimal(4.5 * 10 ** 8), "agency", "agencies")
new spice_gen("red", 4, new Decimal(6 * 10 ** 13), "planet", "planets")
new spice_gen("red", 5, new Decimal(9 * 10 ** 20), "galaxy", "galaxies")
//yellow
new spice_gen("yellow", 0, new Decimal(5), "harvester", "harvesters")
new spice_gen("yellow", 1, new Decimal(250), "machine", "machines")
new spice_gen("yellow", 2, new Decimal(60000), "factory", "factories")
new spice_gen("yellow", 3, new Decimal(2 * 10 ** 9), "agency", "agencies")
new spice_gen("yellow", 4, new Decimal(3 * 10 ** 14), "planet", "planets")
new spice_gen("yellow", 5, new Decimal(5.5 * 10 ** 21), "galaxy", "galaxies")
//green
new spice_gen("green", 0, new Decimal(5), "harvester", "harvesters")
new spice_gen("green", 1, new Decimal(350), "machine", "machines")
new spice_gen("green", 2, new Decimal(100000), "factory", "factories")
new spice_gen("green", 3, new Decimal(7 * 10 ** 9), "agency", "agencies")
new spice_gen("green", 4, new Decimal(1.5 * 10 ** 15), "planet", "planets")
new spice_gen("green", 5, new Decimal(3 * 10 ** 22), "galaxy", "galaxies")
//blue
new spice_gen("blue", 0, new Decimal(5), "harvester", "harvesters")
new spice_gen("blue", 1, new Decimal(500), "machine", "machines")
new spice_gen("blue", 2, new Decimal(250000), "factory", "factories")
new spice_gen("blue", 3, new Decimal(3 * 10 ** 10), "agency", "agencies")
new spice_gen("blue", 4, new Decimal(7.5 * 10 ** 15), "planet", "planets")
new spice_gen("blue", 5, new Decimal(2 * 10 ** 23), "galaxy", "galaxies")
//pink
new spice_gen("pink", 0, new Decimal(5), "harvester", "harvesters")
new spice_gen("pink", 1, new Decimal(750), "machine", "machines")
new spice_gen("pink", 2, new Decimal(500000), "factory", "factories")
new spice_gen("pink", 3, new Decimal(10 ** 11), "agency", "agencies")
new spice_gen("pink", 4, new Decimal(4 * 10 ** 16), "planet", "planets")
new spice_gen("pink", 5, new Decimal(10 ** 24), "galaxy", "galaxies")
//crystal
new spice_gen("crystal", 0, Decimal.pow(2, 56), "furnace", "furnaces")
new spice_gen("crystal", 1, Decimal.pow(2, 62), "refinery", "refineries")
new spice_gen("crystal", 2, Decimal.pow(2, 68), "headquarters", "headquarters")
new spice_gen("crystal", 3, Decimal.pow(2, 84), "industry", "industries")
new spice_gen("crystal", 4, Decimal.pow(2, 100), "empire", "empires")
new spice_gen("crystal", 5, Decimal.pow(2, 124), "singularity", "singularities")
//arcane
new spice_gen("arcane", 0, 20000, "glyph", "glyphs")
new spice_gen("arcane", 1, 100000, "spellbook", "spellbooks")
new spice_gen("arcane", 2, 600000, "wizard", "wizards")
new spice_gen("arcane", 3, 3.5 * 10 ** 7, "shrine", "shrines")
new spice_gen("arcane", 4, 3 * 10 ** 9, "cult", "cults")
new spice_gen("arcane", 5, 4 * 10 ** 11, "deity", "deities")
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
    new Decimal(2).pow(66),
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

//setting up lines between ascension upgrades
function get_offset(element) {
    let rect = element.getBoundingClientRect()
    let page = document.getElementById("ascension_upgrade_panel")
    return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        width: rect.width || element.offsetWidth,
        height: rect.height || element.offsetHeight,
    }
}

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
    "The boost from red spice amount is 50% stronger",
    1,
    undefined,
    undefined,
    "0em",
    "0em",
    0
)
//[1]
new ascension_upgrade(
    "The boost from Times Prestiged stat is stronger",
    3,
    0,
    undefined,
    "0em",
    "12em",
    0
)
//[2]
new ascension_upgrade(
    "Increase boost from strengtheners/boosts<br>(2.00x -> 4.00x)",
    6,
    1,
    undefined,
    "0em",
    "24em",
    0
)
//[3]
new ascension_upgrade(
    "Quality of life Prestige upgrades are not reset by Ascension",
    10,
    2,
    undefined,
    "0em",
    "36em",
    0
)
//[4]
new ascension_upgrade(
    "Crystallized spice generator multipliers are stronger",
    24,
    3,
    undefined,
    "10em",
    "48em",
    0
)
//[5]
new ascension_upgrade(
    "You get twice as many free crystal infusions",
    100,
    4,
    undefined,
    "10em",
    "60em",
    0
)
//[6]
new ascension_upgrade(
    "Crystal infusions boost crystallized spice production 1.12x",
    300,
    5,
    undefined,
    "10em",
    "72em",
    0
)
//[7]
new ascension_upgrade(
    "Crystal infusions are 10% stronger",
    800,
    6,
    undefined,
    "20em",
    "84em",
    0
)
//[8]
new ascension_upgrade(
    "Unlocks automation for Prestige upgrades",
    15,
    3,
    undefined,
    "-10em",
    "48em",
    0
)
//[9]
new ascension_upgrade(
    "Unlocks more options for Prestige automation",
    30,
    8,
    undefined,
    "-10em",
    "60em",
    0
)
//[10]
new ascension_upgrade(
    "Unlocks automation for crystallized spice",
    60,
    9,
    undefined,
    "-10em",
    "72em",
    0
)
//[11]
new ascension_upgrade(
    "Strengtheners are 2x stronger",
    500,
    10,
    undefined,
    "-20em",
    "84em",
    0
)
//[12]
new ascension_upgrade(
    "Unlocks automation for Ascension",
    1000,
    6,
    10,
    "0em",
    "84em",
    0
)
//[13]
new ascension_upgrade(
    "Pink spice boosts crystallized spice by its amount",
    5000,
    12,
    undefined,
    "0em",
    "96em",
    0
)
//[14]
new ascension_upgrade(
    "Increase boost from strengtheners/boosts<br>(4.00x -> 6.00x)",
    30000,
    13,
    undefined,
    "0em",
    "108em",
    0
)
//[15]
new ascension_upgrade(
    "Times Ascended stat boosts rainbow spice gains<br>(Currently: 1.00x)",
    140000,
    14,
    undefined,
    "0em",
    "120em",
    0
)
//[16]
new ascension_upgrade(
    "Unlocks Challenge 1",
    500000,
    15,
    undefined,
    "0em",
    "132em",
    1
)
//[17]
new ascension_upgrade(
    "Unlocks automation for arcane enchantments",
    1000000,
    16,
    undefined,
    "-10em",
    "144em",
    0
)
//[18]
new ascension_upgrade(
    "Red spice boosts crystallized spice by its amount",
    3 * 10 ** 7,
    17,
    undefined,
    "-10em",
    "156em",
    0
)
//[19]
new ascension_upgrade(
    "Arcane spice is boosted based on unused Ansuz runes<br>(Currently: 1.00x)",
    2.5 * 10 ** 11,
    18,
    undefined,
    "-10em",
    "168em",
    0
)
//[20]
new ascension_upgrade(
    "Unlocks Challenge 2",
    10 ** 8,
    18,
    undefined,
    "-30em",
    "156em",
    2
)
//[21]
new ascension_upgrade(
    "You gain 1x more Times Prestiged stat<br>(based on color boosts)",
    5000000,
    16,
    undefined,
    "10em",
    "144em",
    0
)
//[22]
new ascension_upgrade(
    "Arcane spice boosts crystallized spice by its amount",
    10 ** 9,
    21,
    undefined,
    "10em",
    "156em",
    0
)
//[23]
new ascension_upgrade(
    "Times Prestiged stat is no longer reset by Ascension",
    10 ** 10,
    22,
    undefined,
    "10em",
    "168em",
    0
)
//[24]
new ascension_upgrade(
    "Unlocks Challenge 3",
    5 * 10 ** 10,
    22,
    undefined,
    "30em",
    "156em",
    3
)
//[25]
new ascension_upgrade(
    "You gain 10% of your pending rainbow spice every second",
    10 ** 12,
    19,
    23,
    "0em",
    "180em",
    0
)
//[26]
new ascension_upgrade(
    "Boosts from rune power are 2x stronger",
    10 ** 13,
    25,
    undefined,
    "0em",
    "192em",
    0
)
//[27]
new ascension_upgrade(
    "Unlocks Challenge 4",
    3 * 10 ** 14,
    26,
    undefined,
    "-10em",
    "204em",
    4
)
//[28]
new ascension_upgrade(
    "Unlocks Challenge 5",
    10 ** 17,
    26,
    undefined,
    "10em",
    "204em",
    5
)
//[29]
new ascension_upgrade(
    "Arcane enchantments also boost arcane spice production 1.34x",
    6 * 10 ** 15,
    27,
    undefined,
    "-20em",
    "216em",
    0
)
//[30]
new ascension_upgrade(
    "Red spice boosts arcane spice by its amount",
    10 ** 18,
    28,
    undefined,
    "20em",
    "216em",
    0
)
//[31]
new ascension_upgrade(
    "Arcane spice boosts itself by its amount",
    3 * 10 ** 19,
    27,
    28,
    "0em",
    "216em",
    0
)
//[32]
new ascension_upgrade(
    "Arcane spice glyphs produce crystallized spice singularities",
    5 * 10 ** 20,
    31,
    undefined,
    "0em",
    "228em",
    0
)
//[33]
new ascension_upgrade(
    "Boosts from rune power are 8x stronger",
    10 ** 22,
    32,
    undefined,
    "0em",
    "240em",
    0
)
//[34]
new ascension_upgrade(
    "Unlocks Challenge 6",
    10 ** 24,
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
            enter_ascension_challenge(this.id + 1)
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
    "All spice production boosts from upgrades are disabled<br>Reward: Unlock arcane spice",
    Decimal.pow(10, 540),
    16
)
//challenge 2
new ascension_challenge(
    "Crystallized & arcane spice production is disabled<br>Reward: Crystallized spice multipliers are even stronger",
    Decimal.pow(10, 1100),
    20
)
//challenge 3
new ascension_challenge(
    "Color boost requirements scale 10x harder<br>Reward: Strengtheners and infusions are even stronger",
    Decimal.pow(10, 700),
    24
)
//challenge 4
new ascension_challenge(
    "Generators 4-6 don't produce anything<br>Reward: Multipliers for generators 4-6 are slightly stronger",
    Decimal.pow(10, 4650),
    27
)
//challenge 5
new ascension_challenge(
    "Normal/crystallized spice production stops after 1 second,<br>arcane enchantments do nothing except refresh production<br>Reward: Boosts from rune power are 4x stronger",
    Decimal.pow(10, 14000),
    28
)
//challenge 6
new ascension_challenge(
    "Same as Challenge 1, but rune power production is disabled<br>Reward: Unlock Collapse",
    Decimal.pow(10, 1450),
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

    //upgrade constructor
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

        //attaching research to ascension challenges page
        research_map.set(this, button)
        document.getElementById("research_available").appendChild(button)

        //completed research button
        button = document.createElement("BUTTON")
        button.innerHTML = this.id + 1
        button.className = "research_button r_completed"
        button.addEventListener("click", () => {
            research_view(this.id + 1)
        })

        //attaching research to ascension challenges page
        research_map2.set(this, button)
        document.getElementById("research_completed").appendChild(button)
    }
}

//initializing collapse researches
//research 0
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
//research 1
new research(
    "Quality of life Ascension upgrades are no longer reset by Collapse",
    undefined,
    false,
    false,
    1000
)
//research 2
new research(
    "Unstable spice decay now also boosts crystallized spice production",
    1,
    false,
    false,
    6000
)
//research 3
new research(
    "Rune power is produced 5x faster<br>Current rune power production boost: 1x",
    2,
    true,
    false,
    10000,
    5000,
    1.75,
    2.5
)
//research 4
new research(
    "Unlocks the Distributor, which can automate Ascension upgrades",
    2,
    false,
    false,
    4000
)
//research 5
new research(
    "Atomic spice gains are additionally boosted by total rune power produced<br>Current boost: 1.00x",
    4,
    false,
    true,
    20000
)
//research 6
new research(
    "Unlocks automation for runes and arcane spice in the Distributor",
    5,
    false,
    false,
    8000
)
//research 7
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
//research 8
new research(
    "Ascension Challenges are automatically completed when they are unlocked",
    6,
    false,
    false,
    50000
)
//research 9
new research(
    "Unstable spice decay now also boosts arcane spice production",
    6,
    false,
    false,
    100000
)
//research 10
new research(
    "Ansuz rune gains from Ascension are boosted by Times Collapsed statistic<br>Current boost: 1.00x",
    8,
    false,
    true,
    200000
)
//research 11
new research(
    "You get 1 free arcane enchantment for every 10 arcane enchantments you have",
    9,
    false,
    true,
    400000
)
//research 12
new research(
    "Rune power boosts are an extra 50% stronger (for up to 12x)",
    10,
    false,
    false,
    900000
)
//research 13
new research(
    "You get 200 free arcane enchantments for every arcane strengthener you have",
    11,
    false,
    true,
    2000000
)
//research 14
new research(
    "Unstable spice boosts are 50% stronger when unstable spice is completely decayed",
    11,
    false,
    false,
    5000000
)
//research 15
new research("Unlocks automation for Collapse", 14, false, false, 15000000)
//research 16
new research(
    "Times Prestiged and Times Ascended statistics are no longer reset by Collapse",
    15,
    false,
    false,
    2.5 * 10 ** 8
)
//research 17
new research(
    "Unspent atomic spice makes the unstable spice decay boost stronger<br>The boost is currently 0.00% stronger",
    16,
    false,
    true,
    4 * 10 ** 9
)
//research 18
new research("Unlocks Challenge 7", 17, false, false, 10 ** 11)
//research 19
new research("Unlocks antispice", -701, false, false, 2.5 * 10 ** 11)
//research 20
new research("Unlocks Challenge 8", -701, false, false, 6.25 * 10 ** 11)
//research 21
new research("Unlocks red antispice", -801, false, false, 10 ** 12)
//research 22
new research(
    "You gain 888x more atomic spice for every Collapse challenge completion<br>Current boost: 1.00x",
    -703,
    false,
    true,
    1.75 * 10 ** 13
)
//research 23
new research("Unlocks Challenge 9", -803, false, false, 5 * 10 ** 15)
//research 24
new research("Unlocks yellow antispice", -901, false, false, 3 * 10 ** 16)
//research 25
new research(
    "You get 50 free arcane enchantments for every Collapse (up to 50% of your bought arcane enchantments)",
    -805,
    false,
    true,
    6 * 10 ** 19
)
//research 26
new research("Unlocks Challenge 10", -904, false, false, 4 * 10 ** 20)
//research 27
new research("Unlocks green antispice", -1001, false, false, 10 ** 21)
//research 28
new research(
    "Collapse Challenges can be completed in bulk",
    -907,
    false,
    false,
    2.8 * 10 ** 24
)
//research 29
new research("Unlocks Challenge 11", -1005, false, false, 5.4 * 10 ** 26)
//research 30
new research("Unlocks blue antispice", -1101, false, false, 7 * 10 ** 27)
//research 31
new research(
    "You gain 50% more rainbow spice after color augments begin",
    -1009,
    false,
    false,
    8.6 * 10 ** 33
)
//research 32
new research("Unlocks Challenge 12", -1106, false, false, 1.68 * 10 ** 35)
//research 33
new research("Unlocks pink antispice", -1201, false, false, 6.8 * 10 ** 35)
//research 34
new research(
    "Unlocks Spice Collider automation",
    -1203,
    false,
    false,
    3.6 * 10 ** 42
)
//research 35
new research(
    "Rune power boosts are an extra 2x stronger (for up to 24x)",
    -1111,
    false,
    false,
    Math.floor(10 ** 44)
)
//research 36
new research(
    "You gain 1x more Times Ascended stat on Ascension,<br>and you gain 1x more Times Collapsed stat on Collapse<br>(Based on Collapse challenge completions)",
    -1205,
    false,
    true,
    Math.floor(((1 + 5 ** 0.5) / 2) * 10 ** 50)
)
//research 37
new research(
    "Unlocks rainbow antispice",
    -1208,
    false,
    false,
    Math.floor(Math.E * 10 ** 57)
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
    scaling1
    delta2
    scaling2
    delta3
    scaling3
    delta4
    scaling4
    delta5
    scaling5
    delta6
    scaling6
    delta7

    //upgrade constructor
    constructor(
        desc,
        unlock,
        superscaling,
        goal,
        delta,
        scaling1,
        delta2,
        scaling2,
        delta3,
        scaling3,
        delta4,
        scaling4,
        delta5,
        scaling5,
        delta6,
        scaling6,
        delta7
    ) {
        this.desc = desc
        this.id = collapse_challenge.challenges.length
        this.unlock = unlock
        this.superscaling = superscaling
        this.goal = goal
        this.delta = delta
        this.scaling1 = scaling1
        this.delta2 = delta2
        this.scaling2 = scaling2
        this.delta3 = delta3
        this.scaling3 = scaling3
        this.delta4 = delta4
        this.scaling4 = scaling4
        this.delta5 = delta5
        this.scaling5 = scaling5
        this.delta6 = delta6
        this.scaling6 = scaling6
        this.delta7 = delta7

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
            enter_collapse_challenge(this.id + 7)
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
    18,
    35,
    Decimal.pow(10, 25),
    Decimal.pow(10, 17),
    5,
    Decimal.pow(10, 21),
    14,
    Decimal.pow(10, 27),
    21,
    Decimal.pow(10, 39),
    -27,
    Decimal.pow(10, 76),
    32,
    Decimal.pow(10, 64),
    -35,
    Decimal.pow(10, 32)
)
//challenge 8
new collapse_challenge(
    "Unstable spice decay gives no boost, it instead produces sixth generators<br>Reward: Unstable spice decay now also produces arcane spice deities<br>Next research unlock in 1 completion",
    20,
    29,
    Decimal.pow(10, 78),
    Decimal.pow(10, 87),
    3,
    Decimal.pow(10, 124),
    7,
    Decimal.pow(10, 152),
    11,
    Decimal.pow(10, 208),
    15,
    Decimal.pow(10, 256),
    -19,
    Decimal.pow(10, 432),
    -24,
    Decimal.pow(10, 512)
)
//challenge 9
new collapse_challenge(
    "The game runs 99,999x slower, reach the goal in 999 microseconds or less<br>Reward: The game runs 2x faster<br>Next research unlock in 1 completion",
    23,
    24,
    Decimal.pow(10, 235),
    Decimal.pow(10, 205),
    4,
    Decimal.pow(10, 250),
    8,
    Decimal.pow(10, 350),
    12,
    Decimal.pow(10, 400),
    -16,
    Decimal.pow(10, 650)
)
//challenge 10
new collapse_challenge(
    "Color augment scaling is much stronger, and color augments begin at 4 color boosts<br>Ascension upgrade prices are also reduced<br>Reward: Color augments begin at 4,000,000 color boosts<br>Next research unlock in 1 completion",
    26,
    21,
    Decimal.pow(10, 1475),
    Decimal.pow(10, 225),
    -5,
    Decimal.pow(10, 375),
    10,
    Decimal.pow(10, 450),
    -13,
    Decimal.pow(10, 700)
)
//challenge 11
new collapse_challenge(
    "Ascension is disabled, but Challenge 6 is not required to Collapse<br>Reward: You gain 1% of your pending Ansuz runes every second<br>Next research unlock in 1 completion",
    29,
    18,
    Decimal.pow(10, 1460),
    Decimal.pow(10, 140),
    6,
    Decimal.pow(10, 180),
    -11,
    Decimal.pow(10, 260),
    -14,
    Decimal.pow(10, 360)
)
//challenge 12
new collapse_challenge(
    "Same as Challenge 6, but all research boosts are disabled, and red, yellow, green, & blue spice production is disabled, and the unstable spice boost is not disabled<br>Reward: You gain data 2x faster while researching<br>Next research unlock in 1 completion",
    32,
    9,
    Decimal.pow(10, 250),
    Decimal.pow(10, 90),
    -2,
    Decimal.pow(10, 80),
    -4,
    Decimal.pow(10, 70),
    -6,
    Decimal.pow(10, 60),
    -7,
    Decimal.pow(10, 50)
)
//done initializing collapse challenges

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
new antispice_perk("Repeatable researches are 11% stronger", 0)
//[1]
new antispice_perk("Challenge 7-12 rewards are 5% stronger", 0)
//[2]
new antispice_perk("You gain 15% more rainbow spice from Prestige", 0)
//[3]
new antispice_perk("You gain 25% more Ansuz runes from Ascension", 0)
//[4]
new antispice_perk("Color boosts and strengtheners are 30% stronger", 0)
//[5]
new antispice_perk(
    "Crystal infusions and arcane enchantments are 5.4% stronger",
    0
)
//[6]
new antispice_perk("ALL spice production multipliers are 1.2% stronger", 0)
//[7]
new antispice_perk(
    "The game speed multiplier is 50% stronger outside of Challenge 9",
    0
)
//[8]
new antispice_perk("Unlocks Expansion", 12)
//done initializing antispice perks
