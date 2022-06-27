//initializing game variables
let game = {
    version: "1.0.0",

    tickspeed: 100,

    notation: 2,
    hotkeys: false,
    condensed: false,

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

    yellow_spice: new Decimal(10),
    yellow_spice_gen: [
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
    ],
    yellow_spice_price: [
        new Decimal(10),
        new Decimal(600),
        new Decimal(250000),
        new Decimal(7 * 10 ** 9),
        new Decimal(2 * 10 ** 15),
        new Decimal(6 * 10 ** 22),
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
    yellow_strengthener_price: new Decimal(2 * 10 ** 7),

    green_spice: new Decimal(20),
    green_spice_gen: [
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
    ],
    green_spice_price: [
        new Decimal(20),
        new Decimal(2500),
        new Decimal(2000000),
        new Decimal(1 * 10 ** 11),
        new Decimal(6 * 10 ** 16),
        new Decimal(3.5 * 10 ** 24),
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
    green_strengthener_price: new Decimal(4 * 10 ** 8),

    blue_spice: new Decimal(40),
    blue_spice_gen: [
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
    ],
    blue_spice_price: [
        new Decimal(40),
        new Decimal(10000),
        new Decimal(1.5 * 10 ** 7),
        new Decimal(2 * 10 ** 12),
        new Decimal(2 * 10 ** 18),
        new Decimal(2.5 * 10 ** 26),
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
    blue_strengthener_price: new Decimal(8 * 10 ** 9),

    pink_spice: new Decimal(80),
    pink_spice_gen: [
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
    ],
    pink_spice_price: [
        new Decimal(80),
        new Decimal(40000),
        new Decimal(1 * 10 ** 8),
        new Decimal(3 * 10 ** 13),
        new Decimal(6.5 * 10 ** 19),
        new Decimal(1.5 * 10 ** 28),
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
    pink_strengthener_price: new Decimal(1.6 * 10 ** 11),

    total_spice: new Decimal(5),
    total_time_played: 0,

    color_boosts: 0,
    tab: 0,
    subtab: [0, 0, 0],
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
    autopr_goal: [10, new Decimal(1)],
}

//initialize map
const spice_map = new Map()
const prestige_map = new Map()

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
new spice_gen("yellow", 0, new Decimal(10), "harvester", "harvesters")
new spice_gen("yellow", 1, new Decimal(600), "machine", "machines")
new spice_gen("yellow", 2, new Decimal(250000), "factory", "factories")
new spice_gen("yellow", 3, new Decimal(7 * 10 ** 9), "agency", "agencies")
new spice_gen("yellow", 4, new Decimal(2 * 10 ** 15), "planet", "planets")
new spice_gen("yellow", 5, new Decimal(6 * 10 ** 22), "galaxy", "galaxies")
//green
new spice_gen("green", 0, new Decimal(20), "harvester", "harvesters")
new spice_gen("green", 1, new Decimal(2500), "machine", "machines")
new spice_gen("green", 2, new Decimal(2000000), "factory", "factories")
new spice_gen("green", 3, new Decimal(1 * 10 ** 11), "agency", "agencies")
new spice_gen("green", 4, new Decimal(6 * 10 ** 16), "planet", "planets")
new spice_gen("green", 5, new Decimal(3.5 * 10 ** 24), "galaxy", "galaxies")
//blue
new spice_gen("blue", 0, new Decimal(40), "harvester", "harvesters")
new spice_gen("blue", 1, new Decimal(10000), "machine", "machines")
new spice_gen("blue", 2, new Decimal(1.5 * 10 ** 7), "factory", "factories")
new spice_gen("blue", 3, new Decimal(2 * 10 ** 12), "agency", "agencies")
new spice_gen("blue", 4, new Decimal(2 * 10 ** 18), "planet", "planets")
new spice_gen("blue", 5, new Decimal(2.5 * 10 ** 26), "galaxy", "galaxies")
//pink
new spice_gen("pink", 0, new Decimal(80), "harvester", "harvesters")
new spice_gen("pink", 1, new Decimal(40000), "machine", "machines")
new spice_gen("pink", 2, new Decimal(1 * 10 ** 8), "factory", "factories")
new spice_gen("pink", 3, new Decimal(3 * 10 ** 13), "agency", "agencies")
new spice_gen("pink", 4, new Decimal(6.5 * 10 ** 19), "planet", "planets")
new spice_gen("pink", 5, new Decimal(1.5 * 10 ** 28), "galaxy", "galaxies")
//crystal
new spice_gen("crystal", 0, Decimal.pow(2, 56), "furnace", "furnaces")
new spice_gen("crystal", 1, Decimal.pow(2, 62), "refinery", "refineries")
new spice_gen("crystal", 2, Decimal.pow(2, 68), "headquarters", "headquarters")
new spice_gen("crystal", 3, Decimal.pow(2, 84), "industry", "industries")
new spice_gen(
    "crystal",
    4,
    Decimal.pow(2, 100),
    "intelligence",
    "intelligences"
)
new spice_gen("crystal", 5, Decimal.pow(2, 124), "singularity", "singularities")
//done initializing spice generators

//prestige upgrade class
class prestige_upgrade {
    static upgrades = []

    desc
    price
    max

    //generator constructor
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

        //attaching generator to spice page
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
    "Strengtheners also boost the next color<br>(1.00x -> 1.20x)",
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
    "All spices boost the previous color based on that spice's amount",
    new Decimal(4096),
    1
)
//[8]
new prestige_upgrade(
    "Unlocks automation for color boosts",
    new Decimal(65536),
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
    "You get 4 free crystal infusions",
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
new prestige_upgrade("Coming soon...", new Decimal(2).pow(1024), 1)
//done initializing prestige upgrades
