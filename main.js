let tick_time = Date.now()
let delta_time = undefined

//game operations run every tick
function tick() {
    if (game.collapse_challenge === 9) {
        game.gamespeed = 1 / 99999
    } else {
        game.gamespeed = 2 ** game.collapse_complete[2]
    }

    game.total_time_played += 1 / delta_time
    game.prestige_time_played += 1 / delta_time
    game.ascend_time_played += 1 / delta_time
    game.collapse_time_played += 1 / delta_time

    game.ascend_challenge_timer += 1 / (delta_time * game.gamespeed)

    for (let i = 0; i < 4; i++) {
        game.real_time_played[i] += 1 / (delta_time * game.gamespeed)
    }

    if (
        game.collapse_time_played > 999 / 1000000 &&
        game.collapse_challenge === 9
    ) {
        alert(
            "You have been in Challenge 9 for longer than 999 microseconds, so you will now exit."
        )
        exit_collapse_challenge()
    }

    document.documentElement.style.setProperty(
        "--rainbow_spice",
        "hsl(" + ((game.real_time_played[0] * 36) % 360) + ",100%,50%)"
    )
    document.documentElement.style.setProperty(
        "--rainbow_spice2",
        "hsl(" + ((game.real_time_played[0] * 36) % 360) + ",100%,65%)"
    )

    document.documentElement.style.setProperty(
        "--ascension",
        "hsl(" +
            (25 * Math.sin(game.real_time_played[0] / 2) + 208) +
            ",100%,50%)"
    )
    document.documentElement.style.setProperty(
        "--ascension2",
        "hsl(" +
            (25 * Math.sin(game.real_time_played[0] / 2) + 208) +
            ",100%,60%)"
    )
    document.documentElement.style.setProperty(
        "--ascension3",
        "hsl(" +
            (25 * Math.sin(game.real_time_played[0] / 2) + 208) +
            ",80%,10%)"
    )
    document.documentElement.style.setProperty(
        "--ascension4",
        "hsl(" +
            (25 * Math.sin(game.real_time_played[0] / 2) + 208) +
            ",80%,20%)"
    )
    document.documentElement.style.setProperty(
        "--ascension5",
        "hsl(" +
            (25 * Math.sin(game.real_time_played[0] / 2) + 208) +
            ",90%,30%)"
    )

    document.documentElement.style.setProperty(
        "--arcane_spice",
        "hsl(" +
            (5 * Math.sin(game.real_time_played[0] / 5) + 273) +
            "," +
            (15 * Math.sin(game.real_time_played[0]) + 85) +
            "%," +
            (5 * Math.sin(game.real_time_played[0]) + 55) +
            "%)"
    )
    document.documentElement.style.setProperty(
        "--arcane_spice2",
        "hsl(" +
            (5 * Math.sin(game.real_time_played[0] / 5) + 273) +
            "," +
            (9 * Math.sin(game.real_time_played[0]) + 91) +
            "%," +
            (7 * Math.sin(game.real_time_played[0]) + 48) +
            "%)"
    )

    document.documentElement.style.setProperty(
        "--collapse",
        "hsl(" + (30 * Math.sin(game.real_time_played[0]) + 102) + ",100%,40%)"
    )
    document.documentElement.style.setProperty(
        "--collapse2",
        "hsl(" + (30 * Math.sin(game.real_time_played[0]) + 102) + ",100%,50%)"
    )
    document.documentElement.style.setProperty(
        "--collapse3",
        "hsl(" + (30 * Math.sin(game.real_time_played[0]) + 92) + ",100%,60%)"
    )
    document.documentElement.style.setProperty(
        "--collapse4",
        "hsl(" + (30 * Math.sin(game.real_time_played[0]) + 102) + ",80%,10%)"
    )
    document.documentElement.style.setProperty(
        "--collapse5",
        "hsl(" + (30 * Math.sin(game.real_time_played[0]) + 92) + ",80%,20%)"
    )

    document.documentElement.style.setProperty(
        "--collapse6",
        25 * Math.sin(game.real_time_played[0]) - 25 + "deg"
    )
    document.documentElement.style.setProperty(
        "--collapse7",
        -10 * Math.sin(game.real_time_played[0]) + 110 + "%"
    )
    document.documentElement.style.setProperty(
        "--collapse8",
        10 * Math.sin(game.real_time_played[0]) + 90 + "%"
    )

    document.documentElement.style.setProperty(
        "--unstable_spice",
        "hsl(" +
            (18 * Math.sin(game.real_time_played[0] * 3) + 16) +
            ",100%,40%)"
    )
    document.documentElement.style.setProperty(
        "--unstable_spice2",
        "hsl(" +
            (18 * Math.sin(game.real_time_played[0] * 3) + 16) +
            ",100%,50%)"
    )
    document.documentElement.style.setProperty(
        "--unstable_spice3",
        "hsl(" +
            (18 * Math.sin(game.real_time_played[0] * 3) + 26) +
            ",100%,60%)"
    )
    document.documentElement.style.setProperty(
        "--unstable_spice7",
        "hsl(" +
            (18 * Math.sin(game.real_time_played[0] * 3) + 26) +
            ",100%,16%)"
    )
    document.documentElement.style.setProperty(
        "--unstable_spice8",
        "hsl(" +
            (18 * Math.sin(game.real_time_played[0] * 3) + 26) +
            ",100%,10%)"
    )

    document.documentElement.style.setProperty(
        "--unstable_spice4",
        16 * Math.sin(game.real_time_played[0] * 3) + 16 + "deg"
    )
    document.documentElement.style.setProperty(
        "--unstable_spice5",
        50 * Math.sin(game.real_time_played[0] * 3) + 150 + "%"
    )
    document.documentElement.style.setProperty(
        "--unstable_spice6",
        -10 * Math.sin(game.real_time_played[0] * 3) + 90 + "%"
    )

    document.documentElement.style.setProperty(
        "--decayed_spice",
        "hsl(300," + (6 * Math.sin(game.real_time_played[0]) + 16) + "%,50%)"
    )
    document.documentElement.style.setProperty(
        "--decayed_spice2",
        "hsl(300," + (6 * Math.sin(game.real_time_played[0]) + 16) + "%,40%)"
    )

    if (game.high_visibility) {
        document.documentElement.style.setProperty(
            "--rainbow_spice2",
            "hsl(" + ((game.real_time_played[0] * 36) % 360) + ",100%,75%)"
        )
        document.documentElement.style.setProperty(
            "--ascension",
            "hsl(" +
                (25 * Math.sin(game.real_time_played[0] / 2) + 208) +
                ",100%,65%)"
        )
        document.documentElement.style.setProperty(
            "--ascension2",
            "hsl(" +
                (25 * Math.sin(game.real_time_played[0] / 2) + 208) +
                ",100%,75%)"
        )
        document.documentElement.style.setProperty(
            "--arcane_spice",
            "hsl(" +
                (5 * Math.sin(game.real_time_played[0] / 5) + 273) +
                "," +
                (15 * Math.sin(game.real_time_played[0]) + 85) +
                "%,75%)"
        )
        document.documentElement.style.setProperty(
            "--collapse3",
            "hsl(" +
                (30 * Math.sin(game.real_time_played[0]) + 92) +
                ",100%,75%)"
        )
        document.documentElement.style.setProperty(
            "--unstable_spice3",
            "hsl(" +
                (18 * Math.sin(game.real_time_played[0] * 3) + 26) +
                ",100%,75%)"
        )
        document.documentElement.style.setProperty(
            "--decayed_spice",
            "hsl(300," +
                (8 * Math.sin(game.real_time_played[0]) + 32) +
                "%,75%)"
        )
    }

    if (game.autocb_toggle && game.prestige_bought[7] >= 1) color_boost()

    if (game.autoin_toggle && game.prestige_bought[13] >= 1) max_infusion()

    if (game.autosp_toggle[0] && game.prestige_bought[0] >= 1) max_all("red")
    if (game.autosp_toggle[1] && game.prestige_bought[0] >= 2) max_all("yellow")
    if (game.autosp_toggle[2] && game.prestige_bought[0] >= 3) max_all("green")
    if (game.autosp_toggle[3] && game.prestige_bought[0] >= 4) max_all("blue")
    if (game.autosp_toggle[4] && game.prestige_bought[0] >= 5) max_all("pink")

    let antispice_boosts = 1
    if (game.antispice[2].cmp(1) >= 0) {
        let antispice_amount = Decimal.pow(
            10,
            game.antispice[2].log(10) ** 0.75
        )
        antispice_boosts = 1 + antispice_amount.log(10) ** (2 / 3) * 100
        if (game.collapse_challenge !== 0)
            antispice_boosts = 1 + antispice_amount.log(10) ** (2 / 3) * 50
    }

    if (game.color_boosts <= 4) {
        game.global_spice_boost = new Decimal(
            2 +
                0.2 * game.prestige_bought[2] +
                2 * (game.ascend_bought[2] + game.ascend_bought[14])
        ).pow(game.color_boosts * antispice_boosts)

        if (game.prestige_bought[18] >= 1) {
            game.global_spice_boost = new Decimal(
                6 + 2 * (game.ascend_bought[2] + game.ascend_bought[14])
            ).pow(game.color_boosts * antispice_boosts)
        }

        if (
            game.ascend_challenge === 1 ||
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 7
        ) {
            game.global_spice_boost = Decimal.pow(
                2,
                game.color_boosts * antispice_boosts
            )
        }
    } else {
        game.global_spice_boost = new Decimal(
            2 +
                0.2 * game.prestige_bought[2] +
                2 * (game.ascend_bought[2] + game.ascend_bought[14])
        ).pow((game.color_boosts * 2 - 4) * antispice_boosts)

        if (game.prestige_bought[18] >= 1) {
            game.global_spice_boost = new Decimal(
                6 + 2 * (game.ascend_bought[2] + game.ascend_bought[14])
            ).pow((game.color_boosts * 2 - 4) * antispice_boosts)
        }

        if (
            game.ascend_challenge === 1 ||
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 7
        ) {
            game.global_spice_boost = Decimal.pow(
                2,
                (game.color_boosts * 2 - 4) * antispice_boosts
            )
        }
    }

    if (
        game.prestige_bought[1] >= 1 &&
        game.ascend_challenge !== 1 &&
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 7
    ) {
        if (game.ascend_bought[1]) {
            if (game.prestige >= 1000000) {
                game.global_spice_boost = game.global_spice_boost.mul(
                    Decimal.pow(
                        10 ** 25,
                        10 * (game.prestige - 914447) ** 0.25 + 829.5
                    )
                )
            } else {
                game.global_spice_boost = game.global_spice_boost.mul(
                    Decimal.pow(
                        10 ** 25,
                        game.prestige ** (0.5 + 40 / (game.prestige + 80))
                    )
                )
            }
        } else if (game.prestige >= 1) {
            game.global_spice_boost = game.global_spice_boost.mul(
                2.5 * game.prestige * (game.prestige + 1)
            )
        }
    }

    if (
        game.prestige_bought[6] &&
        game.ascend_challenge !== 1 &&
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 7
    )
        game.global_spice_boost = game.global_spice_boost.mul(
            game.rainbow_spice.div(256).pow(5).add(1)
        )

    let antispice_infusions = 1
    if (game.antispice[3].cmp(1) >= 0) {
        let antispice_amount = Decimal.pow(
            10,
            game.antispice[3].log(10) ** 0.75
        )

        antispice_infusions = 1 + antispice_amount.log(10) ** (2 / 3) * 0.15
        if (game.collapse_challenge !== 0)
            antispice_infusions =
                1 + antispice_amount.log(10) ** (2 / 3) * 0.075
    }

    if (
        game.ascend_complete[2] &&
        game.ascend_bought[24] &&
        game.ascend_challenge !== 1 &&
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 7
    ) {
        game.global_spice_boost = game.global_spice_boost.mul(
            Decimal.pow(
                5,
                (game.crystal_infusion +
                    game.prestige_bought[20] *
                        12 *
                        (1 + game.ascend_bought[5])) *
                    32 *
                    antispice_infusions
            )
        )
    } else if (
        game.ascend_bought[7] &&
        game.ascend_challenge !== 1 &&
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 7
    ) {
        game.global_spice_boost = game.global_spice_boost.mul(
            Decimal.pow(
                5,
                (game.crystal_infusion +
                    game.prestige_bought[20] *
                        12 *
                        (1 + game.ascend_bought[5])) *
                    17.6 *
                    antispice_infusions
            )
        )
    } else {
        game.global_spice_boost = game.global_spice_boost.mul(
            Decimal.pow(
                5,
                (game.crystal_infusion +
                    game.prestige_bought[20] *
                        12 *
                        (1 + game.ascend_bought[5])) *
                    16 *
                    antispice_infusions
            )
        )
    }

    game.unstable_spice = game.unstable_spice.mul(
        0.5 ** (1 / (delta_time * game.halflife))
    )
    game.decayed_spice = Decimal.max(
        game.total_unstable_spice.sub(game.unstable_spice.round()),
        0
    )

    let decayed_amount = game.decayed_spice
    if (decayed_amount.cmp(Decimal.pow(10, 400)) >= 0) {
        decayed_amount = decayed_amount
            .div(Decimal.pow(10, 400))
            .pow(1 / 3)
            .mul(Decimal.pow(10, 400))

        if (decayed_amount.cmp(Decimal.pow(10, 3800 / 3)) >= 0) {
            decayed_amount = decayed_amount
                .div(Decimal.pow(10, 3800 / 3))
                .pow(1 / 3)
                .mul(Decimal.pow(10, 3800 / 3))
        }
    }

    if (game.decayed_spice.cmp(1) >= 0) {
        game.unstable_boost = decayed_amount
            .add(1)
            .pow(
                Decimal.pow(
                    16777216,
                    game.decayed_spice.div(game.total_unstable_spice)
                )
            )
    } else {
        game.unstable_boost = new Decimal(1)
    }

    if (game.research_complete[14] >= 1) {
        if (game.unstable_spice.round().cmp(1) === -1) {
            game.unstable_boost = game.unstable_boost.pow(1.5)
        }
    }

    if (game.research_complete[17] >= 1) {
        if (game.atomic_spice.cmp(1) >= 0) {
            let amount = game.atomic_spice.log(10) * 0.0006666

            if (amount > 4) {
                game.unstable_boost = game.unstable_boost.pow(3)
            } else if (amount > 1) {
                game.unstable_boost = game.unstable_boost.pow(
                    (amount - 1) / 3 + 2
                )
            } else {
                game.unstable_boost = game.unstable_boost.pow(amount + 1)
            }
        }
    }

    if (game.ascend_challenge === 6) {
        game.unstable_boost = new Decimal(1)
    }

    if (game.collapse_challenge === 8) {
        game.unstable_boost = new Decimal(1)
        game.free_deity = game.decayed_spice
            .pow(game.decayed_spice.div(game.total_unstable_spice).div(10))
            .pow(game.atomic_spice.log(10) * 0.0003333 + 1)
            .floor()
    } else if (game.collapse_complete[1] >= 1) {
        game.free_deity = Decimal.max(
            game.unstable_boost
                .pow((1 + game.collapse_complete[1]) / 60000)
                .floor()
                .sub(1),
            0
        )
    } else {
        game.free_deity = new Decimal(0)
    }

    game.global_spice_boost = game.global_spice_boost.mul(game.unstable_boost)

    for (let i = 0; i < 6; i++) {
        if (
            game.ascend_challenge === 1 ||
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 7
        ) {
            game.total_red_spice_boost[i] = game.red_spice_boost[i].mul(
                Decimal.pow(
                    2,
                    game.red_strengthener +
                        game.yellow_strengthener +
                        game.green_strengthener +
                        game.blue_strengthener +
                        game.pink_strengthener
                ).pow(antispice_boosts)
            )
            game.total_yellow_spice_boost[i] = game.yellow_spice_boost[i].mul(
                Decimal.pow(
                    2,
                    game.yellow_strengthener +
                        game.green_strengthener +
                        game.blue_strengthener +
                        game.pink_strengthener
                ).pow(antispice_boosts)
            )
            game.total_green_spice_boost[i] = game.green_spice_boost[i].mul(
                Decimal.pow(
                    2,
                    game.green_strengthener +
                        game.blue_strengthener +
                        game.pink_strengthener
                ).pow(antispice_boosts)
            )
            game.total_blue_spice_boost[i] = game.blue_spice_boost[i].mul(
                Decimal.pow(
                    2,
                    game.blue_strengthener + game.pink_strengthener
                ).pow(antispice_boosts)
            )
            game.total_pink_spice_boost[i] = game.pink_spice_boost[i].mul(
                Decimal.pow(2, game.pink_strengthener).pow(antispice_boosts)
            )
        } else {
            game.total_red_spice_boost[i] = game.red_spice_boost[i].mul(
                Decimal.pow(
                    2 +
                        0.2 * game.prestige_bought[2] +
                        2 * (game.ascend_bought[2] + game.ascend_bought[14]),
                    (game.red_strengthener +
                        game.yellow_strengthener +
                        game.green_strengthener +
                        game.blue_strengthener +
                        game.pink_strengthener) *
                        (1 + game.ascend_bought[11]) *
                        (1 +
                            2 *
                                game.ascend_complete[2] *
                                game.ascend_bought[24])
                ).pow(antispice_boosts)
            )
            game.total_yellow_spice_boost[i] = game.yellow_spice_boost[i].mul(
                Decimal.pow(
                    2 +
                        0.2 * game.prestige_bought[2] +
                        2 * (game.ascend_bought[2] + game.ascend_bought[14]),
                    (game.yellow_strengthener +
                        game.green_strengthener +
                        game.blue_strengthener +
                        game.pink_strengthener) *
                        (1 + game.ascend_bought[11]) *
                        (1 +
                            2 *
                                game.ascend_complete[2] *
                                game.ascend_bought[24])
                ).pow(antispice_boosts)
            )
            game.total_green_spice_boost[i] = game.green_spice_boost[i].mul(
                Decimal.pow(
                    2 +
                        0.2 * game.prestige_bought[2] +
                        2 * (game.ascend_bought[2] + game.ascend_bought[14]),
                    (game.green_strengthener +
                        game.blue_strengthener +
                        game.pink_strengthener) *
                        (1 + game.ascend_bought[11]) *
                        (1 +
                            2 *
                                game.ascend_complete[2] *
                                game.ascend_bought[24])
                ).pow(antispice_boosts)
            )
            game.total_blue_spice_boost[i] = game.blue_spice_boost[i].mul(
                Decimal.pow(
                    2 +
                        0.2 * game.prestige_bought[2] +
                        2 * (game.ascend_bought[2] + game.ascend_bought[14]),
                    (game.blue_strengthener + game.pink_strengthener) *
                        (1 + game.ascend_bought[11]) *
                        (1 +
                            2 *
                                game.ascend_complete[2] *
                                game.ascend_bought[24])
                ).pow(antispice_boosts)
            )
            game.total_pink_spice_boost[i] = game.pink_spice_boost[i].mul(
                Decimal.pow(
                    2 +
                        0.2 * game.prestige_bought[2] +
                        2 * (game.ascend_bought[2] + game.ascend_bought[14]),
                    game.pink_strengthener *
                        (1 + game.ascend_bought[11]) *
                        (1 +
                            2 *
                                game.ascend_complete[2] *
                                game.ascend_bought[24])
                ).pow(antispice_boosts)
            )

            if (game.prestige_bought[18] >= 1) {
                game.total_red_spice_boost[i] = game.red_spice_boost[i].mul(
                    Decimal.pow(
                        6 +
                            2 *
                                (game.ascend_bought[2] +
                                    game.ascend_bought[14]),
                        (game.red_strengthener +
                            game.yellow_strengthener +
                            game.green_strengthener +
                            game.blue_strengthener +
                            game.pink_strengthener) *
                            (1 + game.ascend_bought[11]) *
                            (1 +
                                2 *
                                    game.ascend_complete[2] *
                                    game.ascend_bought[24])
                    ).pow(antispice_boosts)
                )
                game.total_yellow_spice_boost[i] = game.yellow_spice_boost[
                    i
                ].mul(
                    Decimal.pow(
                        6 +
                            2 *
                                (game.ascend_bought[2] +
                                    game.ascend_bought[14]),
                        (game.yellow_strengthener +
                            game.green_strengthener +
                            game.blue_strengthener +
                            game.pink_strengthener) *
                            (1 + game.ascend_bought[11]) *
                            (1 +
                                2 *
                                    game.ascend_complete[2] *
                                    game.ascend_bought[24])
                    ).pow(antispice_boosts)
                )
                game.total_green_spice_boost[i] = game.green_spice_boost[i].mul(
                    Decimal.pow(
                        6 +
                            2 *
                                (game.ascend_bought[2] +
                                    game.ascend_bought[14]),
                        (game.green_strengthener +
                            game.blue_strengthener +
                            game.pink_strengthener) *
                            (1 + game.ascend_bought[11]) *
                            (1 +
                                2 *
                                    game.ascend_complete[2] *
                                    game.ascend_bought[24])
                    ).pow(antispice_boosts)
                )
                game.total_blue_spice_boost[i] = game.blue_spice_boost[i].mul(
                    Decimal.pow(
                        6 +
                            2 *
                                (game.ascend_bought[2] +
                                    game.ascend_bought[14]),
                        (game.blue_strengthener + game.pink_strengthener) *
                            (1 + game.ascend_bought[11]) *
                            (1 +
                                2 *
                                    game.ascend_complete[2] *
                                    game.ascend_bought[24])
                    ).pow(antispice_boosts)
                )
                game.total_pink_spice_boost[i] = game.pink_spice_boost[i].mul(
                    Decimal.pow(
                        6 +
                            2 *
                                (game.ascend_bought[2] +
                                    game.ascend_bought[14]),
                        game.pink_strengthener *
                            (1 + game.ascend_bought[11]) *
                            (1 +
                                2 *
                                    game.ascend_complete[2] *
                                    game.ascend_bought[24])
                    ).pow(antispice_boosts)
                )
            }
        }

        game.total_red_spice_boost[i] = game.total_red_spice_boost[i].mul(
            game.global_spice_boost
        )

        if (
            game.prestige_bought[5] >= 1 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7
        ) {
            game.total_yellow_spice_boost[i] = game.total_yellow_spice_boost[
                i
            ].mul(
                Decimal.pow(
                    1 + 0.2 * game.prestige_bought[5],
                    game.red_strengthener
                ).mul(game.global_spice_boost)
            )
            game.total_green_spice_boost[i] = game.total_green_spice_boost[
                i
            ].mul(
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
        } else {
            game.total_yellow_spice_boost[i] = game.total_yellow_spice_boost[
                i
            ].mul(
                Decimal.pow(1.05, game.red_strengthener).mul(
                    game.global_spice_boost
                )
            )
            game.total_green_spice_boost[i] = game.total_green_spice_boost[
                i
            ].mul(
                Decimal.pow(1.05, game.yellow_strengthener).mul(
                    game.global_spice_boost
                )
            )
            game.total_blue_spice_boost[i] = game.total_blue_spice_boost[i].mul(
                Decimal.pow(1.05, game.green_strengthener).mul(
                    game.global_spice_boost
                )
            )
            game.total_pink_spice_boost[i] = game.total_pink_spice_boost[i]
                .mul(Decimal.pow(1.05, game.blue_strengthener))
                .mul(game.global_spice_boost)
        }

        game.total_crystal_spice_boost[i] = game.crystal_spice_boost[i].mul(
            Decimal.pow(4, game.crystal_strengthener).pow(antispice_boosts)
        )

        if (
            game.prestige_bought[8] >= 1 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7
        ) {
            if (game.antispice[1].cmp(1) >= 0) {
                let antispice_amount = Decimal.pow(
                    10,
                    game.antispice[1].log(10) ** 0.75
                )
                let antispice_power =
                    1 + antispice_amount.log(10) ** (2 / 3) * 0.013
                if (game.collapse_challenge !== 0)
                    antispice_power =
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.0065

                game.total_red_spice_boost[i] = game.total_red_spice_boost[
                    i
                ].mul(game.yellow_spice.pow(0.075).add(1).pow(antispice_power))
                game.total_yellow_spice_boost[i] =
                    game.total_yellow_spice_boost[i].mul(
                        game.green_spice.pow(0.075).add(1).pow(antispice_power)
                    )
                game.total_green_spice_boost[i] = game.total_green_spice_boost[
                    i
                ].mul(game.blue_spice.pow(0.075).add(1).pow(antispice_power))
                game.total_blue_spice_boost[i] = game.total_blue_spice_boost[
                    i
                ].mul(game.pink_spice.pow(0.075).add(1).pow(antispice_power))
            } else {
                game.total_red_spice_boost[i] = game.total_red_spice_boost[
                    i
                ].mul(game.yellow_spice.pow(0.075).add(1))
                game.total_yellow_spice_boost[i] =
                    game.total_yellow_spice_boost[i].mul(
                        game.green_spice.pow(0.075).add(1)
                    )
                game.total_green_spice_boost[i] = game.total_green_spice_boost[
                    i
                ].mul(game.blue_spice.pow(0.075).add(1))
                game.total_blue_spice_boost[i] = game.total_blue_spice_boost[
                    i
                ].mul(game.pink_spice.pow(0.075).add(1))
            }
        }

        if (
            game.prestige_bought[11] >= 1 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7
        ) {
            let effective_red_spice = game.red_spice
            if (game.red_spice.cmp(Decimal.pow(10, 10 ** 12)) >= 0)
                effective_red_spice = game.red_spice
                    .div(Decimal.pow(10, 10 ** 12))
                    .pow(1 / 3)
                    .mul(Decimal.pow(10, 10 ** 12))

            if (game.ascend_bought[0]) {
                if (game.antispice[1].cmp(1) >= 0) {
                    let antispice_amount = Decimal.pow(
                        10,
                        game.antispice[1].log(10) ** 0.75
                    )
                    let antispice_power =
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.013
                    if (game.collapse_challenge !== 0)
                        antispice_power =
                            1 + antispice_amount.log(10) ** (2 / 3) * 0.0065

                    game.total_yellow_spice_boost[i] =
                        game.total_yellow_spice_boost[i].mul(
                            effective_red_spice
                                .pow(0.0075)
                                .add(1)
                                .pow(antispice_power)
                        )
                    game.total_green_spice_boost[i] =
                        game.total_green_spice_boost[i].mul(
                            effective_red_spice
                                .pow(0.0075)
                                .add(1)
                                .pow(antispice_power)
                        )
                    game.total_blue_spice_boost[i] =
                        game.total_blue_spice_boost[i].mul(
                            effective_red_spice
                                .pow(0.0075)
                                .add(1)
                                .pow(antispice_power)
                        )
                    game.total_pink_spice_boost[i] =
                        game.total_pink_spice_boost[i].mul(
                            effective_red_spice
                                .pow(0.0075)
                                .add(1)
                                .pow(antispice_power)
                        )
                } else {
                    game.total_yellow_spice_boost[i] =
                        game.total_yellow_spice_boost[i].mul(
                            effective_red_spice.pow(0.0075).add(1)
                        )
                    game.total_green_spice_boost[i] =
                        game.total_green_spice_boost[i].mul(
                            effective_red_spice.pow(0.0075).add(1)
                        )
                    game.total_blue_spice_boost[i] =
                        game.total_blue_spice_boost[i].mul(
                            effective_red_spice.pow(0.0075).add(1)
                        )
                    game.total_pink_spice_boost[i] =
                        game.total_pink_spice_boost[i].mul(
                            effective_red_spice.pow(0.0075).add(1)
                        )
                }
            } else {
                game.total_yellow_spice_boost[i] =
                    game.total_yellow_spice_boost[i].mul(
                        effective_red_spice.pow(0.005).add(1)
                    )
                game.total_green_spice_boost[i] = game.total_green_spice_boost[
                    i
                ].mul(effective_red_spice.pow(0.005).add(1))
                game.total_blue_spice_boost[i] = game.total_blue_spice_boost[
                    i
                ].mul(effective_red_spice.pow(0.005).add(1))
                game.total_pink_spice_boost[i] = game.total_pink_spice_boost[
                    i
                ].mul(effective_red_spice.pow(0.005).add(1))
            }
        }

        if (
            game.prestige_bought[14] >= 1 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7
        ) {
            if (game.antispice[1].cmp(1) >= 0) {
                let antispice_amount = Decimal.pow(
                    10,
                    game.antispice[1].log(10) ** 0.75
                )
                let antispice_power =
                    1 + antispice_amount.log(10) ** (2 / 3) * 0.013
                if (game.collapse_challenge !== 0)
                    antispice_power =
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.0065

                game.total_pink_spice_boost[i] = game.total_pink_spice_boost[
                    i
                ].mul(game.crystal_spice.pow(3).add(1).pow(antispice_power))
            } else {
                game.total_pink_spice_boost[i] = game.total_pink_spice_boost[
                    i
                ].mul(game.crystal_spice.pow(3).add(1))
            }
        }

        if (
            game.prestige_bought[16] >= 1 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7
        ) {
            if (game.antispice[1].cmp(1) >= 0) {
                let antispice_amount = Decimal.pow(
                    10,
                    game.antispice[1].log(10) ** 0.75
                )
                let antispice_power =
                    1 + antispice_amount.log(10) ** (2 / 3) * 0.013
                if (game.collapse_challenge !== 0)
                    antispice_power =
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.0065

                game.total_red_spice_boost[i] = game.total_red_spice_boost[
                    i
                ].mul(game.crystal_spice.pow(12).add(1).pow(antispice_power))
                game.total_yellow_spice_boost[i] =
                    game.total_yellow_spice_boost[i].mul(
                        game.crystal_spice.pow(12).add(1).pow(antispice_power)
                    )
                game.total_green_spice_boost[i] = game.total_green_spice_boost[
                    i
                ].mul(game.crystal_spice.pow(12).add(1).pow(antispice_power))
                game.total_blue_spice_boost[i] = game.total_blue_spice_boost[
                    i
                ].mul(game.crystal_spice.pow(12).add(1).pow(antispice_power))
            } else {
                game.total_red_spice_boost[i] = game.total_red_spice_boost[
                    i
                ].mul(game.crystal_spice.pow(12).add(1))
                game.total_yellow_spice_boost[i] =
                    game.total_yellow_spice_boost[i].mul(
                        game.crystal_spice.pow(12).add(1)
                    )
                game.total_green_spice_boost[i] = game.total_green_spice_boost[
                    i
                ].mul(game.crystal_spice.pow(12).add(1))
                game.total_blue_spice_boost[i] = game.total_blue_spice_boost[
                    i
                ].mul(game.crystal_spice.pow(12).add(1))
            }
        }

        if (
            game.prestige_bought[17] >= 1 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7
        ) {
            game.total_crystal_spice_boost[i] = game.total_crystal_spice_boost[
                i
            ].mul(Decimal.pow(1.0135, game.color_boosts))
        }

        if (
            game.prestige_bought[19] >= 1 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7
        ) {
            game.total_crystal_spice_boost[i] = game.total_crystal_spice_boost[
                i
            ].mul(
                Decimal.pow(
                    1.08 + 0.04 * game.ascend_bought[6],
                    (game.crystal_infusion +
                        game.prestige_bought[20] *
                            12 *
                            (1 + game.ascend_bought[5])) *
                        antispice_infusions
                )
            )
        }

        if (
            game.prestige_bought[21] >= 1 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7
        ) {
            game.total_crystal_spice_boost[i] = game.total_crystal_spice_boost[
                i
            ].mul(
                game.rainbow_spice
                    .div(Decimal.pow(2, 292.5))
                    .pow(4 / 3)
                    .add(1)
            )
        }

        game.total_red_spice_boost[i] = game.total_red_spice_boost[i].mul(
            game.rune_boost[0]
        )
        game.total_yellow_spice_boost[i] = game.total_yellow_spice_boost[i].mul(
            game.rune_boost[1]
        )
        game.total_green_spice_boost[i] = game.total_green_spice_boost[i].mul(
            game.rune_boost[1]
        )
        game.total_blue_spice_boost[i] = game.total_blue_spice_boost[i].mul(
            game.rune_boost[1]
        )
        game.total_pink_spice_boost[i] = game.total_pink_spice_boost[i].mul(
            game.rune_boost[2]
        )

        if (
            game.ascend_bought[13] &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7
        ) {
            if (game.antispice[1].cmp(1) >= 0) {
                let antispice_amount = Decimal.pow(
                    10,
                    game.antispice[1].log(10) ** 0.75
                )
                let antispice_power =
                    1 + antispice_amount.log(10) ** (2 / 3) * 0.013
                if (game.collapse_challenge !== 0)
                    antispice_power =
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.0065

                game.total_crystal_spice_boost[i] =
                    game.total_crystal_spice_boost[i].mul(
                        game.pink_spice.pow(0.00008).add(1).pow(antispice_power)
                    )
            } else {
                game.total_crystal_spice_boost[i] =
                    game.total_crystal_spice_boost[i].mul(
                        game.pink_spice.pow(0.00008).add(1)
                    )
            }
        }

        if (game.ascend_challenge !== 5 && game.collapse_challenge !== 7)
            game.total_crystal_spice_boost[i] = game.total_crystal_spice_boost[
                i
            ].mul(
                Decimal.pow(
                    4,
                    (game.arcane_enchantment + game.free_enchantment) *
                        100 *
                        antispice_infusions
                )
            )

        if (
            game.ascend_bought[18] &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7
        ) {
            let effective_red_spice = game.red_spice
            if (game.red_spice.cmp(Decimal.pow(10, 10 ** 12)) >= 0)
                effective_red_spice = game.red_spice
                    .div(Decimal.pow(10, 10 ** 12))
                    .pow(1 / 3)
                    .mul(Decimal.pow(10, 10 ** 12))

            if (game.antispice[1].cmp(1) >= 0) {
                let antispice_amount = Decimal.pow(
                    10,
                    game.antispice[1].log(10) ** 0.75
                )
                let antispice_power =
                    1 + antispice_amount.log(10) ** (2 / 3) * 0.013
                if (game.collapse_challenge !== 0)
                    antispice_power =
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.0065

                game.total_crystal_spice_boost[i] =
                    game.total_crystal_spice_boost[i].mul(
                        effective_red_spice
                            .pow(0.00004)
                            .add(1)
                            .pow(antispice_power)
                    )
            } else {
                game.total_crystal_spice_boost[i] =
                    game.total_crystal_spice_boost[i].mul(
                        effective_red_spice.pow(0.00004).add(1)
                    )
            }
        }

        if (game.arcane_strengthener >= 1)
            game.total_arcane_spice_boost[i] = game.arcane_spice_boost[i].mul(
                Decimal.pow(
                    3,
                    (game.arcane_strengthener *
                        (game.arcane_strengthener + 1)) /
                        2 +
                        1
                ).pow(antispice_boosts)
            )
        else game.total_arcane_spice_boost[i] = game.arcane_spice_boost[i]

        if (
            game.ascend_bought[19] &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7
        ) {
            if (game.ansuz >= 2.5 * 10 ** 11) {
                game.total_arcane_spice_boost[i] =
                    game.total_arcane_spice_boost[i].mul(
                        Decimal.pow(
                            game.ansuz / (2.5 * 10 ** 11),
                            2 + 5 * Math.log10(game.ansuz / (2.5 * 10 ** 11))
                        )
                            .mul(4999)
                            .add(1)
                    )
            } else {
                game.total_arcane_spice_boost[i] =
                    game.total_arcane_spice_boost[i].mul(
                        Decimal.pow(game.ansuz / (2.5 * 10 ** 11), 2)
                            .mul(4999)
                            .add(1)
                    )
            }
        }

        if (
            game.ascend_bought[22] &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7
        ) {
            if (game.antispice[1].cmp(1) >= 0) {
                let antispice_amount = Decimal.pow(
                    10,
                    game.antispice[1].log(10) ** 0.75
                )
                let antispice_power =
                    1 + antispice_amount.log(10) ** (2 / 3) * 0.013
                if (game.collapse_challenge !== 0)
                    antispice_power =
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.0065

                game.total_crystal_spice_boost[i] =
                    game.total_crystal_spice_boost[i].mul(
                        game.arcane_spice.pow(10).add(1).pow(antispice_power)
                    )
            } else {
                game.total_crystal_spice_boost[i] =
                    game.total_crystal_spice_boost[i].mul(
                        game.arcane_spice.pow(10).add(1)
                    )
            }
        }

        if (game.ascend_challenge === 2) {
            game.total_crystal_spice_boost[i] = new Decimal(0)
            game.total_arcane_spice_boost[i] = new Decimal(0)
        }

        if (
            game.ascend_bought[29] &&
            game.ascend_challenge !== 5 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7
        ) {
            game.total_arcane_spice_boost[i] = game.total_arcane_spice_boost[
                i
            ].mul(
                Decimal.pow(
                    4 / 3,
                    (game.arcane_enchantment + game.free_enchantment) *
                        antispice_infusions
                )
            )
        }

        if (
            game.ascend_bought[30] &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7
        ) {
            let effective_red_spice = game.red_spice
            if (game.red_spice.cmp(Decimal.pow(10, 10 ** 12)) >= 0)
                effective_red_spice = game.red_spice
                    .div(Decimal.pow(10, 10 ** 12))
                    .pow(1 / 3)
                    .mul(Decimal.pow(10, 10 ** 12))

            if (game.antispice[1].cmp(1) >= 0) {
                let antispice_amount = Decimal.pow(
                    10,
                    game.antispice[1].log(10) ** 0.75
                )
                let antispice_power =
                    1 + antispice_amount.log(10) ** (2 / 3) * 0.013
                if (game.collapse_challenge !== 0)
                    antispice_power =
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.0065

                game.total_arcane_spice_boost[i] =
                    game.total_arcane_spice_boost[i].mul(
                        effective_red_spice
                            .pow(0.00000025)
                            .add(1)
                            .pow(antispice_power)
                    )
            } else {
                game.total_arcane_spice_boost[i] =
                    game.total_arcane_spice_boost[i].mul(
                        effective_red_spice.pow(0.00000025).add(1)
                    )
            }
        }

        if (
            game.ascend_bought[31] &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7
        ) {
            if (game.antispice[1].cmp(1) >= 0) {
                let antispice_amount = Decimal.pow(
                    10,
                    game.antispice[1].log(10) ** 0.75
                )
                let antispice_power =
                    1 + antispice_amount.log(10) ** (2 / 3) * 0.013
                if (game.collapse_challenge !== 0)
                    antispice_power =
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.0065

                game.total_arcane_spice_boost[i] =
                    game.total_arcane_spice_boost[i].mul(
                        game.arcane_spice
                            .pow(0.0175)
                            .add(1)
                            .pow(antispice_power)
                    )
            } else {
                game.total_arcane_spice_boost[i] =
                    game.total_arcane_spice_boost[i].mul(
                        game.arcane_spice.pow(0.0175).add(1)
                    )
            }
        }

        if (game.research_complete[2] >= 1) {
            game.total_crystal_spice_boost[i] = game.total_crystal_spice_boost[
                i
            ].mul(game.unstable_boost.pow(0.009))
        }

        if (game.research_complete[9] >= 1) {
            game.total_arcane_spice_boost[i] = game.total_arcane_spice_boost[
                i
            ].mul(game.unstable_boost.pow(0.000012))
        }

        if (game.antispice[0].cmp(1) >= 0) {
            let antispice_amount = Decimal.pow(
                10,
                game.antispice[0].log(10) ** 0.75
            )
            if (game.collapse_challenge !== 0) {
                game.total_arcane_spice_boost[i] =
                    game.total_arcane_spice_boost[i].mul(
                        Decimal.pow(antispice_amount, 35000).add(1)
                    )
            } else {
                game.total_arcane_spice_boost[i] =
                    game.total_arcane_spice_boost[i].mul(
                        Decimal.pow(antispice_amount, 70000).add(1)
                    )
            }
        }

        if (game.antispice[1].cmp(1) >= 0) {
            let antispice_amount = Decimal.pow(
                10,
                game.antispice[1].log(10) ** 0.75
            )
            if (game.collapse_challenge !== 0) {
                game.total_red_spice_boost[i] = game.total_red_spice_boost[
                    i
                ].mul(Decimal.pow(antispice_amount, 3.5 * 10 ** 9).add(1))
            } else {
                game.total_red_spice_boost[i] = game.total_red_spice_boost[
                    i
                ].mul(Decimal.pow(antispice_amount, 7 * 10 ** 9).add(1))
            }
        }

        if (game.antispice[2].cmp(1) >= 0) {
            let antispice_amount = Decimal.pow(
                10,
                game.antispice[2].log(10) ** 0.75
            )
            if (game.collapse_challenge !== 0) {
                game.total_yellow_spice_boost[i] =
                    game.total_yellow_spice_boost[i].mul(
                        Decimal.pow(antispice_amount, 3.25 * 10 ** 9).add(1)
                    )
            } else {
                game.total_yellow_spice_boost[i] =
                    game.total_yellow_spice_boost[i].mul(
                        Decimal.pow(antispice_amount, 6.5 * 10 ** 9).add(1)
                    )
            }
        }

        if (game.antispice[3].cmp(1) >= 0) {
            let antispice_amount = Decimal.pow(
                10,
                game.antispice[3].log(10) ** 0.75
            )
            if (game.collapse_challenge !== 0) {
                game.total_green_spice_boost[i] = game.total_green_spice_boost[
                    i
                ].mul(Decimal.pow(antispice_amount, 3 * 10 ** 9).add(1))
            } else {
                game.total_green_spice_boost[i] = game.total_green_spice_boost[
                    i
                ].mul(Decimal.pow(antispice_amount, 6 * 10 ** 9).add(1))
            }
        }

        if (game.collapse_complete[0] >= 1 && game.collapse_challenge !== 7) {
            game.total_red_spice_boost[i] = game.total_red_spice_boost[i].pow(
                1 + game.collapse_complete[0] * 0.025
            )
            game.total_yellow_spice_boost[i] = game.total_yellow_spice_boost[
                i
            ].pow(1 + game.collapse_complete[0] * 0.025)
            game.total_green_spice_boost[i] = game.total_green_spice_boost[
                i
            ].pow(1 + game.collapse_complete[0] * 0.025)
            game.total_blue_spice_boost[i] = game.total_blue_spice_boost[i].pow(
                1 + game.collapse_complete[0] * 0.025
            )
            game.total_pink_spice_boost[i] = game.total_pink_spice_boost[i].pow(
                1 + game.collapse_complete[0] * 0.025
            )
        }

        if (game.ascend_challenge === 5 || game.collapse_challenge === 7) {
            if (game.ascend_challenge_timer >= 1) {
                game.total_red_spice_boost[i] = new Decimal(0)
                game.total_yellow_spice_boost[i] = new Decimal(0)
                game.total_green_spice_boost[i] = new Decimal(0)
                game.total_blue_spice_boost[i] = new Decimal(0)
                game.total_pink_spice_boost[i] = new Decimal(0)
                game.total_crystal_spice_boost[i] = new Decimal(0)
            } else if (game.ascend_challenge_timer >= 0.5) {
                let debuff = (2 - game.ascend_challenge_timer * 2) ** 0.01

                game.total_red_spice_boost[i] =
                    game.total_red_spice_boost[i].pow(debuff)
                game.total_yellow_spice_boost[i] =
                    game.total_yellow_spice_boost[i].pow(debuff)
                game.total_green_spice_boost[i] =
                    game.total_green_spice_boost[i].pow(debuff)
                game.total_blue_spice_boost[i] =
                    game.total_blue_spice_boost[i].pow(debuff)
                game.total_pink_spice_boost[i] =
                    game.total_pink_spice_boost[i].pow(debuff)
                game.total_crystal_spice_boost[i] =
                    game.total_crystal_spice_boost[i].pow(debuff)
            }
        }
    }

    if (
        game.prestige_bought[23] >= 1 &&
        game.ascend_challenge !== 1 &&
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 7
    ) {
        if (game.ascend_complete[1] && game.ascend_bought[20]) {
            game.total_crystal_spice_boost[0] =
                game.total_crystal_spice_boost[0].pow(1.375)
            game.total_crystal_spice_boost[1] =
                game.total_crystal_spice_boost[1].pow(1.3)
            game.total_crystal_spice_boost[2] =
                game.total_crystal_spice_boost[2].pow(1.225)
            game.total_crystal_spice_boost[3] =
                game.total_crystal_spice_boost[3].pow(1.15)
            game.total_crystal_spice_boost[4] =
                game.total_crystal_spice_boost[4].pow(1.075)
        } else {
            game.total_crystal_spice_boost[0] =
                game.total_crystal_spice_boost[0].pow(1.25)
            if (game.ascend_bought[4]) {
                game.total_crystal_spice_boost[1] =
                    game.total_crystal_spice_boost[1].pow(1.2)
                game.total_crystal_spice_boost[2] =
                    game.total_crystal_spice_boost[2].pow(1.15)
                game.total_crystal_spice_boost[3] =
                    game.total_crystal_spice_boost[3].pow(1.1)
                game.total_crystal_spice_boost[4] =
                    game.total_crystal_spice_boost[4].pow(1.05)
            }
        }
    }

    for (let i = 0; i < 6; i++) {
        let antispice_amount = Decimal.pow(
            10,
            game.antispice[i].log(10) ** 0.75
        )
        switch (i) {
            case 0:
                if (game.antispice[i].cmp(10 ** 15) >= 0) {
                    antispice_amount = Decimal.pow(
                        10,
                        (0.75 * game.antispice[i].log(10) + 3.75) / 15 ** 0.25
                    )
                }
                break
            case 1:
                if (game.antispice[i].cmp(10 ** 10) >= 0) {
                    antispice_amount = Decimal.pow(
                        10,
                        (0.75 * game.antispice[i].log(10) + 2.5) / 10 ** 0.25
                    )
                }
                break
            case 2:
                if (game.antispice[i].cmp(100000) >= 0) {
                    antispice_amount = Decimal.pow(
                        10,
                        (0.75 * game.antispice[i].log(10) + 1.25) / 5 ** 0.25
                    )
                }
                break
            case 3:
                if (game.antispice[i].cmp(10 ** 7) >= 0) {
                    antispice_amount = Decimal.pow(
                        10,
                        (0.75 * game.antispice[i].log(10) + 1.75) / 7 ** 0.25
                    )
                }
                break
        }

        if (game.collapse_challenge !== 0) {
            if (game.antispice[i].cmp(1) >= 0) {
                game.total_red_spice_boost[i] = game.total_red_spice_boost[
                    i
                ].pow(1 + antispice_amount.log(10) ** (2 / 3) * 0.03)
                game.total_yellow_spice_boost[i] =
                    game.total_yellow_spice_boost[i].pow(
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.03
                    )
                game.total_green_spice_boost[i] = game.total_green_spice_boost[
                    i
                ].pow(1 + antispice_amount.log(10) ** (2 / 3) * 0.03)
                game.total_blue_spice_boost[i] = game.total_blue_spice_boost[
                    i
                ].pow(1 + antispice_amount.log(10) ** (2 / 3) * 0.03)
                game.total_pink_spice_boost[i] = game.total_pink_spice_boost[
                    i
                ].pow(1 + antispice_amount.log(10) ** (2 / 3) * 0.03)
                game.total_crystal_spice_boost[i] =
                    game.total_crystal_spice_boost[i].pow(
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.03
                    )
                game.total_arcane_spice_boost[i] =
                    game.total_arcane_spice_boost[i].pow(
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.03
                    )
            }
        } else {
            if (game.antispice[i].cmp(1) >= 0) {
                game.total_red_spice_boost[i] = game.total_red_spice_boost[
                    i
                ].pow(1 + antispice_amount.log(10) ** (2 / 3) * 0.06)
                game.total_yellow_spice_boost[i] =
                    game.total_yellow_spice_boost[i].pow(
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.06
                    )
                game.total_green_spice_boost[i] = game.total_green_spice_boost[
                    i
                ].pow(1 + antispice_amount.log(10) ** (2 / 3) * 0.06)
                game.total_blue_spice_boost[i] = game.total_blue_spice_boost[
                    i
                ].pow(1 + antispice_amount.log(10) ** (2 / 3) * 0.06)
                game.total_pink_spice_boost[i] = game.total_pink_spice_boost[
                    i
                ].pow(1 + antispice_amount.log(10) ** (2 / 3) * 0.06)
                game.total_crystal_spice_boost[i] =
                    game.total_crystal_spice_boost[i].pow(
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.06
                    )
                game.total_arcane_spice_boost[i] =
                    game.total_arcane_spice_boost[i].pow(
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.06
                    )
            }
        }

        game.total_red_spice_boost[i] = Decimal.max(
            game.total_red_spice_boost[i],
            0
        )
        game.total_yellow_spice_boost[i] = Decimal.max(
            game.total_yellow_spice_boost[i],
            0
        )
        game.total_green_spice_boost[i] = Decimal.max(
            game.total_green_spice_boost[i],
            0
        )
        game.total_blue_spice_boost[i] = Decimal.max(
            game.total_blue_spice_boost[i],
            0
        )
        game.total_pink_spice_boost[i] = Decimal.max(
            game.total_pink_spice_boost[i],
            0
        )
        game.total_crystal_spice_boost[i] = Decimal.max(
            game.total_crystal_spice_boost[i],
            0
        )
        game.total_arcane_spice_boost[i] = Decimal.max(
            game.total_arcane_spice_boost[i],
            0
        )
    }

    game.red_spice = game.red_spice.add(
        game.red_spice_gen[0]
            .floor()
            .mul(game.total_red_spice_boost[0])
            .div(delta_time)
    )
    game.yellow_spice = game.yellow_spice.add(
        game.yellow_spice_gen[0]
            .floor()
            .mul(game.total_yellow_spice_boost[0])
            .div(delta_time)
    )
    game.green_spice = game.green_spice.add(
        game.green_spice_gen[0]
            .floor()
            .mul(game.total_green_spice_boost[0])
            .div(delta_time)
    )
    game.blue_spice = game.blue_spice.add(
        game.blue_spice_gen[0]
            .floor()
            .mul(game.total_blue_spice_boost[0])
            .div(delta_time)
    )
    game.pink_spice = game.pink_spice.add(
        game.pink_spice_gen[0]
            .floor()
            .mul(game.total_pink_spice_boost[0])
            .div(delta_time)
    )

    game.crystal_spice = game.crystal_spice.add(
        game.crystal_spice_gen[0]
            .floor()
            .mul(game.total_crystal_spice_boost[0])
            .mul(3)
            .div(delta_time)
    )
    if (game.prestige_bought[24] >= 1 && game.ascend_challenge !== 2) {
        game.pink_spice_gen[5] = game.pink_spice_gen[5].add(
            game.crystal_spice_gen[0].floor().pow(2).div(delta_time)
        )
    }

    game.antitotal_spice[1] = game.antitotal_spice[1].add(
        game.red_spice_gen[0]
            .floor()
            .mul(game.total_red_spice_boost[0])
            .div(delta_time)
    )
    game.antitotal_spice[2] = game.antitotal_spice[2].add(
        game.yellow_spice_gen[0]
            .floor()
            .mul(game.total_yellow_spice_boost[0])
            .div(delta_time)
    )
    game.antitotal_spice[3] = game.antitotal_spice[3].add(
        game.green_spice_gen[0]
            .floor()
            .mul(game.total_green_spice_boost[0])
            .div(delta_time)
    )
    game.antitotal_spice[4] = game.antitotal_spice[4].add(
        game.blue_spice_gen[0]
            .floor()
            .mul(game.total_blue_spice_boost[0])
            .div(delta_time)
    )
    game.antitotal_spice[5] = game.antitotal_spice[5].add(
        game.pink_spice_gen[0]
            .floor()
            .mul(game.total_pink_spice_boost[0])
            .div(delta_time)
    )

    if (game.ascend_complete[0] && game.ascend_bought[16]) {
        game.arcane_spice = game.arcane_spice.add(
            game.arcane_spice_gen[0]
                .floor()
                .mul(game.total_arcane_spice_boost[0])
                .mul(5)
                .div(delta_time)
        )
        if (game.ascend_bought[32] && game.ascend_challenge !== 2) {
            game.crystal_spice_gen[5] = game.crystal_spice_gen[5].add(
                game.arcane_spice_gen[0].floor().pow(60).div(delta_time)
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
                .add(
                    game.arcane_spice_gen[0]
                        .floor()
                        .mul(game.total_arcane_spice_boost[0])
                        .div(200)
                )
                .div(delta_time)
        )

        game.collapse_spice = game.collapse_spice.add(
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
                .add(
                    game.arcane_spice_gen[0]
                        .floor()
                        .mul(game.total_arcane_spice_boost[0])
                        .div(200)
                )
                .div(delta_time)
        )
    } else {
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
                .div(delta_time)
        )

        game.collapse_spice = game.collapse_spice.add(
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
                .div(delta_time)
        )
    }

    if (game.ascend_challenge === 4 || game.collapse_challenge === 7) {
        for (let i = 3; i < 6; i++) {
            game.total_red_spice_boost[i] = new Decimal(0)
            game.total_yellow_spice_boost[i] = new Decimal(0)
            game.total_green_spice_boost[i] = new Decimal(0)
            game.total_blue_spice_boost[i] = new Decimal(0)
            game.total_pink_spice_boost[i] = new Decimal(0)
            game.total_crystal_spice_boost[i] = new Decimal(0)
            game.total_arcane_spice_boost[i] = new Decimal(0)
        }
    }

    if (
        game.ascend_complete[3] &&
        game.ascend_bought[27] &&
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 7
    ) {
        for (let i = 0; i < 3; i++) {
            game.total_red_spice_boost[i + 3] = game.total_red_spice_boost[
                i + 3
            ].pow(1.125 + i * 0.125)
            game.total_yellow_spice_boost[i + 3] =
                game.total_yellow_spice_boost[i + 3].pow(1.125 + i * 0.125)
            game.total_green_spice_boost[i + 3] = game.total_green_spice_boost[
                i + 3
            ].pow(1.125 + i * 0.125)
            game.total_blue_spice_boost[i + 3] = game.total_blue_spice_boost[
                i + 3
            ].pow(1.125 + i * 0.125)
            game.total_pink_spice_boost[i + 3] = game.total_pink_spice_boost[
                i + 3
            ].pow(1.125 + i * 0.125)
            game.total_crystal_spice_boost[i + 3] =
                game.total_crystal_spice_boost[i + 3].pow(1.125 + i * 0.125)
            game.total_arcane_spice_boost[i + 3] =
                game.total_arcane_spice_boost[i + 3].pow(1.125 + i * 0.125)
        }
    }

    for (let i = 0; i < 5; i++) {
        if (i === 4 && game.collapse_challenge === 8) {
            game.red_spice_gen[i] = game.red_spice_gen[i].add(
                game.red_spice_gen[i + 1]
                    .add(game.free_deity)
                    .floor()
                    .mul(game.total_red_spice_boost[i + 1])
                    .div(delta_time * (i + 2))
            )
            game.yellow_spice_gen[i] = game.yellow_spice_gen[i].add(
                game.yellow_spice_gen[i + 1]
                    .add(game.free_deity)
                    .floor()
                    .mul(game.total_yellow_spice_boost[i + 1])
                    .div(delta_time * (i + 2))
            )
            game.green_spice_gen[i] = game.green_spice_gen[i].add(
                game.green_spice_gen[i + 1]
                    .add(game.free_deity)
                    .floor()
                    .mul(game.total_green_spice_boost[i + 1])
                    .div(delta_time * (i + 2))
            )
            game.blue_spice_gen[i] = game.blue_spice_gen[i].add(
                game.blue_spice_gen[i + 1]
                    .add(game.free_deity)
                    .floor()
                    .mul(game.total_blue_spice_boost[i + 1])
                    .div(delta_time * (i + 2))
            )
            game.pink_spice_gen[i] = game.pink_spice_gen[i].add(
                game.pink_spice_gen[i + 1]
                    .add(game.free_deity)
                    .floor()
                    .mul(game.total_pink_spice_boost[i + 1])
                    .div(delta_time * (i + 2))
            )
            game.crystal_spice_gen[i] = game.crystal_spice_gen[i].add(
                game.crystal_spice_gen[i + 1]
                    .add(game.free_deity)
                    .floor()
                    .mul(game.total_crystal_spice_boost[i + 1])
                    .mul(3)
                    .div(delta_time)
            )
        } else {
            game.red_spice_gen[i] = game.red_spice_gen[i].add(
                game.red_spice_gen[i + 1]
                    .floor()
                    .mul(game.total_red_spice_boost[i + 1])
                    .div(delta_time * (i + 2))
            )
            game.yellow_spice_gen[i] = game.yellow_spice_gen[i].add(
                game.yellow_spice_gen[i + 1]
                    .floor()
                    .mul(game.total_yellow_spice_boost[i + 1])
                    .div(delta_time * (i + 2))
            )
            game.green_spice_gen[i] = game.green_spice_gen[i].add(
                game.green_spice_gen[i + 1]
                    .floor()
                    .mul(game.total_green_spice_boost[i + 1])
                    .div(delta_time * (i + 2))
            )
            game.blue_spice_gen[i] = game.blue_spice_gen[i].add(
                game.blue_spice_gen[i + 1]
                    .floor()
                    .mul(game.total_blue_spice_boost[i + 1])
                    .div(delta_time * (i + 2))
            )
            game.pink_spice_gen[i] = game.pink_spice_gen[i].add(
                game.pink_spice_gen[i + 1]
                    .floor()
                    .mul(game.total_pink_spice_boost[i + 1])
                    .div(delta_time * (i + 2))
            )
            game.crystal_spice_gen[i] = game.crystal_spice_gen[i].add(
                game.crystal_spice_gen[i + 1]
                    .floor()
                    .mul(game.total_crystal_spice_boost[i + 1])
                    .mul(3)
                    .div(delta_time)
            )
        }
        if (game.ascend_complete[0] && game.ascend_bought[16]) {
            if (i === 4) {
                game.arcane_spice_gen[i] = game.arcane_spice_gen[i].add(
                    game.arcane_spice_gen[i + 1]
                        .floor()
                        .add(game.free_deity)
                        .mul(game.total_arcane_spice_boost[i + 1])
                        .mul(5)
                        .div(delta_time)
                )
            } else {
                game.arcane_spice_gen[i] = game.arcane_spice_gen[i].add(
                    game.arcane_spice_gen[i + 1]
                        .floor()
                        .mul(game.total_arcane_spice_boost[i + 1])
                        .mul(5)
                        .div(delta_time)
                )
            }
        }
    }

    if (game.prestige_bought[10] >= 1) {
        game.red_spice_gen[5] = game.red_spice_gen[5].add(
            game.yellow_spice_gen[0].floor().pow(0.1).div(delta_time)
        )
        game.yellow_spice_gen[5] = game.yellow_spice_gen[5].add(
            game.green_spice_gen[0].floor().pow(0.1).div(delta_time)
        )
        game.green_spice_gen[5] = game.green_spice_gen[5].add(
            game.blue_spice_gen[0].floor().pow(0.1).div(delta_time)
        )
        game.blue_spice_gen[5] = game.blue_spice_gen[5].add(
            game.pink_spice_gen[0].floor().pow(0.1).div(delta_time)
        )
    }

    game.autopr_goal[0] = Number(
        document.getElementById("p_boosts_input").value
    )
    if (game.autopr_goal[0] === NaN) game.autopr_goal[0] = 10
    if (game.autopr_goal[0] < 10) game.autopr_goal[0] = 10

    let v = document.getElementById("p_spice_input").value
    if (Number(v) !== NaN && Number(v) >= 1)
        game.autopr_goal[1] = new Decimal(v)
    else game.autopr_goal[1] = new Decimal(1)

    game.autopr_goal[2] = Number(document.getElementById("p_time_input").value)
    if (game.autopr_goal[2] === NaN) game.autopr_goal[0] = 30
    if (game.autopr_goal[2] < 0.01) game.autopr_goal[0] = 0.01

    game.autopr_delta[0] = Number(
        document.getElementById("p_boosts_input2").value
    )
    if (game.autopr_delta[0] === NaN) game.autopr_goal[0] = 0
    if (game.autopr_delta[0] < 0) game.autopr_goal[0] = 0

    v = document.getElementById("p_spice_input2").value
    if (Number(v) !== NaN && Number(v) >= 1)
        game.autopr_delta[1] = new Decimal(v)
    else game.autopr_goal[1] = new Decimal(1)

    if (game.autopr_toggle && game.prestige_bought[15] >= 1) {
        switch (game.autopr_mode) {
            case 0:
                if (game.ascend_bought[9]) {
                    if (
                        game.color_boosts >=
                        game.autopr_goal[0] + game.autopr_goal2[0]
                    )
                        prestige()
                } else {
                    if (game.color_boosts >= game.autopr_goal[0]) prestige()
                }
                break
            case 1:
                let amount = 0
                if (game.color_boosts <= 16)
                    amount = new Decimal(2).pow((game.color_boosts - 10) / 3)
                else amount = new Decimal(2).pow((game.color_boosts - 8) / 4)

                if (game.ascend_bought[9]) {
                    if (
                        amount.cmp(
                            game.autopr_goal[1].mul(game.autopr_goal2[1])
                        ) >= 0
                    )
                        prestige()
                } else {
                    if (amount.cmp(game.autopr_goal[1]) >= 0) prestige()
                }
                break
            case 2:
                if (game.real_time_played[1] >= game.autopr_goal[2]) prestige()
                break
        }
    }

    if (game.autoup_toggle && game.ascend_bought[8]) {
        for (const u of prestige_upgrade.upgrades) {
            buy_prestige_upgrade(u.id, true)
        }
    }

    if (
        game.autocr_toggle &&
        game.ascend_bought[10] &&
        game.ascend_challenge !== 2
    )
        max_all("crystal")

    if (game.autoen_toggle && game.ascend_bought[17]) max_enchantment()

    let rune_speed = 1
    if (game.research_complete[3] >= 1) {
        if (game.research_complete[3] >= 12)
            rune_speed = 2099520 * 2 ** (game.research_complete[3] - 12)
        else if (game.research_complete[3] >= 4)
            rune_speed = 320 * 3 ** (game.research_complete[3] - 4)
        else if (game.research_complete[3] >= 1)
            rune_speed = 5 * 4 ** (game.research_complete[3] - 1)
        else rune_speed = 5
    }
    if (game.ascend_challenge === 6) rune_speed = 0

    for (let i = 0; i < 3; i++) {
        game.rune_power[i] += (game.rune[i] * rune_speed) / delta_time
        game.total_rune_power += (game.rune[i] * rune_speed) / delta_time
    }

    for (let i = 0; i < 3; i++) {
        let base = 2 ** (2 - 0.5 * i)
        let exponent = Math.floor(game.rune_power[i])
        if (game.rune_power[i] >= 1024) {
            exponent =
                128 * (Math.floor(game.rune_power[i]) + 3072) ** 0.5 - 7168
        }
        if (game.rune_power[i] >= 1048576) {
            exponent =
                1024 * (Math.floor(game.rune_power[i]) - 982912) ** 0.25 +
                107704
        }
        if (game.rune_power[i] >= 1024 ** 4) {
            exponent =
                4096 *
                    (Math.floor(game.rune_power[i]) - 8.76543 * 10 ** 11) **
                        (1 / 6) +
                837321
        }
        if (game.rune_power[i] >= 1024 ** 8) {
            exponent =
                16384 *
                    (Math.floor(game.rune_power[i]) - 9.06304 * 10 ** 23) **
                        0.125 +
                29003079
        }
        if (game.rune_power[i] >= 2 ** 133) {
            exponent =
                2097152 *
                    (Math.floor(game.rune_power[i]) - 8.91911 * 10 ** 39) **
                        0.0625 +
                1.08579 * 10 ** 9
        }

        game.rune_boost[i] = Decimal.pow(base, exponent)

        if (game.ascend_bought[26])
            game.rune_boost[i] = Decimal.pow(base, exponent * 2)
        if (game.ascend_complete[4] && game.ascend_bought[28])
            game.rune_boost[i] = Decimal.pow(base, exponent * 4)
        if (game.ascend_bought[33])
            game.rune_boost[i] = Decimal.pow(base, exponent * 8)

        if (game.research_complete[12] >= 1) {
            game.rune_boost[i] = Decimal.pow(base, exponent * 1.5)

            if (game.ascend_bought[26])
                game.rune_boost[i] = Decimal.pow(base, exponent * 3)
            if (game.ascend_complete[4] && game.ascend_bought[28])
                game.rune_boost[i] = Decimal.pow(base, exponent * 6)
            if (game.ascend_bought[33])
                game.rune_boost[i] = Decimal.pow(base, exponent * 12)
        }
    }

    if (game.ansuz >= 6 && !game.distribute_unlocked)
        game.distribute_unlocked = true
    if (game.ansuz >= 2.5 * 10 ** 11 && !game.half_distribute_unlocked)
        game.half_distribute_unlocked = true

    for (let i = 1; i < 6; i++) {
        if (!game.arcane_unlocked[i]) {
            if (game.arcane_spice_gen[i - 1].cmp(3) >= 0) {
                game.arcane_unlocked[i] = true
            }
        }
    }

    if (game.arcane_strengthener >= 1 && !game.arcane_max_unlocked) {
        game.arcane_max_unlocked = true
    }

    game.autoas_goal[0] = Number(document.getElementById("a_runes_input").value)
    if (game.autoas_goal[0] === NaN) game.autoas_goal[0] = 1
    if (game.autoas_goal[0] < 1) game.autoas_goal[0] = 1

    game.autoas_goal[1] = Number(document.getElementById("a_time_input").value)
    if (game.autoas_goal[1] === NaN) game.autoas_goal[1] = 30
    if (game.autoas_goal[1] < 0.01) game.autoas_goal[1] = 0.01

    if (
        game.ascend_bought[12] &&
        game.autoas_toggle &&
        game.ascend_challenge === 0
    ) {
        let stop = false
        if (
            game.autoco_toggle &&
            game.research_complete[15] >= 1 &&
            game.collapse_challenge === 0
        ) {
            if (game.autoco_mode === 0) {
                let amount = game.collapse_spice.pow(5 * 10 ** -10).floor()

                if (amount.cmp(Decimal.pow(10, 1800)) >= 0) {
                    amount = amount
                        .div(Decimal.pow(10, 200))
                        .pow(10 / ((amount.log(10) * 0.3 - 56) ** 0.5 - 2))
                        .mul(Decimal.pow(10, 200))
                } else if (amount.cmp(Decimal.pow(10, 200)) >= 0) {
                    amount = amount
                        .div(Decimal.pow(10, 200))
                        .pow(0.5)
                        .mul(Decimal.pow(10, 200))
                }

                if (
                    game.research_complete[5] >= 1 &&
                    game.collapse_challenge === 0
                ) {
                    let rune_amount = Decimal.pow(
                        1.2,
                        (game.total_rune_power / 10 ** 28) ** 0.2
                    ).mul(game.total_rune_power ** 0.5 / (5 * 10 ** 12) + 1)
                    if (rune_amount.cmp(Decimal.pow(10, 50)) >= 0)
                        rune_amount = Decimal.pow(
                            10,
                            rune_amount.div(Decimal.pow(10, 50)).log(10) **
                                0.5 +
                                50
                        )
                    if (rune_amount.cmp(Decimal.pow(10, 100)) >= 0)
                        rune_amount = Decimal.pow(10, 100)

                    amount = amount.mul(rune_amount)
                }

                let total_completions = 0
                for (let i = 0; i < 6; i++) {
                    total_completions += game.collapse_complete[i]
                }
                if (
                    game.research_complete[22] >= 1 &&
                    game.collapse_challenge === 0
                )
                    amount = amount.mul(Decimal.pow(888, total_completions))

                if (
                    amount.cmp(game.autoco_stop[0]) >= 0 &&
                    game.ascend_complete[5]
                )
                    stop = true
            } else if (game.autoco_mode === 1) {
                if (game.real_time_played[3] >= game.autoco_stop[1]) stop = true
            }
        }

        if (game.autoas_mode === 0) {
            if (game.rainbow_spice.cmp(0) === 1) {
                let amount = Math.floor(
                    (game.rainbow_spice.log(Decimal.pow(2, 512)) / 2) ** 8
                )

                if (amount >= game.autoas_goal[0] && !stop) ascend()
            }
        } else if (game.autoas_mode === 1) {
            if (game.real_time_played[2] >= game.autoas_goal[1] && !stop)
                ascend()
        }
    }

    if (game.ascend_bought[25] && game.color_boosts >= 10) {
        let amount = new Decimal(0)
        if (game.color_boosts <= 16)
            amount = new Decimal(2).pow((game.color_boosts - 10) / 3)
        else amount = new Decimal(2).pow((game.color_boosts - 8) / 4)
        if (
            game.ascend_bought[15] &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7
        ) {
            if (game.ascend >= 10240) {
                amount = amount.mul(
                    Decimal.pow(2, 5 * (game.ascend - 7740) ** 0.5 + 262)
                )
            } else {
                amount = amount.mul(Decimal.pow(2, game.ascend / 20))
            }
        }

        game.rainbow_spice = game.rainbow_spice.add(amount.div(10 * delta_time))
    }

    game.autods_portion[0] = Number(
        document.getElementById("au_portion_input").value / 100
    )
    if (game.research_complete[6] >= 1) {
        game.autods_portion[0] = Number(
            document.getElementById("au_portion_input2").value / 100
        )
    }
    game.autods_portion[1] = Number(
        document.getElementById("ar_portion_input").value / 100
    )
    game.autods_portion[2] = Number(
        document.getElementById("aa_portion_input").value / 100
    )
    game.autods_portion[3] = Number(
        document.getElementById("ar_portion_input2").value / 100
    )
    game.autods_portion[4] = Number(
        document.getElementById("aa_portion_input2").value / 100
    )

    for (let i = 0; i < 5; i++) {
        if (i === 0) {
            if (game.autods_portion[i] === NaN) game.autods_portion[i] = 0.5
        } else {
            if (game.autods_portion[i] === NaN) game.autods_portion[i] = 0
        }
        if (game.autods_portion[i] < 0) game.autods_portion[i] = 0
        if (game.autods_portion[i] > 1) game.autods_portion[i] = 1
    }

    let error = false

    if (game.research_complete[6] >= 1) {
        if (
            game.autods_portion[0] +
                game.autods_portion[1] +
                game.autods_portion[2] >
            1
        ) {
            error = true
            document.getElementById("distributor_error1").style.display =
                "block"
        } else {
            document.getElementById("distributor_error1").style.display = "none"
        }
        if (game.autods_portion[3] + game.autods_portion[4] > 1) {
            error = true
            document.getElementById("distributor_error2").style.display =
                "block"
        } else {
            document.getElementById("distributor_error2").style.display = "none"
        }
    }

    if (game.research_complete[4] >= 1 && game.autods_toggle && !error) {
        for (let i = 0; i < 35; i++) {
            buy_ascension_upgrade(i, true)
        }

        if (game.research_complete[6] >= 1) {
            distribute_runes("budget")
            if (game.ascend_complete[0]) max_all("arcane_budget")
        }
    }

    v = document.getElementById("co_spice_input").value
    if (Number(v) !== NaN && Number(v) >= 1)
        game.autoco_goal[0] = new Decimal(v)
    else game.autoco_goal[0] = new Decimal(1)

    game.autoco_goal[1] = Number(document.getElementById("co_time_input").value)
    if (game.autoco_goal[1] === NaN) game.autoco_goal[1] = 120
    if (game.autoco_goal[1] < 0.01) game.autoco_goal[1] = 0.01

    v = document.getElementById("co_spice_input2").value
    if (Number(v) !== NaN && Number(v) >= 1)
        game.autoco_stop[0] = new Decimal(v)
    else game.autoco_stop[0] = new Decimal(1)

    game.autoco_stop[1] = Number(
        document.getElementById("co_time_input2").value
    )
    if (game.autoco_stop[1] === NaN) game.autoco_stop[1] = 60
    if (game.autoco_stop[1] < 0.01) game.autoco_stop[1] = 0.01

    if (
        game.research_complete[15] >= 1 &&
        game.autoco_toggle &&
        game.collapse_challenge === 0
    ) {
        if (game.autoco_mode === 0) {
            let amount = game.collapse_spice.pow(5 * 10 ** -10).floor()

            if (amount.cmp(Decimal.pow(10, 1800)) >= 0) {
                amount = amount
                    .div(Decimal.pow(10, 200))
                    .pow(10 / ((amount.log(10) * 0.3 - 56) ** 0.5 - 2))
                    .mul(Decimal.pow(10, 200))
            } else if (amount.cmp(Decimal.pow(10, 200)) >= 0) {
                amount = amount
                    .div(Decimal.pow(10, 200))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 200))
            }

            if (
                game.research_complete[5] >= 1 &&
                game.collapse_challenge === 0
            ) {
                let rune_amount = Decimal.pow(
                    1.2,
                    (game.total_rune_power / 10 ** 28) ** 0.2
                ).mul(game.total_rune_power ** 0.5 / (5 * 10 ** 12) + 1)
                if (rune_amount.cmp(Decimal.pow(10, 50)) >= 0)
                    rune_amount = Decimal.pow(
                        10,
                        rune_amount.div(Decimal.pow(10, 50)).log(10) ** 0.5 + 50
                    )
                if (rune_amount.cmp(Decimal.pow(10, 100)) >= 0)
                    rune_amount = Decimal.pow(10, 100)

                amount = amount.mul(rune_amount)
            }

            let total_completions = 0
            for (let i = 0; i < 6; i++) {
                total_completions += game.collapse_complete[i]
            }
            if (
                game.research_complete[22] >= 1 &&
                game.collapse_challenge === 0
            )
                amount = amount.mul(Decimal.pow(888, total_completions))

            if (amount.cmp(game.autoco_goal[0]) >= 0) collapse()
        } else if (game.autoco_mode === 1) {
            if (game.real_time_played[3] >= game.autoco_goal[1]) collapse()
        }
    }

    if (!game.research_pause && game.research_select !== 0) {
        let r = game.research_select - 1

        if (game.data_boosts === 0) {
            game.data[r] += 1 / (delta_time * game.gamespeed)
        } else {
            game.data[r] +=
                (2 * 1.5 ** (game.data_boosts - 1)) /
                (delta_time * game.gamespeed)
        }

        if (!research.researches[r].repeat) {
            if (game.data[r] >= research.researches[r].data) {
                game.data[r] = research.researches[r].data
                game.research_complete[r] = 1
                game.research_pause = true
                game.research_select = 0
            }
        } else {
            let goal = 0
            if (game.research_complete[r] === 0) {
                goal = research.researches[r].data
            } else if (game.research_complete[r] < 4) {
                goal =
                    Math.ceil(
                        (research.researches[r].data *
                            research.researches[r].factor **
                                game.research_complete[r]) /
                            research.researches[r].unit
                    ) * research.researches[r].unit
            } else {
                goal =
                    Math.ceil(
                        (research.researches[r].data *
                            research.researches[r].factor ** 3 *
                            research.researches[r].factor2 **
                                (game.research_complete[r] - 3)) /
                            research.researches[r].unit
                    ) * research.researches[r].unit

                if (r === 7 && game.research_complete[r] >= 8) {
                    goal =
                        Math.ceil(
                            (research.researches[r].data *
                                research.researches[r].factor ** 3 *
                                research.researches[r].factor2 **
                                    (4 +
                                        ((game.research_complete[r] - 7) *
                                            (game.research_complete[r] - 6)) /
                                            2)) /
                                research.researches[r].unit
                        ) * research.researches[r].unit
                }

                if (r === 0 && game.research_complete[r] >= 27) {
                    goal =
                        Math.ceil(
                            (research.researches[r].data *
                                research.researches[r].factor ** 3 *
                                research.researches[r].factor2 **
                                    (game.research_complete[r] * 3 - 53)) /
                                research.researches[r].unit
                        ) * research.researches[r].unit
                }
                if (r === 0 && game.research_complete[r] === 40) {
                    goal =
                        Math.ceil(
                            (research.researches[r].data *
                                research.researches[r].factor ** 3 *
                                research.researches[r].factor2 ** 64) /
                                research.researches[r].unit
                        ) * research.researches[r].unit
                }
                if (r === 3 && game.research_complete[r] >= 19) {
                    goal =
                        Math.ceil(
                            (research.researches[r].data *
                                research.researches[r].factor ** 3 *
                                research.researches[r].factor2 **
                                    (game.research_complete[r] * 3 - 37)) /
                                research.researches[r].unit
                        ) * research.researches[r].unit
                }
            }

            if (game.data[r] >= goal) {
                game.research_complete[r]++
                game.research_pause = true
                game.research_select = 0
                if (r === 0) {
                    if (game.research_complete[0] < 40) {
                        game.data[r] = 0
                    }
                } else {
                    game.data[r] = 0
                }
            }
        }
    }

    game.halflife = 600 * 0.67 ** game.research_complete[0]

    if (game.research_complete[7] < 4)
        game.atomic_efficiency = 0.6 + 0.1 * game.research_complete[7]
    else game.atomic_efficiency = 0.8 + 0.05 * game.research_complete[7]

    game.atomic_portion =
        Number(document.getElementById("collider_input").value) / 100
    if (game.atomic_portion === NaN) game.atomic_portion = 1
    if (game.atomic_portion < 0.01) game.atomic_portion = 0.01
    if (game.atomic_portion > 1) game.atomic_portion = 1

    game.augment_start = 2000000 + 2000000 * game.collapse_complete[3]

    if (game.research_complete[28] >= 1 && game.collapse_challenge !== 0) {
        let c = collapse_challenge.challenges[game.collapse_challenge - 7]
        let completions = game.collapse_complete[game.collapse_challenge - 7]
        let exponent = completions + game.pending_completions

        if (
            c.scaling1 !== undefined &&
            completions + game.pending_completions >= c.scaling1
        ) {
            if (completions + game.pending_completions >= c.scaling1) {
                exponent =
                    c.scaling1 +
                    (completions + game.pending_completions - c.scaling1) * 1.5
            }

            if (c.scaling2 !== undefined) {
                if (completions + game.pending_completions >= c.scaling2) {
                    exponent =
                        (completions + game.pending_completions - c.scaling2) *
                            2 +
                        (c.scaling2 - c.scaling1) * 1.5 +
                        c.scaling1
                }

                if (c.scaling3 !== undefined) {
                    if (completions + game.pending_completions >= c.scaling3) {
                        exponent =
                            (completions +
                                game.pending_completions -
                                c.scaling3) *
                                3 +
                            (c.scaling3 - c.scaling2) * 2 +
                            (c.scaling2 - c.scaling1) * 1.5 +
                            c.scaling1
                    }

                    if (c.scaling4 !== undefined) {
                        if (
                            completions + game.pending_completions >=
                            c.scaling4
                        ) {
                            exponent =
                                (completions +
                                    game.pending_completions -
                                    c.scaling4) *
                                    5 +
                                (c.scaling4 - c.scaling3) * 3 +
                                (c.scaling3 - c.scaling2) * 2 +
                                (c.scaling2 - c.scaling1) * 1.5 +
                                c.scaling1
                        }
                    }
                }
            }
        }

        game.pending_goal = c.goal.mul(
            Decimal.pow(10, Math.round(Decimal.pow(c.delta, exponent).log(10)))
        )

        let amount = game.collapse_spice.pow(5 * 10 ** -10).floor()

        if (amount.cmp(Decimal.pow(10, 1800)) >= 0) {
            amount = amount
                .div(Decimal.pow(10, 200))
                .pow(10 / ((amount.log(10) * 0.3 - 56) ** 0.5 - 2))
                .mul(Decimal.pow(10, 200))
        } else if (amount.cmp(Decimal.pow(10, 200)) >= 0) {
            amount = amount
                .div(Decimal.pow(10, 200))
                .pow(0.5)
                .mul(Decimal.pow(10, 200))
        }

        if (amount.cmp(game.pending_goal) >= 0) {
            game.pending_completions++
        }
    }
}

