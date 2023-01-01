//initializing game variables
let game = {
    version: "1.4.0",

    tickspeed: 100,

    notation: 2,
    hotkeys: true,
    condensed: false,
    ascend_confirm: true,
    challenge_confirm: true,
    exponent_notation: 0,
    high_visibility: false,
    refresh_rate: 20,
    collapse_confirm: true,

    global_spice_boost: new Decimal(1),

    red_spice: new Decimal(5),
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
    red_spice_bought: [0, 0, 0, 0, 0, 0],
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
    yellow_spice_bought: [0, 0, 0, 0, 0, 0],
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
    green_spice_bought: [0, 0, 0, 0, 0, 0],
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
    blue_spice_bought: [0, 0, 0, 0, 0, 0],
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
    pink_spice_bought: [0, 0, 0, 0, 0, 0],
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
    crystal_spice_bought: [0, 0, 0, 0, 0, 0],
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

    crystal_infusion: 0,
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
    arcane_spice_bought: [0, 0, 0, 0, 0, 0],
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

    arcane_enchantment: 0,
    free_enchantment: 0,
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

    collapse_amount_history: new Array(10).fill(-1),
    collapse_time_history: new Array(10).fill(-1),

    collapse_time_played: 0,

    research_view: 0,
    research_select: 0,
    research_pause: true,
    research_complete: new Array(16).fill(0),
    data: new Array(16).fill(0),
    data_boosts: 0,

    autods_toggle: false,
    autods_portion: [0.5, 0, 0, 0, 0],
    autods_budget: [0, 0, 0],

    autoco_toggle: false,
    autoco_mode: 0,
    autoco_goal: [new Decimal(10 ** 50), 120],
    autoco_stop: [new Decimal(10 ** 25), 60],
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
}

function format_small(num) {
    if (game.notation === 10) {
        return format_num(num, 10)
    } else if (game.notation === 11) {
        return format_num(num, 11)
    } else {
        return format_num(num, 0)
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

//initialize map
const spice_map = new Map()
const prestige_map = new Map()
const ascension_map = new Map()
const ascension_map2 = new Map()
const ascension_map3 = new Map()
const challenge_map = new Map()
const research_map = new Map()
const research_map2 = new Map()

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
        gen_buy.innerHTML =
            'Buy one: <span id="' +
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
        gen_until.innerHTML =
            'Buy until 10: <span id="' +
            this.color +
            "_ucost" +
            this.id +
            '" class="' +
            this.color +
            '_cost">---</span>'
        if (this.color === "crystal")
            gen_until.innerHTML =
                'Buy until 5: <span id="' +
                this.color +
                "_ucost" +
                this.id +
                '" class="' +
                this.color +
                '_cost">---</span>'
        if (this.color === "arcane")
            gen_until.innerHTML =
                'Buy until 3: <span id="' +
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

        prestige_upgrade.upgrades.push(this)

        //prestige upgrade button
        let button = document.createElement("BUTTON")
        button.innerHTML = this.desc + '<br><span class="bold">---</span>'
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

        ascension_upgrade.upgrades.push(this)

        //ascension upgrade button
        let button = document.createElement("BUTTON")
        button.innerHTML = this.desc + '<br><span class="bold">---</span>'
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
            format_infdec(this.goal, game.notation) +
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
    Decimal.pow(10, 600),
    24
)
//challenge 4
new ascension_challenge(
    "Generators 4-6 don't produce anything<br>Reward: Multipliers for generators 4-6 are slightly stronger",
    Decimal.pow(10, 5850),
    27
)
//challenge 5
new ascension_challenge(
    "Normal/crystallized spice production stops after 1 second,<br>arcane enchantments do nothing except refresh production<br>Reward: Boosts from rune power are 4x stronger",
    Decimal.pow(10, 15000),
    28
)
//challenge 6
new ascension_challenge(
    "Same as Challenge 1, but rune power production is disabled<br>Reward: Unlocks Collapse",
    Decimal.pow(10, 1440),
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
    "Ansuz rune gains from Ascension are boosted by Times Collapsed stat<br>Current boost: 1.00x",
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
    false,
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
    false,
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
//done initializing collapse researches
