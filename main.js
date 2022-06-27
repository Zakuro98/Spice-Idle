//game operations run every tick
function tick() {
    game.total_time_played += 1 / game.tickspeed
    game.prestige_time_played += 1 / game.tickspeed

    document.documentElement.style.setProperty(
        "--rainbow_spice",
        "hsl(" + ((game.total_time_played * 72) % 360) + ",100%,50%)"
    )

    if (game.autocb_toggle) color_boost()

    if (game.autoin_toggle) max_infusion()

    if (game.autosp_toggle[0]) max_all("red")
    if (game.autosp_toggle[1]) max_all("yellow")
    if (game.autosp_toggle[2]) max_all("green")
    if (game.autosp_toggle[3]) max_all("blue")
    if (game.autosp_toggle[4]) max_all("pink")

    if (game.color_boosts <= 4) {
        game.global_spice_boost = new Decimal(
            2 + 0.2 * game.prestige_bought[2]
        ).pow(game.color_boosts)

        if (game.prestige_bought[18] >= 1) {
            game.global_spice_boost = new Decimal(6).pow(game.color_boosts)
        }
    } else {
        game.global_spice_boost = new Decimal(
            2 + 0.2 * game.prestige_bought[2]
        ).pow(game.color_boosts * 2 - 4)

        if (game.prestige_bought[18] >= 1) {
            game.global_spice_boost = new Decimal(6).pow(
                game.color_boosts * 2 - 4
            )
        }
    }

    if (game.prestige_bought[1] >= 1)
        game.global_spice_boost = game.global_spice_boost.mul(
            2.5 * game.prestige * (game.prestige + 1)
        )

    if (game.prestige_bought[6])
        game.global_spice_boost = game.global_spice_boost.mul(
            game.rainbow_spice.div(256).pow(5).add(1)
        )

    game.global_spice_boost = game.global_spice_boost.mul(
        Decimal.pow(
            5,
            (game.crystal_infusion + game.prestige_bought[20] * 12) * 16
        )
    )

    for (let i = 0; i < 6; i++) {
        game.total_red_spice_boost[i] = game.red_spice_boost[i].mul(
            Decimal.pow(
                2 + 0.2 * game.prestige_bought[2],
                game.red_strengthener +
                    game.yellow_strengthener +
                    game.green_strengthener +
                    game.blue_strengthener +
                    game.pink_strengthener
            )
        )
        game.total_yellow_spice_boost[i] = game.yellow_spice_boost[i].mul(
            Decimal.pow(
                2 + 0.2 * game.prestige_bought[2],
                game.yellow_strengthener +
                    game.green_strengthener +
                    game.blue_strengthener +
                    game.pink_strengthener
            )
        )
        game.total_green_spice_boost[i] = game.green_spice_boost[i].mul(
            Decimal.pow(
                2 + 0.2 * game.prestige_bought[2],
                game.green_strengthener +
                    game.blue_strengthener +
                    game.pink_strengthener
            )
        )
        game.total_blue_spice_boost[i] = game.blue_spice_boost[i].mul(
            Decimal.pow(
                2 + 0.2 * game.prestige_bought[2],
                game.blue_strengthener + game.pink_strengthener
            )
        )
        game.total_pink_spice_boost[i] = game.pink_spice_boost[i].mul(
            Decimal.pow(
                2 + 0.2 * game.prestige_bought[2],
                game.pink_strengthener
            )
        )

        if (game.prestige_bought[18] >= 1) {
            game.total_red_spice_boost[i] = game.red_spice_boost[i].mul(
                Decimal.pow(
                    6,
                    game.red_strengthener +
                        game.yellow_strengthener +
                        game.green_strengthener +
                        game.blue_strengthener +
                        game.pink_strengthener
                )
            )
            game.total_yellow_spice_boost[i] = game.yellow_spice_boost[i].mul(
                Decimal.pow(
                    6,
                    game.yellow_strengthener +
                        game.green_strengthener +
                        game.blue_strengthener +
                        game.pink_strengthener
                )
            )
            game.total_green_spice_boost[i] = game.green_spice_boost[i].mul(
                Decimal.pow(
                    6,
                    game.green_strengthener +
                        game.blue_strengthener +
                        game.pink_strengthener
                )
            )
            game.total_blue_spice_boost[i] = game.blue_spice_boost[i].mul(
                Decimal.pow(6, game.blue_strengthener + game.pink_strengthener)
            )
            game.total_pink_spice_boost[i] = game.pink_spice_boost[i].mul(
                Decimal.pow(6, game.pink_strengthener)
            )
        }

        game.total_red_spice_boost[i] = game.total_red_spice_boost[i].mul(
            game.global_spice_boost
        )
        game.total_yellow_spice_boost[i] = game.total_yellow_spice_boost[i].mul(
            Decimal.pow(
                1 + 0.2 * game.prestige_bought[5],
                game.red_strengthener
            ).mul(game.global_spice_boost)
        )
        game.total_green_spice_boost[i] = game.total_green_spice_boost[i].mul(
            Decimal.pow(
                1 + 0.2 * game.prestige_bought[5],
                game.yellow_strengthener
            ).mul(game.global_spice_boost)
        )
        game.total_blue_spice_boost[i] = game.total_blue_spice_boost[i].mul(
            Decimal.pow(
                1 + 0.2 * game.prestige_bought[5],
                game.green_strengthener
            ).mul(game.global_spice_boost)
        )
        game.total_pink_spice_boost[i] = game.total_pink_spice_boost[i]
            .mul(
                Decimal.pow(
                    1 + 0.2 * game.prestige_bought[5],
                    game.blue_strengthener
                )
            )
            .mul(game.global_spice_boost)

        game.total_crystal_spice_boost[i] = game.crystal_spice_boost[i].mul(
            Decimal.pow(4, game.crystal_strengthener)
        )

        if (game.prestige_bought[7] >= 1) {
            game.total_red_spice_boost[i] = game.total_red_spice_boost[i].mul(
                game.yellow_spice.pow(0.075).add(1)
            )
            game.total_yellow_spice_boost[i] = game.total_yellow_spice_boost[
                i
            ].mul(game.green_spice.pow(0.075).add(1))
            game.total_green_spice_boost[i] = game.total_green_spice_boost[
                i
            ].mul(game.blue_spice.pow(0.075).add(1))
            game.total_blue_spice_boost[i] = game.total_blue_spice_boost[i].mul(
                game.pink_spice.pow(0.075).add(1)
            )
        }

        if (game.prestige_bought[11] >= 1) {
            game.total_yellow_spice_boost[i] = game.total_yellow_spice_boost[
                i
            ].mul(game.red_spice.pow(0.005).add(1))
            game.total_green_spice_boost[i] = game.total_green_spice_boost[
                i
            ].mul(game.red_spice.pow(0.005).add(1))
            game.total_blue_spice_boost[i] = game.total_blue_spice_boost[i].mul(
                game.red_spice.pow(0.005).add(1)
            )
            game.total_pink_spice_boost[i] = game.total_pink_spice_boost[i].mul(
                game.red_spice.pow(0.005).add(1)
            )
        }

        if (game.prestige_bought[14] >= 1) {
            game.total_pink_spice_boost[i] = game.total_pink_spice_boost[i].mul(
                game.crystal_spice.pow(3).add(1)
            )
        }

        if (game.prestige_bought[16] >= 1) {
            game.total_red_spice_boost[i] = game.total_red_spice_boost[i].mul(
                game.crystal_spice.pow(12).add(1)
            )
            game.total_yellow_spice_boost[i] = game.total_yellow_spice_boost[
                i
            ].mul(game.crystal_spice.pow(12).add(1))
            game.total_green_spice_boost[i] = game.total_green_spice_boost[
                i
            ].mul(game.crystal_spice.pow(12).add(1))
            game.total_blue_spice_boost[i] = game.total_blue_spice_boost[i].mul(
                game.crystal_spice.pow(12).add(1)
            )
        }

        if (game.prestige_bought[17] >= 1) {
            game.total_crystal_spice_boost[i] = game.total_crystal_spice_boost[
                i
            ].mul(Decimal.pow(1.0135, game.color_boosts))
        }

        if (game.prestige_bought[19] >= 1) {
            game.total_crystal_spice_boost[i] = game.total_crystal_spice_boost[
                i
            ].mul(
                Decimal.pow(
                    1.08,
                    game.crystal_infusion + game.prestige_bought[20] * 12
                )
            )
        }

        if (game.prestige_bought[21] >= 1) {
            game.total_crystal_spice_boost[i] = game.total_crystal_spice_boost[
                i
            ].mul(
                game.rainbow_spice
                    .div(Decimal.pow(2, 292.5))
                    .pow(4 / 3)
                    .add(1)
            )
        }
    }

    if (game.prestige_bought[23] >= 1) {
        game.total_crystal_spice_boost[0] =
            game.total_crystal_spice_boost[0].pow(1.25)
    }

    game.red_spice = game.red_spice.add(
        game.red_spice_gen[0]
            .floor()
            .mul(game.total_red_spice_boost[0])
            .div(game.tickspeed)
    )
    game.yellow_spice = game.yellow_spice.add(
        game.yellow_spice_gen[0]
            .floor()
            .mul(game.total_yellow_spice_boost[0])
            .div(game.tickspeed)
    )
    game.green_spice = game.green_spice.add(
        game.green_spice_gen[0]
            .floor()
            .mul(game.total_green_spice_boost[0])
            .div(game.tickspeed)
    )
    game.blue_spice = game.blue_spice.add(
        game.blue_spice_gen[0]
            .floor()
            .mul(game.total_blue_spice_boost[0])
            .div(game.tickspeed)
    )
    game.pink_spice = game.pink_spice.add(
        game.pink_spice_gen[0]
            .floor()
            .mul(game.total_pink_spice_boost[0])
            .div(game.tickspeed)
    )
    game.crystal_spice = game.crystal_spice.add(
        game.crystal_spice_gen[0]
            .floor()
            .mul(game.total_crystal_spice_boost[0])
            .mul(3)
            .div(game.tickspeed)
    )
    if (game.prestige_bought[24] >= 1) {
        game.pink_spice_gen[5] = game.pink_spice_gen[5].add(
            game.crystal_spice_gen[0].floor().pow(2).div(game.tickspeed)
        )
    }
    game.total_spice = game.total_spice.add(
        game.red_spice_gen[0]
            .floor()
            .mul(game.total_red_spice_boost[0])
            .add(
                game.yellow_spice_gen[0]
                    .floor()
                    .mul(game.total_yellow_spice_boost[0])
            )
            .add(
                game.green_spice_gen[0]
                    .floor()
                    .mul(game.total_green_spice_boost[0])
            )
            .add(
                game.blue_spice_gen[0]
                    .floor()
                    .mul(game.total_blue_spice_boost[0])
            )
            .add(
                game.pink_spice_gen[0]
                    .floor()
                    .mul(game.total_pink_spice_boost[0])
            )
            .add(
                game.crystal_spice_gen[0]
                    .floor()
                    .mul(game.total_crystal_spice_boost[0])
                    .mul(3)
            )
            .div(game.tickspeed)
    )

    for (let i = 0; i < 5; i++) {
        game.red_spice_gen[i] = game.red_spice_gen[i].add(
            game.red_spice_gen[i + 1]
                .floor()
                .mul(game.total_red_spice_boost[i + 1])
                .div(game.tickspeed * (i + 2))
        )
        game.yellow_spice_gen[i] = game.yellow_spice_gen[i].add(
            game.yellow_spice_gen[i + 1]
                .floor()
                .mul(game.total_yellow_spice_boost[i + 1])
                .div(game.tickspeed * (i + 2))
        )
        game.green_spice_gen[i] = game.green_spice_gen[i].add(
            game.green_spice_gen[i + 1]
                .floor()
                .mul(game.total_green_spice_boost[i + 1])
                .div(game.tickspeed * (i + 2))
        )
        game.blue_spice_gen[i] = game.blue_spice_gen[i].add(
            game.blue_spice_gen[i + 1]
                .floor()
                .mul(game.total_blue_spice_boost[i + 1])
                .div(game.tickspeed * (i + 2))
        )
        game.pink_spice_gen[i] = game.pink_spice_gen[i].add(
            game.pink_spice_gen[i + 1]
                .floor()
                .mul(game.total_pink_spice_boost[i + 1])
                .div(game.tickspeed * (i + 2))
        )
        game.crystal_spice_gen[i] = game.crystal_spice_gen[i].add(
            game.crystal_spice_gen[i + 1]
                .floor()
                .mul(game.total_crystal_spice_boost[i + 1])
                .mul(3)
                .div(game.tickspeed)
        )
    }

    if (game.prestige_bought[10] >= 1) {
        game.red_spice_gen[5] = game.red_spice_gen[5].add(
            game.yellow_spice_gen[0].floor().pow(0.1).div(game.tickspeed)
        )
        game.yellow_spice_gen[5] = game.yellow_spice_gen[5].add(
            game.green_spice_gen[0].floor().pow(0.1).div(game.tickspeed)
        )
        game.green_spice_gen[5] = game.green_spice_gen[5].add(
            game.blue_spice_gen[0].floor().pow(0.1).div(game.tickspeed)
        )
        game.blue_spice_gen[5] = game.blue_spice_gen[5].add(
            game.pink_spice_gen[0].floor().pow(0.1).div(game.tickspeed)
        )
    }

    game.autopr_goal[0] = Number(
        document.getElementById("p_boosts_input").value
    )
    if (game.autopr_goal[0] === NaN) game.autopr_goal[0] = 10
    if (game.autopr_goal[0] < 10) game.autopr_goal[0] = 10

    game.autopr_goal[1] = Number(document.getElementById("p_spice_input").value)
    if (game.autopr_goal[1] === NaN) game.autopr_goal[0] = 1
    if (game.autopr_goal[1] < 1) game.autopr_goal[0] = 1

    if (game.autopr_toggle) {
        switch (game.autopr_mode) {
            case 0:
                if (game.color_boosts >= game.autopr_goal[0]) prestige()
                break
            case 1:
                let amount = 0
                if (game.color_boosts <= 16)
                    amount = new Decimal(2).pow((game.color_boosts - 10) / 3)
                else amount = new Decimal(2).pow((game.color_boosts - 8) / 4)
                if (amount.cmp(game.autopr_goal[1]) >= 0) prestige()
                break
        }
    }
}