//handling spice collider animations
function collider_tick() {
    collider.time++

    let col = document.getElementById("collider_view")
    let ctx = col.getContext("2d")
    let col2 = document.getElementById("collider_view2")
    let ctx2 = col2.getContext("2d")
    if (collider.type >= 1) {
        col2 = document.getElementById("collider_view3")
        ctx2 = col2.getContext("2d")

        switch (collider.type) {
            case 1:
                col2.className = "pure_collider"
                break
            case 2:
                col2.className = "red_collider"
                break
            case 3:
                col2.className = "yellow_collider"
                break
            case 4:
                col2.className = "green_collider"
                break
        }
    }

    if (collider.time <= 25) {
        ctx.beginPath()
        ctx2.beginPath()

        for (let i = 0; i < 2; i++) {
            let px = large_particle.particles[i].x
            large_particle.particles[i].x +=
                28 * large_particle.particles[i].dir
            ctx.moveTo(720 + px, 360)
            ctx.lineTo(720 + large_particle.particles[i].x, 360)
            ctx2.moveTo(720 + px, 360)
            ctx2.lineTo(720 + large_particle.particles[i].x, 360)
        }

        ctx.lineWidth = 12
        ctx.lineCap = "round"
        ctx.strokeStyle = "#33ff3a"
        ctx.stroke()
        ctx2.lineWidth = 12
        ctx2.lineCap = "round"
        switch (collider.type) {
            case 0:
                ctx2.strokeStyle = "#ff4e33"
                break
            case 1:
                ctx2.strokeStyle = "#ffffff"
                break
            case 2:
                ctx2.strokeStyle = "#14ebff"
                break
            case 3:
                ctx2.strokeStyle = "#1f48ff"
                break
            case 4:
                ctx2.strokeStyle = "#ea1a78"
                break
        }
        ctx2.stroke()
    } else if (collider.time <= 100) {
        ctx2.beginPath()

        for (let i = 0; i < collider.particles; i++) {
            if (
                particle.particles[i].speed > 0 &&
                Math.abs(particle.particles[i].y) < 354
            ) {
                let px = particle.particles[i].x
                let py = particle.particles[i].y

                particle.particles[i].x +=
                    particle.particles[i].speed *
                    Math.cos(particle.particles[i].dir)
                particle.particles[i].y +=
                    particle.particles[i].speed *
                    Math.sin(particle.particles[i].dir)

                if (particle.particles[i].type === 1) {
                    particle.particles[i].dir +=
                        (particle.particles[i].delta *
                            particle.particles[i].speed) /
                        particle.particles[i].speed_init
                }
                if (particle.particles[i].type === 2) {
                    particle.particles[i].dir +=
                        (particle.particles[i].delta *
                            particle.particles[i].speed *
                            (collider.time - 25) ** 0.2) /
                        particle.particles[i].speed_init
                }

                particle.particles[i].speed--

                if (Math.abs(particle.particles[i].y) < 354) {
                    ctx2.moveTo(720 + px, 360 + py)
                    ctx2.lineTo(
                        720 + particle.particles[i].x,
                        360 + particle.particles[i].y
                    )
                }
            }

            ctx2.lineWidth = 6
            ctx2.lineCap = "round"
            switch (collider.type) {
                case 0:
                    ctx2.strokeStyle = "#ff4e33"
                    break
                case 1:
                    ctx2.strokeStyle = "#ffffff"
                    break
                case 2:
                    ctx2.strokeStyle = "#14ebff"
                    break
                case 3:
                    ctx2.strokeStyle = "#1f48ff"
                    break
                case 4:
                    ctx2.strokeStyle = "#ea1a78"
                    break
            }
            ctx2.stroke()
        }

        if (collider.time === 26) {
            if (game.collider_tab === 0) {
                game.total_unstable_spice = game.total_unstable_spice.add(
                    game.atomic_spice
                        .mul(game.atomic_portion)
                        .pow(game.atomic_efficiency)
                        .floor()
                )
                game.unstable_spice = game.unstable_spice.add(
                    game.atomic_spice
                        .mul(game.atomic_portion)
                        .pow(game.atomic_efficiency)
                        .floor()
                )
                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            } else if (game.collider_tab === 1) {
                game.spent_atomic_spice[0] = game.spent_atomic_spice[0].add(
                    game.atomic_spice.mul(game.atomic_portion)
                )
                game.antispice[0] = game.spent_atomic_spice[0]
                    .pow(game.atomic_efficiency / 132)
                    .floor()

                if (game.antispice[0].cmp(Decimal.pow(10, 52)) >= 0)
                    game.antispice[0] = Decimal.pow(10, 52)

                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            } else if (game.collider_tab === 2) {
                let red_amount = Decimal.pow(
                    10,
                    (game.antitotal_spice[1].log(10) / (4.4 * 10 ** 11)) ** 0.5
                )

                game.spent_atomic_spice[1] = game.spent_atomic_spice[1].add(
                    game.atomic_spice.mul(game.atomic_portion)
                )
                game.antispice[1] = game.spent_atomic_spice[1]
                    .pow(game.atomic_efficiency / 320)
                    .mul(red_amount)
                    .floor()

                if (game.antispice[1].cmp(Decimal.pow(10, 36)) >= 0)
                    game.antispice[1] = Decimal.pow(10, 36)

                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            } else if (game.collider_tab === 3) {
                let yellow_amount = Decimal.pow(
                    10,
                    (game.antitotal_spice[2].log(10) / (1.2 * 10 ** 12)) ** 0.5
                )

                game.spent_atomic_spice[2] = game.spent_atomic_spice[2].add(
                    game.atomic_spice.mul(game.atomic_portion)
                )
                game.antispice[2] = game.spent_atomic_spice[2]
                    .pow(game.atomic_efficiency / 888)
                    .mul(yellow_amount)
                    .floor()

                if (game.antispice[2].cmp(Decimal.pow(10, 16)) >= 0)
                    game.antispice[2] = Decimal.pow(10, 16)

                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            } else if (game.collider_tab === 4) {
                let green_amount = Decimal.pow(
                    10,
                    (game.antitotal_spice[3].log(10) / (3.75 * 10 ** 12)) ** 0.5
                )

                game.spent_atomic_spice[3] = game.spent_atomic_spice[3].add(
                    game.atomic_spice.mul(game.atomic_portion)
                )
                game.antispice[3] = game.spent_atomic_spice[3]
                    .pow(game.atomic_efficiency / 2111)
                    .mul(green_amount)
                    .floor()

                if (game.antispice[3].cmp(Decimal.pow(10, 7)) >= 0)
                    game.antispice[3] = Decimal.pow(10, 7)

                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            }

            document.getElementById("collider_view").style.display = "none"
            if (collider.type === 0)
                document.getElementById("collider_view2").style.display =
                    "block"
            else
                document.getElementById("collider_view3").style.display =
                    "block"
        }
    } else {
        collider.enabled = false
    }
}

//handling hotkeys
document.body.addEventListener("keydown", function (event) {
    let activeelement = document.activeElement
    if (
        activeelement.tagName == "INPUT" &&
        (activeelement.type == "text" || activeelement.type == "number")
    ) {
        event.stopPropagation()
    } else {
        for (let i = 0; i < 6; i++) {
            if (event.code === "Digit" + (i + 1)) key.digit[i] = true
        }

        if (event.shiftKey) key.shift = true
        else key.shift = false

        if (event.code === "KeyS") key.s = true
        if (event.code === "KeyM") key.m = true
        if (event.code === "KeyB") key.b = true
        if (event.code === "KeyP") key.p = true
        if (event.code === "KeyI") key.i = true
        if (event.code === "KeyA") key.a = true
        if (event.code === "KeyN") key.n = true
        if (event.code === "KeyC") key.c = true
        if (event.code === "KeyX") key.x = true
        // upcoming: fast-button to change tab/subtabs
        // update/include the new variable "available_subtabs", if not found
        if (undefined == game.available_subtabs) game.available_subtabs = [4,2,3,3,3]
        // ArrowButton-Action ;)
        if (event.code === "ArrowUp") {
            if (
                game.tab == 0 &&
                (game.color_boosts >= 10 || game.prestige > 0)
            ) {
                goto_tab(1)
            } else if (
                game.tab == 1 &&
                (game.prestige_bought[25] || game.ascend > 0)
            ) {
                goto_tab(2)
            } else if (
                game.tab == 2 &&
                (game.ascend_complete[5] || game.collapse > 0)
            ) {
                goto_tab(3)
            } else if (game.tab == 3) {
                goto_tab(5)
            } else if (game.tab == 5) {
                goto_tab(6)
            } else if (game.tab == 6) {
                goto_tab(0)
            } else {
                goto_tab(5)
            } // if any pre/asc/coll aren't unlocked, it will hop into stats
        }
        if (event.code === "ArrowDown") {
            if (game.tab == 0) {
                goto_tab(6)
            } else if (game.tab == 6) {
                goto_tab(5)
            } else if (game.tab == 5) {
                // look for unlocked tabs reversed, hop into highest unlocked
                if (game.ascend_complete[5] || game.collapse > 0) {
                    goto_tab(3)
                } else if (game.prestige_bought[25] || game.ascend > 0) {
                    goto_tab(2)
                } else if (game.color_boosts >= 10 || game.prestige > 0) {
                    goto_tab(1)
                } else {
                    goto_tab(0)
                }
            } else if (game.tab == 3) {
                goto_tab(2)
            } else if (game.tab == 2) {
                goto_tab(1)
            } else goto_tab(0) // none of above of game.tab is 1, but we can save a few chars :D
        }
        if (event.code === "ArrowRight") {
            switch (game.tab) {
                case 0:
                    if (game.color_boosts > 0) {
                        game.subtab[0] == game.color_boosts ||
                        game.subtab[0] == game.available_subtabs[0]
                            ? goto_subtab(0)
                            : goto_subtab(game.subtab[0] + 1)
                    }
                    break
                case 1:
                    if (game.prestige_bought[12] == 1) {
                        game.subtab[1] == game.available_subtabs[1]
                            ? goto_subtab(0)
                            : goto_subtab(game.subtab[1] + 1)
                    }
                    break
                case 2:
                    if (!game.ascend_bought[16]) {
                        // no challenges, swap between tabs
                        game.subtab[3] == 0 ? goto_subtab(1) : goto_subtab(0)
                    } else if (!game.ascend_complete[0]) {
                        // challenge unlocked
                        game.subtab[3] == game.available_subtabs[3] - 1
                            ? goto_subtab(0)
                            : goto_subtab(game.subtab[3] + 1)
                    } else {
                        // challenge completed
                        game.subtab[3] == game.available_subtabs[3]
                            ? goto_subtab(0)
                            : goto_subtab(game.subtab[3] + 1)
                    }
                    break
                case 3:
                    if (game.research_complete[19]) {
                        game.subtab[4] == game.available_subtabs[4]
                            ? goto_subtab(0)
                            : goto_subtab(game.subtab[4] + 1)
                    } else if (game.research_complete[18]) {
                        game.subtab[4] == game.available_subtabs[4] - 1
                            ? goto_subtab(0)
                            : goto_subtab(game.subtab[4] + 1)
                    } else if (game.collapse >= 5) {
                        game.subtab[4] == 0 ? goto_subtab(1) : goto_subtab(0)
                    }
                    break
                case 5:
                    if (game.collapse > 0) {
                        game.subtab[2] == 3
                            ? goto_subtab(0)
                            : goto_subtab(game.subtab[2] + 1)
                    } else if (game.ascend > 0) {
                        game.subtab[2] == 2
                            ? goto_subtab(0)
                            : goto_subtab(game.subtab[2] + 1)
                    } else if (game.prestige > 0) {
                        game.subtab[2] == 0 ? goto_subtab(1) : goto_subtab(0)
                    }
                    break
            }
        }
        if (event.code === "ArrowLeft") {
            switch (game.tab) {
                case 0:
                    if (game.color_boosts > 0) {
                        if (game.subtab[0] == 0) {
                            // check for new players, if already color_boost or not
                            game.color_boosts >= game.available_subtabs[0]
                                ? goto_subtab(4)
                                : goto_subtab(game.color_boost)
                        } else {
                            goto_subtab(game.subtab[0] - 1)
                        }
                    }
                    break
                case 1:
                    if (game.prestige_bought[12] == 1) {
                        game.subtab[game.tab] == 0
                            ? goto_subtab(game.available_subtabs[game.tab])
                            : goto_subtab(game.subtab[game.tab] - 1)
                    }
                    break
                case 2:
                    if (!game.ascend_bought[16]) {
                        game.subtab[3] == 0 ? goto_subtab(1) : goto_subtab(0) // no challenges
                    } else if (!game.ascend_complete[0]) {
                        game.subtab[3] == 0
                            ? goto_subtab(2)
                            : goto_subtab(game.subtab[3] - 1) // challenge unlocked
                    } else {
                        game.subtab[3] == 0
                            ? goto_subtab(3)
                            : goto_subtab(game.subtab[3] - 1) // challenge completed
                    }
                    break
                case 3:
                    if (game.research_complete[19]) {
                        game.subtab[4] == 0
                            ? goto_subtab(game.available_subtabs[4])
                            : goto_subtab(game.subtab[4] - 1)
                    } else if (game.research_complete[18]) {
                        game.subtab[4] == 0
                            ? goto_subtab(game.available_subtabs[4] - 1)
                            : goto_subtab(game.subtab[4] - 1)
                    } else if (game.collapse >= 5) {
                        game.subtab[4] == 0 ? goto_subtab(1) : goto_subtab(0)
                    }
                    break
                case 5:
                    if (game.collapse > 0) {
                        game.subtab[2] == 0
                            ? goto_subtab(3)
                            : goto_subtab(game.subtab[2] - 1)
                    } else if (game.ascend > 0) {
                        game.subtab[2] == 0
                            ? goto_subtab(2)
                            : goto_subtab(game.subtab[2] - 1)
                    } else if (game.prestige > 0) {
                        game.subtab[2] == 0 ? goto_subtab(1) : goto_subtab(0)
                    }
                    break
            }
        }
    }
})