//handling hotkeys
document.body.addEventListener("keydown", function (event) {
    if (game.hotkeys) {
        if (event.code === "KeyB") color_boost()
        if (event.code === "KeyP") prestige()

        if (game.tab === 0) {
            switch (game.subtab[0]) {
                case 0:
                    for (let i = 0; i < 6; i++) {
                        if (
                            event.shiftKey &&
                            event.code === "Digit" + (i + 1)
                        ) {
                            buy_gen("red", i)
                        } else if (event.code === "Digit" + (i + 1)) {
                            buy_until10("red", i)
                        }

                        if (event.code === "KeyS") buy_strengthener("red")
                        if (event.code === "KeyM") {
                            if (game.color_boosts >= 1 || game.prestige >= 1)
                                max_all("red")
                        }
                    }
                    break
                case 1:
                    for (let i = 0; i < 6; i++) {
                        if (
                            event.shiftKey &&
                            event.code === "Digit" + (i + 1)
                        ) {
                            buy_gen("yellow", i)
                        } else if (event.code === "Digit" + (i + 1)) {
                            buy_until10("yellow", i)
                        }

                        if (event.code === "KeyS") buy_strengthener("yellow")
                        if (event.code === "KeyM") {
                            if (game.color_boosts >= 2 || game.prestige >= 1)
                                max_all("yellow")
                        }
                    }
                    break
                case 2:
                    for (let i = 0; i < 6; i++) {
                        if (
                            event.shiftKey &&
                            event.code === "Digit" + (i + 1)
                        ) {
                            buy_gen("green", i)
                        } else if (event.code === "Digit" + (i + 1)) {
                            buy_until10("green", i)
                        }

                        if (event.code === "KeyS") buy_strengthener("green")
                        if (event.code === "KeyM") {
                            if (game.color_boosts >= 3 || game.prestige >= 1)
                                max_all("green")
                        }
                    }
                    break
                case 3:
                    for (let i = 0; i < 6; i++) {
                        if (
                            event.shiftKey &&
                            event.code === "Digit" + (i + 1)
                        ) {
                            buy_gen("blue", i)
                        } else if (event.code === "Digit" + (i + 1)) {
                            buy_until10("blue", i)
                        }

                        if (event.code === "KeyS") buy_strengthener("blue")
                        if (event.code === "KeyM") {
                            if (game.color_boosts >= 4 || game.prestige >= 1)
                                max_all("blue")
                        }
                    }
                    break
                case 4:
                    for (let i = 0; i < 6; i++) {
                        if (
                            event.shiftKey &&
                            event.code === "Digit" + (i + 1)
                        ) {
                            buy_gen("pink", i)
                        } else if (event.code === "Digit" + (i + 1)) {
                            buy_until10("pink", i)
                        }

                        if (event.code === "KeyS") buy_strengthener("pink")
                        if (event.code === "KeyM") {
                            if (game.color_boosts >= 5 || game.prestige >= 1)
                                max_all("pink")
                        }
                    }
                    break
            }
        }
        if (game.tab === 1) {
            if (game.subtab[1] === 1) {
                for (let i = 0; i < 6; i++) {
                    if (event.shiftKey && event.code === "Digit" + (i + 1)) {
                        buy_gen("crystal", i)
                    } else if (event.code === "Digit" + (i + 1)) {
                        buy_until10("crystal", i)
                    }

                    if (event.code === "KeyS") buy_strengthener("crystal")
                    if (event.code === "KeyI") buy_infusion()
                    if (event.code === "KeyM") {
                        if (game.crystal_spice_bought[5] >= 5)
                            max_all("crystal")
                    }
                }
            }
        }
    }
})