document.body.addEventListener("keyup", function (event) {
    for (let i = 0; i < 6; i++) {
        if (event.code === "Digit" + (i + 1)) key.digit[i] = false
    }

    if (event.code === "KeyS") key.s = false
    if (event.code === "KeyM") key.m = false
    if (event.code === "KeyB") key.b = false
    if (event.code === "KeyP") key.p = false
    if (event.code === "KeyI") key.i = false
    if (event.code === "KeyA") key.a = false
    if (event.code === "KeyN") key.n = false
    if (event.code === "KeyC") key.c = false
    if (event.code === "KeyX") key.x = false
})

window.addEventListener("blur", function () {
    for (let i = 0; i < 6; i++) {
        key.digit[i] = false
    }

    key.s = false
    key.m = false
    key.b = false
    key.p = false
    key.i = false
    key.a = false
    key.n = false
    key.c = false
    key.x = false
})

function hotkey_tick() {
    if (game.hotkeys) {
        if (key.b) color_boost()
        if (key.p) prestige()
        if (key.i) buy_infusion()
        if (key.a) ascend()
        if (key.n) buy_enchantment()
        if (key.c) collapse()
        if (key.x) {
            exit_ascension_challenge()
            exit_collapse_challenge()
        }

        if (game.tab === 0) {
            switch (game.subtab[0]) {
                case 0:
                    for (let i = 0; i < 6; i++) {
                        if (key.shift && key.digit[i]) {
                            buy_gen("red", i)
                        } else if (key.digit[i]) {
                            buy_until10("red", i)
                        }

                        if (key.s) buy_strengthener("red")
                        if (key.m) {
                            if (
                                game.color_boosts >= 1 ||
                                game.prestige >= 1 ||
                                game.ascend >= 1 ||
                                game.collapse >= 1
                            )
                                max_all("red")
                        }
                    }
                    break
                case 1:
                    for (let i = 0; i < 6; i++) {
                        if (key.shift && key.digit[i]) {
                            buy_gen("yellow", i)
                        } else if (key.digit[i]) {
                            buy_until10("yellow", i)
                        }

                        if (key.s) buy_strengthener("yellow")
                        if (key.m) {
                            if (
                                game.color_boosts >= 2 ||
                                game.prestige >= 1 ||
                                game.ascend >= 1 ||
                                game.collapse >= 1
                            )
                                max_all("yellow")
                        }
                    }
                    break
                case 2:
                    for (let i = 0; i < 6; i++) {
                        if (key.shift && key.digit[i]) {
                            buy_gen("green", i)
                        } else if (key.digit[i]) {
                            buy_until10("green", i)
                        }

                        if (key.s) buy_strengthener("green")
                        if (key.m) {
                            if (
                                game.color_boosts >= 3 ||
                                game.prestige >= 1 ||
                                game.ascend >= 1 ||
                                game.collapse >= 1
                            )
                                max_all("green")
                        }
                    }
                    break
                case 3:
                    for (let i = 0; i < 6; i++) {
                        if (key.shift && key.digit[i]) {
                            buy_gen("blue", i)
                        } else if (key.digit[i]) {
                            buy_until10("blue", i)
                        }

                        if (key.s) buy_strengthener("blue")
                        if (key.m) {
                            if (
                                game.color_boosts >= 4 ||
                                game.prestige >= 1 ||
                                game.ascend >= 1 ||
                                game.collapse >= 1
                            )
                                max_all("blue")
                        }
                    }
                    break
                case 4:
                    for (let i = 0; i < 6; i++) {
                        if (key.shift && key.digit[i]) {
                            buy_gen("pink", i)
                        } else if (key.digit[i]) {
                            buy_until10("pink", i)
                        }

                        if (key.s) buy_strengthener("pink")
                        if (key.m) {
                            if (
                                game.color_boosts >= 5 ||
                                game.prestige >= 1 ||
                                game.ascend >= 1 ||
                                game.collapse >= 1
                            )
                                max_all("pink")
                        }
                    }
                    break
            }
        }
        if (game.tab === 1) {
            if (game.subtab[1] === 1) {
                for (let i = 0; i < 6; i++) {
                    if (key.shift && key.digit[i]) {
                        buy_gen("crystal", i)
                    } else if (key.digit[i]) {
                        buy_until10("crystal", i)
                    }

                    if (key.s) buy_strengthener("crystal")
                    if (key.m) {
                        if (
                            game.crystal_spice_bought[5] >= 5 ||
                            game.ascend >= 1 ||
                            game.collapse >= 1
                        )
                            max_all("crystal")
                    }
                }
            }
        }
        if (game.tab === 2) {
            if (game.subtab[3] === 3) {
                for (let i = 0; i < 6; i++) {
                    if (key.shift && key.digit[i]) {
                        buy_gen("arcane", i)
                    } else if (key.digit[i]) {
                        buy_until10("arcane", i)
                    }

                    if (key.s) buy_strengthener("arcane")
                    if (key.shift && key.m) {
                        if (
                            game.arcane_max_unlocked &&
                            game.half_distribute_unlocked
                        )
                            max_all("arcane_half")
                    } else if (key.m) {
                        if (game.arcane_max_unlocked) max_all("arcane")
                    }
                }
            }
        }
    }
}

//saving the game
function save() {
    game.version = "1.5.0"
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
        game.gamespeed = 1

        color_boost(true)
        game.color_boosts = 0

        game.total_spice = new Decimal(5)
        game.collapse_spice = new Decimal(5)
        game.total_time_played = 0
        game.real_time_played = [0, 0, 0, 0]

        game.autosp_toggle = new Array(5).fill(false)
        game.autocb_toggle = false
        game.autoin_toggle = false
        game.autopr_toggle = false
        game.autoup_toggle = false
        game.autocr_toggle = false
        game.autoas_toggle = false
        game.autoen_toggle = false

        game.prestige = 0
        game.rainbow_spice = new Decimal(0)
        game.prestige_bought = new Array(26).fill(0)
        game.prestige_time_played = 0
        game.prestige_amount_history = new Array(10).fill(-1)
        game.prestige_time_history = new Array(10).fill(-1)

        prestige_upgrade.upgrades[0].price = new Decimal(1)
        prestige_upgrade.upgrades[2].price = new Decimal(2)
        prestige_upgrade.upgrades[3].price = new Decimal(4)
        prestige_upgrade.upgrades[4].price = new Decimal(8)
        prestige_upgrade.upgrades[5].price = new Decimal(16)
        prestige_upgrade.upgrades[9].price = Decimal.pow(2, 20)
        prestige_upgrade.upgrades[20].price = Decimal.pow(2, 214)

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
            game.crystal_spice_bought[i] = 0
            game.crystal_spice_boost[i] = new Decimal(1)
            game.total_crystal_spice_boost[i] = new Decimal(1)
        }

        game.ascend = 0
        game.ansuz = 0
        game.rune = new Array(3).fill(0)
        game.rune_power = new Array(3).fill(0)
        game.total_rune_power = 0
        game.rune_boost = [new Decimal(1), new Decimal(1), new Decimal(1)]
        game.distribute_unlocked = false
        game.half_distribute_unlocked = false

        game.ascend_bought = new Array(35).fill(false)
        game.ascend_time_played = 0
        game.ascend_amount_history = new Array(10).fill(-1)
        game.ascend_time_history = new Array(10).fill(-1)

        game.ascend_challenge = 0
        game.ascend_complete = new Array(6).fill(false)
        game.ascend_challenge_timer = 0

        game.arcane_spice = new Decimal(0)
        game.arcane_spice_price = [
            20000,
            100000,
            600000,
            3.5 * 10 ** 7,
            3 * 10 ** 9,
            4 * 10 ** 11,
        ]
        game.arcane_strengthener = 0
        game.arcane_strengthener_price = 5000000
        game.arcane_enchantment = 0
        game.arcane_enchantment_price = new Decimal(25)
        game.arcane_unlocked = [true, false, false, false, false, false]
        game.arcane_max_unlocked = false
        for (let i = 0; i < 6; i++) {
            game.arcane_spice_gen[i] = new Decimal(0)
            game.arcane_spice_bought[i] = 0
            game.arcane_spice_boost[i] = new Decimal(1)
            game.total_arcane_spice_boost[i] = new Decimal(1)
        }

        game.collapse = 0
        game.atomic_spice = new Decimal(0)
        game.unstable_spice = new Decimal(0)
        game.total_unstable_spice = new Decimal(0)
        game.decayed_spice = new Decimal(0)

        game.research_view = 0
        game.research_select = 0
        game.research_pause = true
        game.research_complete = new Array(29).fill(0)
        game.data = new Array(29).fill(0)
        game.data_boosts = 0

        game.collapse_time_played = 0
        game.collapse_amount_history = new Array(10).fill(-1)
        game.collapse_time_history = new Array(10).fill(-1)

        game.collapse_challenge = 0
        game.collapse_complete = new Array(6).fill(0)
        game.pending_completions = 0
        game.pending_goal = new Decimal(1)

        game.halflife = 600
        game.atomic_efficiency = 0.6
        game.free_deity = new Decimal(0)
        game.augment_start = 2000000

        game.collider_tab = 0
        game.antispice = [
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            0,
        ]
        game.spent_atomic_spice = [
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
        ]
        game.antitotal_spice = [
            undefined,
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
        ]

        game.subtab[0] = 0
        game.subtab[1] = 0
        game.subtab[2] = 0
        game.subtab[3] = 0
        game.subtab[4] = 0

        save()

        let temp_game = game
        load(temp_game)
    }
}