//saving the game
function save() {
    game.version = "1.0.000"
    game.prestige_price = new Array(prestige_upgrade.upgrades.length).fill(0)
    for (const u of prestige_upgrade.upgrades) {
        game.prestige_price[u.id] = u.price
    }
    localStorage.setItem("spice_idle_save", JSON.stringify(game))
}

//exporting a save file
function export_save() {
    navigator.clipboard.writeText(btoa(JSON.stringify(game)))
}

//importing a save file
function import_save() {
    let save_file = atob(prompt("Paste your exported save code here:"))
    let valid_json = true
    try {
        JSON.parse(save_file)
    } catch {
        valid_json = false
    }

    if (valid_json) {
        if (JSON.parse(save_file) !== null) {
            load(JSON.parse(save_file))
        }
    }
}

//deleting a save
function delete_save() {
    if (
        confirm(
            "Are you sure you want to delete your save?\nThis will reset EVERYTHING!"
        )
    ) {
        color_boost(true)
        game.color_boosts = 0

        game.total_spice = new Decimal(5)
        game.total_time_played = 0

        game.autosp_toggle = new Array(5).fill(false)
        game.autocb_toggle = false
        game.autoin_toggle = false
        game.autopr_toggle = false

        game.prestige = 0
        game.rainbow_spice = new Decimal(0)
        game.prestige_bought = new Array(26).fill(0)
        game.prestige_time_played = 0
        game.prestige_amount_history = new Array(10).fill(-1)
        game.prestige_time_history = new Array(10).fill(-1)

        game.crystal_spice = new Decimal(0)
        game.crystal_spice_price = [
            Decimal.pow(2, 56),
            Decimal.pow(2, 62),
            Decimal.pow(2, 68),
            Decimal.pow(2, 84),
            Decimal.pow(2, 100),
            Decimal.pow(2, 124),
        ]
        game.crystal_strengthener = 0
        game.crystal_strengthener_price = Decimal.pow(2, 76)
        game.crystal_infusion = 0
        game.crystal_infusion_price = new Decimal(10)
        for (let i = 0; i < 6; i++) {
            game.crystal_spice_gen[i] = new Decimal(0)
            game.crystal_spice_bought = 0
            game.crystal_spice_boost = new Decimal(1)
            game.total_crystal_spice_boost = new Decimal(1)
        }

        game.subtab[0] = 0
        game.subtab[1] = 0

        save()

        let temp_game = game
        load(temp_game)
    }
}

//load the game
function load(savegame) {
    if (savegame === null) return

    game = savegame
    game.red_spice = new Decimal(game.red_spice)
    game.red_strengthener_price = new Decimal(game.red_strengthener_price)
    game.yellow_spice = new Decimal(game.yellow_spice)
    game.yellow_strengthener_price = new Decimal(game.yellow_strengthener_price)
    game.green_spice = new Decimal(game.green_spice)
    game.green_strengthener_price = new Decimal(game.green_strengthener_price)
    game.blue_spice = new Decimal(game.blue_spice)
    game.blue_strengthener_price = new Decimal(game.blue_strengthener_price)
    game.pink_spice = new Decimal(game.pink_spice)
    game.pink_strengthener_price = new Decimal(game.pink_strengthener_price)
    game.total_spice = new Decimal(game.total_spice)
    game.rainbow_spice = new Decimal(game.rainbow_spice)
    game.crystal_spice = new Decimal(game.crystal_spice)
    game.crystal_strengthener_price = new Decimal(
        game.crystal_strengthener_price
    )
    game.crystal_infusion_price = new Decimal(game.crystal_infusion_price)
    for (let i = 0; i < 6; i++) {
        game.red_spice_gen[i] = new Decimal(game.red_spice_gen[i])
        game.red_spice_price[i] = new Decimal(game.red_spice_price[i])
        game.red_spice_boost[i] = new Decimal(game.red_spice_boost[i])
        game.total_red_spice_boost[i] = new Decimal(
            game.total_red_spice_boost[i]
        )
        game.yellow_spice_gen[i] = new Decimal(game.yellow_spice_gen[i])
        game.yellow_spice_price[i] = new Decimal(game.yellow_spice_price[i])
        game.yellow_spice_boost[i] = new Decimal(game.yellow_spice_boost[i])
        game.total_yellow_spice_boost[i] = new Decimal(
            game.total_yellow_spice_boost[i]
        )
        game.green_spice_gen[i] = new Decimal(game.green_spice_gen[i])
        game.green_spice_price[i] = new Decimal(game.green_spice_price[i])
        game.green_spice_boost[i] = new Decimal(game.green_spice_boost[i])
        game.total_green_spice_boost[i] = new Decimal(
            game.total_green_spice_boost[i]
        )
        game.blue_spice_gen[i] = new Decimal(game.blue_spice_gen[i])
        game.blue_spice_price[i] = new Decimal(game.blue_spice_price[i])
        game.blue_spice_boost[i] = new Decimal(game.blue_spice_boost[i])
        game.total_blue_spice_boost[i] = new Decimal(
            game.total_blue_spice_boost[i]
        )
        game.pink_spice_gen[i] = new Decimal(game.pink_spice_gen[i])
        game.pink_spice_price[i] = new Decimal(game.pink_spice_price[i])
        game.pink_spice_boost[i] = new Decimal(game.pink_spice_boost[i])
        game.total_pink_spice_boost[i] = new Decimal(
            game.total_pink_spice_boost[i]
        )
        game.crystal_spice_gen[i] = new Decimal(game.crystal_spice_gen[i])
        game.crystal_spice_price[i] = new Decimal(game.crystal_spice_price[i])
        game.crystal_spice_boost[i] = new Decimal(game.crystal_spice_boost[i])
        game.total_crystal_spice_boost[i] = new Decimal(
            game.total_crystal_spice_boost[i]
        )
    }

    if (game.prestige_price !== undefined) {
        for (const u of prestige_upgrade.upgrades) {
            u.price = new Decimal(game.prestige_price[u.id])
        }
    }

    game.autopr_goal[1] = new Decimal(game.autopr_goal[1])

    for (let i = 0; i < 10; i++) {
        if (game.prestige_amount_history[i] !== -1) {
            game.prestige_amount_history[i] = new Decimal(
                game.prestige_amount_history[i]
            )
        }
    }

    goto_tab(game.tab)
    if (game.tab === 0) goto_subtab(game.subtab[0])
    if (game.tab === 1) goto_subtab(game.subtab[1])

    auto_toggle("red")
    auto_toggle("red")
    auto_toggle("yellow")
    auto_toggle("yellow")
    auto_toggle("green")
    auto_toggle("green")
    auto_toggle("blue")
    auto_toggle("blue")
    auto_toggle("pink")
    auto_toggle("pink")
    auto_toggle("boost")
    auto_toggle("boost")
    auto_toggle("infusion")
    auto_toggle("infusion")
    auto_toggle("prestige")
    auto_toggle("prestige")
    auto_toggle("prestige_mode")
    auto_toggle("prestige_mode")

    notation(game.notation)
    hotkeys()
    hotkeys()
    condensed()
    condensed()

    document.getElementById("p_boosts_input").value = game.autopr_goal[0]
    document.getElementById("p_spice_input").value = game.autopr_goal[1]
}

//setting up the tick loop
let tick_loop = window.setInterval(function () {
    tick()
    tabs_update()
    if (game.tab === 0) spice_update()
    if (game.tab === 1) {
        prestige_update()
        crystal_update()
    }
    if (game.tab === 5) stats_update()
}, 1000 / game.tickspeed)

//load the game when opened
load(JSON.parse(localStorage.getItem("spice_idle_save")))

//setting up the autosave loop
let save_loop = window.setInterval(function () {
    save()
}, 60000)