goto_tab(0)

//load the game
function load(savegame) {
    if (savegame === null) return
    if (savegame.red_unlock !== undefined) {
        alert("This save file is too powerful for this game")
        return
    }

    game = savegame

    const [edition, major, minor] = savegame.version
        .split(".")
        .map(val => parseInt(val))

    if (major <= 0) {
        let old_subtab = game.subtab
        game.subtab = new Array(4).fill(0)
        for (let i = 0; i < 3; i++) {
            game.subtab[i] = old_subtab[i]
        }
        let old_goal = game.autopr_goal
        game.autopr_goal = [10, "1", 30]
        game.autopr_goal[0] = old_goal[0]
        game.autopr_goal[1] = old_goal[1]
        game.autopr_delta = [5, "10"]
        game.autopr_goal2 = [0, "1"]
        game.ascend = 0
        game.ansuz = 0
        game.rune = new Array(3).fill(0)
        game.rune_power = new Array(3).fill(0)
        game.total_rune_power = 0
        game.rune_boost = ["1", "1", "1"]
        game.distribute_unlocked = false
        game.ascend_confirm = true
        game.ascend_bought = new Array(13).fill(false)
        game.autoup_toggle = false
        game.autocr_toggle = false
        game.autoas_toggle = false
        game.autoas_goal = 1
        game.ascend_amount_history = new Array(10).fill(-1)
        game.ascend_time_history = new Array(10).fill(-1)
        game.ascend_time_played = game.total_time_played
    }
    if (major <= 1) {
        let old_bought = game.ascend_bought
        game.ascend_bought = new Array(26).fill(false)
        for (let i = 0; i < 13; i++) {
            game.ascend_bought[i] = old_bought[i]
        }
        game.ascend_challenge = 0
        game.ascend_complete = new Array(3).fill(false)
        game.arcane_spice = "0"
        game.arcane_spice_gen = ["0", "0", "0", "0", "0", "0"]
        game.arcane_spice_price = [
            20000,
            100000,
            600000,
            3.5 * 10 ** 7,
            3 * 10 ** 9,
            4 * 10 ** 11,
        ]
        game.arcane_spice_bought = [0, 0, 0, 0, 0, 0]
        game.arcane_spice_boost = ["1", "1", "1", "1", "1", "1"]
        game.total_arcane_spice_boost = ["1", "1", "1", "1", "1", "1"]
        game.arcane_unlocked = [true, false, false, false, false, false]
        game.arcane_max_unlocked = false
        game.arcane_strengthener = 0
        game.arcane_strengthener_price = 5000000
        game.arcane_enchantment = 0
        game.arcane_enchantment_price = "25"
        game.autoen_toggle = false
        game.half_distribute_unlocked = false
        game.challenge_confirm = true
        game.exponent_notation = 0
    }
    if (major <= 2) {
        if ((major === 2 && minor < 1) || major < 2) {
            game.autoas_mode = 0
            let old_goal = game.autoas_goal
            game.autoas_goal = [old_goal, 30]
            game.prestige_price[8] = new Decimal(32768)
        }

        let old_bought = game.ascend_bought
        game.ascend_bought = new Array(35).fill(false)
        for (let i = 0; i < 26; i++) {
            game.ascend_bought[i] = old_bought[i]
        }
        let old_complete = game.ascend_complete
        game.ascend_complete = new Array(6).fill(false)
        for (let i = 0; i < 3; i++) {
            game.ascend_complete[i] = old_complete[i]
        }
        game.ascend_challenge_timer = 0
    }
    if (major <= 3) {
        if ((major === 3 && minor < 2) || major < 3) {
            game.high_visibility = false
            game.refresh_rate = 20
        }

        game.collapse = 0
        game.atomic_spice = "0"
        game.unstable_spice = "0"
        game.total_unstable_spice = "0"
        game.decayed_spice = "0"
        game.unstable_boost = "1"

        game.halflife = 300
        game.atomic_efficiency = 0.6
        game.free_enchantment = 0

        game.collapse_amount_history = new Array(10).fill(-1)
        game.collapse_time_history = new Array(10).fill(-1)
        game.collapse_time_played = game.total_time_played
        game.collapse_spice = game.total_spice

        game.collapse_confirm = true

        game.research_view = 0
        game.research_select = 0
        game.research_pause = true
        game.research_complete = new Array(16).fill(0)
        game.data = new Array(16).fill(0)
        game.data_boosts = 0

        let old_subtab = game.subtab
        game.subtab = new Array(5).fill(0)
        for (let i = 0; i < 4; i++) {
            game.subtab[i] = old_subtab[i]
        }

        game.autods_toggle = false
        game.autods_portion = [0.5, 0, 0, 0, 0]
        game.autods_budget = [0, 0, 0]

        game.autoco_toggle = false
        game.autoco_mode = 0
        game.autoco_goal = [new Decimal(10 ** 50), 120]
        game.autoco_stop = [new Decimal(10 ** 25), 60]
    }
    if (major <= 4) {
        if ((major === 4 && minor < 2) || major < 4) {
            game.collider_animation = true

            if (!game.autoco_mode) game.autoco_mode = 0
        }

        let old_complete = game.research_complete
        game.research_complete = new Array(29).fill(0)
        let old_data = game.data
        game.data = new Array(29).fill(0)
        for (let i = 0; i < 16; i++) {
            game.research_complete[i] = old_complete[i]
            game.data[i] = old_data[i]
        }

        game.atomic_portion = 1
        game.collapse_challenge = 0
        game.collapse_complete = new Array(6).fill(0)
        game.pending_completions = 0
        game.pending_goal = new Decimal(1)
        game.free_deity = new Decimal(0)
        game.augment_start = 2000000
        game.gamespeed = 1

        game.collider_tab = 0
        game.antispice = [
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            0,
        ]
        game.spent_atomic_spice = [
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
        ]
        game.antitotal_spice = [
            undefined,
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
        ]

        game.gamespeed = 1
        game.real_time_played = [
            game.total_time_played,
            game.prestige_time_played,
            game.ascend_time_played,
            game.collapse_time_played,
        ]
    }

    game.version = "1.5.0"

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
    game.arcane_spice = new Decimal(game.arcane_spice)
    game.arcane_enchantment_price = new Decimal(game.arcane_enchantment_price)
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
        game.arcane_spice_gen[i] = new Decimal(game.arcane_spice_gen[i])
        game.arcane_spice_boost[i] = new Decimal(game.arcane_spice_boost[i])
        game.total_arcane_spice_boost[i] = new Decimal(
            game.total_arcane_spice_boost[i]
        )
    }
    game.atomic_spice = new Decimal(game.atomic_spice)
    game.unstable_spice = new Decimal(game.unstable_spice)
    game.total_unstable_spice = new Decimal(game.total_unstable_spice)
    game.decayed_spice = new Decimal(game.decayed_spice)
    game.unstable_boost = new Decimal(game.unstable_boost)
    game.collapse_spice = new Decimal(game.collapse_spice)
    game.free_deity = new Decimal(game.free_deity)

    if (game.prestige_price !== undefined) {
        for (const u of prestige_upgrade.upgrades) {
            u.price = new Decimal(game.prestige_price[u.id])
        }
    }

    game.pending_goal = new Decimal(game.pending_goal)

    game.autopr_goal[1] = new Decimal(game.autopr_goal[1])
    game.autopr_delta[1] = new Decimal(game.autopr_delta[1])
    game.autopr_goal2[1] = new Decimal(game.autopr_goal2[1])
    game.autoco_goal[0] = new Decimal(game.autoco_goal[0])
    game.autoco_stop[0] = new Decimal(game.autoco_stop[0])

    for (let i = 0; i < 10; i++) {
        if (game.prestige_amount_history[i] !== -1) {
            game.prestige_amount_history[i] = new Decimal(
                game.prestige_amount_history[i]
            )
        }
        if (game.collapse_amount_history[i] !== -1) {
            game.collapse_amount_history[i] = new Decimal(
                game.collapse_amount_history[i]
            )
        }
    }

    for (let i = 0; i < 6; i++) {
        game.antispice[i] = new Decimal(game.antispice[i])
    }
    for (let i = 0; i < 7; i++) {
        game.spent_atomic_spice[i] = new Decimal(game.spent_atomic_spice[i])
    }
    for (let i = 1; i < 7; i++) {
        game.antitotal_spice[i] = new Decimal(game.antitotal_spice[i])
    }

    goto_tab(game.tab)
    if (game.tab === 0) goto_subtab(game.subtab[0])
    if (game.tab === 1) goto_subtab(game.subtab[1])
    if (game.tab === 2) goto_subtab(game.subtab[3])
    if (game.tab === 3) goto_subtab(game.subtab[4])
    if (game.tab === 5) goto_subtab(game.subtab[2])

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
    auto_toggle("prestige_mode")
    auto_toggle("prestige_upgrade")
    auto_toggle("prestige_upgrade")
    auto_toggle("crystal")
    auto_toggle("crystal")
    auto_toggle("ascend", true)
    auto_toggle("ascend", true)
    auto_toggle("enchantment")
    auto_toggle("enchantment")
    auto_toggle("ascend_mode")
    auto_toggle("ascend_mode")
    auto_toggle("ascend_upgrade")
    auto_toggle("ascend_upgrade")
    auto_toggle("collapse", true)
    auto_toggle("collapse", true)
    auto_toggle("collapse_mode")
    auto_toggle("collapse_mode")

    notation(game.notation)
    hotkeys()
    hotkeys()
    condensed()
    condensed()
    confirmations("ascend", true)
    confirmations("ascend", true)
    confirmations("collapse", true)
    confirmations("collapse", true)
    confirmations("challenge")
    confirmations("challenge")
    exponent_notation(game.exponent_notation)
    high_visibility()
    high_visibility()
    refresh_rate(game.refresh_rate)
    animations()
    animations()

    document.getElementById("p_boosts_input").value = game.autopr_goal[0]
    document.getElementById("p_boosts_input2").value = game.autopr_delta[0]
    document.getElementById("p_spice_input").value = game.autopr_goal[1]
    document.getElementById("p_spice_input2").value = game.autopr_delta[1]
    document.getElementById("p_time_input").value = game.autopr_goal[2]
    document.getElementById("a_runes_input").value = game.autoas_goal[0]
    document.getElementById("a_time_input").value = game.autoas_goal[1]
    document.getElementById("au_portion_input").value =
        game.autods_portion[0] * 100
    document.getElementById("au_portion_input2").value =
        game.autods_portion[0] * 100
    document.getElementById("ar_portion_input").value =
        game.autods_portion[1] * 100
    document.getElementById("aa_portion_input").value =
        game.autods_portion[2] * 100
    document.getElementById("ar_portion_input2").value =
        game.autods_portion[3] * 100
    document.getElementById("aa_portion_input2").value =
        game.autods_portion[4] * 100
    document.getElementById("co_spice_input").value = game.autoco_goal[0]
    document.getElementById("co_spice_input2").value = game.autoco_stop[0]
    document.getElementById("co_time_input").value = game.autoco_goal[1]
    document.getElementById("co_time_input2").value = game.autoco_stop[1]
    document.getElementById("collider_input").value = game.atomic_portion * 100
}

//load the game when opened
load(JSON.parse(localStorage.getItem("spice_idle_save")))

//setting up the tick loop
function tick_loop() {
    let delta_ms = undefined
    let delta_ticks = 1
    if (delta_time === undefined) {
        delta_time = game.tickspeed / game.gamespeed
    } else {
        delta_ms = Date.now() - tick_time
        delta_time = 1000 / (delta_ms * game.gamespeed)
        delta_ticks = Math.floor((delta_ms * game.tickspeed) / 1000)
    }

    tick_time = Date.now()

    if (delta_ms >= 100) {
        if (delta_ticks > 60 * game.tickspeed) delta_ticks = 60 * game.tickspeed
        delta_time *= delta_ticks
        while (delta_ticks > 0) {
            tick()
            delta_ticks--
        }
    } else {
        tick()
    }
    hotkey_tick()
    if (collider.enabled) collider_tick()

    window.setTimeout(tick_loop, 1000 / game.tickspeed)
}

//setting up the graphics loop
function graphics_loop() {
    tabs_update()
    if (game.tab === 0) spice_update()
    if (game.tab === 1) {
        prestige_update()
        crystal_update()
    }
    if (game.tab === 2) {
        ascension_update()
        arcane_update()
    }
    if (game.tab === 3) {
        collapse_update()
        research_update()
    }
    if (game.tab === 5) stats_update()
    if (game.tab === 6) settings_update()

    window.setTimeout(graphics_loop, game.refresh_rate)
}

tick_loop()
graphics_loop()

//setting up the autosave loop
let save_loop = window.setInterval(function () {
    save()
}, 60000)
